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
    <el-form :model="formData" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上传文件" prop="上传文件">
            <el-upload
              ref="upload"
              class="upload-demo"
              :action="url"
              :on-change="handleChange"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
              :on-success="handleAvatarSuccess"
              :file-list="fileList"
            >
              <el-input v-model="formData.file" type="text" placeholder="选择文件" />
              <div slot="tip" class="el-upload__tip">只能上传<span style="color:red">png/jpg/doc/docx/xls/xlsx/pdf/rar/zip/7z</span>文件，且不超过20MB</div>
            </el-upload>
          </el-form-item>

        </el-col>
        <el-col :span="24">
          <el-form-item label="文件说明" prop="文件说明">
            <el-input v-model="formData.note" type="textarea" placeholder="请输入" />
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
// import upload from '@/api/DocumentServices/Api'
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
      formData: {
        file: '',
        note: ''
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
    // this.url = process.env.VUE_APP_File_API + upload.upload
    this.url = 'http://10.196.161.40:8080/ips/admin/web/admin/offFileD/upload'
  },

  methods: {
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
