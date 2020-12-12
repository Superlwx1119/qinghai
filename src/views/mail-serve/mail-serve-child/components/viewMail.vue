<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isShowDetail"
    size="big"
    :before-close="handleClose"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <div class="orgEmailContent">
      <div style="margin:10px 0;height:300px">
        <div class="top">
          <b>发件人：</b><span style="color:#0000FF">{{ selectRow.senderName }}</span><br>
          <b>发送时间：</b>{{ selectRow.sendTime |renderTime }}<br>
          <b>收件人：</b><span style="color:#0000FF">{{ selectRow.receiverName }}</span><br>
          <b>抄送人：</b><span style="color:#0000FF">{{ selectRow.ccName |filterState }}</span><br>
          <b>主题：</b>{{ selectRow.title }}<br>
        </div>
        <div class="content">
          <p v-html="selectRow.content">{{ selectRow.content }}</p>
        </div>
      </div>
      <!-- <el-button type="primary" @click="submit">提交</el-button> -->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="reply()">
        <i class="el-icon-s-comment" />
        回复
      </el-button>
      <el-button type="primary" @click="replyAll()">
        <i class="el-icon-s-comment" />
        回复全部
      </el-button>
      <el-button type="primary" @click="forward()">
        <i class="el-icon-right" />
        转发
      </el-button>
      <my-button type="close" @click="closeDialog" />
    </span>
  </form-dialog>
</template>
<script>
export default {
  filters: {
    renderTime(date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    filterState(val) {
      if (val === '') {
        return '无'
      } else {
        return val
      }
    }
  },
  model: {
    prop: 'isShowDetail',
    event: 'closeAll'
  },
  props: {
    daterow: {
      type: Array,
      default: () => []
    },
    isShowDetail: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    selectRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 选择的人员类别  1 收件人  2发件人
      userType: 1,
      fileList: [],
      editorOption: {},
      isSelectShow: false,
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '收件人', prop: 'cc', type: 'custom', span: 24 },
        { label: '抄送人', prop: 'recp', type: 'custom', span: 24 },
        { label: '邮件主题', prop: 'content', type: 'input', message: '请输入', span: 24, rows: 3 },
        { label: '邮件内容', prop: 'emailCont', type: 'custom', span: 24 }
      ],
      itemsDatas1: [
        { label: '收件人', prop: 'cc', type: 'custom', span: 24 },
        { label: '抄送人', prop: 'recp', type: 'custom', span: 24 },
        { label: '邮件主题', prop: 'content', type: 'input', message: '请输入', span: 24, rows: 3 },
        { label: '邮件内容', prop: 'emailCont', type: 'custom', span: 24 },
        { label: '原邮件内容', prop: 'orgEmailContent', type: 'custom', span: 24 }
      ],
      queryForm: {
        cc: '',
        recp: '',
        sendType: '01',
        content: '',
        emailCont: '',
        orgEmailContent: [],
        ccIdList: [],
        recpIdList: []
      },
      rules: {
        content: [
          { required: true, message: '请输入短信主题', trigger: 'blur' }
        ],
        cc: [
          { required: true, message: '请选择收件人', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    isShowDetail(v) {
      if (v) {
        if (this.isForwardMail === true) this.queryForm.content = this.dialogTitle
        if (this.isReplyMail === true) {
          this.queryForm.content = this.dialogTitle
          this.queryForm.cc = this.selectRow.senderName
        }
      }
    }
  },
  methods: {
    isShow(v) {
      this.$emit('closeAll', v)
    },
    resetForm() {
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('closeAll', false)
      this.$emit('search')
    },
    handleClose(done) {
      this.$emit('search')
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
.orgEmailContent{
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin:0 0 16px 0;
  .top{
    border: 1px solid #131313;
    background-color: #f8f8fa65;
    padding: 10px;
    line-height: normal;
    margin-top: 10px;
  }
  .content{
    position: relative;
    width: 100%;
    top: 120px;
    height: auto;
    border-bottom: 1px solid #131313;
    .p{
      line-height: 40px;
      height: 40px;
    }
  }
}
</style>
