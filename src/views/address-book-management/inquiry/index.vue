<template>
  <!--  通讯录查询 -->
  <div class="Inquiry">
    <normal-layer :search-number="itemsDatas.length" title-name="通讯录列表">
      <template slot="search-header">
        <FormItems :items-datas="itemsDatas" :form-datas="queryForm">
          <div>
            <el-button @click="reset('queryForm')">重置</el-button>
            <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
          </div>
        </FormItems>
      </template>
      <template>
        <my-table-view v-loading="loading" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showDialog(scope.row)" />
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery1" @refresh="pageChange1" />
      </template>
    </normal-layer>
    <Memo v-model="isShowAdd" :dialog-title="dialogTitle" :rowlin="rowlin" @search="search" />
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
import { bookpage } from '@/api/AddressBook/index'
import Memo from './memo'
export default {
  name: 'Inquiry',
  components: { FormItems, NormalLayer, Memo },
  mixins: [pageHandle],
  data() {
    return {
      rowlin: {},
      isShowAdd: false,
      dialogTitle: '',
      loading: false,
      queryForm: {
        userName: '',
        tel: '',
        mob: ''
      },
      itemsDatas: [
        { label: '人员姓名', prop: 'userName', type: 'input', message: '请输入' },
        { label: '办公电话', prop: 'tel', type: 'input', message: '请输入' },
        { label: '手机号码', prop: 'mob', type: 'input', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '用户账号', prop: 'uact' },
        { label: '人员姓名', prop: 'uactName' },
        { label: '办公电话', prop: 'tel' },
        { label: '邮箱地址', prop: 'email' },
        { label: '手机号码', prop: 'mob' },
        { label: '所属部门', prop: 'orgName' },
        { label: '备注信息', prop: 'memo' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: [],
      paginationQuery1: { pageSize: 10, pageNumber: 1, total: 0, startRow: 0, endRow: 0 }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.search()
  },
  methods: {
    search() {
      this.loading = true
      const param = {
        pageSize: this.paginationQuery1.pageSize,
        pageNumber: this.paginationQuery1.pageNumber,
        total: this.paginationQuery1.total,
        ...this.queryForm
      }
      bookpage(param).then(res => {
        this.loading = false
        this.tableData = res.data.result
        this.paginationQuery1 = {
          pageSize: res.data.pageSize,
          pageNumber: res.data.pageNumber,
          total: res.data.total,
          startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
          endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    showDialog(row) {
      this.rowlin = row
      this.isShowAdd = true
      this.dialogTitle = '备注信息'
    },
    // 切换分页
    pageChange1(v) {
      this.paginationQuery1.pageSize = v.pagination.pageSize
      this.paginationQuery1.pageNumber = v.pagination.pageNum
      this.search()
    }
  }
}
</script>

<style lang = "sass" scoped>

</style>
