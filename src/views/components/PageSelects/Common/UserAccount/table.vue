<!-- table 表格 -->
<template>
  <div class="table-wrapper">
    <my-table-view
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      :columns="columns"
      stripe
      :multiple-selection.sync="multipleSelection"
    />
    <Pagination :data="paginationQuery" @refresh="pageChange" />
  </div>
</template>

<script>
import { listMedinsComt } from './request'
export default {
  props: {
    searchVal: {
      type: String,
      default: ''
    },
    queryParams: {
      type: Object,
      default: () => {}
    },
    isInputSearch: {
      type: Boolean,
      default: true
    },
    fixFlag: { // 定点标志（0：非定点，1：定点）
      type: String,
      default: ''
    },
    queCont: { // 查询内容（1：机构，2：药店）
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      selMedinsCodg: '',
      multipleSelection: [],
      columns: [
        { type: 'selection' },
        { type: 'index', label: '序号' },
        { prop: 'medinsCodg', label: '医疗机构编码' },
        { prop: 'medinsName', label: '医疗机构名称' },
        { prop: 'instisLvName', label: '医院级别' }
      ],
      paginationQuery: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      }
    }
  },
  methods: {
    iniSearch() {
      this.$set(this.paginationQuery, 'pageNum', 1)
      this.search()
    },
    search() {
      const params = {
        fixFlag: this.fixFlag,
        queCont: this.queCont,
        pageSize: this.paginationQuery.pageSize,
        pageNum: this.paginationQuery.pageNum
      }
      if (this.isInputSearch) {
        params.queCond = this.searchVal
      } else {
        for (const key in this.queryParams) {
          params[key] = this.queryParams[key]
        }
      }
      this.loading = true
      listMedinsComt(params).then(res => {
        this.loading = false
        if (res.data) {
          this.tableData = res.data.data
        } else {
          this.tableData = []
        }
        this.setPaginationQuery(res.data)
      }).catch(() => {
        this.loading = false
        this.tableData = []
      })
    },
    isSearching() {
      if (this.loading) {
        return true
      } else {
        return false
      }
    },
    setPaginationQuery(data) {
      this.$set(this.paginationQuery, 'total', data.recordCounts)
      this.$set(this.paginationQuery, 'startRow', data.startRow)
      this.$set(this.paginationQuery, 'endRow', data.endRow)
    },
    pageChange(data) {
      this.paginationQuery = data.pagination
      this.search()
    },
    submit() {
      if (this.multipleSelection.length <= 0) {
        this.$msgConfirm('请选择')
      } else {
        this.$emit('currentChange', [...this.multipleSelection])
      }
    },
    reset() {
      this.loading = false
      this.tableData = []
      this.multipleSelection = []
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper{
  height: 440px;
}
</style>
