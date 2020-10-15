<!-- 统一样式 标题 -->
<!-- 注意： 一定要其父级有clss="box"才能有效果
因为使用的全局样式，默认box-header受box影响
-->
<template>
  <div v-if="titleName.length > 0" :class="['box-header', titleNeedHandle ? 'handle' : '']">
    <span class="box-title">{{ titleName }}</span>
    <div v-if="titleNeedHandle" class="box-tools">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: [Number, String],
      default: ''
    },
    titleNeedHandle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.box-header{
  line-height: 16px !important;
}
.handle{
  line-height: 52px !important;
}
</style>
