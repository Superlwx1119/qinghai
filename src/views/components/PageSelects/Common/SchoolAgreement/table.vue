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
    >
      <template slot="select" slot-scope="scope">
        <el-radio v-model="selMedinsCodg" :label="scope.row.empMgtcode">{{ '' }}</el-radio>
      </template>
    </my-table-view>
    <Pagination :data="paginationQuery" @refresh="pageChange" />
  </div>
</template>

<script>
import { listCorpInfo } from './request'
export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
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
      },
      columns: [
        { type: 'custom', prop: 'select', slotName: 'select', label: '选择' },
        { label: '协议学校编码', prop: 'empMgtcode' },
        { label: '协议学校名称', prop: 'empName' },
        { label: '协议生效时间', prop: 'cntrBegntime' },
        { label: '协议失效时间', prop: 'cntrEndtime' }
      ]
    }
  },
  computed: {
  },
  methods: {
    iniSearch() {
      this.$set(this.paginationQuery, 'pageNum', 1)
      this.search()
    },
    search() {
      const params = {
        empMgtcode: this.queryParams.empMgtcode,
        empName: this.queryParams.empName,
        pageSize: this.paginationQuery.pageSize,
        pageNum: this.paginationQuery.pageNum
      }
      this.loading = true
      listCorpInfo(params).then(res => {
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
      this.selMedinsCodg = row.empMgtcode
      this.$emit('currentChange', row)
    },
    reset() {
      this.loading = false
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
