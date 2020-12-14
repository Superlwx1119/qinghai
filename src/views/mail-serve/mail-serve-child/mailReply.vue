<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="big"
    :before-close="handleClose"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <normal-layer :search-number="2">
      <template slot="search-header">
        <template>
          <!-- <el-button type="primary" icon="el-icon-upload2">上传邮件</el-button> -->
          <el-upload
            ref="upload"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary" icon="el-icon-upload2">上传附件</el-button>
            <el-button type="primary" icon="el-icon-s-promotion" @click="sendMail(1)">发送</el-button>
            <el-button type="primary" icon="el-icon-s-order" @click="sendMail(2)">保存草稿</el-button>
          </el-upload>
        </template>
        <FormItems ref="ruleForm" style="margin:1rem 0;" :items-datas="isReplyMail ||isForwardMail=== true? itemsDatas1: itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm">
          <template slot="recp">
            <el-input v-model="queryForm.recp" placeholder="请选择联系人" class="input-with-select" @focus="showAdditem(1)">
              <el-button slot="append" icon="el-icon-search" @click="showAdditem(1)" />
            </el-input>
          </template>
          <template slot="cc">
            <el-input v-model="queryForm.cc" placeholder="请选择联系人" class="input-with-select" @focus="showAdditem(2)">
              <el-button slot="append" icon="el-icon-search" @click="showAdditem(2)" />
            </el-input>
          </template>
          <template slot="emailCont">
            <quill-editor ref="text" v-model="queryForm.emailCont" style="height:20rem; margin-bottom:5rem;" class="myQuillEditor" :options="editorOption" />
            <!-- <el-button type="primary" @click="submit">提交</el-button> -->
          </template>
          <template v-if="isForwardMail || isReplyMail" slot="orgEmailContent">
            <!-- <quill-editor ref="text" v-model="queryForm.orgEmailContent" style="height:20rem; margin-bottom:5rem;" class="myQuillEditor" :options="editorOption" /> -->
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
          </template>
        </FormItems>
      </template>
      <template>
        <select-btn ref="eventClick" v-model="isSelectShow" @rightcheckchange="rightcheckchange" />
      </template>
    </normal-layer>
  </form-dialog>
</template>
<script>
import selectBtn from './components/select'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { offEmailD, saveDraft } from '@/api/Mail'
export default {
  provide() {
    return {
      mailData: this.tableData
    }
  },
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
  components: { selectBtn, quillEditor },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    daterow: {
      type: Array,
      default: () => []
    },
    isDialogVisible: {
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
    },
    // 是否是回复邮件，是为true,否为false
    isReplyMail: {
      type: Boolean,
      default: false
    },
    // 是否是转发邮件，是为true,否为false
    isForwardMail: {
      type: Boolean,
      default: false
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
        { label: '收件人', prop: 'recp', type: 'custom', span: 24 },
        { label: '抄送人', prop: 'cc', type: 'custom', span: 24 },
        { label: '邮件主题', prop: 'emailSbj', type: 'input', message: '请输入', span: 24, rows: 3 },
        { label: '邮件内容', prop: 'emailCont', type: 'custom', span: 24 }
      ],
      itemsDatas1: [
        { label: '收件人', prop: 'recp', type: 'custom', span: 24 },
        { label: '抄送人', prop: 'cc', type: 'custom', span: 24 },
        { label: '邮件主题', prop: 'emailSbj', type: 'input', message: '请输入', span: 24, rows: 3 },
        { label: '邮件内容', prop: 'emailCont', type: 'custom', span: 24 },
        { label: '原邮件内容', prop: 'orgEmailContent', type: 'custom', span: 24 }
      ],
      queryForm: {
        recp: '',
        cc: '',
        sendType: '01',
        emailSbj: '',
        emailCont: '',
        orgEmailContent: [],
        ccIdList: [],
        recpIdList: []
      },
      rules: {
        emailSbj: [
          { required: true, message: '请输入邮件主题', trigger: 'blur' }
        ],
        recp: [
          { required: true, message: '请选择收件人', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(v) {
      if (v) {
        if (this.isForwardMail === true) this.queryForm.emailSbj = this.dialogTitle
        if (this.isReplyMail === true) {
          this.queryForm.emailSbj = this.dialogTitle
          this.queryForm.recp = this.selectRow.senderName
        }
      }
    }
  },
  methods: {
    sendMail(val) {
      this.$refs.ruleForm.elForm.validate((valid) => {
        if (valid) {
          const param = {
            offEmailDetlCDTO: this.queryForm,
            emailCont: this.queryForm.emailCont,
            ccIdList: this.queryForm.ccIdList,
            recpIdList: this.queryForm.recpIdList
          }
          if (val === 1) {
            offEmailD(param).then(res => {
              if (res.code === 0) {
                this.$msgSuccess('发送成功！')
                this.resetForm()
                this.$emit('search')
              }
            }).catch(() => {
              this.resetForm()
            })
          } else {
            saveDraft(param).then(res => {
              console.log(res)
            })
          }
        }
      })
    },
    // 提交附件
    submitUpload() {
      this.$refs.upload.submit()
    },
    isShow(v) {
      this.$emit('closeAll', v)
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs.ruleForm.elForm.resetFields()
        this.$emit('closeAll', false)
      })
    },
    showAdditem(val) {
      this.userType = val
      this.isSelectShow = true
    },
    submit() {
      console.log(this.$refs.text.value)
    },
    rightcheckchange(val) {
      if (this.userType === 1) {
        this.queryForm.recpIdList = JSON.parse(JSON.stringify(val.idlist))
        for (let i = 0; i < val.userlist.length; i++) {
          this.queryForm.recp += val.userlist[i] + ','
        }
      } else {
        this.queryForm.ccIdList = JSON.parse(JSON.stringify(val.idlist))
        for (let i = 0; i < val.userlist.length; i++) {
          this.queryForm.cc += val.userlist[i] + ','
        }
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleClose(done) {
      debugger
      this.$refs.ruleForm.elForm.resetFields()
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
