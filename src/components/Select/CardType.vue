<template>
  <!--  证件类型-->
  <el-select :value="currValue" placeholder="请选择" :disabled="_disabled" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="社会保障号" value="1" />
    <el-option label="身份证号" value="2" />
    <el-option label="医保电子凭证" value="3" />
    <el-option label="医保就医号" value="4" />
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
