<!-- 表格头部配置器 -->
<template>
  <div class="config-header">
    <el-popover
      placement="bottom"
      width="180"
      trigger="click"
    >
      <div class="check-header">
        <el-checkbox-group v-model="checkList" :min="min" @change="headerCheckboxChange">
          <el-checkbox
            v-for="item in sel_options"
            :key="item.label + item.type + item.prop"
            :label="item.label"
          />
        </el-checkbox-group>
      </div>
      <div slot="reference">
        <i class="el-icon-s-fold" />
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'tableOption',
    event: 'change'
  },
  props: {
    tableOption: {
      type: Array,
      default: () => []
    },
    min: {
      type: Number,
      default: 5
    },
    allColums: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkList: [],
      sel_options: []
    }
  },
  watch: {
    allColums(newVal) {
      this.getCheckList()
      this.getSelOptions()
    }
  },
  created() {
    this.getCheckList()
    this.getSelOptions()
  },
  methods: {
    getSelOptions() {
      this.sel_options = this.allColums.filter(item => { // 默认全部的表头内容
        if (item.type === 'custom' || !item.type) {
          return item
        }
      })
    },
    getCheckList() {
      this.checkList = this.allColums.map(data => data.label)
    },
    headerCheckboxChange(val) {
      const filterArr = this.allColums.filter(a => {
        return val.indexOf(a.label) >= 0
      })
      this.$emit('change', filterArr)
    }
  }
}
</script>
