<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 用户管理 -->
  <normal-layer
    :search-number="itemsDatas.length"
    title-name="用户列表"
    title-need-handle
  >
    <template slot="search-header">
      <form-items :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm">
        <!-- <template slot="orgaUnit">
          <OrgaUnit ref="OrgaUnitsRef" v-model="queryForm.orguntId" />
        </template> -->
        <my-button type="reset" title="重置" @click="reset" />
        <my-button type="search" title="查询" @click="iniSearch" />
      </form-items>
    </template>

    <template slot="title-btns">
      <my-button type="add" title="新增" @click="handleAdd" />
    </template>

    <my-table-view
      v-loading="loading"
      :data="tableData"
      :columns="columns"
      :max-cloumns="15"
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
    <Pagination :data="paginationQuery" @refresh="pageChange" />

    <!-- 新增 -->
    <filling-add v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </normal-layer>
</template>
<script>
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import PageHandle from '@/mixins/pageHandle'
import Columns from './listCloumns'
import FillingAdd from './user-add/index'
import ApiObj from '@/api/Admin/user-management'
// import { PAGE_SIZE } from '@/utils/constant'
// import OrgaUnit from '@/components/OrgaUnit'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'UserManagement',
  components: {
    NormalLayer,
    'filling-add': FillingAdd
    // OrgaUnit
  },
  mixins: [PageHandle],
  props: {},
  data() {
    return {
      itemsDatas: [
        { label: '用户账号', prop: 'uact', type: 'input' },
        { label: '姓名', prop: 'userName', type: 'input' },
        { label: '证件号码', prop: 'certNO', type: 'input' },
        { label: '账号状态', prop: 'uactStas', type: 'select', options: [], clearable: false },
        {
          label: '组织机构',
          prop: 'orgaUnit',
          type: 'component', componentName: 'OrgaUnit', folder: 'Common'

        }
      ],
      disabledAll: true,
      dataObj: {
        isShow: false,
        isQuery: false,
        isModify: false,
        rows: {}
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
      tableData: []
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
  mounted() {
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
    // 获取组织机构
    getOrgaUnits(data) {
      this.queryForm.orguntId = data[data.length - 1]
    },
    // 请求角色id
    getAdminRoleId() {
      ApiObj.adminRoleId().then(res => {
      })
    },
    acitiveBeforeFact() {
      ApiObj.beforeFact({ menuCodg: 'ips-xtgl-yhgl' }).then(res => {
      })
    },
    details(row) {
      this.detilDataObj.isShow = true
      this.detilDataObj.row = Object.assign({}, row)
      this.detilDataObj.mnitId = row.mnitId
    },
    // 获取查询信息列表
    getUserList() {
      const params = {
        pageNumber: this.paginationQuery.pageNum,
        pageSize: this.paginationQuery.pageSize,
        total: 0,
        ...this.queryForm
      }
      this.tableLoading = true
      ApiObj.page(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          const num1 = res.data.pageSize * (res.data.pageNumber - 1) + 1
          const num2 = res.data.pageSize * res.data.pageNumber > res.data.recordCount ? res.data.recordCount : res.data.pageSize * res.data.pageNumber
          this.paginationQuery = {
            pageSize: res.data.pageSize,
            pageNum: res.data.pageNumber,
            total: res.data.recordCount,
            startRow: num1,
            endRow: num2
          }
          console.log(this.pationQuery, 'llll')
        }
        this.tableLoading = false
      }).catch(() => { this.tableLoading = false })
    },
    pageChange(v) {
      this.paginationQuery.pageSize = v.pagination.pageSize
      this.paginationQuery.pageNum = v.pagination.pageNum
      this.getUserList()
    },
    // 查询
    search() {
      this.currentPage = 1
      this.pageSize = 15
      this.getUserList()
    },
    del(row) {
      this.$confirm(`<div class="myalert-header">操作提醒</div><div class="myalert-content">确认删除？</div>`, {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleterow(row)
        })
        .catch(() => {

        })
    },
    // 删除
    deleterow(row) {
      // const params = {
      //   mnitId: row.mnitId
      // }
      // ApiObj.deleteItemMonitoringAdd(params).then(res => {
      //   if (res.data.code === 0) {
      //     this.getConditionList()
      //     this.$message({
      //       type: 'success',
      //       dangerouslyUseHTMLString: true,
      //       message: `<strong>操作成功</strong><p>${res.data.message}</p>`,
      //       duration: 1000
      //     })
      //   } else {
      //     this.$alert(`<div class="myalert-header">操作失败</div>
      //       <div class="myalert-content">${res.data.message}</div>`, {
      //       dangerouslyUseHTMLString: true, confirmButtonText: '确定',
      //       type: 'error'
      //     })
      //   }
      // })
    },
    // 修改
    modifyrow(row) {
      this.dataObj.isShow = true
      this.dataObj.isModify = true
      this.dataObj.row = Object.assign({}, row)
    },
    //  重置
    restSearch() {
      this.$refs.queryForm.resetFields()
      this.$refs.OrgaUnitsRef.reset()
    },

    // 新增
    handleAdd() {
      this.dataObj.isShow = true
      this.dataObj.isModify = false
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

</style>
