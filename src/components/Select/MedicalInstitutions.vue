<template>
  <div>
    <!-- 医疗机构 -->
    <el-select v-model="selectValue" :disabled="disabled" filterable placeholder="请选择" @change="handleSelectChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      /></el-select>
  </div>
</template>

<script type="text/javascript">
export default {
  components: {

  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectValue: '',
      options: [
        { label: 'XXXX人民医院', value: '1' },
        { label: 'XXXX中心医院', value: '2' },
        { label: 'XXXX妇幼保健院', value: '3' },
        { label: 'XXXX卫生院', value: '4' }
      ]
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectValue = val
      },
      immediate: true
    }
  },
  methods: {
    handleSelectChange(v) {
      this.$emit('update:select', v)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
