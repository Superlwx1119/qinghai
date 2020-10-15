<template>
  <el-form-item :label="formLabel" :prop="formProp">
    <el-select v-model="searchForm[formProp]" :filterable="isFilter" :clearable="isClearable" style="width: 100%">
      <el-option
        v-for="item of options"
        :key="item[valueName]"
        :label="item[labelName]"
        :value="item[valueName]"
        :placeholder="placeholder"
      />
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  props: {
    searchForm: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Array,
      default: () => []
    },
    valueName: {
      type: String,
      default: 'value'
    },
    labelName: {
      type: String,
      default: 'label'
    },
    formLabel: {
      type: String,
      default: '就医地'
    },
    formProp: {
      type: String,
      default: 'medicalLand'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    isFilter: {
      type: Boolean,
      default: false
    },
    isClearable: {
      type: Boolean,
      default: true
    }
  }
}
</script>
