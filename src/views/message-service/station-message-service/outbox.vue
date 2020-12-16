<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="middle"
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
        <my-table-view v-loading="loading" height="400px" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <MyButton
              v-model="scope.row"
              icon="detail"
              title="详情"
              @click="viewDetail(scope.row)"
            />
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <select-btn v-model="isShowAdd" />
  </form-dialog>
</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
// eslint-disable-next-line no-unused-vars
import object from 'element-resize-detector/src/detection-strategy/object'
import { array } from 'jszip/lib/support'
import { offMsgD } from '@/api/MessageServer'
import selectBtn from './select'
import { page } from '@/api/MessageServer'
import pageHandle from '@/mixins/pageHandle'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { FormItems, selectBtn },
  mixins: [pageHandle],
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    daterow: {
      type: array,
      default: () => []
    },
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '发件箱'
    },
    fixFlag: {
      type: String,
      default: ''
    },
    queCont: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '标题', prop: 'ttl', type: 'input', message: '请输入', span: 15 }
      ],
      queryForm: { ttl: '' },
      multipleSelection: [],
      fileList: [],
      columns: [
        { type: 'index', label: '序号' },
        { label: '标题', prop: 'smsTtl' },
        { label: '发送时间', prop: 'sbmtTime' },
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
      tableData: []
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      console.log(newVal)
    }
  },
  created() {
    this.send()
  },
  mounted() {
  },
  methods: {
    send() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = {
            ...this.queryForm
          }
          offMsgD(params).then(res => console.log(res))
        }
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
    search() {
      const that = this
      const param = {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        ttl: that.queryForm.ttl
      }
      // eslint-disable-next-line no-undef
      page(param).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          const num1 = res.data.pageSize * (res.data.pageNumber - 1) + 1
          const num2 = res.data.pageSize * res.data.pageNumber > res.data.recordCount ? res.data.recordCount : res.data.pageSize * res.data.pageNumber
          this.paginationQuery = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.recordCount,
            startRow: num1,
            endRow: num2
          }
        }
      }
      )
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
