<!-- 上传完成 -->
<template>
  <div class="upload-finish-wrapper">
    <div>
      <i class="el-icon-success icon" />
      <div>导入完成</div>
    </div>
    <p>
      导入成功数据 <span class="success">{{ successNum }}</span> 条，
      导入失败数据 <span class="error">{{ errorNum }}</span> 条。</p>
    <p>
      <el-link :underline="false" type="primary">下载导入失败数据</el-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    successNum: {
      type: Number,
      default: 0
    },
    errorNum: {
      type: Number,
      default: 0
    },
    downloadUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-finish-wrapper{
  padding: 0 50px;
  line-height: 30px;
  box-sizing: border-box;
  text-align: center;
  color: $title;
  .icon{
    font-size: 60px;
    color: $--color-primary;
  }
  .success{
    color: $--color-primary;
  }
  .error{
    color: $--color-danger;
  }
}
</style>
