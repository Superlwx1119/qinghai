<!-- 超出隐藏 盒子 -->
<template>
  <div ref="beyondHiddenBox" class="beyond-hiddenBox-wrapper">
    <el-tooltip :content="textContent" placement="top" :disabled="disabled">
      <span ref="textContent">{{ textContent || '--' }}</span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    textContent: {
      type: [String, Number],
      default: 'xxxx'
    }
  },
  data() {
    return {
      disabled: true
    }
  },
  mounted() {
    const containerLength = this.$refs.beyondHiddenBox.offsetWidth
    const textLength = this.$refs.textContent.offsetWidth
    if (textLength > containerLength) {
      this.disabled = false
    } else {
      this.disabled = true
    }
  }
}
</script>

<style lang="scss" scoped>
.beyond-hiddenBox-wrapper{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
