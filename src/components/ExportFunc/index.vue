<!-- 导出弹窗 -->

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
  <form-dialog
    class="export-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="middle"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <el-form ref="exportForm" class="export-condition" :model="exportForm" label-width="0">
      <el-form-item>
        <p class="title">导出数据</p>
        <el-radio-group v-model="exportForm.dataCount" @change="changeExportMode">
          <el-radio label="1">选中的数据 <span>(选中{{ tableDatas.length }}条)</span></el-radio>
          <el-radio v-if="isRemoteExport" label="2">所有数据 (总计{{ total }}条)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="isColumnsVariable">
        <p class="title">导出字段</p>
        <el-checkbox-group v-model="exportForm.field" size="medium">
          <div class="cloumn-word-wrapper">
            <div v-for="item in fields" :key="item.prop + item.label" class="word-item">
              <el-checkbox-button :label="item.prop"><span class="world-name">{{ item.label }}</span><i class="el-icon-success word-select" /></el-checkbox-button>
            </div>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <p class="title">导出类型</p>
        <el-radio-group v-model="exportForm.type">
          <el-radio label="1">Excel</el-radio>
          <el-radio v-if="isRemoteExport && exportForm.dataCount === '2'" label="2">PDF</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <MyButton type="close" @click="closeDialog" />
      <MyButton type="export" @click="exportData" />
    </span>
  </form-dialog>

</template>
<script>
import { deepClone } from '@/utils/index'
import { momentDate } from '@/filters'
export default {
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '导出数据'
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
      default: true
    },
    isColumnsVariable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      exportForm: {
        dataCount: '1',
        field: [],
        type: '1'
      },
      fields: [],
      tableDatas: []
    }
  },
  watch: {
    isDialogVisible: {
      handler(val) {
        if (val) {
          this.tableDatas = this.selectData.length > 0 ? this.selectData : this.tableData
          this.fields = []
          this.columns.forEach(item => {
            if (item.type === 'multistage' && item.childColumns) {
              item.childColumns.forEach(col => {
                this.exportForm.field.push(col.prop)
                this.fields.push({ label: col.display_label || (item.label + col.label), prop: col.prop, customProp: col.customProp, format: col.format })
              })
            } else if (item.type !== 'selection' && item.type !== 'index' && item.type !== 'operation') {
              this.exportForm.field.push(item.prop)
              this.fields.push({ label: item.diaplay_label || item.label, prop: item.prop, customProp: item.customProp, format: item.format })
            }
          })
          this.exportForm.dataCount = '1'
          this.exportForm.type = '1'
        }
      },
      immediate: true
    }
  },
  methods: {
    resetForm() {
      this.$refs.exportForm.resetFields()
      this.exportForm.field = []
      this.$emit('update:isDialogVisible', false)
    },
    closeDialog() {
      this.$emit('update:isDialogVisible', false)
    },
    isShow(v) {
      this.$emit('update:isDialogVisible', v)
    },
    handleHeadData() {
      const newColums = []
      this.fields.map(item => {
        if (this.exportForm.field.includes(item.prop)) {
          newColums.push(item)
        }
      })
      return newColums
    },
    exportData() {
      // 当导出当前页，并且有选择列，且导出为excel时
      if (this.exportForm.dataCount === '1') {
        if (this.tableDatas.length === 0) {
          this.$msgInfo('暂无导出数据')
          return
        } else if (this.exportForm.field.length === 0) {
          this.$msgInfo('请选择导出的列')
          return
        } else {
          this.exportLocalData()
        }
      }
    },
    // 导出操作
    exportLocalData() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/ExportExcel')
        // 头
        const tHeader = this.handleHeadData().map(item => item.label)
        // 对应的属性
        const filterVal = this.handleHeadData().map(item => item.prop)
        const data = this.formatJson(filterVal, this.handleTableData())

        export_json_to_excel(tHeader, data, this.tableTitle)
      })
    },
    // 处理表格数据, 如时间戳转换
    handleTableData() {
      // const new_data = []
      const copyData = deepClone(this.tableDatas)
      this.handleHeadData().forEach(item => {
        if (item.customProp === 'mom-date') {
          copyData.forEach(val => {
            val[item.prop] = momentDate(val[item.prop], item.format)
          })
        }
      })
      return copyData
    },
    // 格式化数据
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 改变导出方式,当选择本地导出时，只能excel导出
    changeExportMode(v) {
      if (v === '1') {
        this.exportForm.type = '1'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.export-condition {
    >>> .el-form-item {
        .title {
            margin: 0;
            font-weight: 700;
        }
        .cloumn-word-wrapper {
          display: flex;
          flex-wrap: wrap;
            .word-item {
                margin-bottom: 16px;
                margin-right: 10px;
                .el-checkbox-button__inner {
                    width: 100%;
                    border-radius: 4px;
                    padding-left: 0;
                    padding-right: 0;
                }
                .world-name {
                    display: block;
                    margin: 0 28px 0 16px;
                }
                .word-select {
                    font-size: 18px;
                    position: absolute;
                    right: 4px;
                    top: 8px;
                }
            }
        }
    }
}
</style>
