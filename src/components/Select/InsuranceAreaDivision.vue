<template>
  <!--  医保区域划分-->
  <el-select :value="currValue" multiple placeholder="请选择" :disabled="_disabled" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="区域1" value="1" />
    <el-option label="区域2" value="2" />
    <el-option label="区域3" value="3" />
  </el-select>
</template>

<script>
export default {
  name: 'InsuranceAreaDivision',
  components: {},
  mixins: [],
  props: {
    value: {
      type: Array,
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
