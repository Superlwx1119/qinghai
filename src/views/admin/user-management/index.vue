<template>
  <!-- 用户管理 -->
  <normal-layer
    :search-number="itemsDatas.length"
    title-name="用户管理列表"
    title-need-handle
  >
    <template slot="search-header">
      <form-items :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm">
        <my-button type="reset" title="重置" @click="reset" />
        <my-button type="search" title="查询" @click="iniSearch" />
      </form-items>
    </template>
    <template slot="title-btns">
      <my-button type="add" title="新增" @click="handleAdd" />
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

    <my-table-view
      v-loading="loading"
      :data="tableData"
      :columns="columns"
      :have-expand="false"
      :max-cloumns="100"
      :is-configheader="false"
      :multiple-selection.sync="multipleSelection"
    >
      <template slot="operation" slot-scope="scope">
        <my-button icon="edit" title="修改" @click.stop="modifyrow(scope.row)" />
      </template>
      <template slot="zhzt" slot-scope="scope">
        <el-switch
          v-model="scope.row.uactStas"
          active-value="1"
          inactive-value="3"
          @click.native.prevent="switchChange(scope.rowIndex,scope.row)"
        />
      </template>
    </my-table-view>
    <Pagination :data="pageInfo" @refresh="pageChange" />
    <!-- 新增弹窗 -->
    <filling-add v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </normal-layer>
</template>
<script>
import { deepClone } from '@/utils/index'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import PageHandle from '@/mixins/pageHandle'
import Columns from './listCloumns'
import FillingAdd from './user-add/index'
import ApiObj from '@/api/Admin/user-management'
import { excel } from '@/api/Admin/user-management'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'UserManagement',
  components: {
    NormalLayer,
    'filling-add': FillingAdd
  },
  mixins: [PageHandle],
  props: {},
  data() {
    return {
      loading: false,
      itemsDatas: [
        { label: '用户账号', prop: 'uact', type: 'input' },
        { label: '姓名', prop: 'userName', type: 'input' },
        { label: '证件号码', prop: 'certNO', type: 'input' },
        { label: '账号状态', prop: 'uactStas', type: 'select', options: [], clearable: false },
        { label: '组织机构', prop: 'orgaUnit', type: 'component', componentName: 'OrgaUnit', folder: 'Common' }
      ],
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
      columns: Columns,
      queryForm: {
        uact: '',
        userName: '',
        certNO: '',
        uactStas: '',
        stdName: '',
        orguntId: ''
      },
      tableData: [],
      multipleSelection: [],
      columnsLabel: ['用户账号', '姓名', '证件号码', '办公电话', '手机号码', '账号状态', '组织机构', '描述信息'],
      columnsValue: ['uact', 'userName', 'certNO', 'tel', 'mob', 'uactStas', 'orgName', 'dscr'],
      excelCol: [
        { label: '用户账号', prop: 'uact', width: '180px', align: 'left' },
        { label: '姓名', prop: 'userName', width: '180px', align: 'left' },
        { label: '证件号码', prop: 'certNO', width: '180px', align: 'left' },
        { label: '办公电话', prop: 'tel', width: '180px', align: 'left' },
        { label: '手机号码', prop: 'mob', width: '180px', align: 'left' },
        { label: '账号状态', prop: 'uactStas', width: '180px', align: 'left' },
        { label: '组织机构', prop: 'orgName', width: '180px', align: 'left' },
        { label: '描述信息', prop: 'dscr', width: '180px', align: 'left' }
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
    this.getUserList()
    this.$set(this.itemsDatas[3], 'options', this.publicCode.codes.UACT_STAS)
  },
  methods: {
    // 禁用启用
    switchChange(index, row) {
      const message = row.uactStas === '1' ? '启用' : '禁用'
      this.$prompt(`此操作即将${message}【${row.uact}】账号`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入' + message + '原因',
        inputPattern: /\S/,
        inputErrorMessage: '操作原因不能为空'
      }).then(({ value }) => {
        const params = {
          uact: row.uact,
          uactLckRea: value,
          uactStas: row.uactStas
        }
        ApiObj.uactStat(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.getUserList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
        this.getUserList()
      })
    },
    // 查询方法
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
          console.log(response)
          var blob = new Blob([response], { type: 'application/octet-stream' })
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, '用户信息.xlsx')
          } else {
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = '用户信息.xlsx' // 下载后文件名
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
    // 修改
    modifyrow(row) {
      this.dataObj.isShow = true
      this.dataObj.isModify = true
      this.dataObj.row = Object.assign({}, row)
    },
    // 新增
    handleAdd() {
      this.dataObj.isShow = true
      this.dataObj.isModify = false
    },
    // 关闭弹出框
    cancelDialog(data) {
      this.dataObj.isShow = false
      this.dataObj.isModify = false
      this.dataObj.mnitId = ''
      if (data === 1) {
        this.getUserList()
      }
      this.dataObj.rows = {}
    }
  }
}
</script>

<style lang="scss">
.el-dropdown{
  margin-left: 10px;
}
</style>
