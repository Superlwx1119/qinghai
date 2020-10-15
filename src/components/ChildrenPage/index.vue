<!-- 非弹框 铺满 子页面 -->
<template>
  <transition name="el-fade-in-linear">
    <div v-show="show" class="my-children-page-wrapper">
      <!-- 主体内容 -->
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'closeAll'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      this.$emit('closeAll', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-children-page-wrapper{
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: $bg;
  z-index: 999;
}
</style>
