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
      <my-table-view ref="myTable" v-loading="loading" height="300px" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData" @rowClick="rowClick">
        <template slot="operation" slot-scope="scope">
          <my-button icon="detail" title="查看" @click="showDetail(scope.row)" />
        </template>
      </my-table-view>
      <Pagination :data="paginationQuery" @refresh="pageChange" />
    </template>
    <AddressListDetail v-model="isShowDetail" :addrbook-grp-no="addrbookGrpNo" :addrbook-grp-name="addrbookGrpName" />
  </normal-layer>
</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import pageHandle from '@/mixins/pageHandle'
import AddressListDetail from './addressListDetail'
import { getGrpByPage } from '@/api/Mail'
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
      addrbookGrpNo: '',
      detailTitle: '',
      isShowDetail: false,
      loading: false,
      itemsDatas: [
        { label: '搜索', prop: 'addrbookGrpName', type: 'input', message: '请输入', span: 12 }
      ],
      queryForm: {
        addrbookGrpName: ''
      },
      multipleSelection: [],
      fileList: [],
      columns: [
        { type: 'selection' },
        { type: 'index', label: '序号' },
        { label: '个人通讯录组名', prop: 'addrbookGrpName' },
        { label: '组内成员', prop: 'userNameList' },
        { label: '操作', type: 'operation', fixed: 'right', width: '100px' }
      ],
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      },
      tableData: [
        { addrbookGrpName: '123123', userNameList: 'wrwefwf' }
      ]
    }
  },
  computed: {
  },
  watch: {
    multipleSelection(val) {
      this.$emit('changeSelection', val)
    },
    selection(val) {
      this.$refs.myTable.$refs['pf-table'].clearSelection()
      val.forEach(item => {
        this.$refs.myTable.$refs['pf-table'].toggleRowSelection(item)
      })
      this.multipleSelection = val
    }
  },
  created() {
    this.search()
  },

  methods: {
    showDetail(row) {
      console.log(row)
      this.addrbookGrpNo = row.addrbookGrpNo
      this.addrbookGrpName = row.addrbookGrpName
      this.isShowDetail = true
    },
    rowClick(row) {
      this.$refs.myTable.$refs['pf-table'].toggleRowSelection(row.row)
    },
    search() {
      const form = {
        ...this.paginationQuery,
        ...this.queryForm
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
          this.selectionRow()
        }
      }).finally(() => { this.loading = false })
    },
    selectionRow() {
      this.selection.forEach(item => {
        console.log(item)
        this.$refs.myTable.$refs['pf-table'].toggleRowSelection(item, true)
      })
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
