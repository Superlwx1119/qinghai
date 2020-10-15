<template>
  <el-form-item :label="formLabel" :prop="formProp">
    <el-date-picker
      v-if="dateType === 'daterange'"
      v-model="searchForm[formProp]"
      :type="dateType"
      :range-separator="separator"
      :start-placeholder="placeholder[0]"
      :end-placeholder="placeholder[1]"
      style="width: 100%; height: 100%"
      :format="format"
      :value-format="valueFormat"
    />
    <el-date-picker
      v-if="dateType !== 'daterange'"
      v-model="searchForm[formProp]"
      :type="dateType"
      :placeholder="placeholder[0]"
      style="width: 100%; height: 100%"
      :format="format"
      :value-format="valueFormat"
    />
  </el-form-item>
</template>
<script>
export default {
  props: {
    searchForm: {
      type: Object,
      default: () => {}
    },
    formLabel: {
      type: String,
      default: '日期范围'
    },
    formProp: {
      type: String,
      default: 'dateRange'
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    dateType: {
      type: String,
      default: 'daterange'
    },
    placeholder: {
      type: Array,
      default: () => ['开始日期', '结束日期']
    },
    separator: {
      type: String,
      default: '至'
    }
  }
}
</script>
