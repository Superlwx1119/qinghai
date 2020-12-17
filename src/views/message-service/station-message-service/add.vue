<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="big"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <normal-layer :search-number="2">
      <template slot="search-header">
        <div slot="table-title" class="box-header handle">
          <span class="box-title">短信信息表</span>
        </div>
        <form-items ref="queryForm" :key="indexKey" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm">
          <template slot="ttl">
            <el-input v-model="queryForm.ttl" class="input-with-select" :disabled="isReplyLetters" />
          </template>
          <template slot="userNameList">
            <el-input v-model="queryForm.userNameList" placeholder="请选择联系人" class="input-with-select" :disabled="isReplyLetters">
              <el-button slot="append" icon="el-icon-search" @click="showAdditem()" />
            </el-input>
          </template>
        </form-items>
      </template>
    </normal-layer>
    <select-btn v-model="isShowAdd" @rightcheckchange="rightcheckchange" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send()">发送</el-button>
    </span>
  </form-dialog>
</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import { reply, offMsgD } from '@/api/MessageServer'
import selectBtn from './select'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { FormItems, selectBtn },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    fixFlag: {
      type: String,
      default: ''
    },
    queCont: {
      type: String,
      default: ''
    },
    selectRow: {
      type: Object,
      default: () => {}
    },
    // 写信
    isWriteLetters: {
      type: Boolean,
      default: false
    },
    // 回复
    isReplyLetters: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '标题', prop: 'ttl', type: 'custom', span: 24 },
        { label: '接收人', prop: 'userNameList', type: 'custom', span: 24 },
        { label: '内容', prop: 'cont', type: 'textarea', message: '请输入', span: 24, rows: 3 }
      ],
      queryForm: {
        admdvs: '',
        cont: '',
        replyMsgId: '',
        ttl: '',
        userIdList: [],
        userNameList: ''
      },
      multipleSelection: [],
      fileList: [],
      columns: [
        { type: 'index', label: '序号' },
        { label: '姓名', prop: 'userName', width: '120px' },
        { label: '所属部门', prop: 'orgName', width: '120px' },
        { label: '手机号码', prop: 'mob' },
        { label: '操作', type: 'operation', fixed: 'right', width: '200px' }
      ],
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      },
      rules: {
        ttl: [
          { required: true, message: '请输入短信标题', trigger: 'blur' }
        ],
        userNameList: [
          { required: true, message: '请选择联系人', trigger: 'blur' }
        ],
        cont: [
          { required: true, message: '请输入短信内容', trigger: 'blur' }
        ]
      },
      tableData: [],
      indexKey: 0
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible: {
      handler(v) {
        if (v) {
          if (this.isReplyLetters) {
            this.queryForm.replyMsgId = this.selectRow.rid
            this.queryForm.ttl = this.selectRow.title
            this.queryForm.userIdList.push(this.selectRow.sender)
            this.queryForm.userNameList = this.selectRow.senderName
          } else {
            // this.queryForm = {}
            this.indexKey++
          }
        }
      },
      deep: true
    }
  },
  created() {
  },

  methods: {
    send() {
      console.log(this.$refs.queryForm.elForm)
      this.$refs.queryForm.elForm.validate((valid) => {
        if (valid) {
          const params = {
            ...this.queryForm
          }
          if (this.isWriteLetters === true) {
            offMsgD(params).then(res => {
              if (res.code === 0) {
                this.$msgSuccess(res.message)
                this.closeDialog()
                this.$emit('search')
              }
            })
          } else if (this.isReplyLetters === true) {
            reply(params).then(res => {
              if (res.code === 0) {
                this.$msgSuccess(res.message)
                this.closeDialog()
              }
            })
          }
        }
      })
    },
    showAdditem(value) {
      this.isShowAdd = true
    },
    deleteRow(row) {
      this.tableData.splice(row.rowIndex, 1)
    },
    rightcheckchange(val) {
      this.queryForm.userIdList = JSON.parse(JSON.stringify(val.idlist))
      console.log(val)
      for (let i = 0; i < val.userlist.length; i++) {
        this.queryForm.userNameList += val.userlist[i] + ','
      }
    },
    reset() {
    },
    closeDialog() {
      this.$refs.queryForm.elForm.resetFields()
      this.$emit('closeAll', false)
      this.$emit('closeInbox')
    },
    pageChange(data) {
      this.paginationQuery.pageSize = data.pagination.pageSize
      this.paginationQuery.pageNumber = data.pagination.pageNum
      this.search()
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        // this.$refs.tableRef.reset()
      })
    },
    search() {

    }
  }
}
</script>
<style lang="scss" scoped>
.header-box{
  width: 100%;
  margin-bottom: 10px;
}
i{
  color: rgba(27, 109, 209,1);
}
</style>
