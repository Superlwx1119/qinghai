<template>
  <div class="progress-wrapper">
    <div class="progress-inner">
      <el-progress :type="type" :text-inside="isInside" :stroke-width="strokeWidth" :percentage="percentage" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    strokeWidth: {
      type: Number,
      default: 12
    },
    isLoaded: {
      type: Boolean,
      default: false
    },
    isInside: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'circle'
    }
  },
  data() {
    return {
      percentage: 0,
      timer: null
    }
  },
  watch: {
    isLoaded: {
      handler: function(val) {
        if (val) {
          clearInterval(this.timer)
          this.percentage = 100
        }
      }
    }
  },
  mounted() {
    this.timer = setInterval(this.handleProgress, 200)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    handleProgress() {
      this.percentage = this.percentage + 4
      if (this.percentage >= 98) {
        this.percentage = 99
        clearInterval(this.timer)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, .6);
    .progress-inner {
        position: absolute;
        width: 300px;
        height: 300px;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -150px;

    }
    >>> .el-progress {
        margin: 0 auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        .el-progress__text {
            color: #fff;
        }
    }
}
</style>
