<template>
  <!--  证件类型-->
  <el-select :value="currValue" placeholder="请选择" :disabled="_disabled" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="居民身份证" value="1" />
    <el-option label="士官证" value="2" />
    <el-option label="学生证" value="3" />
    <el-option label="驾驶证" value="4" />
    <el-option label="护照" value="5" />
    <el-option label="港澳通行证" value="6" />
    <el-option label="其他" value="6" />
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
