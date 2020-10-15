<template>
  <div>
    <!-- 异地医药机构类型 -->
    <el-select v-model="selectValue" placeholder="请选择医疗关系类别" @change="handleSelectChange">
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
        { label: '定点医药机构', value: '1' },
        { label: '定点零售药店', value: '2' },
        { label: '工伤定点康复机构', value: '3' },
        { label: '辅助器具配置机构', value: '4' },
        { label: '计划生育服务机构', value: '5' }
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
