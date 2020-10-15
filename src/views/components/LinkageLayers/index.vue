<!-- 左右切换 联动页面 -->
<template>
  <div ref="linkageLayers" class="linkage-layers-warpper">
    <div class="left-wrapper" :style="{'width': leftWidth}">

      <div ref="leftHeader" class="main-search">
        <div class="layer layer-query">
          <div class="box">
            <div class="box-body">
              <slot name="search-header" />
            </div>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="box">

          <slot name="table-title">
            <!-- titleName titleNeedHandle -->
            <box-title v-bind="this.$attrs">
              <slot name="title-btns" />
            </box-title>
          </slot>

          <div class="box-body">
            <slot />
          </div>

        </div>
      </div>
    </div>

    <div ref="rightWrapper" class="right-wrapper">
      <div class="right-content-box">
        <slot name="rightContent" />
      </div>
    </div>
  </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
import BoxTitle from '../PageLayers/box-title'
export default {
  components: {
    BoxTitle
  },
  props: {
    // 主宽大小，及左宽度大小
    mainWidth: {
      type: String,
      default: '30%'
    },
    // 是否展开
    isExpend: {
      type: Boolean,
      default: false
    },
    // 自动填充开关，当改属性为true的时候，fillWidth才有用
    autoFill: {
      type: Boolean,
      default: true
    },
    // 母宽横向填满最小宽度，当母框大小小于等于改宽度的时候及leftbox充满整个屏幕
    fillWidth: {
      type: [Number, String],
      default: '1000'
    }
  },
  data() {
    return {
      leftWidth: this.mainWidth,
      // 是否目前已经自动填满了
      isAutoFilled: false,
      erd: null
    }
  },
  watch: {
    mainWidth(newVal) {
      if (!this.autoFill || !this.isAutoFilled) {
        this.leftWidth = newVal
      }
    },
    isExpend(newVal) {
      if (newVal && !this.isAutoFilled) {
        this.leftWidth = '100%'
        this.$refs.rightWrapper.style.paddingLeft = '0'
        this.$refs.rightWrapper.style.width = '0'
        this.isAutoFilled = true
      } else if (this.isAutoFilled) {
        this.$refs.rightWrapper.style.width = 'auto'
        this.$refs.rightWrapper.style.paddingLeft = '10px'
        this.leftWidth = this.mainWidth
        this.isAutoFilled = false
      }
    }
  },
  created() {
    if (this.isExpend) {
      this.leftWidth = '100%'
    }
  },
  mounted() {
    if (this.autoFill) {
      this.erd = elementResizeDetectorMaker()
      var _this = this
      const elObj = this.$refs.linkageLayers
      this.erd.listenTo(elObj, function(element) {
        if (_this.autoFill) {
          _this.$emit('layerChange', _this.$refs.leftHeader.style.width)
          _this.autoFileHandel(element)
        } else {
          _this.$emit('layerChange', _this.$refs.leftHeader.style.width)
        }
      })
    }
  },
  beforeDestroy() {
    const elObj = this.$refs.linkageLayers
    this.erd.uninstall(elObj)
  },
  methods: {
    autoFileHandel(element) {
      if (this.isExpend) return
      const width = element.offsetWidth
      if (width < this.fillWidth && !this.isAutoFilled) {
        this.leftWidth = '100%'
        this.$refs.leftHeader.style.height = 'auto'
        this.$refs.rightWrapper.style.paddingLeft = '0'
        this.isAutoFilled = true
        this.$emit('fillAll', this.$refs.leftHeader.style.width)
      } else if (width >= this.fillWidth && this.isAutoFilled) {
        this.$refs.leftHeader.style.height = '150px'
        this.$refs.rightWrapper.style.paddingLeft = '10px'
        this.leftWidth = this.mainWidth
        this.isAutoFilled = false
        this.$emit('notFill', this.$refs.leftHeader.style.width)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.linkage-layers-warpper{
  display: flex;
  width: 100%;
  height: 100%;
  .left-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 2px;
    transition: width 0.5s;
    .main-search{
      height: 150px;
      background: #fff;
      border-radius: 2px;
      background: #fff;
      transition: height 0.4s;
      overflow: hidden;
    }
    .main-content{
      flex: 1;
      margin-top: 10px;
      background: #fff;
      border-radius: 2px;
      overflow: hidden;
    }
  }
  .right-wrapper {
    flex: 1;
    padding-left: 10px;
    height: 100%;
    box-sizing: border-box;
    border-radius: 2px;
    overflow-x: hidden;
    overflow-y: auto;
    .right-content-box{
      height: 100%;
      background: #fff;
      border-radius: 2px;
    }
  }
}
</style>
