<template>
  <el-tag
    class="files-tag-box"
    closable
    color="transparent"
    type="danger"
    :disabled="disabled"
    @close="handleClose"
  >
    <slot>
      <el-link :underline="false" type="primary" title="点击下载" @click="downloadClick">{{ content }}</el-link>
    </slot>
  </el-tag>
</template>

<script>
import { fileDownload } from '@/api/Common/FileRequest'
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fileId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    downloadClick() {
      const params = {
        fileId: this.fileId
      }
      fileDownload(params).then(res => {
        console.log(res)
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-icon-close {
  vertical-align: sub;
}
.files-tag-box{
  border-color: transparent;
}
// .files-tag-box + .files-tag-box {
//   margin-left: 10px;
// }
</style>
