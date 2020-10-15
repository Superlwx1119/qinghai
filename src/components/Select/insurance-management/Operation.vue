<template>
  <!-- 操作类型 -->
  <el-select
    :value="currValue"
    style="width: 100%"
    :disabled="_disabled"
    placeholder="请选择"
    @input="handleSelectChange($event)"
  >
    <el-option v-for="(v, i) in options" :key="i" :label="v.label" :value="v.value" />
  </el-select>
</template>

<script>
export default {
  name: 'ParamStatus',
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
    // options: Array
  },
  data() {
    return {
      currValue: this.value,
      options: [{
        value: '1',
        label: '零星认定'
      }, {
        value: '2',
        label: '批量认定'
      }]
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

<style scoped lang="scss"></style>
