<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 用户授权日志 -->
  <div class="item-tab">
    <section class="layer tab-layer">
      <!-- <div class="box">
        <div class="box-body"> -->
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="角色权限变更" name="first">
          <RolePermissionChange />
        </el-tab-pane>
        <el-tab-pane label="角色账号变更" name="second"><roleAccountChange /></el-tab-pane>
        <el-tab-pane label="组织机构变更" name="third"><OrganizationChange /></el-tab-pane>
        <el-tab-pane label="角色变更" name="fourth"><RoleChange /></el-tab-pane>
        <el-tab-pane label="资源变更" name="fifth"><ResourceChange /></el-tab-pane>
      </el-tabs>
      <!-- </div>

      </div> -->
    </section></div>
</template>
<script>
// import FillingAdd from './user-add/index'
import ApiObj from '@/api/Admin/user-management'
import RolePermissionChange from './role-permission-change/index'
import OrganizationChange from './organization-change/index'
import ResourceChange from './resource-change/index'
import roleAccountChange from './role-account-change/index'
import RoleChange from './role-change/index'
export default {
  name: 'UserManagement',
  components: {
    RoleChange,
    roleAccountChange,
    ResourceChange,
    OrganizationChange,
    RolePermissionChange
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
    // 请求角色id
    getAdminRoleId() {
      ApiObj.adminRoleId().then(res => {
      })
    },
    acitiveBeforeFact() {
      ApiObj.beforeFact({ menuCodg: 'ips-xtgl-yhgl' }).then(res => {
      })
    },
    details(row) {
      this.detilDataObj.isShow = true
      this.detilDataObj.row = Object.assign({}, row)
      this.detilDataObj.mnitId = row.mnitId
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
    del(row) {
      this.$confirm(`<div class="myalert-header">操作提醒</div><div class="myalert-content">确认删除？</div>`, {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleterow(row)
        })
        .catch(() => {

        })
    },
    // 删除
    deleterow(row) {
      // const params = {
      //   mnitId: row.mnitId
      // }
      // ApiObj.deleteItemMonitoringAdd(params).then(res => {
      //   if (res.data.code === 0) {
      //     this.getConditionList()
      //     this.$message({
      //       type: 'success',
      //       dangerouslyUseHTMLString: true,
      //       message: `<strong>操作成功</strong><p>${res.data.message}</p>`,
      //       duration: 1000
      //     })
      //   } else {
      //     this.$alert(`<div class="myalert-header">操作失败</div>
      //       <div class="myalert-content">${res.data.message}</div>`, {
      //       dangerouslyUseHTMLString: true, confirmButtonText: '确定',
      //       type: 'error'
      //     })
      //   }
      // })
    },
    // 修改
    modifyrow(row) {
      this.dataObj.isShow = true
      this.dataObj.isModify = true
      this.dataObj.mnitId = row.mnitId
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
    },
    // 关闭弹出框
    cancelDialog(data) {
      this.dataObj.isShow = false
      this.dataObj.isModify = false
      this.dataObj.mnitId = ''
      if (data === 1) {
        this.getUserList()
      }
      this.dataObj.rows = {}
    }
  }
}
</script>

<style lang="scss">
  .item-tab{
    height: 100%;
    .tab-layer{
      height: 100%;
      // .box-body{
      //   height: 100%;
        .el-tabs {
          height: 100%;
          .el-tabs__content{
            height: calc(100% - 43px);
            .el-tab-pane{
              height: 100%;
            }
          }
        }
      // }
    }
  }
</style>
