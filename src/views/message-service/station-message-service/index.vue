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
          <el-button type="primary" @click="Editbutton('Edit')">写信</el-button>
          <el-button type="primary" @click="Editbutton('reply')">回复</el-button>
          <el-button type="primary" @click="Editbutton('unreadLetter')">站内未读信</el-button>
          <el-button type="primary" @click="Editbutton('read')">标记已读</el-button>
          <el-button type="primary" @click="Editbutton('send')">发件箱</el-button>
        </div>
      </div>
      <template>
        <my-table-view v-loading="loading" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData" @rowClick="handleCurrentChange">
          <template slot="select" slot-scope="scope">
            <el-radio v-model="rid" :label="scope.row.rid">{{ '' }}</el-radio>
          </template>
          <template slot="sendTime" slot-scope="scope">
            {{ scope.row.sendTime | renderTime }}
          </template>
          <template slot="status" slot-scope="scope">
            <state-tag :tag-type="scope.row.status | filterState" :title="scope.row.status === '1'?'已读':'未读'" />
          </template>
          <template slot="operation" slot-scope="scope">
            <my-button icon="detail" @click="showDialog(scope.row)" />
            <my-button icon="delete" @click="deleteRow(scope.row)" />
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery1" @refresh="pageChange1" />
      </template>
    </normal-layer>
    <Add v-model="isShowAdd" :dialog-title="dialogTitle" :select-row="selectRow" :is-write-letters="isWriteLetters" :is-reply-letters="isReplyLetters" @search="search" />
    <OutBox v-model="isShowOutBox" />
    <Inbox v-model="isShowInbox" :inbox-data="inboxData" @Editbutton="Editbutton" @search="search" />
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
import Add from './add'
import OutBox from './outbox'
import { page, share, getUnReadMsg, mkread, deleteInterMailByReceiver } from '@/api/MessageServer'
import Inbox from './inbox.vue'
export default {
  name: 'StationMessageService',
  components: { FormItems, NormalLayer, Add, OutBox, Inbox },
  filters: {
    renderTime(date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    filterState(val) {
      if (val === '0') {
        return 'nopass'
      } else if (val === '1') {
        return 'pass'
      }
    }
  },
  mixins: [pageHandle],
  data() {
    return {
      loading: false,
      dialogTitle: '',
      queryForm: {},
      isShowAdd: false,
      isShowOutBox: false,
      isShowInbox: false,
      isInboxTitle: '',
      isWriteLetters: false,
      isReplyLetters: false,
      itemsDatas: [
        { label: '标题', prop: 'ttl', type: 'input', message: '请输入' }
      ],
      columns: [
        { type: 'custom', prop: 'select', slotName: 'select', label: '选择', width: 55 },
        { type: 'index', label: '序号' },
        { label: '已读标志', prop: 'status', type: 'custom', slotName: 'status', minWidth: '100' },
        { label: '标题', prop: 'title' },
        { label: '内容', prop: 'content' },
        { label: '发件人', prop: 'senderName' },
        { label: '收取时间', prop: 'sendTime', type: 'custom', minWidth: '100', slotName: 'sendTime' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: [],
      rid: '',
      selectRow: {},
      inboxData: {},
      paginationQuery1: { pageSize: 10, pageNumber: 1, total: 0, startRow: 0, endRow: 0 }
    }
  },
  computed: {},
  watch: {},
  created() {
    share().then(res => {
      sessionStorage.setItem('addressBooklist', JSON.stringify(res.data.result))
      this.search()
    }).catch(err => console.log(err))
  },
  mounted() {},
  methods: {
    search() {
      const that = this
      that.loading = true
      const param = {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        ...that.queryForm
      }
      page(param).then(res => {
        that.loading = false
        that.tableData = res.data.result
        this.paginationQuery1 = {
          pageSize: res.data.pageSize,
          pageNumber: res.data.pageNumber,
          total: res.data.total,
          startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
          endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
        }
      }).catch(() => {
        that.loading = false
      })
    },
    Editbutton(value, rid) {
      debugger
      switch (value) {
        case 'Edit':
          this.isShowAdd = true
          this.dialogTitle = '站内消息信息表'
          this.isWriteLetters = true
          break
        case 'reply':
          if (this.rid === '') {
            this.$msgInfo('请选择邮件')
          } else {
            this.isShowAdd = true
            this.dialogTitle = '站内消息信息表'
            this.isReplyLetters = true
            this.selectRow
          }
          break
        case 'unreadLetter':
          this.loading = true
          getUnReadMsg({ pageSize: this.paginationQuery1.pageSize, pageNumber: this.paginationQuery1.pageNumber, total: 0 }).then(res => {
            if (res.code === 0) {
              this.loading = false
              this.tableData = res.data.data
              this.paginationQuery1 = {
                pageSize: res.data.pageSize,
                pageNumber: res.data.pageNumber,
                total: res.data.recordCounts,
                startRow: res.data.startRow,
                endRow: res.data.endRow
              }
            }
          }).catch(() => {
            this.loading = false
          })
          break
        case 'read':
          if (this.rid === '') {
            this.$msgInfo('请选择邮件')
          } else {
            this.loading = true
            mkread(this.selectRow.rid).then(res => {
              if (res.code === 0) {
                this.loading = false
                this.$msgSuccess(res.message)
                this.search()
              }
            }).catch(() => {
              this.loading = false
            })
          }
          break
        case 'send':
          this.isShowOutBox = true
          break
      }
    },
    // 查看详情
    showDialog(row) {
      this.isShowInbox = true
      this.isInboxTitle = '信息：'
      this.inboxData = row
    },
    // 删除行
    deleteRow(row) {
      this.$msgConfirm(`是否刪除站内信:【${row.title}】?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteInterMailByReceiver(row.rid).then(res => {
          if (res.code === 0) {
            this.loading = false
            this.$msgSuccess(this.message)
            this.search()
          }
        }).catch(() => {
          this.loading = false
        })
      })
    },
    // 切换分页
    pageChange1(v) {
      this.paginationQuery1.pageSize = v.pagination.pageSize
      this.paginationQuery1.pageNumber = v.pagination.pageNum
      this.search()
    },
    handleCurrentChange({ row, column, cell }) {
      this.selectRow = row
    }
  }
}
</script>
