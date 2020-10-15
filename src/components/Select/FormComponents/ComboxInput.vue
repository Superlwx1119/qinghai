<template>
  <el-form-item label="" :prop="inputProp" label-width="0">
    <el-input v-model="searchForm[inputProp]" class="combox-edit" clearable :placeholder="placeholder[1]">
      <el-select slot="prepend" v-model="searchForm[selectProp]" clearable @change="switchType">
        <el-option
          v-for="item of options"
          :key="item[selectValue]"
          :label="item[selectLabel]"
          :value="item[selectValue]"
          :placeholder="placeholder[0]"
        />
      </el-select>
    </el-input>
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
    inputProp: {
      type: String,
      default: ''
    },
    placeholder: {
      type: Array,
      default: () => ['请选择', '请输入']
    },
    selectProp: {
      type: String,
      default: ''
    },
    selectLabel: {
      type: String,
      default: 'label'
    },
    selectValue: {
      type: String,
      default: 'value'
    }
  },
  methods: {
    switchType() {
      this.searchForm[this.inputProp] = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.combox-edit {
    /deep/.el-input-group__prepend {
      width: 120px;
      padding: 0 !important;
      .el-select {
        margin: -10px 0;
      }
    }
  }
</style>
