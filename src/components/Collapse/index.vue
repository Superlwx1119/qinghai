<!-- 自定义 折叠面板 -->
<template>
  <div ref="collapseBox" class="my-collapse-wrapper" :style="{'height': elHeight}">
    <div ref="contentBox" class="content">
      <div class="content-box">
        <slot />
      </div>
      <div v-if="!hideBtn" v-show="isShow" class="down-btn-box">
        <el-button @click="arrowClick">
          <i :class="['el-icon-arrow-down', 'icon', isArrowDown?'down':'up']" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  model: {
    prop: 'isCollapse',
    event: 'change'
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String],
      default: 100
    },
    hideBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isArrowDown: true,
      isShow: false,
      erd: null
    }
  },
  computed: {
    elHeight() {
      if (this.isArrowDown) {
        const heidhtStr = String(this.height)
        if (heidhtStr.indexOf('px') !== -1 || heidhtStr.indexOf('%') !== -1) {
          return this.height
        } else {
          return this.height + 'px'
        }
      } else {
        // return 'auto'
        return this.$refs.contentBox.offsetHeight + 'px'
      }
    }
  },
  watch: {
    isCollapse(newVal) {
      if (newVal) {
        this.isArrowDown = newVal
      } else {
        // 先显示，然后再把框拉倒最大
        this.$emit('showAll')
        this.$nextTick(() => {
          this.isArrowDown = newVal
        })
      }
    }
  },
  mounted() {
    this.hiddenDropDown()
    this.erd = elementResizeDetectorMaker()
    var _this = this
    const elObj = this.$refs.collapseBox
    this.erd.listenTo(elObj, function(element) {
      _this.$emit('boxChange', {
        windowWidth: window.innerWidth,
        currentBoxWidth: element.offsetWidth,
        currentBoxHeight: element.offsetHeight,
        contentBoxHeight: _this.$refs.contentBox.offsetHeight,
        vueElm: _this
      })
    })
  },
  beforeDestroy() {
    const elObj = this.$refs.collapseBox
    this.erd.uninstall(elObj)
  },
  methods: {
    hiddenDropDown() {
      const contentHeight = this.$refs.contentBox.offsetHeight
      this.isShow = contentHeight > this.height
    },
    arrowClick() {
      if (this.isArrowDown) {
        this.isArrowDown = !this.isArrowDown
        this.$emit('change', this.isArrowDown)
      } else {
        this.$emit('showAll')
        this.$nextTick(() => {
          this.isArrowDown = !this.isArrowDown
          this.$emit('change', this.isArrowDown)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-collapse-wrapper{
  overflow: hidden;
  border-radius: 5px;
  transition: height 0.3s;
  background: #fff;
  .icon{
    transition: transform 0.5s;
  }
  .down{
    transform: rotate(0deg);
  }
  .up{
    transform: rotate(180deg);
  }
}
.content{
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  box-sizing: border-box;
  .content-box{
    flex: 1;
  }
}
.down-btn-box{
  margin: 0 5px;
  /deep/.el-button{
    padding: 5px 8px;
  }
}
</style>

