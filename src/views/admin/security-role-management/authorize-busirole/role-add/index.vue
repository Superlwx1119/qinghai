<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:31:02
 * @LastEditTime: 2019-09-27 20:46:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user-add">
    <!-- 可管理业务角色 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dataObj.isShow"
      title="可管理业务角色"
      width="80%"
      @close="cancelDialog(0)"
    >
      <div class="scrollbar" style="padding-bottom:16px;">
        <el-scrollbar>
          <section class="layer">
            <div class="box">
              <div class="box-header">
                <span class="box-title">查询条件</span>
              </div>
              <div class="box-body">
                <el-form ref="searchForm" :model="searchForm" label-width="90px">
                  <el-row :gutter="24" style="margin-right:0!important;margin-left:0!important;">
                    <el-col :md="12" :lg="8" :xl="6">
                      <el-form-item label="角色名称" prop="uact">
                        <el-input v-model="searchForm.roleName" clearable placeholder="请输入" />
                      </el-form-item>
                    </el-col>
                    <el-col :md="12" :lg="8" :xl="6">
                      <el-form-item label="角色编码" prop="userName">
                        <el-input v-model="searchForm.roleCodg" clearable placeholder="请输入" />
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
          <section class="layer" style="height:calc(100% - 104px)">
            <div class="box">
              <div class="box-header">
                <span class="box-title">业务角色列表</span>
              </div>
              <div class="box-body">
                <el-table
                  v-loading="userTableLoading"
                  :data="userTableData"
                  height="string"
                  element-loading-spinner="el-loading1"
                  highlight-current-row
                  style="width: 100%;"
                  border
                  fit
                  @selection-change="handleSelectionChange"
                >
                  >
                  <el-table-column type="selection" align="center" width="55" />
                  <el-table-column label="序号" type="index" align="center" width="50" />
                  <el-table-column prop="roleCodg" show-overflow-tooltip label="角色名称" align="center" />
                  <el-table-column prop="roleName" show-overflow-tooltip label="角色编码" align="center" />
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
        </el-scrollbar></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="" @click="cancelDialog(0)">关闭</el-button>
        <el-button type="primary" @click="submitForm('searchForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ApiObj from '@/api/Admin/user-management'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'UserAdd',
  components: {

  },
  mixins: [],
  props: {
    dataObj: {
      type: Object,
      default: function() {
        return {

        }
      }
    }
  },
  data() {
    return {
      searchForm: {
        roleCodg: '',
        roleName: ''
      },
      currentPage: 1,
      pageSize: 15,
      total: 0,
      startRow: 0,
      endRow: 0,
      userTableData: [],
      userTableLoading: false,
      selectedList: []
    }
  },
  computed: {
    ...mapGetters([
      'securityRoleId'
    ])
  },
  watch: {},
  created() {
    this.$nextTick(() => {
      this.getUserList()
    })
  },
  mounted() {

  },
  methods: {
    addBusiRoles() {

    },
    getUserList() {
      const roleId = this.securityRoleId
      const params = {
        params: {
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
          total: this.total,
          ...this.searchForm
        },
        roleId: roleId
      }
      this.userTableLoading = true
      ApiObj.conditionBusiRoles(params).then(res => {
        if (res.code === 0) {
          this.userTableData = res.data.result
          this.total = res.data.recordCount
          const num1 = this.pageSize * (this.currentPage - 1) + 1
          const num2 = this.pageSize * this.currentPage > this.total ? this.total : this.pageSize * this.currentPage
          this.startRow = num1
          this.endRow = num2
        }
        this.userTableLoading = false
      }).catch(() => { this.userTableLoading = false })
    },
    //  新增保存
    submitForm(foconstame) {
      if (this.selectedList.length === 0) {
        this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">至少选择一条用户</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
        return
      }
      const params = this.selectedList
      params.forEach(item => {
        item.admrolId = this.securityRoleId
        item.admrolBizrolType = '1'
      })
      ApiObj.addBusiRoles(params).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            dangerouslyUseHTMLString: true,
            message: `<strong>操作成功</strong><p>${res.message}</p>`,
            duration: 1000
          })
          this.cancelDialog(1)
        } else {
          this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">${res.message}</div>`, {
            dangerouslyUseHTMLString: true, confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    search() {
      this.pageSize = 15
      this.currentPage = 1
      this.total = 0
      this.getUserList()
    },
    //  重置
    restSearch() {
      this.$refs.searchForm.resetFields()
    },
    handleSelectionChange(val) {
      this.selectedList = val
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
      this.total = 0
      this.getUserList()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.total = 0
      this.currentPage = val
      this.getUserList()
    },
    // 关闭
    cancelDialog(data) {
      this.$emit('cancelDialog', data)
    }
  }
}
</script>

<style scoped lang="scss">
.user-add {
  /deep/.el-checkbox-group {
    .el-checkbox+.el-checkbox{
      margin-left:0px;
    }
    /deep/.el-table{
      height: calc(100% - 62px);
    }
  }
}
</style>
