<template>
  <!-- 文件管理 -->
  <div class="fileManagement">
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
          <el-button type="primary">上传</el-button>
          <el-button type="primary">下载</el-button>
          <el-button type="primary">分享</el-button>
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
import { beforeFact, getFileCollocation, getUrl } from '@/api/DocumentServices/index'
export default {
  name: 'FileManagement',
  components: { FormItems, NormalLayer },
  mixins: [pageHandle],
  data() {
    return {
      itemsDatas: [
        { label: '文件名称', prop: '文件名称', type: 'input', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '文件名称', prop: '文件名称' },
        { label: '文件大小(MB)', prop: '文件大小' },
        { label: '上传时间', prop: '上传时间' },
        { label: '文件说明', prop: '文件说明' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: [
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.search()
    this.getFileCollocation()
    this.getUrl()
  },
  mounted() {},
  methods: {
    search() {
      const params = {
        menuCodg: 'ips-wjfw-wjgl'
      }
      beforeFact(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.data
        }
      })
    },
    getFileCollocation() {
      const params = ''
      getFileCollocation(params).then(res => {
        if (res.code === 0) {
          console.log(res.data)
        }
      })
    },
    getUrl() {
      const params = ''
      getUrl(params).then(res => {
        if (res.code === 0) {
          console.log(res.data)
        }
      })
    }
  }
}
</script>

<style lang = "sass" scoped>

</style>
