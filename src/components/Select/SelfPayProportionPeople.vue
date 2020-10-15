<template>
  <!--  医保目录自付比例人员类别-->
  <el-select :value="currValue" multiple placeholder="请选择" :disabled="_disabled" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="普通人员门诊" value="1" />
    <el-option label="普通人员住院" value="2" />
    <el-option label="离休门诊" value="3" />
    <el-option label="离休住院" value="4" />
  </el-select>
</template>

<script>
export default {
  name: 'SelfPayProportionPeople',
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
