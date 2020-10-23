  <!--跨省就医结算费用清分结果提取(参保地)-->
<template>
  <div class="height-full">
    <normal-layer
      :search-number="itemsDatas.length"
      title-name="跨省赴外就医清算明细"
    >
      <template slot="search-header">
        <form-items ref="ruleFrom" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm">
          <my-button type="reset" title="重置" @click="reset" />
          <my-button type="search" title="查询" @click="search" />
        </form-items>
      </template>

      <div slot="table-title" class="box-header handle">
        <span class="box-title">模板信息</span>
      </div>
      <template>
        <MyTableView v-loading="loading" :columns="columns" :data="tableData" :multiple-selection.sync="multipleSelection">
          <template slot="operation" slot-scope="scope">
            <!-- <my-button icon="edit" @click="checkDetail('edit',scope.row)" /> -->
            <my-button icon="detail" @click="checkDetail('details',scope.row)" />
            <my-button v-show="scope.row.apprRslt == null " icon="audit" @click="checkDetail('audit',scope.row)" />
            <!-- <my-button v-show="scope.row.apprRslt == 0" icon="submit" @click="checkDetail('submit',scope.row)" /> -->
          </template>
        </MyTableView>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
      <Details v-model="detailsShow" :daterow="daterow" />
      <Add v-model="addShow" :daterow="daterow" @search="search" />
    </normal-layer>
  </div>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import Details from './compnent/details'
import Add from './compnent/add'
import { cmsApplPage } from '@/api/CmsApi'
import { getCurrentUser } from '@/api/Common/Request'
export default {
  components: {
    Details,
    Add
  },
  mixins: [pageHandle],
  data() {
    return {
      detailsShow: false,
      addShow: false,
      daterow: {},
      userinfor: {},
      multipleSelection: [],
      queryForm: {
        tmplTtl: ''
      },
      // 查询条件
      itemsDatas: [
        { label: '模板标题', prop: 'tmplTtl', type: 'input' }
      ],
      columns: [
        // { type: 'selection' },
        { type: 'index', label: '序号' },
        { label: '模板标题', prop: 'tmplTtl', width: '200px', align: 'left' },
        { label: '应用机构', prop: 'appOptins', width: '150px', align: 'left' },
        { label: '经办人', prop: 'crterName' },
        { label: '审批人', prop: 'opterName' },
        { label: '审批意见', prop: 'apprOpnn' },
        { label: '审批时间', prop: 'apprTime', type: 'dataTime' },
        { label: '审批结果', prop: 'applstasName' },
        { label: '操作', type: 'operation', fixed: 'right', width: '200px' }
      ],
      tableData: [],
      detailTitle: '',
      detailData: {},
      isDetailVisible: false
    }
  },
  watch: {},
  created() {
    getCurrentUser().then(res => {
      this.userinfor = res.data
    })
    this.search()
  },
  methods: {
    // 新增
    addnewBtn() {
      this.addShow = true
    },
    search() {
      // this.$refs.ruleFrom.validate((valid) => {
      //   if (valid) {
      this.loading = true
      const params = {
        pageNumber: this.paginationQuery.pageNum,
        pageSize: this.paginationQuery.pageSize,
        total: this.paginationQuery.total,
        ...this.queryForm
      }
      cmsApplPage(params).then(res => {
        this.loading = false
        this.tableData = res.data.result
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].applstasName = ((this.tableData[i].apprRslt != null) ? ((this.tableData[i].apprRslt === '1') ? '通过' : '不通过') : '')
        }
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.loading = false
      })
    },
    checkDetail(val, rows) {
      console.log(rows)
      const that = this
      this.daterow = rows
      switch (val) {
        case 'details':
          this.detailsShow = true
          break
        case 'audit':
          that.addShow = true
          break
        default:
          this.$message({
            type: 'info',
            message: '字符匹配错误,请联系开发人员解决'
          })
          break
      }
      console.log(val)
    },
    submitBtn() {}
  }
}

</script>
<style lang='scss' scoped>
</style>
