<!-- 单位协议学校选择 -->
<template>
  <div class="medical-institutions-select-wrapper">
    <el-popover
      v-model="visible"
      placement="bottom"
      width="600"
      trigger="manual"
    >
      <Table ref="tableElm" :search-val="inputVal" />

      <div slot="reference" class="address-multiple-select-box">
        <el-input v-model="inputVal" placeholder="请选择" clearable :disabled="true">
          <el-button slot="append" icon="el-icon-search" @click="searchClick" />
        </el-input>
      </div>
    </el-popover>

    <search-dialog v-model="searchDialogVisible" @selectSchool="tableSelChange" />
  </div>
</template>

<script>
import SearchDialog from './searchDialog'
export default {
  components: {
    SearchDialog
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
  },
  data() {
    return {
      visible: false,
      inputVal: '',
      searchDialogVisible: false
    }
  },
  watch: {
  },
  methods: {
    searchClick() {
      this.searchDialogVisible = true
    },
    tableSelChange(v) {
      this.searchDialogVisible = false
      this.inputVal = `${v.empName}(${v.empMgtcode})`
      this.$emit('change', v)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
