<template>
  <el-input
    v-model="searchVal"
    :placeholder="placeholder"
    :size="size"
    :maxlength="maxlength"
    type="text"
    @input="oninput"
  >
    <i slot="prefix" class="el-input__icon el-icon-search" />
  </el-input>
</template>

<script>
export default {
  model: {
    prop: 'content',
    event: 'change'
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    // <input> - placeholder
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    // 尺寸
    size: {
      type: String,
      default: 'small'
    },
    // 延迟时间(单位 1s = 1000)
    delayedTime: {
      type: Number,
      default: 800
    },
    maxlength: {
      type: [String, Number],
      default: '20'
    }
  },
  data() {
    return {
      timeout: null,
      searchVal: ''
    }
  },
  watch: {
    content(newVal) {
      this.searchVal = newVal
    }
  },
  methods: {
    // 输入响应
    oninput(text) {
      this.$emit('change', text.trim())
      this.delayedEmit(text)
    },
    // 延时触发
    delayedEmit(text) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        // 如果延时的值和最新的值不相等，那么则中断此次触发时间
        if (this.searchVal !== text) { return }
        this.$emit('output', text)
      }, this.delayedTime)
    }
  }
}
</script>

