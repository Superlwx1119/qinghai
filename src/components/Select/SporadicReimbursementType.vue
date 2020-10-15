<template>
  <!--  零报类型-->
  <el-select
    :value="currValue"
    placeholder="请选择"
    :disabled="_disabled"
    :filterable="allowCreate"
    :allow-create="allowCreate"
    :default-first-option="allowCreate"
    style="width: 100%"
    @input="handleSelectChange($event)"
  >
    <el-option label="普通零报" value="1" />
    <el-option label="特殊零报" value="2" />
  </el-select>
</template>

<script>
export default {
  name: 'SporadicReimbursementType',
  components: {},
  mixins: [],
  props: {
    allowCreate: {
      type: Boolean,
      default: false
    },
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
