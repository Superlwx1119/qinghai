<!-- 搜索弹框 -->
<template>
  <div>
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-tree
      ref="tree"
      class="filter-tree"
      :data="selectdata"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    >
      <template slot-scope="{data}">
        <span>{{ data.colTtl }}</span>
      </template>
    </el-tree>
  </div>
</template>
<script>
export default {
  props: {
    selectdata: {
      type: Array,
      default: () => []
    },
    paginationQuery: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      filterText: '1',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.colTtl.indexOf(value) !== -1
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    handleNodeClick(row) {
      this.$emit('leftselect', row.rcdNo)
    }
  }
}
</script>
<style lang="scss" scoped>
.header-box{
  width: 100%;
  margin-bottom: 10px;
}
i{
  color: rgba(27, 109, 209,1);
}
</style>
