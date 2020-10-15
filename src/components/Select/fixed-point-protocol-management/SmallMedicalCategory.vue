<template>
  <div>
    <!-- 医疗类别(少的) -->
    <el-select v-model="selectValue" placeholder="请选择" @change="handleSelectChange">
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
    }
  },
  data() {
    return {
      selectValue: '',
      options: [
        { label: '普通住院', value: '1' },
        { label: '门诊特殊病', value: '2' },
        { label: '普通门诊', value: '3' }
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
