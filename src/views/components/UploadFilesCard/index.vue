<!-- 根据项目需求，针对element文件上次再次封装
  可以根据自己项目的需求进行自定义上传文件

  等上传接口调通在做细调

  使用说明：
    <file-upload-element v-model="fileList" />

    fileList： 必须是数组，数组对象必须要保含有：
    {
      status: "success",
      name: '文件名+文件后缀 -> xxx.doc'
      url: '下载的链接地址'
    }
-->
<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-button type="primary" :disabled="disabeld_dou" @click="uploadClick">点击上传（{{ fileList.length }}/{{ maxFiles }}）</el-button>
      <span class="tip-text">
        <slot name="tipText">
          {{ tipText }}
        </slot>
      </span>
    </div>
    <el-upload
      ref="fileUpload"
      class="my-el-file-upload"
      action=""
      name="multifile"
      list-type="picture-card"
      :multiple="multiple"
      :accept="accept"
      :limit="maxFiles"
      :http-request="uploadFiles"
      :auto-upload="true"
      :on-success="uploadFileSuccess"
      :file-list="fileList"
      :disabled="disabeld_dou"
      :on-exceed="handleExceed"
    >
      <i ref="addFile" slot="default" class="el-icon-plus" />

      <div slot="file" slot-scope="{file}" class="file-box">

        <div v-show="file.status == 'uploading'" class="upload-box">
          <i class="el-icon-loading icon-bg" />
        </div>

        <!-- 上传成功后显示文件信息 -->
        <transition name="el-fade-in-linear">
          <div v-show="file.status != 'uploading'">
            <file-box
              :text-desc="file.name || file[fileKeyObj.nameKey]"
              :img-url="getImgUrl(file)"
            />
            <span class="el-upload-list__item-actions" :title="file.name || file[fileKeyObj.nameKey]">
              <span
                v-if="getImgUrl(file)"
                class="el-upload-list__item-preview"
                title="预览"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                class="el-upload-list__item-delete"
                title="下载"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download" />
              </span>
              <span
                v-if="!disabled && needDelete"
                class="el-upload-list__item-delete"
                title="删除"
                @click="handleRemove(file)"
              >
                <i v-show="!file.deleteLoading" class="el-icon-delete" />
                <i v-show="file.deleteLoading" class="el-icon-loading" />
              </span>
            </span>
          </div>
        </transition>
      </div>
    </el-upload>
    <form-dialog
      :title="dialogTitle"
      :is-show="dialogVisible"
      size="big"
    >
      <img width="100%" :src="dialogImageUrl" alt="">
    </form-dialog>

  </div>
</template>

