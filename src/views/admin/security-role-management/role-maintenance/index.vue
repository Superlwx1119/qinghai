<template>
  <div class="menu-maintenance">
    <!-- 角色维护 -->
    <section class="layer">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">角色维护</span>
          <div class="box-tools">
            <el-button @click="restSearch">重置</el-button>
            <el-button type="success" @click="saveRoleInfo">保存</el-button>
          </div>
        </div>

        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="80px">
            <el-row :gutter="12">
              <el-col :span="24">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input v-model="searchForm.roleName" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="24">
                <el-form-item label="描述信息" prop="desc">
                  <el-input v-model="searchForm.dscr" :rows="5" resize="none" clearable placeholder="请输入" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
    <!-- 表格 -->
    <section class="layer" style="height:calc(100% - 243px);">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">管理员列表</span>
          <div class="box-tools">
            <el-button type="success" @click="addNewUser">新增</el-button>
            <el-button type="danger" @click="delUser">删除</el-button>
          </div>
        </div>
        <div class="box-body">
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            height="string"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%;"
            border
            fit
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="50" />
            <el-table-column label="序号" type="index" align="center" width="50" />
            <el-table-column prop="uact" show-overflow-tooltip label="用户账号" align="center" />
            <el-table-column prop="userName" show-overflow-tooltip label="姓名" align="center" />
            <el-table-column prop="uactStas" show-overflow-tooltip label="账号状态" align="center">
              <template slot-scope="scope">
                <!-- {{ scope.row.uactStas==="1"?'启用':'禁用' }} -->

                <el-switch
                  v-model="scope.row.uactStas"
                  disabled
                  active-value="1"
                  inactive-value="3"
                  @change="switchChange(scope.$index,scope.row)"
                />

              </template>
            </el-table-column>
            <el-table-column prop="dscr" label="描述信息" align="center" width="400" />
          </el-table>
        </div>
      </div>
    </section>
    <SecurityUser v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </div>
</template>

<script>
import { securityRoleUsersDel, saveSecRole, secRole, updateSecRole } from '@/api/Admin/user-management'
import SecurityUser from './user-add/index'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'ResourceManagement',
  components: {
    SecurityUser
  },
  mixins: [

  ],
  props: {
  },
  data() {
    return {
      dataObj: {
        isShow: false
      },
      treeLoading: false,
      searchForm: {
        dscr: '',
        roleName: ''
      },
      currentPage: 1,
      pageSize: 15,
      total: 0,
      startRow: 0,
      endRow: 0,
      tableLoading: false,
      tableData: [],
      rules: {
        roleName: [{
          required: true, message: '请输入角色名称', trigger: 'blur'
        }]
      },
      // roleId: window.sessionStorage.getItem('securityRoleId'),
      nodeInfo: {},
      selectedList: [],
      selectedListArr: []
    }
  },
  computed: {
    ...mapGetters([
      'securityRoleId'
    ])
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 选择关联用户
    handleSelectionChange(val) {
      if (this.securityRoleId) {
        this.selectedList = val
        this.selectedListArr = this.selectedList.map(item => {
          return {

            roleId: this.securityRoleId,
            roleName: this.searchForm.roleName,
            roleType: '1',
            ...item
          }
        })
      } else {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请选择一个安全角色</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    // 删除用户
    delUser() {
      if (this.selectedListArr.length === 0) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请至少选择一条用户</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$confirm(`此操作将永久删除角色【${this.searchForm.roleName}】下的${this.selectedList[0].uact}等账号, 是否继续?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = this.selectedListArr.map(item => {
          item.roleId = this.securityRoleId
          return item
        })
        securityRoleUsersDel(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.getRoleInfoList(this.securityRoleId + '/users')
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
    // 新增关联用户
    addNewUser() {
      if (!this.securityRoleId) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请选择一个安全角色</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
        return
      }
      this.dataObj.isShow = true
      this.dataObj.roleId = this.roleId
      this.dataObj.searchForm = this.searchForm
    },
    // 获取节点参数
    getTreeNodeData(data) {
      this.nodeInfo = data
      console.log(this.nodeInfo, 'nodeInfo')
    },
    // 新增清空数据
    clearData() {
      this.searchForm.roleName = '新增安全角色'
      this.searchForm.dscr = ''
      this.tableData = []
    },
    // 保存角色信息
    saveRoleInfo() {
      if (!this.securityRoleId) {
        const params = {
          admrolId: '',
          admrolType: '1',
          lv: this.nodeInfo.level - 1,
          prntPath: '/',
          prntRoleId: this.nodeInfo.data.id,
          roleName: this.searchForm.roleName,
          dscr: this.searchForm.dscr
        }
        saveSecRole(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.searchForm = res.data
            this.$emit('reloadNode')
            this.$emit('clearAdding')
            this.$store.commit('CHANGE_SECURITYROLEID', res.data.admrolId)
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      } else {
        const params = {
          admrolId: this.securityRoleId,
          admrolType: '1',
          lv: this.nodeInfo.level - 1,
          prntPath: '/',
          prntRoleId: this.nodeInfo.data.parentId,
          roleName: this.searchForm.roleName,
          dscr: this.searchForm.dscr
        }
        updateSecRole(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.searchForm = res.data
            this.$emit('reloadNode')
            this.$emit('clearAdding')
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      }
    },
    // 获取角色详情
    getRoleInfo(id) {
      if (id) {
        secRole(id).then(res => {
          if (res.code === 0) {
            this.searchForm = res.data
          }
        })
      } else {
        this.searchForm.dscr = ''
        this.searchForm.roleName = '新增安全角色'
      }
    },
    // 获取角色列表
    getRoleInfoList(id) {
      this.tableLoading = true
      secRole(id).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
          this.total = res.data.recordCount
          const num1 = this.pageSize * (this.currentPage - 1) + 1
          const num2 = this.pageSize * this.currentPage > res.data.total ? res.data.total : this.pageSize * this.currentPage
          this.startRow = num1
          this.endRow = num2
          this.tableLoading = false
        }
      })
    },
    changeIcon(icon) {
      this.searchForm.resuIcon = icon
    },
    cancelDialog() {
      this.dataObj.isShow = false
      this.getRoleInfoList(this.securityRoleId + '/users')
    },
    restSearch() {
      this.$refs.searchForm.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
  .height100b{
    height: 100%;
  }

  .menu-maintenance{
    /deep/.el-icon-popper {
    max-height: 400px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    }
    /deep/.el-table{
      height: 100%;
    }
    /deep/.el-input-group__prepend{
      span{
        display: inline-block;
        width:40px;
        height: 100%;
        cursor: pointer;
        text-align: center;
        i{
          display: inline-block;
          width:100%;
          height: 100%;
        }
      }
    }
  }

</style>
