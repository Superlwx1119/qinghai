<!-- 左侧查询+列表 -->
<template>
  <div class="search__list">
    <section class="layer layer-query">
      <div class="box">
        <div class="box-body query" :style="{'min-height':searchHeight}">
          <div class="tab-body-search" :style="{'min-height':searchHeight}">
            <!-- 搜索栏插槽 -->
            <slot />
            <el-collapse-transition>
              <div v-show="searchShow">
                <!-- 展开搜索栏插槽 -->
                <slot v-show="searchShow" name="more" />
              </div>
            </el-collapse-transition>
            <div class="text-right">
              <!-- 功能按钮插槽 -->
              <slot name="btn" />
              <el-button v-if="showMoreBtn" @click="searchShow = !searchShow">{{ searchShow?'收起':'展开' }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="layer layer-result" :style="{'height': `calc(100% - (${searchHeight} + 10px))`}">
      <div v-if="type === 'tab'" class="layer-tab">
        <div class="box">
          <div class="box-body">
            <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
              <template v-for="(v, i) in options">
                <el-tab-pane :key="i" :label="v.label" :name="'tab' + i">
                  <template v-if="v.tabBtns && v.tabBtns.length > 0">
                    <section class="btn-groups" style="text-align: right;margin-bottom: 10px;padding-right: 10px;">
                      <el-button v-for="(k, j) in v.tabBtns" :key="j" :type="k.type || 'primary'" @click="k.method">{{ k.label }}</el-button>
                    </section>
                  </template>
                  <List :is-border="true" :first-high-light="true" :is-selection="isSelection" :row-active="true" :row-class-name="'search-table-row'" :columns="_tableColumns(v.tableColumns)" :data="v.tableData" @handleSelect="selectAll" @checkRow="checkRow" />
                </el-tab-pane>
              </template>
            </el-tabs>
          </div>
        </div>
      </div>
      <div v-if="type === 'normal'" class="box">
        <div class="box-header handle">
          <span class="box-title">{{ listTitle }}</span>
          <div class="box-tools">
            <slot name="listTools" />
          </div>
        </div>
        <div class="box-body">
          <List :is-index="true" :is-border="true" :first-high-light="true" :is-selection="isSelection" :row-active="true" :row-class-name="'search-table-row'" :columns="_tableColumns(tableColumns)" :data="tableData" @handleSelect="selectAll" @checkRow="checkRow" />
          <el-pagination :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" layout="total, prev, next, jumper" :total="pageInfo.total" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SearchTable',
  props: {
    //  列表区域类型，normal为普通表格、tab为含tab切换的表格
    type: { type: String, default: 'normal' },
    //  type为tab时，传入多个列表的columns配置和tab配置
    tabOptions: { type: Array, default: () => { return [] } },
    //  显示展开按钮
    showMoreBtn: { type: Boolean, default: true },
    // 搜索栏高度
    searchHeight: { type: String, default: '150px' },
    //  搜索栏标题
    listTitle: { type: String, default: '列表' },
    //  搜索栏表格列
    tableColumns: { type: Array, default: () => { return [] } },
    isSelection: { type: Boolean, default: false },
    //  搜索表格数据
    tableData: { type: Array, default: () => { return [] } },
    //  搜索表格显示几列
    tableColCount: { type: [String, Number], default: 3 },
    // 分页信息
    pageInfo: { type: Object, default: () => { return { pageNum: 1, pageSize: 10, total: 0 } } }
  },
  data() {
    return {
      searchShow: false, // 展开搜索
      activeName: 'tab0', //  当前tab的name
      currTab: null, //  当前tab的label
      options: this.tabOptions //  tab状态下参数
    }
  },
  computed: {
  },
  watch: {
    tabOptions: {
      handler: function() {
        this.options = this.tabOptions
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    //  搜索表格显示几列
    _tableColumns: function(columns) {
      return columns.filter((v, i) => {
        return i < (isNaN(parseInt(this.tableColCount)) ? 3 : parseInt(this.tableColCount))
      })
    },
    //  初始化
    init() {
      if (this.type === 'normal') {
        this.$emit('getListData', this.tableData[0])
      } else if (this.type === 'tab') {
        this.currTab = this.options[0].label
        this.$emit('getTabListData', this.options[0].tableData[0], this.options[0].tableColumns)
      }
    },
    //  tab点击
    tabClick(v) {
      this.currTab = v.label
      this.$emit('getTabListData', this.filterCurrOptions(this.options).currSelect || this.filterCurrOptions(this.options).tableData[0], this.filterCurrOptions(this.options).tableColumns)
    },
    //  点击某一行
    checkRow(v) {
      if (this.type === 'normal') {
        this.$emit('getListData', v)
      } else if (this.type === 'tab') {
        this.$emit('getTabListData', v, this.filterCurrOptions(this.options).tableColumns)
        this.options.forEach(item => {
          if (this.currTab === item.label) {
            this.$set(item, 'currSelect', v)
          }
        })
      }
    },
    //  type==tab下筛选当前tab的options参数
    filterCurrOptions(v) {
      return v.filter(item => {
        return item.label === this.currTab
      })[0]
    },
    //  全选
    selectAll(v) {
      this.$emit('selectAll', v)
    }
  }
}
</script>

<style lang="scss" scoped>
  $list-search-height: 150px; // 搜索栏收起高度
  $active-color: #3BA0F6; // active颜色
  .search__list {
    height: 100%;
    .query {
      padding: 0!important;
      position: relative;
    }
    .pf-table {
      height: calc(100% - 35px);
    }
    .tab-body-search { // 左查询
      position: absolute;
      padding: 10px;
      /*// min-height: $list-search-height;*/
      width: 100%;
      background-color: #FAFAFA;
      overflow-y: hidden;
      z-index: 999;
    }
    /deep/.search-table-row {
      cursor: pointer;
    }
    /deep/.el-pagination .el-pagination__jump {
      margin-left: 0!important;
    }
  }
</style>
