<template>
  <!-- 审核标志 -->
  <el-select
    :value="currValue"
    style="width: 100%"
    :disabled="_disabled"
    placeholder="请选择"
    @input="handleSelectChange($event)"
  >
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id" />
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
  },
  data() {
    return {
      currValue: this.value,
      options: [
        { name: '未审核', id: 1 },
        { name: '审核通过', id: 2 },
        { name: '审核未通过', id: 3 }
      ]
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
