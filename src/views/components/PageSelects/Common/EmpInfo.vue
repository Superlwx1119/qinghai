<template>
  <!--  单位信息-->
  <div v-clickoutside="handleClose" class="el-select">
    <el-popover v-model="visible" popper-class="my-select el-select-dropdown" placement="bottom-start" :arrow-offset="35" trigger="manual">
      <template v-if="options.length > 0 && !loading">
        <el-table :show-header="true" :data="options" @row-click="handleClickRow">
          <el-table-column width="100px" property="empName" label="单位名称" />
          <el-table-column width="130px" property="empNo" label="单位编号" />
          <el-table-column width="100px" property="empType" label="单位类型" />
          <el-table-column width="120px" property="insuAdmdvs" label="所在医保区划" />
        </el-table>
      </template>
      <template v-if="options.length === 0 && !loading">
        <p v-loading="loading" class="el-select-dropdown__empty" style="height: 50px">{{ emptyText }}</p>
      </template>
      <el-input
        slot="reference"
        v-model="currValue"
        clearable
        placeholder="请输入单位名称或单位编号"
        @input="handleInput"
        @blur="handleBlur"
        @keydown.native.enter.prevent="handleEnter"
      />
    </el-popover>
  </div>
</template>

<script>
import { queryEmpBasicInfo } from '@/api/Common/Request'
import Clickoutside from 'element-ui/src/utils/clickoutside'

export default {
  name: 'EmpInfo',
  directives: { Clickoutside },
  mixins: [],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Object],
      default: ''
    }
  },
  data() {
    return {
      currValue: '',
      options: [],
      visible: false,
      loading: false,
      emptyText: ''
    }
  },
  computed: {
  },
  watch: {
    value(val) {
      if (val) {
        this.value = val
      } else {
        this.value = ''
        this.currValue = ''
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleEnter() {
      this.options = []
      this.visible = true
      this.loading = true
      if (this.currValue === '') {
        this.loading = false
        this.visible = false
        return
      }
      queryEmpBasicInfo({ queryContent: this.currValue }).then(res => {
        this.options = res.data
        if (res.data.length === 0) {
          this.emptyText = '暂无数据'
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    //  输入时赋值，为做校验
    handleInput(v) {
      this.$emit('input', v)
    },
    //  失去焦点清除内容，为做校验
    handleBlur() {
      // this.$emit('change', '')
      this.currValue = ''
    },
    //  点击查询内容
    handleClickRow(row, column, event) {
      this.currValue = row.empName + '-' + row.empType + '-' + row.empNo
      this.$emit('change', row)
    },
    handleClose() {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
