<template>
  <div>
    <!-- 医疗类别 -->
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
        { label: '普通门诊', value: '2' },
        { label: '门特门慢', value: '3' },
        { label: '生育业务', value: '4' },
        { label: '一类门特', value: '5' },
        { label: '二类门特', value: '6' },
        { label: '市直医保', value: '7' }
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
