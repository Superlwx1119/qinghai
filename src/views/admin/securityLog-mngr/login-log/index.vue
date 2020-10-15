<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 登录日志 -->
  <div class="item3 item-role-per">
    <section class="layer">
      <div class="box">
        <div class="box-header">
          <span class="box-title">查询条件</span>
        </div>
        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="90px">
            <el-row :gutter="24" style="margin-right:0!important;margin-left:0!important;">
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="用户账号" prop="uact">
                  <el-input v-model="searchForm.uact" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>

              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="登录方向" prop="pwdChgType">
                  <el-select v-model="searchForm.pwdChgType" placeholder="请选择" style="width:100%" clearable>
                    <el-option
                      v-for="item in loginTypeList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="起止日期" required prop="daterange">
                  <el-date-picker
                    v-model="searchForm.daterange"
                    :unlink-panels="true"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:100%"
                    value-format="yyyy/MM/dd"
                  />
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
    <section class="layer role-perssion-list">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">查询结果</span>
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
            <el-table-column prop="uact" show-overflow-tooltip label="用户账号" align="center" width="180" />
            <el-table-column prop="userName" show-overflow-tooltip label="用户姓名" align="center" width="180" />
            <el-table-column prop="lginSuccFlag" label="登录成功标志" align="center" width="80">
              <template slot-scope="scope">
                {{ scope.row.lginSuccFlag|fliterlginSuccFlag }}
              </template>
            </el-table-column>
            <el-table-column prop="lginTime" label="登录时间" show-overflow-tooltip header-align="center" align="center" width="180">
              <template slot-scope="scope">
                {{ scope.row.lginTime|parseTime }}
              </template>
            </el-table-column>
            <el-table-column prop="loutTime" label="登出时间" show-overflow-tooltip header-align="center" align="center" width="180">
              <template slot-scope="scope">
                {{ scope.row.loutTime|parseTime }}
              </template>
            </el-table-column>
            <el-table-column prop="lginFailCnt" label="登录失败次数" header-align="center" align="center" width="80" />
            <el-table-column prop="lginAbnInfo" label="登录异常信息" show-overflow-tooltip header-align="center" align="center" />
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
  </div>
</template>
<script>
import ApiObj from '@/api/Admin/user-management'
import moment from 'moment'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'UserManagement',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    var validDate = (rule, value, callback) => {
      if (!value[0] || !value[1]) {
        callback(new Error('请选择起止日期'))
      } else {
        callback()
      }
    }
    return {
      disabledAll: true,
      dataObj: {
        isShow: false,
        isQuery: false,
        isModify: false,
        rows: {}
      },
      currentPage: 1,
      pageSize: 100,
      total: 0,
      startRow: 0,
      endRow: 0,
      searchForm: {
        uact: '',
        lginEndTime: '',
        lginStartTime: '',
        daterange: [moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format('YYYY/MM/DD hh:mm:ss'), moment(new Date()).format('YYYY/MM/DD hh:mm:ss')]
      },
      rules: {
        daterange: [{
          validator: validDate,
          trigger: 'blur'
        }]
      },
      tableData: [],
      tableLoading: false,
      loginTypeList: [{
        value: '1',
        name: '登录'
      }, {
        value: '2',
        name: '登出'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'publicCode'
    ])
  },
  watch: {},
  created() {
    this.getUserList()
  },
  mounted() {
  },
  methods: {
    // 获取查询信息列表
    getUserList() {
      this.searchForm.lginEndTime = this.searchForm.daterange[1]
      this.searchForm.lginStartTime = this.searchForm.daterange[0]
      const obj = Object.assign({}, this.searchForm)
      delete obj.daterange
      const params = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
        total: 0,
        ...obj
      }
      this.tableLoading = true
      ApiObj.loginPage(params).then(res => {
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
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.currentPage = 1
          this.pageSize = 100
          this.getUserList()
        }
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

<style lang="scss">
.item-role-per{
  height: 100%;
  .role-perssion-list{
       height: calc(100% - 176px);
     }
}

</style>
