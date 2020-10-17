<!-- table 表格 -->
<template>
  <div class="table-wrapper">
    <my-table-view
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      :columns="columns"
      stripe
      @rowClick="handleCurrentChange"
      @row-dblclick="handleCurrentChangeSubmit"
    >
      <template slot="select" slot-scope="scope">
        <el-radio v-model="selMedinsCodg" :label="scope.row.medinsCodg">{{ '' }}</el-radio>
      </template>
      <template v-if="queryParams" slot="outFlag">
        {{ queryParams.outFlag === '1' ? '省内异地' : queryParams.outFlag === '2' ? '跨省异地' : '本地' }}
      </template>
    </my-table-view>
    <Pagination :data="paginationQuery" @refresh="pageChange" />
  </div>
</template>

<script>
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
      loading: false,
      tableData: [],
      selMedinsCodg: '',
      paginationQuery: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      }
    }
  },
  computed: {
    columns() {
      const baseArr = [
        { type: 'index', label: '序号' },
        { prop: 'medinsCodg', label: '医疗机构编码' },
        { prop: 'medinsName', label: '医疗机构名称' }
      ]
      if (this.queCont !== '2') {
        baseArr.push({ prop: 'instisLvName', label: '医院级别' })
      }
      if (this.isInputSearch) {
        return baseArr
      } else {
        return [
          { type: 'custom', prop: 'select', slotName: 'select', label: '选择', width: '50px' },
          ...baseArr,
          { prop: 'outFlag', label: '异地标志', type: 'custom', slotName: 'outFlag' }
        ]
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
    handleCurrentChange({ row, column, cell }) {
      this.selMedinsCodg = row.medinsCodg
      this.$emit('currentChange', row)
    },
    handleCurrentChangeSubmit(row) {
      this.selMedinsCodg = row.medinsCodg
      this.$emit('currentChangeSubmit', row)
    },
    reset() {
      this.loading = false
      this.selMedinsCodg = ''
      this.tableData = []
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper{
  height: 440px;
}
</style>
