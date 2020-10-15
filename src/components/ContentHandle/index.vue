<!-- 内容处理 比如说表格里的时间，金额等 -->
<template>
  <!-- 时间 -->
  <span v-if="item.customProp == 'date'">
    {{ content | momentDate('YYYY-MM-DD') }}
  </span>
  <span v-else-if="item.customProp == 'mom-date'">
    {{ content | momentDate(item.format) }}
  </span>
  <!-- 颜色字体内容 -->
  <span v-else-if="item.customProp == 'color-text'" :style="{color: item.textColor || '#000', textAlign: 'right' }">
    {{ (content === null || content === '') ? '0.00' : parseFloat(content).toFixed(2) }}
  </span>
  <!-- table-item 金额展示 -->
  <AmountView v-else-if="item.type === 'amount' || item.customProp === 'amount'" :value="formDatas[item.prop]" />
  <!-- 其他 -->
  <span v-else>{{ content || '--' }}</span>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
  components: {
    AmountView: () => import('@/components/DataComponents/AmountView')
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    content: {
      type: [String, Number],
      default: ''
    },
    formDatas: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
  }
}
</script>
