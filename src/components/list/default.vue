<template>
  <section class="pf-table">
    <!-- 表头配置组件 -->
    <div v-if="isConfigheader" class="config-header">
      <el-popover
        placement="bottom"
        width="180"
        trigger="click"
      >
        <div class="check-header">
          <el-checkbox-group v-model="checkList" :min="checboxMin">
            <el-checkbox v-for="(item,index) in defaultCheckList" :key="index" :label="item.label" />
          </el-checkbox-group>
        </div>
        <div slot="reference" type="primary">
          <i class="el-icon-s-unfold" />
        </div>
      </el-popover>
    </div>
    <el-table
      ref="pfTable"
      v-loading="loading"
      :data="data"
      size="small"
      :border="isBorder"
      :show-header="showHeader"
      :highlight-current-row="rowActive"
      :height="height"
      :max-height="maxHeight"
      :default-selections="defaultSelections"
      :show-summary="showSummary"
      :summary-method="sumaryMethod"
      :row-class-name="rowClassName"
      :row-key="getRowKey"
      :expand-row-keys="expandKeys"
      style="width: 100%;height:100%;max-height:100%"
      @select="select"
      @select-all="selectAll"
      @row-click="clickRow"
      @current-change="handleCurrentChange"
    >
      <el-table-column v-if="isExtend" type="expand">
        <template slot-scope="props">
          <component :is="expandComponent.name" :row-data="props.row" @refresh="refresh" />
        </template>
      </el-table-column>
      <el-table-column v-if="isSelection" :reserve-selection="reserveSelection" type="selection" align="center" />
      <el-table-column v-if="isIndex" :label="indexLabel" type="index" align="center" width="50" />
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
      <el-table-column
        v-if="operates && operates.type == 'dropdown' && operates.list.filter(_x=>_x.show === true).length > 0"
        ref="fixedColumn"
        :width="operates.width"
        :fixed="operates.fixed"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-dropdown v-if="!scope.row.hiddeMenus || (!!scope.row.hiddeMenus && scope.row.hiddeMenus.length < operates.list.length)">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right " />
            </span>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(btn, key) in operates.list">
                <el-dropdown-item v-if="btn.show && (!scope.row.hiddeMenus || scope.row.hiddeMenus && scope.row.hiddeMenus.filter(item=>item.id == btn.id).length == 0)" :key="key" class="mini-dropdown-item" @click.native.stop.prevent="btn.method(key,scope.row)">{{ btn.label }}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <!-- 数据栏 -->
      <el-table-column
        v-for="(column, index) in columnsNew"
        :key="index"
        :sortable="column.sortable"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :align="column.align"
        :class-name="column.headerClass"
        :show-overflow-tooltip="column.overflow"
      >
        // 自定义表头
        <template v-if="column.header">
          <template slot="header">
            <span v-html="column.header" />
          </template>
        </template>
        <template slot-scope="scope">
          <template v-if="!column.render">
            <template v-if="column.formatter">
              <span v-html="column.formatter(scope.row, column)" />
            </template>
            <template v-else>
              <el-input v-if="scope.row.edit && (!column.type || column.type == 'input')" v-model="scope.row[column.prop]" type="text" size="small" />
              <el-input v-if="scope.row.edit && column.type == 'number'" v-model="scope.row[column.prop]" type="number" size="small" />
              <el-input v-if="scope.row.edit && column.type == 'textarea'" v-model="scope.row[column.prop]" type="textarea" size="small" />
              <template v-if="column.type == 'icon'">
                <svg-icon :icon-class="`${scope.row[column.prop]}`" />
              </template>
              <!-- <pf-dic v-model="scope.row[column.prop]" v-if="scope.row.edit && column.type == 'dic'" :needAll="column.needAll" :type="column.typeName"></pf-dic>
                    <pf-select v-model="scope.row[column.prop]" :options="column.options" v-if="scope.row.edit && column.type == 'select'"></pf-select>
                    <pf-role v-model="scope.row[column.prop]" v-if="scope.row.edit && column.type == 'role-select'"></pf-role>
                    <pf-department-user v-model="scope.row[column.valueProp]" v-if="scope.row.edit && column.type == 'department-user'"></pf-department-user> -->
              <el-date-picker v-if="scope.row.edit && column.type == 'date'" v-model="scope.row[column.prop]" size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
              <template v-if="column.type == 'switch'">
                <el-switch v-model="scope.row[column.prop]" :disabled="column.switchConfig.disabled" active-color="#13ce66" inactive-color="#ff4949" :active-text="column.switchConfig.activeText" :inactive-text="column.switchConfig.inactiveText" />
              </template>
              <template v-if="column.type == 'progress'">
                <el-progress :text-inside="true" :stroke-width="16" :percentage="scope.row[column.prop]" />
              </template>
              <template v-if="column.type == 'tooltip'">
                <el-tooltip :content="scope.row[column.prop]" class="item" effect="dark" placement="top">
                  <span v-if="!scope.row.edit" class="preview">{{ scope.row[column.prop] }}</span>
                </el-tooltip>
              </template>
              <template v-else>
                <span v-if="!scope.row.edit && column.type != 'icon' && column.type != 'link' && column.type != 'switch' && column.type != 'progress'">{{ scope.row[column.prop] }}</span>
                <span v-if="!scope.row.edit && column.type == 'link'" class="preview"> <el-link :underline="false" type="primary" @click="preview(scope.row[column.prop])">{{ scope.row[column.prop] }}</el-link></span>
              </template>
            </template>
          </template>
          <template v-else>
            <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index" :row-index="scope.$index" />
          </template>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'List',
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        rowIndex: Number,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
          rowIndex: ctx.props.rowIndex
        }
        if (ctx.props.column) {
          params.column = ctx.props.column
        }
        return ctx.props.render(h, params)
      }
    }
  },
  props: {
    url: { type: String, default: 'www' },
    // 表格型号：mini,medium,small
    size: { type: String, default: 'small' },
    isBorder: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    showHeader: { type: Boolean, default: true },
    tableHandles: { type: Array, default: () => [] },
    // 表格列配置
    columns: { type: Array, default: () => [] },
    // 表格数据
    data: { type: Array, default: () => [] },
    // 操作按钮组 label: 文本，type :类型（primary / success / warning / danger / info)
    operates: { type: Object, default: () => {} },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    reserveSelection: { type: Boolean, default: false }, // 是否记录分页选中
    // 是否展开行
    isExtend: { type: Boolean, default: false },
    // 展开行内容
    expandColumn: { type: Object, default: () => {} },
    defaultSelections: { type: [Array, Object], default: () => null },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: '序号' },
    expandComponent: { type: Object, default: () => {} },
    rowClassName: { type: String || Function, default: '' }, //
    rowKey: { type: String || Array, default: 'id' },
    enableEdit: { type: Boolean, default: false }, // 是否可编辑
    multiple: { type: Boolean, default: true }, // 是否可多选
    expandKeys: { type: Array, default: () => [] }, // 默认展开行rowKey
    showSummary: { type: Boolean, default: false }, // 是否显示合计
    sumText: { type: String, default: '合计' }, // 合计字段名称
    sumaryMethod: { type: Function, default: null }, // 合计方法
    rowActive: { type: Boolean, default: false },
    height: { type: [String, Number], default: '100%' },
    maxHeight: { type: [String, Number], default: '100%' },
    checboxMin: { type: [String, Number], default: 5 }, // 头部显示的最小数量
    isConfigheader: { type: Boolean, default: false }, // 是否显示编辑表头按钮
    firstHighLight: { type: Boolean, default: false } //  首行高亮
  },
  data() {
    return {
      // 可配置表头
      columnsNew: this.columns, // 拿到表头信息之后先赋值
      checkList: this.columns.map(data => data.label), // 获取默认选中项
      defaultCheckList: this.columns// 默认全部的表头内容
    }
  },
  watch: {
    columns() {
      this.columnsNew = this.columns
    },
    // 监听checkbox选择项
    checkList(valArr) {
      // this.columnsNew = this.defaultCheckList.filter(i => valArr.indexOf(i.map(data => data.label)) >= 0)
      this.columnsNew = this.defaultCheckList.filter(a => {
        return valArr.indexOf(a.label) >= 0
      })
      // this.key = this.key + 1// 为了保证table 每次都会重渲
    },
    'data'(value) {
      value.forEach(element => {
        if (typeof element.edit === 'undefined') {
          element.edit = false
        }
      })
    },
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
    //  设置首行高亮
    this.$nextTick(() => {
      if (this.firstHighLight) {
        this.$refs.pfTable.setCurrentRow(this.data[0])
      }
    })
  },
  methods: {
    delete(key, row, index) {
      this.columns.splice(index, 1)
    },
    // 单选
    handleCurrentChange(row) {
      if (!this.isSelection) {
        this.$emit('handleSelect', row)
      }
    },
    // 表格勾选
    select(rows, row) {
      this.$emit('handleSelect', rows)
    },
    // 全选
    selectAll(rows) {
      this.$emit('handleSelect', rows)
    },
    // 单元格增减点击事件
    preview(rows) {
      this.$emit('clomeTxt', rows)
    },
    // 单击行
    clickRow(row, column, event) {
      if (this.enableEdit) {
        this.data.forEach(element => {
          element.edit = false
        })
        row.edit = true
        this.$set(this.data, event.currentTarget.rowIndex, row)
      }
      this.$emit('checkRow', row)
    },
    // 保存行
    getEditData() {
      return this.data
    },
    // 刷新
    refresh() {
      this.$emit('refresh')
    },
    getRowKey(row) {
      if (Array.isArray(this.rowKey)) {
        var keys = []
        this.rowKey.forEach(element => {
          keys.push(row[element])
        })
        return keys.join('_')
      } else {
        return row[this.rowKey]
      }
    },
    registerComponent(expand) {
      var url = expand.moduleType + '/' + expand.name
      debugger
      return import('@/views/' + url + '.vue').then((component) => {
        return Vue.component(expand.name, component.default)
      })
    }
  }
}
</script>
<style lang="scss">
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
  .el-table td div.el-tabs {
    background: #fff;
    padding: 15px;
    border: 1px solid rgb(244, 244, 244);
  }
  .pf-table {
    height: calc(100% - 34px);
    /* 添加配置表头按钮时添加的 */
    position: relative;
  }
  .pf-table > .table-list > .el-table > div > table > tbody > tr > td.el-table__expanded-cell,
  .pf-table > .table-list > .el-table > div > table > tbody > tr > td.el-table__expanded-cell:hover {
    background: #fbfbfb !important;
    padding: 20px 30px;
  }
/* 可配置表头样式 */
.config-header{
    position: absolute;
    right: 1px;
    top: 1px;
    font-size: 20px;
    z-index: 999;
    color: #636363;
    border-left:1px solid #E0E1E2;
    height: 44px;
    line-height: 44px;
    width: 30px;
    text-align: center;
    background-color: #F0F2F5;
    cursor: pointer;
    /deep/.el-popper[x-placement^="bottom"] {
    margin-top: 12px;
    height: 200px;
    overflow-y: auto;

}
}
.check-header{
  /deep/.el-checkbox-group .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
  .el-checkbox-group{
    .el-checkbox__label{
    }

  }
}
</style>
