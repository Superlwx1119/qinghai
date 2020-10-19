<template>
  <!-- 被分享文件 -->
  <div class="sharedFiles">
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
        <span class="box-title">数据列表</span>
        <div slot="title-btns" class="box-tools">
          <el-button type="primary" @click="downloadFile">下载</el-button>
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
import { offFileShrPage } from '@/api/DocumentServices/index'
export default {
  name: 'SharedFiles',
  components: { FormItems, NormalLayer },
  mixins: [pageHandle],
  data() {
    return {
      itemsDatas: [
        { label: '文件名称', prop: 'filename', type: 'input', message: '请输入' }
      ],
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0
      },
      columns: [
        { type: 'index', label: '序号' },
        { label: '文件名称', prop: '文件名称' },
        { label: '文件大小(MB)', prop: '文件大小' },
        { label: '发送人', prop: '发送人' },
        { label: '发送时间', prop: '发送时间' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      multipleSelection: [],
      tableData: [
        { 文件名称: 'xxx', 文件大小: 'xxx', 发送人: 'xxx', 发送时间: 'xxx' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.search()
  },
  mounted() {},
  methods: {
    downloadFile() {
      if (this.multipleSelection.length === 0) {
        this.$msgWarning('请选择要下载的文件')
        return
      }
    },
    pageChange(data) {
      this.paginationQuery.pageSize = data.pagination.pageSize
      this.paginationQuery.pageNumber = data.pagination.pageNum
      this.search()
    },
    search() {
      const params = {
        ...this.paginationQuery,
        filename: this.queryForm.filename
      }
      offFileShrPage(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
        }
      })
    }
  }
}
</script>

<style lang = "sass" scoped>

</style>
