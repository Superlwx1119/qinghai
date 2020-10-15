<!-- 证件类型 单选-->
<template>
  <el-select
    v-model="selId"
    :disabled="disabled"
    placeholder="请选择"
    style="width: 100%;"
    @change="valueChange"
  >
    <el-option
      v-for="item in sel_options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rcId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selId: '',
      sel_options: [
        { label: '身份证', value: '身份证' },
        { label: '居民证', value: '居民证' },
        { label: '军官证', value: '军官证' }
      ]
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.selId = newVal
      } else {
        this.selId = ''
      }
    }
  },
  methods: {
    valueChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
