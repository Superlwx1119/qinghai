<template>
  <!--  收款账户-->
  <el-select :value="currValue" placeholder="请选择" :disabled="_disabled" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="医保(金融)账户" value="1" />
    <el-option label="其它账户" value="2" />
  </el-select>
</template>

<script>
export default {
  name: 'PaymentAccount',
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
      this.$emit('change', v)
    }
  }
}
</script>

<style scoped>

</style>
