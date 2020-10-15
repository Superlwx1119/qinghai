<template>
  <!-- 医保区划（级联） -->
  <el-cascader
    :value="currValue"
    style="width: 100%"
    :options="options"
    placeholder="请选择"
    @input="handleSelectChange($event)"
  />
</template>

<script>
export default {
  name: 'InsuranceArea',
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
      currValue: this.value,
      options: [{
        value: '1',
        label: 'A统筹区',
        children: [{
          value: '11',
          label: 'A乡镇',
          children: [{
            value: '111',
            label: 'A街道'
          }]
        }]
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
