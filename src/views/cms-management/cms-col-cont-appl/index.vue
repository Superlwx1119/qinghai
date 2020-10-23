<template>
  <div class="height-full">
    <normal-layer
      :search-number="itemsDatas.length"
      title-name="跨省赴外就医清算明细"
    >
      <template slot="search-header">
        <form-items ref="ruleFrom" :model="queryForm" :items-datas="itemsDatas" :rules="rules" :form-datas="queryForm">
          <my-button type="reset" title="重置" @click="reset" />
          <my-button type="search" title="查询" @click="search" />
        </form-items>
      </template>

      <div slot="table-title" class="box-header handle">
        <span class="box-title">栏目信息</span>
      </div>
      <template>
        <MyTableView v-loading="loading" :border="true" :columns="columns" :data="tableData" :multiple-selection.sync="multipleSelection">
          <template slot="operation" slot-scope="scope">
            <my-button icon="detail" @click="checkDetail('details',scope.row)" />
            <my-button v-show="scope.row.apprRslt == null " icon="audit" @click="checkDetail('audit',scope.row)" />
          </template>
        </MyTableView>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <Add v-model="addShow" :daterow="daterow" @search="search" />
  </div>
</template>
<script>
import Add from './add'
import pageHandle from '@/mixins/pageHandle'
// eslint-disable-next-line no-unused-vars
import { applPage, allselect } from '@/api/CmsApi'
export default {
  components: {
    Add
  },
  mixins: [pageHandle],
  data() {
    return {
      daterow: {},
      addShow: false,
      multipleSelection: [],
      queryForm: {
        contTtl: '',
        colTtl: '',
        applstas: ''
      },
      // 查询条件
      itemsDatas: [
        { label: '内容标题', prop: 'contTtl', type: 'input' },
        { label: '栏目标题', prop: 'colTtl', type: 'input' },
        { label: '审批状态', prop: 'applstas', span: 12, type: 'select', options: [{ label: '03', value: '已审批' }, { label: '01', value: '未审批' }] }
      ],
      // 跨省赴外就医清算明细表
      columns: [
        { label: '栏目标题', prop: 'colTtl' },
        { label: '栏目内容标题', prop: 'contTtl' },
        { label: '审批人', prop: 'opterName' },
        { label: '审批时间', prop: 'apprTime' },
        { label: '审批意见', prop: 'apprOpnn' },
        { label: '审批结果', prop: 'apprRslt' },
        { label: '审批状态', prop: 'applstas' },
        { label: '操作', type: 'operation', fixed: 'right', minWidth: '200' }
      ],
      tableData: [
        { confirmStas: '123' }
      ],
      detailTitle: '',
      detailData: {},
      isDetailVisible: false,
      rules: {
        applstas: { required: true,
          message: '请选择处理状态',
          trigger: 'blur' }
      }
    }
  },
  watch: {},
  created() {
  },
  methods: {
    search() {
      this.$refs.ruleFrom.elForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const params = {
            pageNumber: this.paginationQuery.pageNum,
            pageSize: this.paginationQuery.pageSize,
            total: this.paginationQuery.total,
            ...this.queryForm
          }
          switch (params.applstas) {
            case '已审批':
              params.applstas = '03'
              break
            case '未审批':
              params.applstas = '01'
              break
            default:
              params.applstas = '03'
              break
          }
          allselect(params).then(res => {
            this.loading = false
            this.tableData = res.data.result
          }).catch(err => console.log(err))
        }
      })
    },
    checkDetail(type, val) {
      this.daterow = val
      if (type === 'details') {
        console.log('详情')
      } else {
        this.addShow = true
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
