<template>
  <!--  通讯录查询 -->
  <div class="Inquiry">
    <normal-layer :search-number="4">
      <template slot="search-header">
        <FormItems :items-datas="itemsDatas" :form-datas="queryForm">
          <div>
            <el-button @click="reset('queryForm')">重置</el-button>
            <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header">
        <span class="box-title">通讯录列表</span>
      </div>
      <template>
        <my-table-view v-loading="loading" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showDialog(scope.row)" />
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <Memo v-model="isShowAdd" :rowlin="rowlin" @search="search" />
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
      queryForm: {
        userName: '',
        tel: '',
        email: '',
        mob: ''
      },
      itemsDatas: [
        { label: '人员姓名', prop: 'userName', type: 'input', message: '请输入' },
        { label: '办公电话', prop: 'tel', type: 'input', message: '请输入' },
        { label: '邮箱地址', prop: 'email', type: 'input', message: '请输入' },
        { label: '手机号码', prop: 'mob', type: 'input', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '人员姓名', prop: 'uactName' },
        { label: '办公电话', prop: 'tel' },
        { label: '邮箱地址', prop: 'email' },
        { label: '手机号码', prop: 'mob' },
        { label: '所属部门', prop: 'orgName' },
        { label: '备注信息', prop: 'memo' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    search() {
      const param = {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        startRow: 0,
        endRow: 0,
        pageNumber: 1,
        ...this.queryForm
      }
      bookpage(param).then(res => {
        this.tableData = res.data.result
      })
    },
    showDialog(val) {
      this.rowlin = val
      this.isShowAdd = true
    }
  }
}
</script>

<style lang = "sass" scoped>

</style>
