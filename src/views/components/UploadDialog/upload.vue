<!-- 文件上传 -->
<template>
  <div class="upload-dialog-wrapper">
    <div v-if="downloadUrl" class="download-box">
      <div class="title">下载模板</div>
      <div class="content">
        <span class="text-content">为提高数据导入的成功率，请下载并使用系统提供的模板。</span>
        <my-button type="export" title="下载模板" />
      </div>
    </div>

    <div class="upload-box">
      <div v-if="downloadUrl" class="title">上传文件</div>
      <div class="content">
        <span>仅支持xlsx，xls文件类型，文件小于5M</span>
        <my-button type="import" @click="selectFiles">选择文件</my-button>
      </div>
      <div class="upload-content">
        <el-upload
          ref="upload"
          action=""
          class="upload-demo"
          :multiple="multiple"
          :limit="limit"
          :accept="accept"
          :http-request="uploadFiles"
          :file-list="fileList"
          :on-change="fileChange"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-exceed="handleExceed"
        >
          <el-button v-show="false" ref="selectfileBtn" slot="trigger" size="small" type="primary">选取文件</el-button>
          <div v-show="showExceed" slot="tip" class="el-upload__tip">{{ '文件最多上传'+limit+'个' }}</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    downloadUrl: { // 下载路径
      type: String,
      default: 'xxx'
    },
    uploadedFiles: { // 已上传文件路径
      type: Array,
      default: () => []
    },
    accept: { // 上传文件类型
      type: String,
      default: 'xls, xlsx'
    },
    multiple: { // 是否可以多选
      type: Boolean,
      default: false
    },
    limit: { // 最大上传文件个数
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      fileList: [ // 这里代表已上传的文件
        // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        // { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      currentAllFileList: [], // 这个是目前所有的文件，里面包括已上传的和未上传的
      showExceed: false
    }
  },
  watch: {
    uploadedUrl(newVal) {
      this.getfileList()
    }
  },
  created() {
    this.currentAllFileList = JSON.parse(JSON.stringify(this.fileList))
    this.getfileList()
  },
  methods: {
    getfileList() {
      // 等实际调接口的时候再做调整
      // this.fileList = this.uploadedFiles
    },
    selectFiles() {
      console.log(this.$refs.selectfileBtn)
      this.$refs.selectfileBtn.$el.click()
    },
    // 自定义上传（暂时放这里不用）
    uploadFiles(data) {
      // eslint-disable-next-line prefer-const
      let formData = new FormData()
      formData.append('uploadfile1', data.file)
      // var loading = this.$loading({
      //   lock: true,
      //   text: '正在上传',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      // this.$fileUpload(formData).then(res => {
      //   loading.close();
      //   this.$message({
      //     message: '上传成功',
      //     type: 'success'
      //   });
      //   res.ret.forEach(item => {
      //     let fileUrl  = config.url.fileDownURL + item.resMap.url;
      //     //上传成功之后把值添加到imglist中
      //     this.fileList.push({url: fileUrl, fileId: item.attachment.id, name:item.attachment.fileName, status: 'success'})
      //   })
      // },err => {
      //   loading.close();
      //   this.$message.error('上传失败');
      // })
    },
    // 删除文件
    handleRemove(file, fileList) {
      this.fileList.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.fileList.splice(index, 1)
          return
        }
      })
    },
    fileChange(file, fileList) {
      this.currentAllFileList = fileList
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.showExceed = true
      this.$message.error('文件数不能超过' + this.limit + '个!')
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-dialog-wrapper{
  padding: 0 50px;
  line-height: 40px;
  box-sizing: border-box;
  .title{
    color: $title;
    font-size: $const;
    font-weight: bold;
  }
  .content{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
/deep/.el-upload-list {
  flex-wrap: wrap;
}
/deep/.upload-demo{
  line-height: 0;
  margin-bottom: 10px;
}
</style>
