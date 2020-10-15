<template>
  <div class="function-list">
    <!-- 功能 -->
    <section class="layer height100b">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">用户列表</span>
          <div class="box-tools">
            <el-button type="success" @click="addNewUser">新增</el-button>
          </div>
        </div>

        <div class="box-body" style="height:calc(100% - 67px)">
          <el-table
            v-loading="userTableLoading"
            :data="allList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            height="string"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%;height:100%;"
            border
            fit
            @current-change="handleCurrentChange"
          >
            <el-table-column type="selection" align="center" width="55" />
            <el-table-column label="序号" type="index" align="center" width="50" />
            <el-table-column prop="uact" show-overflow-tooltip label="用户账号" align="center" />
            <el-table-column prop="userName" show-overflow-tooltip label="姓名" align="center" />
            <el-table-column prop="uactStas" show-overflow-tooltip label="账号状态" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.uactStas"
                  active-value="1"
                  inactive-value="0"
                  disabled
                  @change="switchChange(scope.$index,scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column prop="dscr" show-overflow-tooltip label="描述" align="center" />
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
    <UserAdd v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" /></div>
</template>

<script>
import { organizManageUct } from '@/api/Admin/user-management'
import UserAdd from './user-add/index'
export default {
  name: 'ResourceManagement',
  components: {
    UserAdd
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
      radio: '',
      treeLoading: false,
      searchForm: {
        dscr: '',
        resuCodg: '',
        resuIcon: '',
        resuName: '',
        resuPath: '',
        subsysId: ''
      },
      currentPage: 1,
      pageSize: 15,
      total: 0,
      tableLoading: false,
      userTableData: [],
      userTableLoading: false,
      APITableLoading: false,
      APITableData: [],
      OrgId: '',
      allList: []
    }
  },
  computed: {
    startRow() {
      return this.allList.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1
    },
    endRow() {
      return this.currentPage * this.pageSize > this.allList.length ? this.allList.length : this.currentPage * this.pageSize
    }
  },
  watch: {

  },
  created() {
  },
  mounted() {

  },
  methods: {
    addNewUser() {
      const orgUserInfo = window.sessionStorage.getItem('org-user-info')
      if (orgUserInfo) {
        this.dataObj.isShow = true
      } else {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请选择机构或先完善机构新增</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    switchChange() {

    },
    resetTableData() {
      this.userTableData = []
    },
    // 获取功能列表
    getFunctionList(id) {
      this.OrgId = id
      organizManageUct(id).then(res => {
        this.userTableLoading = true
        if (res.code === 0) {
          this.allList = res.data
          this.total = res.data.length
          this.userTableLoading = false
        }
      })
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
    },
    cancelDialog(data) {
      this.dataObj.isShow = false
      if (data === 1) {
        this.getFunctionList(this.OrgId)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .height100b{
    height: 100%;
  }
  .height50b{
    height: 50%;
  }

</style>
