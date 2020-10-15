<template>
  <div>
    <!-- 医疗机构等级 -->
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
        { label: '三级甲等', value: '1' },
        { label: '三级乙等', value: '2' },
        { label: '三级丙等', value: '3' },
        { label: '其他等级', value: '4' }
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
