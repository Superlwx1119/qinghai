<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 子系统管理 -->
  <div class="item2">
    <normal-layer :search-number="itemsDatas.length">
      <template slot="search-header">
        <FormItems ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm">
          <div>
            <MyButton type="reset" @click="reset" />
            <MyButton type="search" @click="iniSearch" />
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">子系统列表</span>
        <div class="box-tools">
          <MyButton type="add" @click="handleAdd()">新增</MyButton>
        </div>
      </div>
      <template>
        <my-table-view v-loading="loading" :columns="columns" :data="tableData" :have-expand="false" :max-cloumns="100" :is-configheader="false" :multiple-selection.sync="multipleSelection">
          <template slot="crteTime" slot-scope="scope">
            {{ scope.row.crteTime | parseTime }}
          </template>
          <template slot="operation" slot-scope="scope">
            <MyButton icon="edit" title="修改" @click.stop="modifyrow(scope.row)" />
            <MyButton icon="delete" title="删除" @click.stop="del(scope.row)" />
          </template>
        </my-table-view>
        <Pagination :data="pageInfo" @refresh="pageChange" />
      </template>
    </normal-layer>
    <!-- 新增 -->
    <subsystem-add v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </div>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import { tableColumns } from './tableConfig'
import subsystemAdd from './subsystem-add/index'
import ApiObj from '@/api/Admin/user-management'
import moment from 'moment'
export default {
  name: 'UserManagement',
  components: {
    NormalLayer,
    FormItems,
    subsystemAdd
  },
  filters: {
    parseTime(value) {
      let time
      if (!value) {
        time = '--'
      } else {
        time = moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
      return time
    }
  },
  mixins: [pageHandle],
  props: {},
  data() {
    return {
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
        subsysName: '',
        subsysCodg: ''
      },
      itemsDatas: [
        { label: '子系统名称', prop: 'subsysName', type: 'input' },
        { label: '子系统编码', prop: 'subsysCodg', type: 'input' }
      ],
      columns: tableColumns,
      loading: false,
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.iniSearch()
  },
  methods: {
    search() {
      this.getSubsystemList()
    },
    // 获取查询子系统列表
    getSubsystemList() {
      this.loading = true
      const params = {
        pageNumber: this.pageInfo.pageNumber,
        pageSize: this.pageInfo.pageSize,
        total: 0,
        ...this.queryForm
      }
      ApiObj.sysSubsysD(params).then(res => {
        if (res.code === 0) {
          this.loading = false
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
      }).catch(() => { this.loading = false })
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
      const params = row.subsysId
      ApiObj.delSubsys(params).then(res => {
        if (res.code === 0) {
          this.getSubsystemList()
          this.$message({
            type: 'success',
            dangerouslyUseHTMLString: true,
            message: `<strong>操作成功</strong><p>${res.message}</p>`,
            duration: 1000
          })
        } else {
          this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">${res.message}</div>`, {
            dangerouslyUseHTMLString: true, confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    // 修改
    modifyrow(row) {
      this.dataObj.isShow = true
      this.dataObj.isModify = true
      this.dataObj.subsysId = row.subsysId
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
      this.dataObj.subsysId = ''
      if (data === 1) {
        this.getSubsystemList()
      }
      this.dataObj.rows = {}
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

</style>
