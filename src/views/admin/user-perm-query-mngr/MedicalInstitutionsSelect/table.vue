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
        <el-radio v-model="selUact" :label="scope.row.uact">{{ '' }}</el-radio>
      </template>
      <template slot="uactStas" slot-scope="scope">
        <el-switch
          v-model="scope.row.uactStas"
          disabled
          active-value="1"
          inactive-value="3"
          @change="switchChange(scope.$index,scope.row)"
        />
      </template>
    </my-table-view>
    <Pagination :data="pageInfo" @refresh="pageChange" />
  </div>
</template>

<script>
import { page } from '@/api/Admin/user-management'
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
    orguntId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      selUact: '',
      pageInfo: {
        pageSize: 10,
        pageNumber: 1,
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
        { prop: 'uact', label: '用户账号' },
        { prop: 'userName', label: '姓名' },
        { prop: 'certNO', label: '证件号码' },
        { prop: 'certNO', label: '办公电话' },
        { prop: 'certNO', label: '手机号码' },
        { prop: 'uactStas', label: '账号状态', type: 'custom', slotName: 'uactStas' },
        { prop: 'orgName', label: '组织机构' },
        { prop: 'dscr', label: '描述信息' }
      ]
      if (this.isInputSearch) {
        return baseArr
      } else {
        return [
          { type: 'custom', prop: 'select', slotName: 'select', label: '选择', width: '50px' },
          ...baseArr
        ]
      }
    }
  },
  methods: {
    iniSearch() {
      this.search()
    },
    search() {
      const params = {
        orguntId: this.queryParams.orguntId,
        pageSize: this.pageInfo.pageSize,
        pageNumber: this.pageInfo.pageNumber,
        total: this.pageInfo.total
      }
      if (this.isInputSearch) {
        params.fixmedinsInfo = this.searchVal
      } else {
        for (const key in this.queryParams) {
          params[key] = this.queryParams[key]
        }
      }
      this.loading = true
      page(params).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.tableData = res.data.result
          const num1 = res.data.pageSize * (res.data.pageNumber - 1) + 1
          const num2 = res.data.pageSize * res.data.pageNumber > res.data.total ? res.data.total : res.data.pageSize * res.data.pageNumber
          this.pageInfo = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.recordCount || 0,
            startRow: num1 || 0,
            endRow: num2 || 0
          }
        } else {
          this.tableData = []
        }
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
      this.pageInfo.pageSize = data.pagination.pageSize
      this.pageInfo.pageNumber = data.pagination.pageNum
      this.search()
    },
    handleCurrentChange({ row, column, cell }) {
      this.selUact = row.uact
      this.$emit('currentChange', row)
    },
    handleCurrentChangeSubmit(row) {
      this.selUact = row.uact
      this.$emit('currentChangeSubmit', row)
    },
    reset() {
      this.loading = false
      this.selUact = ''
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
