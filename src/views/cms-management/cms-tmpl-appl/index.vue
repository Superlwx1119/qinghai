<template>
  <!-- CMS模板审批 -->
  <div class="item2">
    <section class="layer">
      <div class="box">
        <div class="box-header">
          <span class="box-title">查询条件</span>
        </div>
        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" label-width="60px">
            <el-row :gutter="12">
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="模板标题" prop="teplTiele" class="clearmargin">
                  <el-input v-model="searchForm.tmplTitle" clearable placeholder="请输入" style="width:100%;" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6" class="right" style="text-align:right">
                <el-button @click="restSearch">重置</el-button>
                <el-button type="primary" @click="search">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
    <section class="layer">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">业务信息</span>
        </div>
        <div class="box-body">
          <el-table
            v-loading="table.loading"
            ref="infoTable"
            :data="table.tableData"
            height="tableHeight"
            element-loading-spinner="el-loading1"
            border
            fit
            highlight-current-row>
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column prop="title" align="center" show-overflow-tooltip label="模板标题" />
            <el-table-column prop="institutions" align="center" show-overflow-tooltip label="应用机构" width="210" />
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="经办人" width="140" />
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="审批人" width="140" />
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="审批意见" width="140"/>
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="审批时间" width="140"/>
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="审批结果" width="140"/>
            <el-table-column label="操作" width="140" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button type="text" class="modify" @click="detail(scope.row)">详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="table.pageNum"
            :page-sizes="[15, 30, 50, 100]"
            :page-size="table.pageSize"
            :total="table.total"
            layout="total, prev, pager, next, sizes, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CmsTmplAppl',
  components: {},
  data() {
    return {
      searchForm: {
        tmplTitle: ''
      },
      searchInfo: {},
      table: {
        tableData: [],
        pageNum: 1,
        pageSize: 15,
        total: 0,
        startRow: 0,
        endRow: 0,
        loading: false
      }
    }
  },
  created() {
    this.search()
  },
  methods: {
    // 查询
    search() {
      this.table.loading = true
      let params = this.searchForm
      this.searchInfo = Object.assign({}, params)
      this.table.pageNum = 1
      this.pageChange()
    },
    // 页码
    pageChange() {
      let params = this.searchInfo
      params.pageNum = this.table.pageNum
      params.pageSize = this.table.pageSize
      this.table.loading = false
    },
    // 分页导航
    handleSizeChange(size) {
      this.table.pageSize = size
      this.pageChange()
    },
    // 分页选择
    handleCurrentChange(currentPage) {
      this.table.pageNum = currentPage
      this.pageChange()
    },
    // 重置
    restSearch() {
      this.$refs['searchForm'].resetFields()
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
