<!-- 只能输入数字的输入框 -->
<template>
  <el-input
    v-model="inputValue"
    v-bind="$attrs"
    auto-complete="off"
    autocomplete="off"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="valueInputEvent"
    @keydown.native="keydownEvent"
    @change="valueChange"
    @focus="focus"
    @blur="blur"
  />
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: true
    },
    // 正整数： /^\d+$/
    // 正小数： /^\d+\.\d+$/
    regexpStr: {
      type: RegExp,
      default() {
        return /^-?\d+\.?\d{0,2}$/ // 两位小数正数
      }
    },
    minValue: {
      type: [Number, Object],
      default: null
    },
    maxValue: {
      type: [Number, Object],
      default: null
    },
    maxLength: {
      type: [Number, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.value,
      oldInputValue: this.value
    }
  },
  watch: {
    value(val) {
      if (val === null) {
        this.inputValue = ''
        this.oldInputValue = ''
      } else {
        this.inputValue = val
        this.oldInputValue = val
      }
    }
  },
  methods: {
    valueChange(val) {
      this.$emit('change', val)
    },
    valueInputEvent(val) {
      if (!val) {
        this.$emit('input', this.inputValue)
        return
      }
      if (this.regexpStr && !this.regexpStr.test(val)) {
        this.inputValue = this.oldInputValue
        return
      }
      if (this.minValue != null && val < this.minValue) {
        this.inputValue = this.oldInputValue
        return
      }
      if (this.maxValue != null && val > this.maxValue) {
        this.inputValue = this.oldInputValue
        return
      }
      if (this.maxLength != null && this.maxLength >= 0 && this.inputValue.length > this.maxLength) {
        this.inputValue = this.oldInputValue
        return
      }
      this.$emit('input', this.inputValue)
    },
    keydownEvent(e) {
      this.oldInputValue = this.inputValue
      return true
    },
    focus() {
      this.$emit('focus')
    },
    blur() {
      if (this.inputValue) {
        this.$emit('input', Number(this.inputValue))
        this.inputValue = Number(this.inputValue)
      }
      this.$emit('blur')
    }
  }
}
</script>
