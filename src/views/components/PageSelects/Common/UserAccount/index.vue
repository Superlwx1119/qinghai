<!-- 医药机构 选择多选 -->
<template>
  <div class="user-account-wrapper">
    <el-input />
  </div>
</template>

<script>
// import SearchDialog from './searchDialog'
import Clickoutside from 'element-ui/src/utils/clickoutside'
// import Table from './table'
export default {
  directives: { Clickoutside },
  components: {
    // SearchDialog,
    // Table
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: { // 注意传参的类型，默认bingtype是code编码，也就是编码字符串
      type: [String, Object],
      default: ''
    },
    bindType: { // v-model绑定的类型，code:绑定编码， name: 绑定名称，object: 绑定对象，对象内为keyobj的key值
      type: String,
      default: 'code'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fixFlag: { // 定点标志（0：非定点，1：定点）
      type: String,
      default: ''
    },
    queCont: { // 查询内容（1：机构，2：药店）
      type: String,
      default: ''
    },
    keyObj: { // 当bindType为ojbect时才生效
      type: Object,
      default: () => {
        return {
          keyValue: 'value',
          keyName: 'label'
        }
      }
    }
  },
  data() {
    return {
      visible: false,
      inputVal: '',
      searchDialogVisible: false,
      timerObj: null,
      isSelFinish: false
    }
  },
  watch: {
    value(newVal) {
      if (this.bindType === 'code') {
        if (!this.isSelFinish) {
          this.getNameToCode(newVal)
        } else {
          this.isSelFinish = false
        }
      } else if (this.bindType === 'name') {
        this.inputVal = newVal
      } else if (this.bindType === 'object') {
        this.inputVal = newVal.medinsName
      }
    },
    inputVal(newVal) {
      if (!newVal) {
        this.visible = false
      }
    }
  },
  methods: {
    getNameToCode(code) {
      // const params = {
      //   fixFlag: this.fixFlag,
      //   queCont: this.queCont,
      //   queCond: code
      // }
    },
    reset() {
      this.inputVal = ''
    },
    inputChangeEvent(val) {
      if (this.timerObj) clearInterval(this.timerObj)
      this.timerObj = setInterval(() => {
        if (val) {
          this.visible = true
          this.$refs.tableElm.iniSearch()
        }
        clearInterval(this.timerObj)
      }, 500)
    },
    clickOutSide(val) {
      if (!this.$refs.tableElm.isSearching()) {
        this.visible = false
      }
    },
    tableSelChange(val) {
      if (this.bindType === 'code') {
        this.isSelFinish = true
        this.$emit('change', val.medinsCodg)
        this.$nextTick(() => {
          this.inputVal = val.medinsName
        })
      } else if (this.bindType === 'name') {
        this.$emit('change', val.medinsName)
        this.inputVal = val.medinsName
      } else if (this.bindType === 'object') {
        this.$emit('change', val)
        this.inputVal = val.medinsName
      }
      this.visible = false
      this.searchDialogVisible = false
    },
    searchClick() {
      this.searchDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.medical-institutions-select-wrapper{
  width: 100%
  // height: 32px;
  // line-height: 1;
  // border: 1px solid #ccc;
  // border-radius: 4px;
  // padding: 5px 10px;
}
.body-wrapper{
  height: 440px;
}

</style>
