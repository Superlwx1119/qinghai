<template>
  <!--  短信消息服务 -->
  <div class="smsService">
    <normal-layer :search-number="5">
      <template slot="search-header">
        <FormItems :items-datas="itemsDatas" :form-datas="queryForm">
          <template slot="审批结果">
            <el-select v-model="queryForm.审批结果" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <div>
            <el-button @click="reset('queryForm')">重置</el-button>
            <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">短信消息列表</span>
        <div slot="title-btns" class="box-tools">
          <el-button type="success" @click="isShowAdd = true">新增</el-button>
        </div>
      </div>
      <template>
        <my-table-view v-loading="loading" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <el-button type="text" @click="showDialog('edit',scope.row)">编辑</el-button>
            <el-button type="text" @click="showDialog('detail',scope.row)">查看</el-button>
            <el-button type="text" @click="showDialog('apply',scope.row)">申报</el-button>
            <el-button type="text" class="delete" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <Add v-model="isShowAdd" :daterow="daterow" />
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
import Add from './add'
import { page } from '@/api/MessageServer'
export default {
  name: 'SmsService',
  components: { FormItems, NormalLayer, Add },
  mixins: [pageHandle],
  data() {
    return {
      daterow: {
        state: true,
        row: []
      },
      options: [{
        value: '1',
        label: '通过'
      }, {
        value: '2',
        label: '不通过'
      }],
      itemsDatas: [
        { label: '消息批次号', prop: '消息批次号', type: 'input', message: '请输入' },
        { label: '短信标题', prop: '短信标题', type: 'input', message: '请输入' },
        { label: '短信内容', prop: '短信内容', type: 'input', message: '请输入' },
        { label: '提交日期', prop: '提交日期', type: 'date', message: '请输入' },
        { label: '审批结果', prop: '审批结果', type: 'custom', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '消息批次号', prop: 'msgBchno', width: '120px' },
        { label: '短信标题', prop: 'smsTtl', width: '120px' },
        { label: '短信内容', prop: 'smsCont' },
        { label: '接收人', prop: 'recers' },
        { label: '提交日期', prop: 'sbmtTime' },
        { label: '提交状态', prop: 'sbmtStas' },
        { label: '审批状态', prop: 'applstas' },
        { label: '审批结果', prop: 'sendOptins' },
        { label: '审批人', prop: '审批人' },
        { label: '审批时间', prop: '审批时间' },
        { label: '审批意见', prop: '审批意见' },
        { label: '操作', type: 'operation', fixed: 'right', width: '200px' }
      ],
      tableData: [],
      isShowAdd: false,
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    showDialog(value, row) {
      this.isShowAdd = true
      this.daterow.row = row
      if (value === 'edit') {
        this.daterow.state = true
      } else {
        this.daterow.state = false
      }
    },
    pageChange(data) {
      this.paginationQuery.pageSize = data.pagination.pageSize
      this.paginationQuery.pageNumber = data.pagination.pageNum
      this.search()
    },
    search() {
      const that = this
      const param = {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        ttl: '' }
      page(param).then(res => {
        that.tableData = res.data.result
      })
    }
  }
}
</script>

<style lang = "sass" scoped>

</style>
