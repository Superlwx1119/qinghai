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
          <el-button type="success" @click="showDialog('default',null)">新增</el-button>
        </div>
      </div>
      <template>
        <my-table-view v-loading="loading" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showDialog('edit',scope.row)" />
            <el-button type="primary" icon="el-icon-plus" @click="showDialog('add',scope.row)" />
            <el-button type="danger" icon="el-icon-delete-solid" @click="showDialog('delet',scope.row)" />
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <Add v-model="isShowAdd" @search="search" />
    <Edit v-model="isShowedit" :table-data="tableDate" :selectitem="selectitem" @search="search" @editsearch="editsearch" />
    <Distribution v-model="isShowAddList" :selectitem="selectitem" @search="search" />
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
import { offAddrbookGrpDpage } from '@/api/AddressBook/index'
import Edit from './components/edit'
import Add from './components/add'
import Distribution from './components/distribution'
// eslint-disable-next-line no-unused-vars
import { queryAllGrpName, getGrpPage, offAddrbookGrpDdelet } from '@/api/AddressBook'
export default {
  name: 'Inquiry',
  components: { FormItems, NormalLayer, Add, Edit, Distribution },
  mixins: [pageHandle],
  data() {
    return {
      selectitem: {},
      listdata: {},
      isShowAdd: false,
      isShowAddList: false,
      isShowedit: false,
      queryForm: {
        addrbookGrpName: ''
      },
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 6
      },
      itemsDatas: [
        { label: '个人通讯录组名称', prop: 'addrbookGrpName', type: 'input', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '个人通讯录组名称', prop: 'addrbookGrpName' },
        { label: '组内成员', prop: 'userNameList' },
        { label: '创建时间', prop: 'crteTime' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: [],
      tableDate: []
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
      offAddrbookGrpDpage(params).then(res => {
        console.log(res)
        this.tableData = res.data.result
      })
    },
    offAddrbookGrpDdeletway(value) {
      const that = this
      that.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        offAddrbookGrpDdelet(value).then(res => {
          console.log(res)
          that.$message({
            message: '删除成功',
            type: 'success'
          })
          that.search()
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editsearch(value) {
      const that = this
      const params = {
        ...that.paginationQuery,
        addrbookGrpId: value.addrbookGrpId
      }
      getGrpPage(params).then(res => {
        that.isShowedit = true
        console.log(res)
        sessionStorage.setItem('title', value.addrbookGrpName)
        that.tableDate = res.data.result
      })
    },
    showDialog(type, value) {
      const that = this
      that.selectitem = value
      console.log(value)
      switch (type) {
        case 'edit':
          this.editsearch(value)
          break
        case 'add':
          that.listdata = value
          that.isShowAddList = true
          break
        case 'delet':
          this.offAddrbookGrpDdeletway(value)
          break
        default:
          that.isShowAdd = true
          break
      }
    }
  }
}
</script>

<style lang = "sass" scoped>

</style>
