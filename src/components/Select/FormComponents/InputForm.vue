<template>
  <el-form-item :label="formLabel" :prop="formProp">
    <el-input v-model="searchForm[formProp]" clearable :placeholder="placeholder" @input="changeValue" />
  </el-form-item>
</template>
<script>
export default {
  props: {
    formLabel: {
      type: String,
      default: ''
    },
    formProp: {
      type: String,
      default: ''
    },
    searchForm: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  methods: {
    changeValue() {
      this.$emit('changeValue')
    }
  }
}
</script>
