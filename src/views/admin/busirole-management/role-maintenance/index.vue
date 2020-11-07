<template>
  <div class="busirole-maintenance">
    <!-- 业务角色维护 -->
    <section class="layer" style="height:42%;">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">角色维护</span>
          <div class="box-tools">
            <el-button @click="restSearch">重置</el-button>
            <el-button type="primary" @click="saveBusiroleInfo">保存</el-button>
          </div>
        </div>

        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="80px">
            <el-row :gutter="12">
              <el-col :md="12" :lg="8" :xl="8">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input v-model="searchForm.roleName" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="8">
                <el-form-item label="角色编码" prop="roleCodg">
                  <el-input v-model="searchForm.roleCodg" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="24">
                <el-form-item label="说明" prop="dscr">
                  <el-input v-model="searchForm.dscr" :rows="5" resize="none" clearable placeholder="请输入" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
    <section class="layer" style="height:calc(58% - 12px)">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">角色下账户列表</span>
          <div class="box-tools">
            <el-form :inline="true" :model="searchFormQuery" class="demo-form-inline">
              <!-- <el-form-item>
                <el-input
                  v-model="searchFormQuery.filterText"
                  placeholder="输入用户账号进行过滤"
                  suffix-icon="el-icon-search"/>
              </el-form-item> -->
              <el-form-item>
                <el-button type="success" @click="addNewUser">新增</el-button>
                <el-button type="danger" @click="delUser">删除</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="box-body">
          <el-table
            v-loading="roleUserTableLoading"
            :data="roleUserTableData"
            height="string"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%;"
            border
            fit
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            />
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
            <el-table-column prop="dscr" show-overflow-tooltip label="描述信息" align="center" />
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
    <BusiroleUserAdd v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </div>
</template>

<script>
import { delBusiroleUsers, busiroleUpdate, busiRoleUser, busiRole } from '@/api/Admin/user-management'
import BusiroleUserAdd from './user-add/index'
export default {
  name: 'BusiroleManage',
  components: {
    BusiroleUserAdd
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      // 子系统列表
      dataObj: {
        isShow: false
      },
      treeLoading: false,
      searchForm: {
        dscr: '',
        roleCodg: '',
        roleName: ''
      },
      searchFormQuery: {
        filterText: ''
      },
      rules: {
        roleCodg: [{ required: true, message: '请输入角色编号', trigger: 'blur' }],
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      currentPage: 1,
      pageSize: 15,
      total: 0,
      startRow: 0,
      endRow: 0,
      roleUserTableData: [],
      roleUserTableLoading: false,
      roleId: '',
      selectedList: [],
      selectedListArr: []
    }
  },
  computed: {

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
      this.selectedList = val
      this.selectedListArr = this.selectedList.map(item => {
        return {
          ...item,
          roleId: this.roleId,
          roleName: this.searchForm.roleName,
          roleType: '2'
        }
      })
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
        const params = this.selectedListArr
        delBusiroleUsers(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.getRelationUser(this.roleId)
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
      if (!this.roleId) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请选择一个业务角色</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
        return
      }
      this.dataObj.isShow = true
      this.dataObj.searchForm = this.searchForm
    },
    // 保存业务角色信息
    saveBusiroleInfo() {
      if (!this.searchForm.bizRoleId) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请选择一个业务角色</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
        return
      }
      const params = {
        ...this.searchForm
      }
      busiroleUpdate(params).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            dangerouslyUseHTMLString: true,
            message: `<strong>操作成功</strong><p>${res.message}</p>`,
            duration: 1000
          })
          this.searchForm = res.data
        } else {
          this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">${res.message}</div>`, {
            dangerouslyUseHTMLString: true, confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    // 获取业务角色详情
    getBusiroleInfo(id) {
      this.$nextTick(() => {
        this.roleId = id
        this.dataObj.roleId = id
        busiRole(id).then(res => {
          if (res.code === 0) {
            this.searchForm = res.data
          }
        })
      })
    },
    // 获取关联账户列表
    getRelationUser(id) {
      this.roleUserTableLoading = true
      const data = {
        pageSize: this.pageSize,
        total: this.total,
        pageNumber: this.currentPage
      }
      busiRoleUser(id, data).then(res => {
        if (res.code === 0) {
          this.roleUserTableData = res.data.result
          this.total = res.data.recordCount
          const num1 = this.pageSize * (this.currentPage - 1) + 1
          const num2 = this.pageSize * this.currentPage > res.data.total ? res.data.total : this.pageSize * this.currentPage
          this.startRow = num1
          this.endRow = num2
          this.roleUserTableLoading = false
        }
      })
    },
    changeIcon(icon) {
      this.searchForm.resuIcon = icon
    },
    // 查询
    search() {
      this.getTableData(this.kpiFcode)
    },
    // 重置
    restSearch() {
      this.searchForm.kpiName = ''
      this.searchForm.inptTime = ''
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
      // this.getUserList()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      // this.getUserList()
    },
    cancelDialog() {
      this.dataObj.isShow = false
      this.getRelationUser(this.roleId)
    }
  }
}
</script>

<style scoped lang="scss">
  .height100b{
    height: 100%;
  }
  .busirole-maintenance{
    /deep/.el-icon-popper {
    max-height: 400px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: hidden;
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
