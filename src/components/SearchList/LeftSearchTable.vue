<!-- 左侧查询+列表 插槽版 -->
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
            <div class="text-right" style="font-size:0;">
              <!-- 功能按钮插槽 -->
              <slot name="btn" />
              <el-button v-if="showMoreBtn" @click="searchShow = !searchShow">{{ searchShow?'收起':'展开' }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="layer layer-result" :style="{'height': `calc(100% - (${searchHeight} + 10px))`}">
      <slot name="list" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'LeftSearchTable',
  props: {
    //  显示展开按钮
    showMoreBtn: { type: Boolean, default: true },
    // 搜索栏高度
    searchHeight: { type: String, default: '160px' }
  },
  data() {
    return {
      searchShow: false // 展开搜索
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  $list-search-height: 160px; // 搜索栏收起高度
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
      padding: 16px 10px;
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
