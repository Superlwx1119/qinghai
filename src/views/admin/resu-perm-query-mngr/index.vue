<!-- 资源权限管理 -->
<template>
  <normal-layer
    :search-number="itemsDatas.length"
    title-name="资源权限管理列表"
    title-need-handle
  >
    <template slot="search-header">
      <form-items :items-datas="itemsDatas" :form-datas="queryForm">
        <template slot="resuName">
          <medical-institutions-select
            v-model="dataForm.resuName"
            dialog-title="xxx"
            :fix-flag="fixFlag"
            :que-cont="queCont"
            @changeObj="getFixmedins"
          />
        </template>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="search">查询</el-button>
      </form-items>
    </template>
    <template slot="title-btns">
      <el-dropdown @command="exportLocalData">
        <el-button type="primary">
          导出
          <i
            class="el-icon-arrow-down el-icon--right"
          />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="select">导出选中</el-dropdown-item>
          <el-dropdown-item command="current">导出当页</el-dropdown-item>
          <el-dropdown-item command="all">导出全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <template>
      <my-table-view v-loading="loading" :columns="columns" :data="tableData" :have-expand="false" :max-cloumns="100" :is-configheader="false" :multiple-selection.sync="multipleSelection">
        <template slot="uactStas" slot-scope="scope">
          <el-switch
            v-model="scope.row.uactStas"
            disabled
            active-value="1"
            inactive-value="3"
            @change="switchChange(scope.$index,scope.row)"
          />
        </template>
      </my-table-view>
    </template>
    <Pagination :data="pageInfo" @refresh="pageChange" />
  </normal-layer>
</template>
<script>
import { deepClone } from '@/utils/index'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import PageHandle from '@/mixins/pageHandle'
import userAccount from '@/views/components/PageSelects/Common/UserAccount'
// import ResuMaintenance from './resu-maintenance/index'
import MedicalInstitutionsSelect from './MedicalInstitutionsSelect'
import { page, excel } from '@/api/Admin/user-management'
import { tableColumns } from './tableConfig'

export default {
  components: {
    NormalLayer,
    FormItems,
    // eslint-disable-next-line vue/no-unused-components
    userAccount,
    // ResuMaintenance,
    MedicalInstitutionsSelect
  },
  mixins: [PageHandle],
  data() {
    return {
      dataForm: {
        fixmedinsCode: '',
        fixmedinsName: '',
        resuCodg: '',
        resuId: ''
      },
      fixFlag: '1',
      queCont: '1',
      tableLoading: false,
      loading: false,
      multipleSelection: [],
      itemsDatas: [
        { label: '菜单名称', prop: 'resuName', type: 'custom', slotName: 'fixmedinsCode' },
        { label: '用户帐号', prop: 'uact', type: 'input' },
        { label: '姓名', prop: 'userName', type: 'input' }
      ],
      queryForm: {
        userName: '',
        uact: '',
        resuName: ''
      },
      pageInfo: {
        pageNumber: 1,
        pageSize: 100,
        startRow: 0,
        endRow: 0,
        total: 0
      },
      excelCol: [
        { label: '用户账号', prop: 'uact', width: '180px', align: 'left' },
        { label: '姓名', prop: 'userName', width: '180px', align: 'left' },
        { label: '证件号码', prop: 'certNO', width: '180px', align: 'left' },
        { label: '办公电话', prop: 'tel', width: '180px', align: 'left' },
        { label: '手机号码', prop: 'mob', width: '180px', align: 'left' },
        { label: '账号状态', prop: 'uactStas', width: '180px', align: 'left' },
        { label: '组织机构', prop: 'orgName', width: '180px', align: 'left' },
        { label: '描述信息', prop: 'dscr', width: '180px', align: 'left' }
      ],
      columns: tableColumns,
      columnsLabel: ['用户账号', '姓名', '证件号码', '办公电话', '手机号码', '账号状态', '组织机构', '描述信息'],
      columnsValue: ['uact', 'userName', 'certNO', 'tel', 'mob', 'uactStas', 'orgName', 'dscr'],
      tableData: []
    }
  },
  methods: {
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
        excel({ params: { params: { pageNumber: 1, pageSize: this.pageInfo.total }, url: '/web/user/page/?' + '&pageNumber=1&pageSize=' + this.pageInfo.total, bizReqBody: {}, method: 'GET', cols: this.excelCol }, resuName: this.dataForm.fixmedinsName }).then(response => {
          var blob = new Blob([response.data], { type: 'application/octet-stream' })
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, '账号信息.xlsx')
          } else {
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = '账号信息.xlsx' // 下载后文件名
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
        export_json_to_excel(tHeader, data, '账号信息')
      })
    },
    // 格式化数据
    formatJson(filterVal, jsonData) {
      for (const i in jsonData) {
        if (jsonData[i].uactStas === '1') {
          jsonData[i].uactStas = '启用'
        } else {
          jsonData[i].uactStas = '禁用'
        }
      }
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    search() {
      if (this.dataForm.fixmedinsName === '') {
        this.$msgInfo('请先选择菜单再执行查询！')
        return
      } else {
        const form = {
          resuName: this.dataForm.fixmedinsName,
          admrolId: 'adminRoleId',
          resuCodg: this.dataForm.resuCodg,
          resuId: this.dataForm.resuId
        }
        for (const i in this.queryForm) {
          if (this.queryForm[i] === '') {
            delete this.queryForm[i]
          }
        }
        page(Object.assign(this.pageInfo, form, this.queryForm)).then(res => {
          this.tableData = res.data.result
          const num1 = res.data.pageSize * (res.data.pageNumber - 1) + 1
          const num2 = res.data.pageSize * res.data.pageNumber > res.data.recordCount ? res.data.recordCount : res.data.pageSize * res.data.pageNumber
          this.pageInfo = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.recordCount,
            startRow: num1,
            endRow: num2
          }
        })
      }
    },
    getFixmedins(val) {
      this.dataForm.resuId = val.resuId
      this.dataForm.fixmedinsName = val.medinsName
      this.dataForm.resuCodg = val.resuCodg
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
.item-role-per{
  height: 100%;
  .role-perssion-list{
       height: calc(100% - 176px);
     }
}
.height100b{
      height: 95%;
  }

</style>

