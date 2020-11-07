<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 系统安全日志 -->
  <div class="item-tab">
    <!-- <section class="layer tab-layer">
      <div class="box">
        <div class="box-body"> -->
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="账号锁定日志" name="first">
        <accountLockLog />
      </el-tab-pane>
      <el-tab-pane label="账号变更日志" name="second"><accountChangeLog /></el-tab-pane>
      <el-tab-pane label="密码变更日志" name="third"><pwdChangeLog /></el-tab-pane>
      <el-tab-pane label="登录日志" name="fourth"><loginLog /></el-tab-pane>
    </el-tabs>
  </div>
  <!-- </div>
    </section></div> -->
</template>
<script>
import ApiObj from '@/api/Admin/user-management'
import accountLockLog from './account-lock-log/index'
import pwdChangeLog from './pwd-change-log/index'
import accountChangeLog from './account-change-log/index'
import loginLog from './login-log/index'
export default {
  name: 'UserManagement',
  components: {
    loginLog,
    accountLockLog,
    pwdChangeLog,
    accountChangeLog
  },
  mixins: [],
  props: {},
  data() {
    return {
      activeName: 'first',
      pickerOptionsmonthstart: {
        disabledDate: (time) => {
          if (this.searchForm.endRptMon !== '' && this.searchForm.endRptMon !== null) {
            return time.getTime() > new Date(this.searchForm.endRptMon).getTime()
          }
        }
      },
      pickerOptionsmonthend: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.searchForm.beginRptMon).getTime()
        }
      },
      disabledAll: true,
      dataObj: {
        isShow: false,
        isQuery: false,
        isModify: false,
        rows: {}
      },
      currentPage: 1,
      pageSize: 15,
      total: 0,
      startRow: 0,
      endRow: 0,
      searchForm: {
        uact: '',
        userName: '',
        certNO: '',
        uactStas: '',
        stdName: ''
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
    handleClick(tab, event) {
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
      ApiObj.page(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          this.total = res.data.recordCount
          const num1 = this.pageSize * (this.currentPage - 1) + 1
          const num2 = this.pageSize * this.currentPage > res.data.total ? res.data.total : this.pageSize * this.currentPage
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

<style lang="scss">
  .item-tab{
    height: 100%;
        .el-tabs {
          height: 100%;
          .el-tabs__content{
            height: calc(100% - 43px);
            .el-tab-pane{
              height: 100%;
            }
          }
        }
  }
</style>
