<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="big"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <div class="header-box">
      <form-items
        ref="ruleFrom"
        class="ruleFrom"
        :items-datas="formItemsDatas"
        :form-datas="dataForm"
      />
      <div style="margin-left: 10px">
        <my-button type="reset" title="重置" @click="reset" />
        <my-button type="search" title="查询" @click="search" />
      </div>
    </div>

    <Table
      ref="tableRef"
      :is-input-search="false"
      :query-params="dataForm"
      @currentChange="tableSelChange"
    />

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" :disabled="!currentRow" @click="submit">确认</el-button>
    </span>
  </form-dialog>

</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import Table from './table'
export default {
  components: {
    FormItems,
    Table
  },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '协议单位查询'
    }
  },
  data() {
    return {
      sureLoading: false,
      formItemsDatas: [
        { label: '学校管理码', prop: 'empMgtcode', type: 'input', colspan: 8 },
        { label: '学校名称', prop: 'empName', type: 'input', colspan: 8 }
      ],
      dataForm: {
        empMgtcode: '',
        empName: ''
      },
      currentRow: null
    }
  },
  watch: {
    isDialogVisible(newVal) {
      if (newVal) {
        this.search()
      }
    }
  },
  created() {
  },
  methods: {
    reset() {
      this.dataForm = {
        empMgtcode: '',
        empName: ''
      }
    },
    search() {
      this.$nextTick(() => {
        this.$refs.tableRef.iniSearch()
      })
    },
    resetForm() {
      this.reset()
      this.$refs.tableRef.reset()
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    tableSelChange(val) {
      this.currentRow = val
    },
    submit() {
      this.$emit('selectSchool', this.currentRow)
    }
  }
}
</script>
<style lang="scss" scoped>
.header-box{
  width: 100%;
  display: flex;
  .ruleFrom{
    flex: 1
  }
}
</style>
