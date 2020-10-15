<!-- 表格详情 适用于详情查看 -->
<!--
colspan: 1-5, 自己看着调试吧
itemDatas:
[
  [
    { label: '1', prop: '', colspan: 1, rowspan: 1 },
    { label: '2', prop: '', colspan: 1, rowspan: 1 },
    { label: '3', prop: '', colspan: 1, rowspan: 1 }
  ],
  [
    { label: '1', prop: '', colspan: 1, rowspan: 1 },
    { label: '1', prop: '', colspan: 1, rowspan: 1 },
    { label: '1', prop: '', colspan: 1, rowspan: 1 }
  ]
]
-->
<template>
  <table ref="tableDataBox" class="table-data">
    <tbody>
      <tr v-for="(row, index) in itemDatas" :key="index">
        <template v-for="item in row">
          <td
            v-show="!item.labelHidden"
            :key="item.label + item.prop"
            :colspan="item.labelColspan || 1"
            :rowspan="item.rowspan || 1"
            :style="{ width: item.labelWidth || labelWidth+'px' }"
          >
            <template v-if="item.labelSlot">
              <slot :name="item.labelSlot" :item="item" />
            </template>
            <template v-else>
              {{ item.label }}
            </template>
          </td>

          <td
            v-if="item.prop || item.slot"
            :key="item.label || index"
            :colspan="item.colspan || 1"
            :rowspan="item.rowspan || 1"
            :style="{ width: item.propWidth || '218px' }"
          >
            <!-- customProp 特殊处理 -->
            <template v-if="item.customProp || item.type === 'amount'">
              <content-handle :item="item" :content="formDatas[item.prop]" :form-datas="formDatas" />
            </template>

            <template v-else-if="item.slot">
              <slot :name="item.slot" :item="item" :form-datas="formDatas" />
            </template>

            <!-- normal -->
            <template v-else>
              {{ item.prop ? formDatas[item.prop] ? formDatas[item.prop] : '--' : '--' }}
            </template>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ContentHandle from '@/components/ContentHandle'
export default {
  name: 'TableItems',
  components: {
    ContentHandle
  },
  props: {
    itemDatas: {
      type: Array,
      default: () => []
    },
    formDatas: {
      type: Object,
      default: () => {}
    },
    labelWidth: {
      type: Number,
      default: 105
    }
  },
  methods: {
    resetFields() {
      for (const key in this.formDatas) {
        if (typeof (this.formDatas[key]) === 'string') {
          this.$set(this.formDatas, key, '')
        } else if (this.formDatas[key].constructor === Array) {
          this.$set(this.formDatas, key, [])
        } else if (this.formDatas[key].constructor === Object) {
          this.$set(this.formDatas, key, {})
        } else {
          this.$set(this.formDatas, key, null)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-data tr {
  width: 100%;
}
.table-data tr>td{
  line-height: 16px !important;
}
</style>
