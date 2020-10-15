<!-- 下载文件，单纯的详情里面的点击链接下载文件 -->
<template>
  <el-link :underline="false" type="primary" title="点击下载" @click="downloadClick">
    <slot> {{ content }} </slot>
  </el-link>
</template>

<script>
import { fileDownload } from '@/api/Common/FileRequest'
export default {
  props: {
    fileId: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
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

</style>
