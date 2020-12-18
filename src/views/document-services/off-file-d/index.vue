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
            <my-button icon="edit" @click="editRow(scope.row)" />
            <my-button icon="delete" @click="deleteRow(scope.row)" />
          </template>
          <template slot="upldTime" slot-scope="scope">
            {{ scope.row.upldTime | renderTime }}
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery1" @refresh="pageChange1" />
      </template>
    </normal-layer>
    <Upload v-model="isDialogVisible" @search="search" />
    <Edit v-model="isEditDialog" :is-edit-title="isEditTitle" :row-data="rowData" @search="search" />
    <Share v-model="isShareDialog" :is-share-title="isShareTitle" :row-data="rowData" @search="search" />
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
import Upload from './upload'
import Edit from './edit'
import Share from './share'
import { page, downLoadFile, offFileDelete } from '@/api/DocumentServices/index'
export default {
  name: 'FileManagement',
  components: { FormItems, NormalLayer, Upload, Edit, Share },
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
      isEditDialog: false,
      isShareDialog: false,
      loading: false,
      isEditTitle: '',
      isShareTitle: '',
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
      selectRow: {},
      rowData: {},
      paginationQuery1: { pageSize: 10, pageNumber: 1, total: 0, startRow: 0, endRow: 0 }
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
      if (this.fileInfoId === '') {
        this.$msgInfo('请选择要下载的文件')
        return
      } else {
        const hidden = { shrEdit: true, onlineEdit: true }
        const preset = { hidden }
        const params = Object.assign(this.selectRow, { preset: preset })
        downLoadFile(params).then(res => {
          console.log(res.config.data)
          // const disposition = res.headers['content-disposition']
          // var blob = new Blob([res.data], { type: 'application/octet-stream' })
          // const fileType = disposition ? disposition.substr(disposition.lastIndexOf('.') + 1) : ''
          // if (window.navigator.msSaveOrOpenBlob) {
          //   window.navigator.msSaveOrOpenBlob(blob, res.data.fileName + '.' + fileType)
          // } else {
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(res.data) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = JSON.parse(res.config.data).filename // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          // }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 分享
    shareFile() {
      if (this.fileInfoId === '') {
        this.$msgInfo('请选择要分享的文件')
        return
      } else {
        this.isShareDialog = true
        this.isShareTitle = '分享列表'
      }
    },
    // 修改行
    editRow(row) {
      this.isEditDialog = true
      this.rowData = row
      this.isEditTitle = '文件说明'
    },
    // 删除行
    deleteRow(row) {
      this.$msgConfirm('删除文件会同步删除文件分享信息，是否删除文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        offFileDelete({ id: row.fileUserRltsId }).then(res => {
          if (res.code === 0) {
            this.$msgSuccess('删除成功！')
            this.search()
          }
        })
      }).catch(() => {
        this.$msgInfo('已取消操作')
      })
    },
    pageChange(data) {
      this.paginationQuery.pageSize = data.pagination.pageSize
      this.paginationQuery.pageNumber = data.pagination.pageNum
      this.search()
    },
    search() {
      this.loading = true
      const params = {
        pageNumber: this.paginationQuery1.pageNumber,
        pageSize: this.paginationQuery1.pageSize,
        total: this.paginationQuery1.total,
        filename: this.queryForm.filename
      }
      page(params).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.tableData = res.data.result
          this.paginationQuery1 = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.total,
            startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
            endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
          }
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleCurrentChange({ row, column, cell }) {
      this.selectRow = row
    },
    // 切换分页
    pageChange1(v) {
      this.paginationQuery1.pageSize = v.pagination.pageSize
      this.paginationQuery1.pageNumber = v.pagination.pageNum
      this.search()
    }
  }
}
</script>

<style lang = "sass" scoped>

</style>
