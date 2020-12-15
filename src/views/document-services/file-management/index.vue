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
          <el-button type="primary" @click="isDialogVisible = true">上传</el-button>
          <el-button type="primary" @click="downloadFile">下载</el-button>
          <el-button type="primary" @click="shareFile">分享</el-button>
          <!-- <ExportButton :columns="columns" :table-data="tableData" :select-data="multipleSelection" table-title="生活资助申报列表" /> -->
        </div>
      </div>
      <template>
        <my-table-view v-loading="loading" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData" @rowClick="handleCurrentChange">
          <template slot="select" slot-scope="scope">
            <el-radio v-model="fileInfoId" :label="scope.row">{{ '' }}</el-radio>
          </template>
          <template slot="operation" slot-scope="scope">
            <my-button icon="edit" @click="showDialog('edit',scope.row)" />
            <my-button icon="delete" @click="deleteRow(scope.row)" />
          </template>
          <template slot="upldTime" slot-scope="scope">
            {{ scope.row.upldTime | renderTime }}
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <Upload v-model="isDialogVisible" @search="search" />
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
import Upload from './upload'
import { page, getFileCollocation, getUrl, downLoadFile } from '@/api/DocumentServices/index'
export default {
  name: 'FileManagement',
  components: { FormItems, NormalLayer, Upload },
  filters: {
    renderTime(date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
  },
  mixins: [pageHandle],
  data() {
    return {
      isDialogVisible: false,
      itemsDatas: [
        { label: '文件名称', prop: 'filename', type: 'input', message: '请输入' }
      ],
      queryForm: {
        filename: ''
      },
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0
      },
      columns: [
        { type: 'custom', prop: 'select', slotName: 'select', label: '选择', width: 55 },
        { type: 'index', label: '序号' },
        { label: '文件名称', prop: 'filename' },
        { label: '文件大小(MB)', prop: 'ossFilesize' },
        { label: '上传时间', prop: 'upldTime', type: 'custom', minWidth: '100', slotName: 'upldTime' },
        { label: '分享状态', prop: 'optins' },
        { label: '文件说明', prop: 'dscr' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: [
      ],
      fileInfoId: '',
      selectRow: {}
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
    downloadFile() {
      debugger
      if (this.fileInfoId === '') {
        this.$msgInfo('请选择要下载的文件')
        return
      } else {
        const hidden = { shrEdit: true, onlineEdit: true }
        const preset = { hidden }
        const params = Object.assign(this.selectRow, { preset: preset })
        downLoadFile(params).then(res => {
          const disposition = res.headers['content-disposition']
          var blob = new Blob([res.data], { type: 'application/octet-stream' })
          const fileType = disposition ? disposition.substr(disposition.lastIndexOf('.') + 1) : ''
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, params.fileName + '.' + fileType)
          } else {
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = params.fileName // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    pageChange(data) {
      this.paginationQuery.pageSize = data.pagination.pageSize
      this.paginationQuery.pageNumber = data.pagination.pageNum
      this.search()
    },
    shareFile() {
      if (this.multipleSelection.length === 0) {
        this.$msgWarning('请选择要分享的文件')
        return
      }
    },
    search() {
      const params = {
        ...this.paginationQuery,
        filename: this.queryForm.filename
      }
      page(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
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
    },
    handleCurrentChange({ row, column, cell }) {
      this.selectRow = row
    }
  }
}
</script>

<style lang = "sass" scoped>

</style>
