<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 密码重置 -->
  <div class="item5 password-reset">
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
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="姓名" prop="userName">
                  <el-input v-model="searchForm.userName" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="证件号码" prop="certNO">
                  <el-input v-model="searchForm.certNO" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="账号状态" prop="uactStas">
                  <el-input v-model="searchForm.uactStas" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="组织机构名称" prop="stdName">
                  <el-input v-model="searchForm.stdName" clearable placeholder="请输入" />
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
    <section class="layer" style="height:calc(100% - 162px)">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">用户列表</span>
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
            <el-table-column prop="tel" label="办公电话" align="center" show-overflow-tooltip width="115" />
            <el-table-column prop="mob" label="手机号码" header-align="center" align="right" show-overflow-tooltip width="115" />
            <el-table-column prop="uactStas" show-overflow-tooltip label="账号状态" align="center">
              <template slot-scope="scope">
                <!-- {{ scope.row.uactStas==="1"?'启用':'禁用' }} -->
                <el-switch
                  v-model="scope.row.uactStas"
                  active-value="1"
                  disabled
                  inactive-value="3"
                  @change="switchChange(scope.$index,scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column prop="medInc" label="组织机构名称" header-align="center" align="right" width="115" />
            <el-table-column prop="dscr" label="描述信息" align="center" width="200" />
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <el-button type="text" class="modify" @click.stop="resetPassword(scope.row)">重置</el-button>
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
    <!-- 新增 -->
    <filling-add v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </div>
</template>
<script>
import {
  getSixRandom
} from '@/utils/index'
import FillingAdd from './user-add/index'
import ApiObj from '@/api/Admin/user-management'
// import CryptoJS from 'crypto-js'
import Crypto from '@/utils/mix-code'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'UserManagement',
  components: {
    'filling-add': FillingAdd
  },
  mixins: [],
  props: {},
  data() {
    return {
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
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  watch: {},
  created() {
    this.getUserList()
  },
  mounted() {
  },
  methods: {
    // 请求角色id
    getAdminRoleId() {
      ApiObj.adminRoleId().then(res => {
      })
    },
    acitiveBeforeFact() {
      ApiObj.beforeFact({ menuCodg: 'ips-xtgl-yhgl' }).then(res => {
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
    resetPassword(row) {
      this.$confirm(`<div class="myalert-header">操作提醒</div><div class="myalert-content">确认重置？</div>`, {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.reset(row)
        })
        .catch(() => {

        })
    },
    // 重置
    reset(row) {
      const pwd = getSixRandom() + '@abc'
      // let pwdUtf = CryptoJS.enc.Utf8.parse(pwd)
      // let pwdBase64 = CryptoJS.enc.Base64.stringify(pwdUtf)
      this.$store.dispatch('user/GET_TOKEN').then(res => {
        const PwdParams = {
          uactId: row.uactId,
          pwd: pwd
        }
        const params = Crypto.encrypt(JSON.stringify(PwdParams), this.token)
        ApiObj.resetPassword(params).then(res => {
          if (res.code === 0) {
            this.getUserList()
            this.$alert(`<strong>操作成功</strong><p>账号${row.userName}的密码已被重置为${pwd}</p>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'success'
            })
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      })
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

<style lang="scss" scoped>
  .password-reset{
    /deep/.el-table{
      height: calc(100% - 32px);
    }
  }
</style>
