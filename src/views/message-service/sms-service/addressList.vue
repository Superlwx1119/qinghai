<!-- 搜索弹框 -->
<template>
  <normal-layer :search-number="1">
    <template slot="search-header">
      <FormItems :items-datas="itemsDatas" :is-grid="false" :form-datas="queryForm">
        <div>
          <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
        </div>
      </FormItems>
    </template>
    <template>
      <my-table-view v-loading="loading" height="300px" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
        <template slot="operation" slot-scope="scope">
          <my-button icon="detail" title="查看" @click="showDetail(scope.row)" />
        </template>
      </my-table-view>
      <Pagination :data="paginationQuery" @refresh="pageChange" />
    </template>
    <AddressListDetail v-model="isShowDetail" :addrbook-grp-no="addrbookGrpNo" :dialog-title="detailTitle" />
  </normal-layer>
</template>
<script>
import { getGrpByPage } from '@/api/MessageServer/index'
import AddressListDetail from './addressListDetail'
import FormItems from '@/views/components/PageLayers/form-items'
import pageHandle from '@/mixins/pageHandle'
export default {
  components: { FormItems, AddressListDetail },
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
      default: '短信接收人信息表'
    },
    selection: {
      type: Array,
      default: () => []
    },
    queCont: { // 查询内容（1：机构，2：药店）
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      itemsDatas: [
        { label: '搜索', prop: 'addrbookGrpName', type: 'input', message: '请输入', span: 12 }
      ],
      addrbookGrpNo: '',
      queryForm: {
        addrbookGrpName: '',
        content: ''
      },
      multipleSelection: [],
      fileList: [],
      columns: [
        { type: 'index', label: '序号' },
        { label: '个人通讯录组名称', prop: 'addrbookGrpName', width: '120px' },
        { label: '组内成员', prop: 'userNameList' },
        { label: '操作', type: 'operation', fixed: 'right', width: '100px' }
      ],
      detailTitle: '',
      isShowDetail: false,
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
        ],
        content: [
          { required: true, message: '请输入短信内容', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  computed: {
  },
  watch: {
    multipleSelection(val) {
      this.$emit('changeSelection', val)
    },
    selection(val) {
      this.multipleSelection = val
    }
  },
  created() {
  },

  methods: {
    showDetail(row) {
      this.addrbookGrpNo = row.addrbookGrpNo
      this.detailTitle = row.addrbookGrpName + ' 个人通讯录组'
      this.isShowDetail = true
    },
    handleAvatarSuccess() {
      this.closeDialog()
      this.$emit('search')
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
      const form = {
        ...this.paginationQuery,
        addrbookGrpName: this.queryForm.addrbookGrpName
      }
      this.loading = true
      getGrpByPage(form).then(res => {
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
      }).finally(() => { this.loading = false })
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
