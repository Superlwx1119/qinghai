<template>
  <!--  注资状态-->
  <el-select :value="currValue" placeholder="请选择" :disabled="_disabled" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="已确认" value="1" />
    <el-option label="未确认" value="2" />
    <el-option label="已发送" value="3" />
    <el-option label="已报盘" value="4" />
    <el-option label="注资成功" value="5" />
    <el-option label="注资失败" value="6" />
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
    handleSelectChange(v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style scoped>

</style>
