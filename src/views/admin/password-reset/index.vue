<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 密码重置 -->
  <normal-layer :search-number="itemsDatas.length" title-name="密码重置列表">
    <template slot="search-header">
      <FormItems ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm">
        <template slot="uactStas">
          <el-select v-model="queryForm.uactStas" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
        <div>
          <MyButton type="reset" @click="reset" />
          <MyButton type="search" @click="iniSearch" />
        </div>
      </FormItems>
    </template>
    <my-table-view v-loading="loading" :columns="columns" :data="tableData" :have-expand="false" :max-cloumns="100" :is-configheader="false" :multiple-selection.sync="multipleSelection">
      <template slot="uactStas" slot-scope="scope">
        {{ scope.row.uactStas | fliterUactStatus }}
      </template>
      <template slot="operation" slot-scope="scope">
        <MyButton icon="replace" title="重置密码" @click.stop="resetPassword(scope.row)" />
      </template>
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
    </my-table-view>
    <Pagination :data="pageInfo" @refresh="pageChange" />
  </normal-layer>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import { tableColumns } from './tableConfig'
import { getSixRandom } from '@/utils/index'
import ApiObj from '@/api/Admin/user-management'
// import CryptoJS from 'crypto-js'
import Crypto from '@/utils/mix-code'
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
    return {
      pickerOptionsmonthstart: {
        disabledDate: (time) => {
          if (this.queryForm.endRptMon !== '' && this.queryForm.endRptMon !== null) {
            return time.getTime() > new Date(this.queryForm.endRptMon).getTime()
          }
        }
      },
      pickerOptionsmonthend: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.queryForm.beginRptMon).getTime()
        }
      },
      dataObj: {
        isShow: false,
        isQuery: false,
        isModify: false,
        rows: {}
      },
      pageInfo: {
        pageNumber: 1,
        pageSize: 100,
        startRow: 0,
        endRow: 0,
        total: 0
      },
      queryForm: {
        uact: '',
        userName: '',
        certNO: '',
        uactStas: '',
        stdName: ''
      },
      itemsDatas: [
        { label: '用户账号', prop: 'uact', type: 'input' },
        { label: '姓名', prop: 'userName', type: 'input' },
        { label: '证件号码', prop: 'certNO', type: 'input' },
        { label: '账号状态', prop: 'uactStas', type: 'custom' },
        { label: '组织机构名称', prop: 'stdName', type: 'input' }
      ],
      columns: tableColumns,
      tableData: [],
      loading: false,
      options: [
        { label: '正常', value: '1' },
        { label: '已锁定', value: '2' },
        { label: '已停用', value: '3' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  watch: {},
  mounted() {
    this.iniSearch()
  },
  methods: {
    search() {
      this.getUserList()
    },
    // 获取查询信息列表
    getUserList() {
      const params = {
        pageNumber: this.pageInfo.pageNumber,
        pageSize: this.pageInfo.pageSize,
        total: 0,
        ...this.queryForm
      }
      this.loading = true
      ApiObj.page(params).then(res => {
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
    resetPassword(row) {
      this.$confirm(`<div class="myalert-header">操作提醒</div><div class="myalert-content">确认重置？</div>`, {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const pwd = getSixRandom() + '@abc'
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
        })
        .catch(() => {

        })
    },
    pageChange(data) {
      this.pageInfo.pageSize = data.pagination.pageSize
      this.pageInfo.pageNumber = data.pagination.pageNum
      this.search()
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
