<template>
  <!--  短信消息审批 -->
  <div class="smsService">
    <normal-layer :search-number="4">
      <template slot="search-header">
        <FormItems :items-datas="itemsDatas" :form-datas="queryForm">
          <div>
            <el-button @click="reset('queryForm')">重置</el-button>
            <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">短信消息列表</span>
        <div slot="title-btns" class="box-tools">
          <el-button type="primary">审批</el-button>
          <!-- <ExportButton :columns="columns" :table-data="tableData" :select-data="multipleSelection" table-title="生活资助申报列表" /> -->
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
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
export default {
  name: 'SmsService',
  components: { FormItems, NormalLayer },
  mixins: [pageHandle],
  data() {
    return {
      itemsDatas: [
        { label: '消息批次号', prop: '消息批次号', type: 'input', message: '请输入' },
        { label: '短信标题', prop: '短信标题', type: 'input', message: '请输入' },
        { label: '短信内容', prop: '短信内容', type: 'input', message: '请输入' },
        { label: '提交日期', prop: '提交日期', type: 'date', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '消息批次号', prop: '消息批次号' },
        { label: '短信标题', prop: '短信标题' },
        { label: '短信内容', prop: '短信内容' },
        { label: '接收人', prop: '接收人' },
        { label: '提交日期', prop: '提交日期' },
        { label: '审批状态', prop: '审批状态' },
        { label: '审批人', prop: '审批人' },
        { label: '审批时间', prop: '审批时间' }
      ],
      tableData: [
        { 消息批次号: 'xxx', 短信标题: 'xxx', 短信内容: 'xxx', 接收人: 'xxx', 提交日期: 'xxx', 审批状态: 'xxx', 审批人: 'xxx', 审批时间: 'xxx' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang = "sass" scoped>

</style>
