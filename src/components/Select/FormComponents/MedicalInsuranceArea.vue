<template>
  <el-form-item :label="formLabel" :prop="formProp">
    <el-cascader
      v-if="isCascadar"
      v-model="searchForm[formProp]"
      :options="options"
      :props="{ checkStrictly: isStrictly, value: valueName , label: labelName}"
      :separator="separator"
      clearable
      :placeholder="placeholder"
      style="width: 100%"
    />
    <el-select v-if="!isCascadar" v-model="searchForm[formProp]" clearable style="width: 100%">
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
    isStrictly: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: ''
    },
    isCascadar: {
      type: Boolean,
      default: true
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
    }
  },
  methods: {

  }
}
</script>