<script>
import FileBox from './FileBox'
import { efileUpload, efileDelete } from '@/api/Common/FileRequest'
import CommonApi from '@/api/Common/Api'
export default {
  components: {
    FileBox
  },
  model: {
    prop: 'fileList',
    event: 'change'
  },
  props: {
    /* 文件列表（特别可以用于编辑初始化已有文件）
        通过v-model传参
        {
          status: "success",
          name: '文件名+文件后缀'
          url: '链接地址'
        }
      */
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    // 文件格式
    accept: {
      type: String,
      // default: '.xls, .xlsx, .doc, .docx, .ppt, .pdf, .mp3, .mp4, .png, .jpg, .jpeg, .gif'
      default: '.xls, .xlsx, .doc, .docx, .pdf, .png, .jpg, .jpeg'
    },
    // 是否可以多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 可选最大文件数
    maxFiles: {
      type: Number,
      default: 10
    },
    maxFileSize: { // 文件上传大小设置(单位M)
      type: Number,
      default: 10
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 提示信息
    tipText: {
      type: String,
      default: '仅支持xls、xlsx、doc、docx、pdf、png、jpg、jpeg文件格式'
    },
    needDelete: {
      type: Boolean,
      default: true
    },
    fileKeyObj: {
      type: Object,
      default: () => {
        return {
          idKey: 'fileId',
          nameKey: 'fileName'
        }
      }
    }
  },
  data() {
    return {
      // currentFiles: [],
      dialogVisible: false,
      dialogTitle: '',
      dialogImageUrl: ''
    }
  },
  computed: {
    disabeld_dou() {
      if (this.disabled || this.fileList.length >= this.maxFiles) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {

  },
  methods: {
    uploadClick() {
      this.$refs.addFile.click()
      // this.$refs.fileUpload.submit()
    },
    getImgUrl(file) {
      if (!file[this.fileKeyObj.nameKey]) return
      const fileTempArr = file[this.fileKeyObj.nameKey].split('.')
      const name = fileTempArr[fileTempArr.length - 1].toLowerCase()
      if ('gif|jpg|jpeg|png|GIF|JPG|PNG'.indexOf(name) !== -1) {
        if (file.url) return file.url
        file.url = process.env.VUE_APP_BASE_API + CommonApi.efileImageQuery + '/' + file[this.fileKeyObj.idKey]
        return file.url
      }
      return ''
    },
    // 自定义上传
    uploadFiles(data) {
      if (data.file.size > this.maxFileSize * 1024 * 1024) {
        this.$message.error('单个文件大小不能超过' + this.maxFileSize + 'MB，请重新选择文件。')
        data.onError()
        return
      }

      const formData = new FormData()
      formData.append('file', data.file)
      data.onProgress({ percent: 0 })

      efileUpload(formData).then(res => {
        data.onSuccess(res.data)
      }).catch(() => {
        data.onError()
      })
    },
    // 上传成功回调
    uploadFileSuccess(response, file, fileList) {
      file[this.fileKeyObj.idKey] = file.response.fileId
      file[this.fileKeyObj.nameKey] = file.response.filename
      // this.currentFiles = fileList
      this.$emit('change', [...fileList])
    },
    // 删除文件
    handleRemove(file) {
      if (file.deleteLoading) return
      this.$msgConfirm('确认删除吗?').then(() => {
        const params = {
          fileId: file.response ? file.response.fileId : file[this.fileKeyObj.idKey]
        }
        this.$set(file, 'deleteLoading', true)
        efileDelete(params).then(res => {
          this.$set(file, 'deleteLoading', false)
          const index = this.fileList.findIndex(item => item.uid === file.uid)
          this.fileList.splice(index, 1)
          this.$message.closeAll()
          this.$message.success('删除成功')
          this.$emit('change', [...this.fileList])
        }).catch(() => {
          this.$nextTick(() => {
            this.$set(file, 'deleteLoading', false)
          })
        })
      }).catch(() => {})
    },
    handleDownload(file) {
      if (file.url) {
        window.open(file.url)
      } else if (file[this.fileKeyObj.idKey]) {
        window.open(process.env.VUE_APP_BASE_API + CommonApi.efileDownload + '?fileId=' + file[this.fileKeyObj.idKey])
      } else {
        this.$message.closeAll()
        this.$message('该文件暂时无法下载')
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogTitle = file[this.fileKeyObj.nameKey]
      this.dialogVisible = false
      this.$nextTick(() => {
        this.dialogVisible = true
      })
    },
    handleExceed() {
      this.$message.closeAll()
      this.$message.error('文件数不能超过' + this.maxFiles + '个!')
    }
  }
}
</script>

<style lang="scss" scoped>
.my-el-file-upload{
  display: flex;
  border: 1px solid #CECECE;
  border-radius: 4px;
  /deep/.el-upload--picture-card{
    // display: none;
    margin: 10px !important;
    width: 80px !important;
    height: 80px !important;
    line-height: 80px !important;
  }
  /deep/.el-upload-list--picture-card .el-upload-list__item{
    width: 100px !important;
    height: auto !important;
    border: none !important;
    margin: 0;
  }
  /deep/.el-upload-list__item-actions{
    padding: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  /deep/.el-upload-list__item:first-child{
    margin-top: 0;
  }
  /deep/.is-disabled + .el-upload--picture-card {
    cursor: no-drop;
  }
}
.file-box{
  height: 100%;
}
.upload-box{
  margin: 10px;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background: rgba(0,0,0,0.5);
  border-radius: 4px;
  .icon-bg{
    font-size: 20px;
    color: #ffc083;
  }
}
.tip-text{
  display: inline-block;
  color: #ccc;
  font-size: 12px;
  vertical-align: bottom;
  line-height: 15px;
}
</style>

