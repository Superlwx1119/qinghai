<template>
  <div class="resource-management">
    <!-- 业务角色管理 -->
    <section class="layer" style="height:100%;">
      <el-row :gutter="12" style="margin-right:0!important;margin-left:0!important">
        <el-col :span="9">
          <section class="layer">
            <div class="box">
              <div class="box-header handle">
                <span class="box-title">业务角色列表</span>
                <div class="box-tools">
                  <el-button type="success" @click="addNewList">新增</el-button>
                  <el-button type="danger" @click="deleteBusirRole">删除</el-button>
                </div>
              </div>
            </div>
          </section>
          <section class="layer" style="height:calc(100% - 62px)">
            <div class="box">
              <div class="box-header handle">
                <span class="box-title">选择业务角色</span>
                <div class="box-tools">
                  <el-form :inline="true">
                    <el-form-item prop="roleName">
                      <el-input v-model="roleName" clearable placeholder="请输入角色名称检索" />
                    </el-form-item>
                    <el-button type="primary" @click="searchBusiRole">查询</el-button>
                  </el-form>
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
                > <el-table-column align="center" width="50">
                    <template slot-scope="scope">
                      <el-radio v-model="radio" :label="scope.$index" class="textRadio" @change.native="getCurrentRow(scope.row,scope.$index)">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column label="序号" type="index" align="center" width="50" />
                  <el-table-column prop="roleCodg" show-overflow-tooltip label="编码" align="center" />
                  <el-table-column prop="roleName" show-overflow-tooltip label="角色名称" align="center" />
                </el-table>
                <el-pagination
                  :current-page="currentPage"
                  :page-sizes="[15, 30, 50, 100]"
                  :page-size="pageSize"
                  :total="total"
                  layout="slot, prev, pager, next"
                  @current-change="handleCurrentChange"
                >
                  <template slot>
                    <!-- 显示${startRow}-${endRow}条 -->
                    <span class="el-pagination__total">{{ `总共${total}条 ` }}</span>
                  </template>
                </el-pagination>
              </div>
            </div>
          </section>
        </el-col>
        <el-col :span="15">
          <!-- <div class="box handle-resoure">
            <div class="box-body height100b"> -->
          <el-tabs class="height100b" type="border-card">
            <el-tab-pane label="角色维护" class="height100b">
              <role-maintenance ref="roleMaintenance" class="height100b" />
            </el-tab-pane>
            <el-tab-pane label="资源授权" class="height100b"> <resource-authorize ref="resourceAuthorize" class="height100b" /></el-tab-pane>
          </el-tabs>
          <!-- </div>
          </div> -->
        </el-col>
      </el-row>
    </section>
    <AddDialog v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancel" />
  </div>
</template>

<script>
import ApiObj from '@/api/Admin/user-management'
import RoleMaintenance from './role-maintenance/index'
import ResourceAuthorize from './resource-authorize/index'
import AddDialog from './busirole-add/index'
export default {
  name: 'ResourceManagement',
  components: {
    RoleMaintenance,
    ResourceAuthorize,
    AddDialog
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      roleName: '',
      radio: '',
      tableData: [],
      tableLoading: false,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      startRow: 0,
      endRow: 0,
      dataObj: {
        isShow: false
      },
      selectRow: []
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getTableData()
  },
  mounted() {

  },
  methods: {
    deleteBusirRole() {
      console.log(this.selectRow, ';;;')
      if (this.selectRow.length === 0) {
        this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">请选择一个业务角色</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
        return
      }
      this.$confirm('此操作将删除角色【' + this.selectRow[0].roleName + '】, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = this.selectRow[0].bizRoleId
        ApiObj.busiRoleDelete(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.selectRow = []
            this.radio = ''
            this.getTableData()
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

      // ApiObj.busiRoleDelete()
    },
    getCurrentRow(row, index) {
      this.selectRow = [row]
      this.$refs.roleMaintenance.getRelationUser(row.bizRoleId)
      this.$refs.roleMaintenance.getBusiroleInfo(row.bizRoleId)
      this.$refs.resourceAuthorize.setCheckedNodes(row.bizRoleId)
    },
    // 获取表格数据
    getTableData() {
      const params = {
        total: this.total,
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
        roleName: this.roleName
      }
      this.tableLoading = true
      ApiObj.busiRolePage(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          this.total = res.data.recordCount
          const num1 = this.pageSize * (this.currentPage - 1) + 1
          const num2 = this.pageSize * this.currentPage > this.total ? this.total : this.pageSize * this.currentPage
          this.startRow = num1
          this.endRow = num2
          this.tableLoading = false
        }
      }).catch(err => err)
    },
    handleNodeClick(data) {
      if (data.id) {
        this.$refs.menuMaintenance.getMenuInfo(data.id)
        this.$refs.functionList.getFunctionList(data.id)
      }
    },
    // 查询
    searchBusiRole() {
      this.currentPage = 1
      this.getTableData()
    },
    // 重置
    restSearch() {
    },
    // 新增
    addNewList() {
      this.dataObj.isShow = true
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
    // 关闭弹出框
    cancel(data) {
      this.dataObj.isShow = false
      if (data) {
        this.getTableData()
      }
    }
  }
}
</script>
<style scoped lang="scss">
.resource-management {
  height: 100%;
  /deep/.el-table{
    height:calc(100% - 32px);
  }
  .layer {
    .el-row {
      height: 100%;
      .el-col {
        height: 100%;
        &:first-child{
          .box {
            height: 100%;
            .el-tree {
              height: 100%;
              overflow: auto;
              /deep/ .el-tree-node__content > .el-tree-node__label {
                width: 100%;
              }
            }
          }
        }

      }
    }
  }
      /deep/.el-tabs__content{
          height: calc(100% - 67px);
      }

  .height100b{
      height: 100%;
  }
}
</style>
