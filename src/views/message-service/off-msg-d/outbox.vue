<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="big"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <normal-layer :search-number="2">
      <template slot="search-header">
        <FormItems ref="ruleForm" :model="queryForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm">
          <template>
            <my-button type="reset" title="关闭" @click="closeDialog" />
            <my-button type="search" @click="iniSearch" />
          </template>
        </FormItems>
      </template>
      <template>
        <my-table-view v-loading="loading" height="400px" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="sendTime" slot-scope="scope">
            {{ scope.row.sendTime | renderTime }}
          </template>
          <template slot="operation" slot-scope="scope">
            <MyButton icon="detail" title="详情" @click="viewDetail(scope.row)" />
            <MyButton icon="delete" title="删除" @click="deleteDetail(scope.row)" />
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery1" @refresh="pageChange1" />
      </template>
    </normal-layer>
    <select-btn v-model="isShowAdd" />
    <sendMailDetail v-model="isShowDetail" :dialog-title="isShowDetailTitle" :select-row="selectRow" />
  </form-dialog>
</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import { outBox, deleteInterMailBySender } from '@/api/MessageServer'
import selectBtn from './select'
import pageHandle from '@/mixins/pageHandle'
import sendMailDetail from './sendMailDetail'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { FormItems, selectBtn, sendMailDetail },
  filters: {
    renderTime(date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
  },
  mixins: [pageHandle],
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '发件箱'
    }
  },
  data() {
    return {
      isShowAdd: false,
      isShowDetail: false,
      isShowDetailTitle: '',
      loading: false,
      itemsDatas: [
        { label: '标题', prop: 'ttl', type: 'input', message: '请输入', span: 15 }
      ],
      queryForm: { ttl: '' },
      multipleSelection: [],
      fileList: [],
      columns: [
        { type: 'index', label: '序号' },
        { label: '标题', prop: 'title' },
        { label: '发送时间', prop: 'sendTime', type: 'custom', minWidth: '100', slotName: 'sendTime' },
        { label: '操作', type: 'operation', fixed: 'right', width: '200px' }
      ],
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入短信标题', trigger: 'blur' }
        ]
      },
      paginationQuery1: { pageSize: 10, pageNumber: 1, total: 0, startRow: 0, endRow: 0 },
      tableData: [],
      selectRow: {}
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      this.search()
    }
  },
  methods: {
    search() {
      this.loading = true
      const params = {
        pageSize: this.paginationQuery1.pageSize,
        pageNumber: this.paginationQuery1.pageNumber,
        total: this.paginationQuery1.total,
        ttl: this.queryForm.ttl
      }
      outBox(params).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.tableData = res.data.result
          this.paginationQuery1 = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.total,
            startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
            endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
          }
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 查看详情
    viewDetail(row) {
      this.isShowDetail = true
      this.isShowDetailTitle = '信息：'
      this.selectRow = row
    },
    // 删除行
    deleteDetail(row) {
      this.$msgConfirm(`是否刪除站内信:【${row.title}】?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteInterMailBySender(row.rid).then(res => {
          if (res.code === 0) {
            this.loading = false
            this.$msgSuccess(this.message)
            this.search()
          }
        }).catch(() => {
          this.loading = false
        })
      })
    },
    showAdditem(value) {
      this.isShowAdd = true
    },
    deleteRow(row) {
      this.tableData.splice(row.rowIndex, 1)
    },
    changeSelection(val) {
      this.tableData = val
    },
    reset() {
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    pageChange(data) {
      this.paginationQuery.pageSize = data.pagination.pageSize
      this.paginationQuery.pageNumber = data.pagination.pageNum
      this.search()
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        // this.$refs.tableRef.reset()
      })
    },
    // 切换分页
    pageChange1(v) {
      this.paginationQuery1.pageSize = v.pagination.pageSize
      this.paginationQuery1.pageNumber = v.pagination.pageNum
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped>
.header-box{
  width: 100%;
  margin-bottom: 10px;
}
i{
  color: rgba(27, 109, 209,1);
}
</style>
