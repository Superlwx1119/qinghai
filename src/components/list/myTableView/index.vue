<!-- 表格通用组件
el-table-column 传参请查看table-column.vue文件
颜色字体以及时间等cloumns传参参考 ContentHandle 组件 （date，mom-date，color-text）
 -->
<template>
  <section :class="['pf-table', sectionHeight ]">
    <!-- 表头配置组件 -->
    <header-config
      v-if="isConfigheader && columns.length > 5"
      v-model="columnsNew"
      :all-colums="expandHandleFinishColumns"
      :min="checboxMin"
      @change="headerCheckboxChange"
    />
    <!-- 表格 -->
    <el-table
      ref="pf-table"
      v-bind="$attrs"
      :data="data"
      :border="border"
      :default-sort="defaultSort"
      :height="tableHeight"
      style="width: 100%"
      :highlight-current-row="highlightCurrentRow"
      :summary-method="getSummaries"
      :header-cell-style="headerCellStyle"
      v-on="$listeners"
      @row-click="rowClick"
      @selection-change="handleSelectionChange"
      @sort-change="sortChangeEvent"
      @expand-change="expandChange"
    >
      <!-- Table 展开行功能 这里仅仅是一个插槽，请在业务页面自行编写 -->
      <template v-if="isExpand">
        <el-table-column type="expand">
          <template slot-scope="props">
            <slot name="expand" :row="props.row">
              <form-items
                :is-grid="false"
                :item-span="6"
                :is-table-expend="true"
                :items-datas="expandItems"
                :form-datas="props.row"
              />
            </slot>
          </template>
        </el-table-column>
      </template>

      <!-- 表格内容部分 -->
      <template v-for="item in columnsNew">
        <!-- 多选框 -->
        <el-table-column
          v-if="item.type == 'selection'"
          :key="item.type"
          type="selection"
          width="55"
          :align="item.align || 'center'"
          :fixed="item.fixed"
          :selectable="item.fn"
        />

        <!-- 多级(二级)表头 -->
        <el-table-column
          v-else-if="item.type === 'multistage'"
          :key="item.label + 'multistage'"
          :align="item.align || 'center'"
          :label="item.label || ''"
          :width="item.width || ''"
          :fixed="item.fixed"
        >
          <template v-for="val in item.childColumns">
            <table-column
              :key="val.label + val.prop + val.slotName"
              :item="val"
            >
              <template v-if="item.type == 'custom'" :slot="val.slotName ? val.slotName : 'custom'" slot-scope="scope">
                <slot :name="val.slotName ? val.slotName : 'custom'" :row="scope.row" :rowIndex="scope.rowIndex">
                  <span>{{ scope.row[val.prop] }}</span>
                </slot>
              </template>
            </table-column>
          </template>
        </el-table-column>

        <!-- 正常一级表格内容 -->
        <table-column
          v-else
          :key="item.label + item.prop"
          :item="item"
          :min-width="item.minWidth|| ''"
        >
          <!-- 操作插槽 -->
          <template v-if="item.type == 'operation'" slot="operation" slot-scope="scope">
            <slot name="operation" :row="scope.row" :rowIndex="scope.rowIndex" />
          </template>
          <!-- 自定义插槽 -->
          <template v-if="item.type == 'custom'" :slot="item.slotName ? item.slotName : 'custom'" slot-scope="scope">
            <slot :name="item.slotName ? item.slotName : 'custom'" :row="scope.row" :rowIndex="scope.rowIndex">
              <span>{{ scope.row[item.prop] }}</span>
            </slot>
          </template>
        </table-column>

      </template>
    </el-table>
  </section>
</template>

<script>
import TableColumn from './table-column'
import TableExpand from './table-expand'
import TableSummaries from './table-summaries'
import HeaderConfig from './headerConfig'
import { deepClone } from '@/utils'

