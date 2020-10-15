<!-- 用于在表格中展示相关的状态的标签 -->

<!--
    审核状态

    name：  状态名

    type：  状态类型（用于展示颜色）

-->

<template>
  <el-tag
    :type="type"
    :effect="effect"
    :closable="false"
    :size="size"
  >
    {{ name }}
  </el-tag>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    effect: {
      type: String,
      default: 'light'
    },
    closable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  }
}
</script>
