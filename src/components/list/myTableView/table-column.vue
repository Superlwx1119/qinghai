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
      <slot name="operation" :row="scope.row" :rowIndex="scope.$index" />
    </template>
  </el-table-column>

  <!-- custom 自定义列表 -->
  <el-table-column
    v-else-if="item.type == 'custom'"
    :prop="item.prop"
    :align="item.align || 'center'"
    :sortable="item.sortable?'custom':false"
    :label="item.label || ''"
    :width="item.width || ''"
    :min-width="item.minWidth || getCloumnMinWidth(item.label)"
    :show-overflow-tooltip="item.showOverflowToolTip ? true: false"
    :fixed="item.fixed"
  >
    <template slot-scope="scope">
      <slot :name="item.slotName ? item.slotName : 'custom'" :row="scope.row" :rowIndex="scope.$index">
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
    :sortable="item.sortable?'custom':false"
    :width="item.width || ''"
    :min-width="item.minWidth || getCloumnMinWidth(item.label)"
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
      <span v-else>{{ scope.row[item.prop] === 0 ? '0' : scope.row[item.prop] || '--' }}</span>

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
    getCloumnMinWidth(str) { // 初略计算列最小宽度最小60px
      if (!str) {
        return 0
      } else {
        return str.length < 3 ? '60px' : str.length * 20 + 'px'
      }
    }
  }
}
</script>