export default {
  components: {
    TableColumn,
    HeaderConfig
  },
  mixins: [TableExpand, TableSummaries],
  props: {
    data: { type: [Array, Object], default: () => [] }, // 列表数据
    columns: { type: Array, default: () => [] },
    height: { type: [Number, String], default: '100%' },
    multipleSelection: { type: Array, default: () => [] }, // 多选 multipleSelection.sync="xxx"
    border: { type: Boolean, default: true },
    haveExpand: { type: Boolean, default: false }, // Table 展开行功能
    checboxMin: { type: [String, Number], default: 7 }, // 头部显示的最小数量
    isConfigheader: { type: Boolean, default: true }, // 是否显示编辑表头按钮
    highlightCurrentRow: { type: Boolean, default: true }, // 当前行高亮
    firstHighlight: { type: Boolean, default: false }, //  默认第一行高亮
    havePagination: { type: Boolean, default: true }, // 表格下是否有分页
    headerCellStyle: { type: Object, default() {
      return { 'text-align': 'center' }
    } }, // 设置表头内容对齐方式
    defaultSort: { type: Object, default() { // 排序
      return {
        order: '', // ascending, descending
        prop: ''
      }
    }
    }
  },
  data() {
    return {
      columnsNew: deepClone(this.columns), // 拿到表头信息之后先赋值
      expandHandleFinishColumns: [] // 展开行处理后的表头信息
    }
  },
  computed: {
    tableHeight() {
      if (this.height === 'auto') {
        return null
      } else {
        return this.height
      }
    },
    sectionHeight() {
      if (this.height === '100%' && this.havePagination) {
        return 'have-pagination-height'
      } else if (this.height === 'auto') {
        return 'height-auto'
      } else {
        return 'height-100'
      }
    }
  },
  watch: {
    columns() {
      this.columnsNew = this.columns
    },
    data(newVal) {
      this.$refs['pf-table'].clearSelection() // 清除多选
      if (!Array.isArray(newVal)) { // 如果传入的值不是数组则设置为空数组
        this.data = []
      }
    }
  },
  created() {
    // getHandleCloumns -> table-expand
    this.getHandleCloumns()
    // getAllCloumns -> table-summaries
    this.getAllCloumns()
  },
  mounted() {
    //  设置首行高亮
    this.$nextTick(() => {
      if (this.firstHighlight) {
        this.$refs['pf-table'].setCurrentRow(this.$attrs.data[0])
      }
    })
  },
  methods: {
    doLayout() {
      this.$refs['pf-table'].doLayout()
    },
    headerCheckboxChange(val) { // 监听checkbox选择项
      this.$nextTick(() => {
        this.$refs['pf-table'].doLayout()
      })
    },
    handleSelectionChange(val) {
      this.$emit('update:multipleSelection', val)
    },
    sortChangeEvent(column) {
      this.$emit('sortChangeEvent', {
        prop: column.prop,
        order: column.order
      })
    },
    clearSort() {
      this.$refs.multipleTable.clearSort()
    },
    rowClick(row, column, cell) {
      this.$emit('rowClick', { row, column, cell })
    },
    expandChange(row, expandedRows) {
      if (expandedRows.length > 0) {
        this.$refs['pf-table'].setCurrentRow(row)
      } else {
        this.$refs['pf-table'].setCurrentRow()
      }
    },
    setCurrentRow() {
      this.$refs['pf-table'].setCurrentRow()
    },
    getSummaries(params) {
      if (params.columns.length > 0 && params.data.length > 0) {
        // 查询进来的时候重载一下表格
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs['pf-table'].doLayout()
          })
        }, 0)
        return this.getSummariesData(params)
      } else {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .pf-table{
    width: 100%
  }
  .height-auto {
    height: auto;
  }
  .height-100 {
    height: 100%;
  }
  /deep/.el-table__empty-block{
    min-height: 100px;
  }
  /deep/.el-table__empty-text{
    position: relative;
    background: #ffffff url(../../../assets/nodata.png) center no-repeat;
    background-size: contain;
    // width: 100%;
    height: 80%;
    min-height: 80px;
    max-height: 150px;
    &::after{
      content: '暂无内容';
      position: absolute;
      width: 100%;
      bottom: -20px;
      line-height: 45px;
      left: 0px;
      text-align: center;
    }
  }
  /deep/.el-table__body-wrapper{
    min-height: 100px;
  }
  /deep/.el-table__fixed-right{
    z-index: 1;
  }
</style>
