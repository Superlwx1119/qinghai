<template>
  <!--  短信消息审批 -->
  <div class="smsService">
    <normal-layer :search-number="4">
      <template slot="search-header">
        <FormItems ref="seachbtn" :items-datas="itemsDatas" :form-datas="queryForm">
          <div>
            <el-button @click="reset('queryForm')">重置</el-button>
            <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">短信消息列表</span>
      </div>
      <template>
        <my-table-view v-loading="loading" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <el-button type="primary" @click="approvalbtn(scope.row)">审批</el-button>
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <Approval v-model="isShowAdd" :daterow="daterow" />
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
import { getSmsApprByPage } from '@/api/MessageServer/index'
import Approval from './approval'
export default {
  name: 'SmsService',
  components: { FormItems, NormalLayer, Approval },
  mixins: [pageHandle],
  data() {
    return {
      isShowAdd: false,
      daterow: {},
      tableData: [],
      itemsDatas: [
        { label: '消息批次号', prop: 'msgBchno', type: 'input', message: '请输入' },
        { label: '短信标题', prop: 'smsTtl', type: 'input', message: '请输入' },
        { label: '短信内容', prop: 'smsCont', type: 'input', message: '请输入' },
        { label: '提交日期', prop: 'sbmtTime', type: 'date', message: '请输入' }
      ],
      columns: [
        // { type: 'selection' },
        { type: 'index', label: '序号' },
        { label: '消息批次号', prop: 'msgBchno' },
        { label: '短信标题', prop: 'smsTtl' },
        { label: '短信内容', prop: 'smsCont' },
        { label: '接收人', prop: 'recers' },
        { label: '提交日期', prop: 'sbmtTime' },
        { label: '审批状态', prop: 'sbmtStas' },
        { label: '审批人', prop: 'apprerName' },
        { label: '审批时间', prop: 'apprTime' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      rules: {
        msgBchno: [{ required: true, message: '请输入短信标题', trigger: 'blur' }],
        smsTtl: [{ required: true, message: '请输入短信内容', trigger: 'blur' }],
        smsCont: [{ required: true, message: '请输入短信内容', trigger: 'blur' }],
        sbmtTime: [{ required: true, message: '请输入短信内容', trigger: 'blur' }]
      },
      queryForm: {
        msgBchno: '',
        smsTtl: '',
        smsCont: '',
        sbmtTime: ''
      }
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
      const that = this
      const params = {
        pageSize: 10,
        pageNumber: 1,
        total: 5,
        order: 'sbmtTime',
        sort: 'DESC',
        applstas: 0,
        ...that.queryForm
      }

      getSmsApprByPage(params).then(res => {
        that.tableData = res.data.result
      })
    },
    approvalbtn(value) {
      this.isShowAdd = true
      this.daterow = value
    }
  }
}
</script>
