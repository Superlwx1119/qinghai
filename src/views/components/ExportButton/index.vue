<!--

  columns 为表格表头数据，由于可能出现多级表头，所以在取展示字段的时候，优先获取 diaplay_label 字段，当未自定义时，自动根据laebl获取

  isDialogVisible 导出弹窗的显示与隐藏

  dialogTitle 导出弹窗的标题； 默认为导出数据

  total 表格的所有数据的条数

  tableTitle 导出的表名

  isRemoteExport 是否可以远程导出

  isColumnsVariable  是否可以动态设置导出的列

  selectData  选择的数据

  tableData  表格的数据
-->

<template>
  <div class="export-component el-button">
    <MyButton type="export" @click="openExport" />
    <ExportFunc
      :is-dialog-visible.sync="isExportVisible"
      :columns="columns"
      :table-data="tableData"
      :select-data="selectData"
      :dialog-title="dialogTitle"
      :table-title="tableTitle"
      :total="total"
      :is-remote-export="isRemoteExport"
      :is-columns-variable="isColumnsVariable"
    />
  </div>
</template>
<script>
import ExportFunc from '@/components/ExportFunc/index'
export default {
  components: {
    ExportFunc
  },
  props: {
    dialogTitle: {
      type: String,
      default: '导出'
    },
    columns: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    tableData: {
      type: Array,
      default: () => []
    },
    selectData: {
      type: Array,
      default: () => []
    },
    tableTitle: {
      type: String,
      default: '表格'
    },
    isRemoteExport: {
      type: Boolean,
      default: false
    },
    isColumnsVariable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isExportVisible: false
    }
  },
  methods: {
    openExport() {
      this.isExportVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.export-component {
    display: inline-block;
    padding: 0 !important;
    border: 0 !important;
}
</style>
