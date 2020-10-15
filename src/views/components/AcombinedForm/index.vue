<template>
  <section class="pf-table">
    <el-table
      v-loading="loading"
      :data="data"
      style="width: 100%"
      :border="isBorder"
      :height="height"
      :indent="200"
      :show-summary="showSummary"
      @selection-change="handleSelect"
    >
      <el-table-column v-if="isExpand && ((!isCustomColumn && columns.length > showColumns) || isCustomColumn)" type="expand" width="50">
        <template slot-scope="props">
          <el-form label-position="" inline class="table-expand">
            <div v-for="(val, i) in columns" :key="i">
              <el-form-item v-if="props.row[val.prop] && props.row[val.prop].length" :label="val.label">
                <el-tooltip class="item" effect="dark" :content="props.row[val.prop]" placement="top-start">
                  <span>{{ props.row[val.prop] }}</span>
                </el-tooltip>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isSelection"
        type="selection"
        width="80"
        align="center"
      />
      <el-table-column v-if="isIndex" :label="indexLabel" type="index" align="center" width="50" />
      <el-table-column
        v-for="(item, index) in simpleColums"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align || 'center'"
        :show-overflow-tooltip=" item.overflow !== undefined || true"
      />
      <el-table-column
        v-if="operates && (!operates.type || operates.type == 'button') && operates.list.filter(_x=>_x.show === true).length > 0"
        ref="fixedColumn"
        :width="operates.width"
        :fixed="operates.fixed"
        :label="operates.label || '操作'"
        align="center"
      >
        <template slot-scope="scope">
          <template v-for="(btn, key) in operates.list">
            <!-- 每行传入operateBtnList数组，可以动态配置哪些操作按钮需要显示，不传表示全部显示  -->
            <el-button
              v-if="(btn.show && !scope.row.operateBtnList) || scope.row.operateBtnList.indexOf(key) > -1"
              :key="btn.id"
              :type="btn.type"
              :icon="btn.icon"
              :disabled="btn.disabled"
              :plain="btn.plain"
              :class="btn.class"
              size="small"
              @click.native.stop.prevent="btn.method(key,scope.row, scope.$index)"
            >{{ btn.label }}
            </el-button>
          <!-- <el-divider v-if="key < operates.list.length - 1" :key="key" direction="vertical" /> -->
          </template>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
export default {
  props: {
    isExpand: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: true
    },
    isIndex: {
      type: Boolean,
      default: false
    },
    indexLabel: {
      type: String,
      default: '序号'
    },
    operates: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    showSummary: { // 是否显示合计
      type: Boolean,
      default: false
    },
    showColumns: { // 数据大时需要折叠
      type: Number,
      default: 5
    },
    isCustomColumn: { // 是否自定义收起时显示的字段
      type: Boolean,
      default: false
    }
  },
  computed: {
    simpleColums() {
      if (this.isCustomColumn) {
        return this.isExpand ? this.columns.filter(item => item.display_colums) : this.columns
      } else {
        return this.columns.slice(0, this.showColumns)
      }
    }
  },
  methods: {
    handleSelect(v) {
      this.$emit('handleSelect', v)
    }
  }
}
</script>
<style lang="scss" scoped>
.table-expand {
    display: flex;
    flex-wrap: wrap;
    /deep/ .el-form-item {
      .el-form-item__label {
            font-weight: 700;
        }
    }
}
// .pf-table {
//     .el-table {
//       min-height: 0 !important;
//     }
//     .is-scrolling-none{
//       min-height: 0 !important;
//     }
//   }
</style>
