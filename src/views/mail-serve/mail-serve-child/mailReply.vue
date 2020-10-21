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
            <el-button slot="trigger" size="small" type="primary" icon="el-icon-upload2">上传邮件</el-button>
            <el-button type="primary" icon="el-icon-s-promotion" @click="sendMail(1)">发送</el-button>
            <el-button type="primary" icon="el-icon-s-order" @click="sendMail(2)">保存草稿</el-button>
          </el-upload>
        </template>
        <FormItems ref="ruleForm" style="margin:1rem 0;" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm">
          <template slot="cc">
            <el-input v-model="queryForm.cc" placeholder="请选择联系人" class="input-with-select" disabled>
              <el-button slot="append" icon="el-icon-search" @click="showAdditem(1)" />
            </el-input>
          </template>
          <template slot="recp">
            <el-input v-model="queryForm.recp" placeholder="请选择联系人" class="input-with-select" disabled>
              <el-button slot="append" icon="el-icon-search" @click="showAdditem(2)" />
            </el-input>
          </template>
          <template slot="emailCont">
            <quill-editor ref="text" v-model="queryForm.emailCont" style="height:20rem; margin-bottom:5rem;" class="myQuillEditor" :options="editorOption" />
            <!-- <el-button type="primary" @click="submit">提交</el-button> -->
          </template>
        </FormItems>
      </template>
      <template>
        <select-btn v-model="isSelectShow" @rightcheckchange="rightcheckchange" />
      </template>
    </normal-layer>
  </form-dialog>
</template>
<script>
import selectBtn from './compnent/select'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { offEmailD, saveDraft } from '@/api/Mail'
export default {
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
      default: '写邮件'
    }
  },
  data() {
    return {
      // 选择的人员类别  1 收件人  2发件人
      userType: 1,
      fileList: [],
      content: '',
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
      queryForm: {
        cc: '',
        recp: '',
        sendType: '01',
        content: '',
        emailCont: '',
        ccIdList: [],
        recpIdList: []
      },
      rules: {
        content: [
          { required: true, message: '请输入短信主题', trigger: 'blur' }
        ],
        cc: [
          { required: true, message: '请选择收件人', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      console.log(newVal)
    }
  },
  created() {
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
              console.log(res)
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
      this.$emit('closeAll', false)
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
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
        console.log(val)
        this.queryForm.ccIdList = val.idlist
        for (let i = 0; i < val.userlist.length; i++) {
          this.queryForm.cc += val.userlist[i] + ','
        }
      } else {
        console.log(val)
        this.queryForm.recpIdList = val.idlist
        for (let i = 0; i < val.userlist.length; i++) {
          this.queryForm.recp += val.userlist[i] + ','
        }
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
