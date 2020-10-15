<!-- 上传文件弹框 -->
<template>
  <form-dialog
    class="upload-files-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="middle"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <Upload v-show="!uploadFinish" ref="uploadRef" v-bind="this.$attrs" v-on="$listeners" />
    <Finish v-show="uploadFinish" ref="finishRef" />

    <!-- 上传进度 -->
    <div v-show="isUploading" class="uploadProcess">
      <div class="upload-details-box">
        <div class="upload-text">
          正在上传中，请稍等...
        </div>
        <el-progress :percentage="percentage" />
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <my-button type="close" title="关闭" @click="closeDialog" />
      <my-button v-show="!uploadFinish" type="import" title="开始上传" @click="uploadEvent" />
      <my-button v-show="uploadFinish" type="import" title="继续导入" @click="uploadAgainEvent" />
    </span>
  </form-dialog>

</template>
<script>
import Upload from './upload'
import Finish from './finish'
export default {
  components: {
    Upload,
    Finish
  },
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
      default: '上传文件'
    }
  },
  data() {
    return {
      percentage: 0,
      isUploading: false,
      timerObj: null,
      uploadFinish: false
    }
  },
  methods: {
    // 上传事件
    uploadEvent() {
      if (this.$refs.uploadRef.currentAllFileList.length <= 0) {
        this.$message.error('请选择文件')
        return
      }
      const isHaveNotUploadFile = this.$refs.uploadRef.currentAllFileList.some(item => {
        if (item.status === 'ready') {
          return true
        }
      })
      if (!isHaveNotUploadFile) {
        // this.$msgError('请选择文件')
        this.$message.error('当前文件已全部上传完毕，请继续选择文件')
        return
      }
      this.isUploading = true
      if (this.timerObj) this.timerObj = null
      this.timerObj = setInterval(() => {
        if (this.percentage >= 100) {
          clearInterval(this.timerObj)
          this.isUploading = false
          this.percentage = 0
          this.uploadFinish = true
          return
        }
        this.percentage += 5
      }, 100)
    },
    // 继续上传
    uploadAgainEvent() {
      this.uploadFinish = false
    },
    resetForm() {
      this.uploadFinish = false
      this.percentage = 0
      // this.$refs.ruleFrom.elForm.resetFields()
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    isShow(v) {
      this.$emit('closeAll', false)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.upload-files-wrapper{
  position: relative;
}
.uploadProcess{
  padding: 40px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  .upload-details-box{
    width: 100%;
    padding: 20px;
    height: auto;
    box-sizing: border-box;
    color: $title;
    background: #fff;
    border-radius: 3px;
    .upload-text{
      text-align: left;
    }
  }
}
</style>
