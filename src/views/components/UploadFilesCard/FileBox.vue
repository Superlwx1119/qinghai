<!-- 显示上传文件的图片以及文件名称 -->
<template>
  <div class="file-desc-box">
    <img
      v-if="imgUrl && imgUrl.length > 0"
      class="upload-img file-type-video"
      width="80px"
      height="80px"
      :src="imgUrl"
      alt=""
    >
    <img
      v-else-if="fileTypeOrSvgClass"
      class="upload-img file-type-video"
      style="padding: 10px"
      width="80px"
      height="80px"
      :src="require('./svg/' + fileTypeOrSvgClass + '.svg')"
      alt=""
    >
    <i v-else :class="['upload-img', iconClass]" />
    <span
      class="text-line-max-2 file-name"
      :title="textDesc"
    >
      {{ textDesc }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    // 默认使用文件类型判断，使用自定义图标
    playFileType: {
      type: Boolean,
      default: true
    },
    // icon class（使用icon，imgUrl 将失效）
    iconClass: {
      type: String,
      default: 'el-icon-files'
    },
    // 图片链接（使用图片链接，iconClass 将失效）
    imgUrl: {
      type: String,
      default: ''
    },
    textDesc: {
      type: String,
      default: ''
    }
  },
  computed: {
    fileTypeOrSvgClass() {
      if (this.playFileType) {
        let fileType = ''
        const fileTempArr = this.textDesc.split('.')
        if (!(fileTempArr && fileTempArr.length > 0)) {
          return this.iconClass
        }
        const name = fileTempArr[fileTempArr.length - 1].toLowerCase()
        if (name.indexOf('xls') !== -1) {
          fileType = 'xls'
        } else if (name.indexOf('doc') !== -1) {
          fileType = 'doc'
        } else if (name.indexOf('ppt') !== -1) {
          fileType = 'ppt'
        } else if (name.indexOf('pdf') !== -1) {
          fileType = 'pdf'
        }
        // else if (name.indexOf('mp3') !== -1 || name.indexOf('mp4') !== -1) {
        //   fileType = 'video'
        // } else if ('gif|jpg|jpeg|png|GIF|JPG|PNG'.indexOf(name) !== -1) {
        //   fileType = 'picture'
        // }
        return fileType
      }
      return this.iconClass
    }
  }
}
</script>

<style lang="scss" scoped>
// @import url('../../layout/less/user-suzd.less');
.file-desc-box{
  padding:10px;
  box-sizing: border-box;
  height: 100%;
  text-align: center;
  .upload-img{
    // padding: 10px;
    display: inline-block;
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 40px;
    border:1px solid #c0ccda;
    border-radius: 3px;
    box-sizing: border-box;
  }
  .file-name{
    display: block;
    font-size: 12px;
    line-height: 15px;
  }
  // 超出两行省略号
  .text-line-max-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
