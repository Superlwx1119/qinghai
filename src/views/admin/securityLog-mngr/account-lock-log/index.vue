<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 账号锁定日志 -->
  <normal-layer :search-number="itemsDatas.length" title-name="账号锁定日志列表" title-need-handle>
    <template slot="search-header">
      <FormItems ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm" :rules="rules">
        <template slot="uactStas">
          <el-select v-model="queryForm.uactStas" placeholder="请选择" style="width:100%" clearable>
            <el-option
              v-for="item in uactStatusList"
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
    <template slot="title-btns">
      <el-dropdown @command="exportLocalData">
        <my-button type="primary">
          导出
          <i
            class="el-icon-arrow-down el-icon--right"
          />
        </my-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="select">导出选中</el-dropdown-item>
          <el-dropdown-item command="current">导出当页</el-dropdown-item>
          <el-dropdown-item command="all">导出全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <my-table-view v-loading="loading" :columns="columns" :data="tableData" :have-expand="false" :max-cloumns="100" :is-configheader="false" :multiple-selection.sync="multipleSelection">
      <template slot="uactStas" slot-scope="scope">
        {{ scope.row.uactStas|fliterUactStatus }}
      </template>
      <template slot="optTime" slot-scope="scope">
        {{ scope.row.optTime|parseTime }}
      </template>
    </my-table-view>
    <Pagination :data="pageInfo" @refresh="pageChange" />
  </normal-layer>
</template>
<script>
import { deepClone } from '@/utils/index'
import pageHandle from '@/mixins/pageHandle'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import { tableColumns } from './tableConfig'
import ApiObj from '@/api/Admin/user-management'
import moment from 'moment'
import { excel } from '@/api/Admin/user-management'
import { parseTime } from '@/filters/index'
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
        roleName: '',
        resuName: '',
        chgType: '',
        optEndTime: '',
        optBeginTime: '',
        daterange: [moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format('YYYY/MM/DD hh:mm:ss'), moment(new Date()).format('YYYY/MM/DD hh:mm:ss')]
      },
      itemsDatas: [
        { label: '用户账号', prop: 'uact', type: 'input' },
        { label: '用户姓名', prop: 'userName', type: 'input' },
        { label: '账号状态', prop: 'uactStas', type: 'custom' },
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
      uactStatusList: [],
      columns: tableColumns,
      columnsLabel: ['用户账号', '用户姓名', '账号状态', '锁定操作人', '锁定原因', '解锁操作人', '解锁原因', '经办时间'],
      columnsValue: ['uact', 'userName', 'uactStas', 'lckOpter', 'lckRea', 'ulckOpter', 'ulckRea', 'optTime'],
      excelCol: [
        { label: '用户账号', prop: 'uact', width: '180px', align: 'left' },
        { label: '用户姓名', prop: 'userName', width: '180px', align: 'left' },
        { label: '账号状态', prop: 'uactStas', width: '180px', align: 'left' },
        { label: '锁定操作人', prop: 'lckOpter', width: '180px', align: 'left' },
        { label: '锁定原因', prop: 'lckRea', width: '180px', align: 'left' },
        { label: '解锁操作人', prop: 'ulckOpter', width: '180px', align: 'left' },
        { label: '解锁原因', prop: 'ulckRea', width: '180px', align: 'left' },
        { label: '经办时间', prop: 'optTime', width: '180px', align: 'left' }
      ]
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
    this.uactStatusList = this.publicCode.codes.UACT_STAS
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
      ApiObj.uactLckPage(params).then(res => {
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
    },
    exportLocalData(type) {
      if (this.tableData.length === 0) {
        this.$msgInfo('暂无数据导出')
        return
      }
      let arr = []
      if (type === 'all') {
        // 接口
        excel({ params: { params: { pageNumber: 1, pageSize: this.pageInfo.total }, url: '/web/user/page/?' + '&pageNumber=1&pageSize=' + this.pageInfo.total, bizReqBody: {}, method: 'GET', cols: this.excelCol }}).then(response => {
          var blob = new Blob([response], { type: 'application/octet-stream' })
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, '账号锁定日志信息.xlsx')
          } else {
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = '账号锁定日志信息.xlsx' // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
          }
        }).catch(err => {
          console.log(err)
        })
        return
      } else if (type === 'current') {
        arr = this.tableData
      } else {
        if (this.multipleSelection.length === 0) {
          this.$msgInfo('未选择数据')
          return
        }
        arr = this.multipleSelection
      }
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/ExportExcel')
        // 头
        const tHeader = this.columnsLabel.map((item) => item)
        // 对应的属性
        const filterVal = this.columnsValue.map((item) => item)
        const data = this.formatJson(filterVal, deepClone(arr))
        export_json_to_excel(tHeader, data, '账号锁定日志信息')
      })
    },
    // 格式化数据
    formatJson(filterVal, jsonData) {
      for (const i in jsonData) {
        if (jsonData[i].uactStas === '1') {
          jsonData[i].uactStas = '正常'
        } else if (jsonData[i].uactStas === '2') {
          jsonData[i].uactStas = '已锁定'
        } else {
          jsonData[i].uactStas = '已停用'
        }
        jsonData[i].optTime = parseTime(jsonData[i].optTime)
      }
      return jsonData.map((v) => filterVal.map((j) => v[j]))
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
