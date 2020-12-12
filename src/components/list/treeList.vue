<template>
  <section class="pf-table">
    <section class="table-list">
      <el-table
        ref="pfTable"
        v-loading="loading"
        :data="data"
        :size="size"
        :border="isBorder"
        :lazy="lazy"
        :load="lazyLoad"
        :default-selections="defaultSelections"
        row-key="id"
        style="width: 100%"
        :row-class-name="rowClassName"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @select="select"
        @select-all="selectAll"
      >
        <el-table-column v-if="isExtend" type="expand">
          <template slot-scope="scope">
            <component :is="expandComponent.name" :row-data="scope.row" />
          </template>
        </el-table-column>
        <el-table-column v-if="isSelection" type="selection" align="center" />
        <el-table-column v-if="isIndex" :label="indexLabel" type="index" align="center" width="50" />
        <!-- 数据栏 -->
        <el-table-column
          v-for="(column, index) in columns"
          :key="column.id"
          :sortable="column.sortable"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :align="column.align"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)" />
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index" />
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="operates && (!operates.type || operates.type == 'button') && operates.list.filter(_x=>_x.show === true).length > 0"
          ref="fixedColumn"
          :width="operates.width"
          :fixed="operates.fixed"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <template v-for="(btn, key) in operates.list">
              <el-button
                v-if="btn.show"
                :key="btn.id"
                :type="btn.type"
                :icon="btn.icon"
                :disabled="btn.disabled"
                :plain="btn.plain"
                size="small"
                @click.native.prevent="btn.method(key,scope.row)"
              >{{ btn.label }}
              </el-button>
              <el-divider v-if="key < operates.list.length - 1" :key="key" direction="vertical" />
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="operates && operates.type == 'dropdown' && operates.list.filter(_x=>_x.show === true).length > 0"
          ref="fixedColumn"
          :width="operates.width"
          :fixed="operates.fixed"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <template v-for="(btn, key) in operates.list">
                  <el-dropdown-item v-if="btn.show" :key="key" class="mini-dropdown-item" @click.native.prevent="btn.method(key,scope.row)">{{ btn.label }}</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'TreeList',
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) {
          params.column = ctx.props.column
        }
        return ctx.props.render(h, params)
      }
    }
  },
  props: {
    url: String,
    // 表格型号：mini,medium,small
    size: { type: String, default: 'medium' },
    isBorder: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },

    tableHandles: { type: Array, default: () => [] },
    // 表格列配置
    columns: { type: Array, default: () => [] },
    // 表格数据
    data: { type: Array, default: () => [] },
    // 操作按钮组 label: 文本，type :类型（primary / success / warning / danger / info)
    operates: {},
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    // 是否展开行
    isExtend: { type: Boolean, default: false },
    // 展开行内容
    expandColumn: { type: Object, default: () => {} },
    defaultSelections: { type: [Array, Object], default: () => null },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: '序号' },
    expandComponent: { type: Object, default: () => {} },
    rowClassName: { type: String, default: '' }, //
    lazy: { type: Boolean, default: false }, // 是否懒加载
    lazyLoad: { type: Function, default: null } // 懒加载函数
  },
  data() {
    return {
    }
  },
  watch: {
    'defaultSelections'(val) {
      this.$nextTick(function() {
        if (Array.isArray(val)) {
          val.forEach(row => {
            this.$refs.pfTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.pfTable.toggleRowSelection(val)
        }
      })
    }
  },
  created: function() {
    this.$on('update', function() {
      this.$refs.pfTable.bodyWrapper.scrollTop = 0
    })
    if (this.expandComponent) {
      this.registerComponent(this.expandComponent)
    }
  },
  mounted() {
    // TODO 计算高度
  },
  methods: {
    // 表格勾选
    select(rows, row) {
      this.$emit('handleSelect', rows)
    },
    // 全选
    selectAll(rows) {
      this.$emit('handleSelect', rows)
    },
    toggleRowSelection(row) {
      this.$refs.pfTable.toggleRowSelection(row)
    },
    registerComponent(expand) {
      var url = expand.moduleType + '/' + expand.name
      console.log('引入url:' + url)
      return import('@/views/' + url + '.vue').then((component) => {
        console.log('引入组件！！', component)
        return Vue.component(expand.name, component.default)
      })
    }
  }
}
</script>
<style>
  .table-list .cell .el-dropdown{
    font-size: 12px;
    color: #068bff;
    cursor: pointer;
  }
  .mini-dropdown-item.el-dropdown-menu__item{
    font-size: 12px;
  }
  .gray-bg td.el-table__expanded-cell {
    background: #f8f8f8;
  }
  .gray-bg .el-table__expanded-cell:hover {
    background-color: #f8f8f8 !important;
  }
  .el-table--enable-row-transition .el-table__body td.el-table__expanded-cell {
    -webkit-transition: none;
    transition: none;
  }
</style>
