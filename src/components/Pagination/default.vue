<template>
  <section :class="align == 'right' ? 'pagination-right' : ''" class="pf-pagination">
    <!--    <el-pagination-->
    <!--      :layout="layout"-->
    <!--      :page-sizes="[10, 50, 100]"-->
    <!--      :page-size="data.pageSize"-->
    <!--      :current-page="data.pageNum"-->
    <!--      :total="data.total"-->
    <!--      style="display: flex;justify-content: center;height: 100%;align-items: center;"-->
    <!--      background-->
    <!--      @size-change="handleSizeChange"-->
    <!--      @current-change="handleCurrentChange"-->
    <!--      @prev-click="handlePreClick"-->
    <!--      @next-click="handleNextClick"-->
    <!--    />-->
    <el-pagination
      :current-page="data.pageNum"
      :page-sizes="[10, 15, 30, 50, 100]"
      :page-size="data.pageSize"
      :total="data.total"
      :layout="layout"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
      <span class="el-pagination__total">{{ `显示${data.startRow}-${data.endRow}条` }}</span>
    </el-pagination>
  </section>
</template>
<style lang="scss">
.pf-pagination {
  /*padding: 10px 0 0 0;*/
  /deep/.btn-prev,.btn-next{
    background:#fff!important;
  }
}
.pf-pagination.pagination-right .el-pagination {
  justify-content: flex-end !important;
  text-align: right;
}

.pf-pagination .el-pagination.is-background .btn-next,
.pf-pagination .el-pagination.is-background .btn-prev,
.pf-pagination .el-pagination.is-background .el-pager li {
  background: none;
  font-weight: normal;
}
.pf-pagination .el-pager li {
  font-weight: normal;
  // margin: 0!important;
  // height: 24px!important;
  // line-height: 24px!important;
}
</style>
<script>
export default {
  name: 'Pagination',
  props: {
    data: {
      type: Object,
      default: () => ({ pageSize: 10, pageNum: 1, total: 0, startRow: 0, endRow: 0 })
    },
    layout: { type: String, default: 'total, slot, sizes ,prev, pager, next, jumper' },
    align: { type: String, default: 'center' }
  },
  data() {
    return {}
  },
  watch: {

  },
  mounted() {
    this.$nextTick(function() {})
  },
  methods: {
    // 上一页触发
    handlePreClick() {
      this.data.pageNum--
      this.$emit('refresh', { pagination: this.data })
    },
    // 下一页触发
    handleNextClick() {
      this.data.pageNum++
      this.$emit('refresh', { pagination: this.data })
    },
    // currentPage 改变时会触发
    handleCurrentChange(data) {
      if (this.data.pageNum === data) return
      this.data.pageNum = data
      this.$emit('refresh', { pagination: this.data })
    },
    // pageSize 改变时会触发
    handleSizeChange(data) {
      if (this.data.pageSize === data) return
      this.data.pageNum = 1
      this.data.pageSize = data
      this.$emit('refresh', { pagination: this.data })
    }
  }
}
</script>
