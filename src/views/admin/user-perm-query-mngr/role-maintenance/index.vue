<template>
  <div class="busirole-maintenance height100b">
    <!-- 业务角色维护 -->
    <section class="layer ">
      <div class="box ">
        <div class="box-body ">
          <el-table
            v-loading="roleUserTableLoading"
            :data="roleUserTableData"
            height="String"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%"
            class="height100b"
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
            class="height100b"
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
import { delBusiroleUsers, busiroleUpdate, busiRoleUser, busiRole } from '@/api/Admin/user-management'
export default {
  name: 'BusiroleManage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
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
          const num2 = this.pageSize * this.currentPage > this.total ? this.total : this.pageSize * this.currentPage
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
</style>
