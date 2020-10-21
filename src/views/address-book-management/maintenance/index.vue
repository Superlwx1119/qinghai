<template>
  <!--  通讯录组维护 -->
  <div class="Inquiry">
    <normal-layer :search-number="1">
      <template slot="search-header">
        <FormItems :items-datas="itemsDatas" :form-datas="queryForm">
          <div>
            <el-button @click="reset('queryForm')">重置</el-button>
            <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">通讯录组列表</span>
        <div slot="title-btns" class="box-tools">
          <el-button type="success" @click="addbtn()">新增</el-button>
        </div>
      </div>
      <template>
        <my-table-view v-loading="loading" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showDialog(scope.row)" />
          </template>
        </my-table-view>
        <!-- <Pagination :data="paginationQuery" @refresh="pageChange" /> -->
      </template>
    </normal-layer>
    <Add v-model="isShowAdd" />
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
import { bookpage } from '@/api/AddressBook/index'
import Add from './components/add'
export default {
  name: 'Inquiry',
  components: { FormItems, NormalLayer, Add },
  mixins: [pageHandle],
  data() {
    return {
      isShowAdd: false,
      queryForm: {
        addrbookGrpName: ''
      },
      itemsDatas: [
        { label: '个人通讯录组名称', prop: 'addrbookGrpName', type: 'input', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '个人通讯录组名称', prop: 'orgName' },
        { label: '组内成员', prop: 'uactName' },
        { label: '创建时间', prop: 'visFlag' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.search()
  },
  mounted() {},
  methods: {
    search() {
      const params = {
        pageSize: 10,
        pageNumber: 1,
        total: 2,
        order: 'crteTime',
        sort: 'DESC',
        ...this.queryForm
      }
      bookpage(params).then(res => {
        this.tableData = res.data.result
      })
    },
    addbtn() {
      this.isShowAdd = true
    }
  }
}
</script>

<style lang = "sass" scoped>

</style>
