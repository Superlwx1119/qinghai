<!-- 非标准下两栏布局（不做头部搜索样式，只动态监听头部的高度
来动态计算底下一栏的高度） -->
<template>
  <div ref="autoSizeBox" class="third-index">
    <section ref="headerSizeBox" class="layer header-box">
      <slot name="header" />
    </section>
    <section ref="contentSizeBox" class="layer content-box">
      <slot />
    </section>
  </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  data() {
    return {
      erd: null
    }
  },
  mounted() {
    this.erd = elementResizeDetectorMaker()
    var _this = this
    const elObj = this.$refs.autoSizeBox
    const headObj = this.$refs.headerSizeBox
    this.erd.listenTo(elObj, function(element) {
      _this.autoHeight(element)
    })
    this.erd.listenTo(headObj, function(element) {
      _this.autoHeight(element)
    })
  },
  beforeDestroy() {
    const elObj = this.$refs.autoSizeBox
    const headObj = this.$refs.headerSizeBox
    this.erd.uninstall(elObj)
    this.erd.uninstall(headObj)
  },
  methods: {
    autoHeight(element) {
      if (this.$refs.autoSizeBox && this.$refs.headerSizeBox) {
        const height = this.$refs.autoSizeBox.offsetHeight
        const header_height = this.$refs.headerSizeBox.offsetHeight
        this.$refs.contentSizeBox.style.height = (height - header_height - 10) + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
