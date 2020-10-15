<template>
  <!-- 站内消息服务 -->
  <div class="stationMessageService">
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
        <span class="box-title">短信消息列表</span>
        <div slot="title-btns" class="box-tools">
          <el-button type="primary">写信</el-button>
          <el-button type="primary">回复</el-button>
          <el-button type="primary">标记已读</el-button>
          <el-button type="primary">发件箱</el-button>
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
  name: 'StationMessageService',
  components: { FormItems, NormalLayer },
  mixins: [pageHandle],
  data() {
    return {
      itemsDatas: [
        { label: '标题', prop: '标题', type: 'input', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '已读标志', prop: '已读标志' },
        { label: '标题', prop: '标题' },
        { label: '内容', prop: '内容' },
        { label: '发件人', prop: '发件人' },
        { label: '收取时间', prop: '收取时间' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: [
        { 已读标志: 'xxx', 标题: 'xxx', 内容: 'xxx', 发件人: 'xxx', 收取时间: 'xxx' }
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
