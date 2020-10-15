<template>
  <!--  业务类型-->
  <el-select :value="currValue" placeholder="请选择" :disabled="_disabled" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="住院" value="1" />
    <el-option label="门诊" value="2" />
  </el-select>
</template>

<script>
export default {
  name: 'BusinessTypes',
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
