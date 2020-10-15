<template>
  <!--  银行信息-->
  <div v-clickoutside="handleClose" class="el-select">
    <el-popover v-model="visible" popper-class="my-select el-select-dropdown" placement="bottom-start" :arrow-offset="35" trigger="manual">
      <template v-if="options.length > 0">
        <el-table :show-header="true" :data="options" @row-click="handleClickRow">
          <el-table-column min-width="240px" property="bankAbbr" label="银行简称" />
          <el-table-column width="120px" property="bankNo" label="银行编号" />
          <el-table-column width="120px" property="bankTypeCodeName" label="银行行别名称" />
        </el-table>
      </template>
      <template v-if="options.length === 0">
        <p v-loading="loading" class="el-select-dropdown__empty">{{ emptyText }}</p>
      </template>
      <el-input slot="reference" v-model="currValue" clearable placeholder="请输入银行名称" @input="handleInput" @blur="handleBlur" @keydown.native.enter.prevent="handleEnter" />
    </el-popover>
  </div>
</template>

<script>
import { queryBankBasInfo } from '@/api/Common/Request'
import Clickoutside from 'element-ui/src/utils/clickoutside'

export default {
  name: 'BankInfo',
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
      if (this.currValue.length > 0) {
        this.options = []
        this.visible = true
        this.loading = true
        queryBankBasInfo({ bankAbbr: this.currValue, pageNo: 1, pageSize: 10 }).then(res => {
          this.options = res.data.data
          if (res.data.data.length === 0) {
            this.emptyText = '暂无数据'
          }
          this.loading = false
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      }
    },
    //  输入时赋值，为做校验
    handleInput(v) {
      this.$emit('change', v)
    },
    //  失去焦点清除内容，为做校验
    handleBlur() {
      // this.$emit('change', '')
      this.currValue = ''
    },
    handleClickRow(row, column, event) {
      this.currValue = row.bankAbbr + '-' + row.bankNo
      this.$emit('change', row)
    },
    handleClose() {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
