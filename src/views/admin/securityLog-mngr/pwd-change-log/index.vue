<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 密码变更日志 -->
  <div class="item3 item-role-per">
    <normal-layer :search-number="itemsDatas.length">
      <template slot="search-header">
        <FormItems ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm" :rules="rules">
          <template slot="pwdChgType">
            <el-select v-model="queryForm.pwdChgType" placeholder="请选择" style="width:100%" clearable>
              <el-option
                v-for="item in pwdChgTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </template>
          <template slot="daterange">
            <el-date-picker
              v-model="queryForm.daterange"
              :unlink-panels="true"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%"
              value-format="yyyy/MM/dd"
            />
          </template>
          <div>
            <MyButton type="reset" @click="reset" />
            <MyButton type="search" @click="iniSearch" />
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header">
        <span class="box-title">子系统列表</span>
      </div>
      <template>
        <my-table-view v-loading="loading" :columns="columns" :data="tableData" :have-expand="false" :max-cloumns="100" :is-configheader="false" :multiple-selection.sync="multipleSelection">
          <template slot="qqqq" slot-scope="scope">
            {{ scope.row.chgType|fliterchgType }}
          </template>
        </my-table-view>
        <Pagination :data="pageInfo" @refresh="pageChange" />
      </template>
    </normal-layer>
    <!-- <section class="layer">
      <div class="box">
        <div class="box-header">
          <span class="box-title">查询条件</span>
        </div>
        <div class="box-body">
          <el-form ref="queryForm" :model="queryForm" :rules="rules" label-width="90px">
            <el-row :gutter="24" style="margin-right:0!important;margin-left:0!important;">
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="用户账号" prop="uact">
                  <el-input v-model="queryForm.uact" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>

              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="密码变更类型" prop="pwdChgType">
                  <el-select v-model="queryForm.pwdChgType" placeholder="请选择" style="width:100%" clearable>
                    <el-option
                      v-for="item in pwdChgTypeList"
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
                    v-model="queryForm.daterange"
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
    <section class="layer role-perssion-list">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">查询结果</span>
          <div class="box-tools">
          </div>
        </div>
        <div class="box-body">
          <el-table
            v-loading="loading"
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
            <el-table-column prop="pwdChgType" label="密码变更类型" align="center">
              <template slot-scope="scope">
                {{ scope.row.pwdChgType|fliterPwdChg }}
              </template>
            </el-table-column>
            <el-table-column prop="opterName" label="经办人" header-align="center" align="center" />
            <el-table-column prop="optTime" label="经办时间" header-align="center" align="center">
              <template slot-scope="scope">
                {{ scope.row.optTime|parseTime }}
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
    </section> -->
    <!-- 新增 -->
  </div>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import { tableColumns } from './tableConfig'
import ApiObj from '@/api/Admin/user-management'
import moment from 'moment'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'UserManagement',
  components: {
    NormalLayer,
    FormItems
  },
  mixins: [pageHandle],
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
      pageInfo: {
        pageNumber: 1,
        pageSize: 15,
        startRow: 0,
        endRow: 0,
        total: 0
      },
      queryForm: {
        pwdChgType: '',
        uact: '',
        optEndTime: '',
        optBeginTime: '',
        daterange: [moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format('YYYY/MM/DD hh:mm:ss'), moment(new Date()).format('YYYY/MM/DD hh:mm:ss')]
      },
      itemsDatas: [
        { label: '用户账号', prop: 'uact', type: 'input' },
        { label: '密码变更类型', prop: 'pwdChgType', type: 'custom' },
        { label: '起止日期', prop: 'daterange', type: 'custom' }
      ],
      rules: {
        daterange: [{
          validator: validDate,
          trigger: 'blur'
        }]
      },
      tableData: [],
      loading: false,
      pwdChgTypeList: [],
      columns: tableColumns
    }
  },
  computed: {
    ...mapGetters([
      'publicCode'
    ])
  },
  watch: {},
  created() {
  },
  mounted() {
    this.iniSearch()
    this.pwdChgTypeList = this.publicCode.codes.PWD_CHG_TYPE
  },
  methods: {
    search() {
      this.getUserList()
    },
    // 获取查询信息列表
    getUserList() {
      this.queryForm.optEndTime = this.queryForm.daterange[1]
      this.queryForm.optBeginTime = this.queryForm.daterange[0]
      const obj = Object.assign({}, this.queryForm)
      delete obj.daterange
      const params = {
        pageNumber: this.pageInfo.pageNumber,
        pageSize: this.pageInfo.pageSize,
        total: 0,
        ...obj
      }
      this.loading = true
      ApiObj.pwdChgPage(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          const num1 = res.data.pageSize * (res.data.pageNumber - 1) + 1
          const num2 = res.data.pageSize * res.data.pageNumber > res.data.total ? res.data.total : res.data.pageSize * res.data.pageNumber
          this.pageInfo = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.recordCount || 0,
            startRow: num1 || 0,
            endRow: num2 || 0
          }
        }
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    pageChange(data) {
      this.pageInfo.pageSize = data.pagination.pageSize
      this.pageInfo.pageNumber = data.pagination.pageNum
      this.search()
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
