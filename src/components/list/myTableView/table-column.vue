<!--
  表格items，type: selection,index,operation,custom
-->
<template>

  <!-- index -->
  <el-table-column
    v-if="item.type == 'index'"
    type="index"
    :width="item.width || '50'"
    :label="item.label"
    :align="item.align || 'center'"
    :fixed="item.fixed"
  />

  <!-- 操作栏 -->
  <el-table-column
    v-else-if="item.type == 'operation'"
    :align="item.align || 'center'"
    :label="item.label || ''"
    :width="item.width || ''"
    :fixed="item.fixed"
  >
    <template slot-scope="scope">
      <slot name="operation" :row="scope.row" :rowIndex="scope.$index" :prop="item.prop || ''" />
    </template>
  </el-table-column>

  <!-- custom 自定义列表 -->
  <el-table-column
    v-else-if="item.type == 'custom'"
    :prop="item.prop"
    :align="item.align || 'center'"
    :sortable="item.sortable?'custom':true"
    :label="item.label || ''"
    :width="item.width || ''"
    :min-width="getCloumnMinWidth(item)"
    :show-overflow-tooltip="item.showOverflowToolTip ? true: false"
    :fixed="item.fixed"
  >
    <template slot-scope="scope">
      <slot :name="item.slotName ? item.slotName : 'custom'" :row="scope.row" :rowIndex="scope.$index" :prop="item.prop || ''">
        <span>{{ scope.row[item.prop] }}</span>
      </slot>
    </template>
  </el-table-column>

  <!-- 正常 -->
  <el-table-column
    v-else
    :key="item.label + item.prop"
    :prop="item.prop"
    :label="item.label || ''"
    :align="item.align || 'center'"
    :sortable="item.sortable?'custom':true"
    :width="item.width || ''"
    :min-width="getCloumnMinWidth(item)"
    :show-overflow-tooltip="true"
    :fixed="item.fixed"
  >
    <template slot-scope="scope">
      <!-- customProp 特殊处理 -->
      <template v-if="item.customProp">
        <content-handle :item="item" :content="scope.row[item.prop]" />
        <!-- <span>{{ scope.row[item.prop] || '--' }}</span> -->
      </template>

      <!-- normal -->
      <span v-else>{{ textHandle(scope.row[item.prop]) }}</span>

    </template>
  </el-table-column>

</template>

<script>
import ContentHandle from '@/components/ContentHandle'
export default {
  components: {
    ContentHandle
    // ContentHandle: () => import('@/components/ContentHandle')
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getCloumnMinWidth(item) { // 初略计算列最小宽度最小60px
      if (item.minWidth) {
        return item.minWidth
      }
      if (item.label === '证件号码') { // 特殊，证件号码
        return '180px'
      } else if (item.label === '证件类型') { // 特殊， 证件类型
        return '180px'
      } else if (!item.label) {
        return 0
      } else {
        return item.label.length < 3 ? '60px' : item.label.length * 20 + 'px'
      }
    },
    textHandle(text) {
      if (typeof (text) === 'number') {
        return text
      } else {
        return text || '--'
      }
    }
  }
}
</script>
