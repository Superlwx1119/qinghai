<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="middle"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <el-form :model="queryForm" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上传文件" prop="上传文件">
            <el-upload
              ref="upload"
              class="upload-demo"
              drag
              action="http://10.196.161.40:8080/ips/admin/web/admin/offFileD/upload"
              :on-change="handleChange"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
              :on-success="handleAvatarSuccess"
              :file-list="fileList"
              :http-request="changeRequest"
              multiple
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">只能上传<span style="color:red">png/jpg/doc/docx/xls/xlsx/pdf/rar/zip/7z</span>文件，且不超过20MB</div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="文件说明" prop="文件说明">
            <el-input v-model="queryForm.dscr" type="textarea" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="submitUpload">开始上传</el-button>
    </span>
  </form-dialog>
</template>
<script>
import { upload, offFileAttr } from '@/api/DocumentServices/index'
export default {
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
      default: '文件信息表'
    },
    fixFlag: { // 定点标志（0：非定点，1：定点）
      type: String,
      default: ''
    },
    queCont: { // 查询内容（1：机构，2：药店）
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      queryForm: {
        file: '',
        dscr: ''
      },
      url: ''
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
    // this.url = upload.upload
    this.url = 'http://10.196.161.40:8080/ips/admin/web/admin/offFileD/upload'
  },

  methods: {
    changeRequest(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      upload(formData).then(res => {
        if (res.code === 0) {
          this.offFileAttr(file.file)
        }
      })
    },
    offFileAttr(file) {
      const params = {
        dscr: this.queryForm.dscr,
        fileAddr: '',
        fileInfoId: name,
        fileType: file.name.slice(-4),
        filename: file.name.slice(0, file.name.length - 4),
        ossFilesize: file.size,
        upldTime: ''
      }
      offFileAttr(params).then(res => {
        if (res.code === 0) {
          this.$msgSuccess(res.message)
          this.closeDialog()
          this.$emit('search')
        }
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleAvatarSuccess() {
      this.closeDialog()
      this.$emit('search')
    },
    beforeAvatarUpload(file) {
      const arr = ['application/x-zip-compressed', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/pdf', '']
      const isPass = arr.includes(file.type)
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isPass) {
        this.$message.error('上传文件只能是 png/jpg/doc/docx/xls/xlsx/pdf/rar/zip/7z 格式!')
      }
      if (!isLt20M) {
        this.$message.error('上传文件大小不能超过 20MB!')
      }
      return isPass && isLt20M
    },
    reset() {
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        // this.$refs.tableRef.reset()
      })
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
