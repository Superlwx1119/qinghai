<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 账号解锁查询 -->
  <div class="item2 user-lock">
    <section class="layer">
      <div class="box">
        <div class="box-header">
          <span class="box-title">查询条件</span>
        </div>
        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" label-width="90px">
            <el-row :gutter="24" style="margin-right:0!important;margin-left:0!important;">
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="用户账号" prop="uact">
                  <el-input v-model="searchForm.uact" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>

              <el-col :md="12" :lg="8" :xl="6" class="text-right right">
                <el-button @click="restSearch">重置</el-button>
                <el-button type="primary" @click="search">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
    <!-- 表格 -->
    <section class="layer" style="height:calc(100% - 114px)">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">用户列表</span>
          <div class="box-tools" />
        </div>
        <div class="box-body">
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            height="string"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%"
            border
            fit
          >
            <el-table-column label="序号" type="index" align="center" width="50" />
            <el-table-column prop="uact" show-overflow-tooltip label="用户账号" align="center" />
            <el-table-column prop="userName" show-overflow-tooltip label="姓名" align="center" />
            <el-table-column prop="certNO" show-overflow-tooltip label="证件号码" align="center" />
            <el-table-column prop="tel" label="办公电话" align="center" width="90" />
            <el-table-column prop="mob" label="手机号码" header-align="center" align="right" width="115" />
            <!-- <el-table-column prop="uactStas" label="账号状态" header-align="center" align="right" width="95" /> -->
            <el-table-column prop="medInc" label="组织机构名称" header-align="center" align="right" width="115" />
            <el-table-column prop="dscr" label="描述信息" align="center" width="200" />
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <el-button type="text" class="modify" @click.stop="unlock(scope.row)">解锁</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]"
            :page-size="pageSize"
            :total="total"
            layout="slot, prev, pager, next, sizes, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
            <template slot>
              <span class="el-pagination__total">{{ `总共${total}条 显示${startRow}-${endRow}条` }}</span>
            </template>
          </el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ApiObj from '@/api/Admin/user-management'
export default {
  name: 'UserManagement',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
      disabledAll: true,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      startRow: 0,
      endRow: 0,
      searchForm: {
        uact: '',
        userName: ''
      },
      tableData: [],
      tableLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserList()
  },
  mounted() {
  },
  methods: {
    unlock(row) {
      this.$confirm('确定要解锁' + row.uact + '?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = row.uact
        ApiObj.userUnlock(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
              <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取查询信息列表
    getUserList() {
      const params = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
        total: 0,
        ...this.searchForm
      }
      this.tableLoading = true
      ApiObj.userLock(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          if (res.data.recordCount) {
            this.total = res.data.recordCount
          }
          const num1 = this.pageSize * (this.currentPage - 1) + 1
          const num2 = this.pageSize * this.currentPage > this.total ? this.total : this.pageSize * this.currentPage
          this.startRow = num1
          this.endRow = num2
        }
        this.tableLoading = false
      }).catch(() => { this.tableLoading = false })
    },
    // 查询
    search() {
      this.currentPage = 1
      this.pageSize = 15
      this.getUserList()
    },

    //  重置
    restSearch() {
      this.$refs.searchForm.resetFields()
    },

    // 新增
    handleAdd() {
      this.dataObj.isShow = true
      this.dataObj.isModify = false
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-lock{
  /deep/.el-table{
    height:calc(100% - 32px)
  }
}
</style>
