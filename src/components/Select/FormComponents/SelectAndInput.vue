<template>
  <el-input v-model="searchForm.account" class="account-edit" clearable placeholder="请输入">
    <el-select slot="prepend" v-model="searchForm.selectType" clearable @change="switchType">
      <el-option
        v-for="item of options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-input>
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
    }
  },
  methods: {
    switchType() {
      this.searchForm.account = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.account-edit {
    /deep/.el-input-group__prepend {
      width: 120px;
      padding: 0 !important;
      .el-select {
        margin: -10px 0;
      }
    }
  }
</style>
