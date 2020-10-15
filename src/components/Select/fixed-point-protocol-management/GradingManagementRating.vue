<template>
  <!--  分级管理评定等级-->
  <el-select :value="currValue" placeholder="请选择" :disabled="_disabled" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="AAA" value="1" />
    <el-option label="AA" value="2" />
    <el-option label="A" value="3" />
    <el-option label="无级别" value="4" />
    <el-option label="未评定" value="5" />
  </el-select>
</template>

<script>
export default {
  name: 'CardType',
  components: {},
  mixins: [],
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currValue: this.value
    }
  },
  computed: {
    _disabled: function() {
      return this.disabled
    }
  },
  watch: {
    value: function(newValue) {
      this.currValue = newValue
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 选择卡种类
    handleSelectChange(v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style scoped>

</style>
