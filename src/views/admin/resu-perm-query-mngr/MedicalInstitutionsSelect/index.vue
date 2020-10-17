<!--选择 -->
<template>
  <div class="medical-institutions-select-wrapper">
    <!-- v-clickoutside="clickOutSide" -->
    <el-popover
      ref="popover"
      v-model="visible"
      placement="bottom"
      width="600"
      trigger="manual"
      :append-to-body="appendToBody"
      :popper-options="{
        forceAbsolute: true,
        boundariesElement: 'body',
        gpuAcceleration: false
      }"
      :disabled="disabled"
    >
      <Table ref="tableElm" style="margin-top: 10px" :fix-flag="fixFlag" :que-cont="queCont" :search-val="inputVal" @currentChange="tableSelChange" />
      <div slot="reference" class="address-multiple-select-box">
        <el-input
          ref="reference"
          v-model="inputVal"
          readonly
          :disabled="disabled"
          placeholder="点击选择菜单后查询"
          clearable
          @dblclick="searchClick"
          @input="inputChangeEvent"
          @clear="clearClick"
          @blur="blurChange"
          @focus="focusInput"
        >
          <el-button slot="append" :disabled="disabled || inputVal.length > 0" icon="el-icon-search" @click="searchClick" />
        </el-input>
      </div>
    </el-popover>
    <search-dialog v-model="searchDialogVisible" :dialog-title="dialogTitle" :fix-flag="fixFlag" :que-cont="queCont" @selFinish="tableSelChange" />
  </div>
</template>

<script>
import SearchDialog from './searchDialog'
import { on, off } from 'element-ui/lib/utils/dom'
import emitter from 'element-ui/lib/mixins/emitter'
import Table from './table'
export default {
  components: {
    SearchDialog,
    Table
  },
  mixins: [emitter],
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
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
    bindType: {
      type: String,
      default: 'code'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fixFlag: {
      type: String,
      default: '1'
    },
    queCont: {
      type: String,
      default: '1'
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    keyObj: {
      type: Object,
      default: () => {
        return {
          keyValue: 'medinsCodg',
          keyName: 'medinsName'
        }
      }
    },
    isValidate: { // 是否触发表单验证
      type: Boolean,
      default: true
    },
    dialogTitle: { // 弹出窗Title
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      inputVal: '',
      currentSelName: '',
      searchDialogVisible: false,
      timerObj: null,
      isSelFinish: false,
      showTooltip: false
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.reset()
          return
        }
        this.validateEvent()
        if (this.bindType === 'code') {
          if (!this.isSelFinish && newVal) {
            this.getNameToCode(newVal)
          } else {
            this.isSelFinish = false
          }
        } else if (this.bindType === 'name') {
          this.inputVal = newVal
        } else if (this.bindType === 'object' && newVal && newVal[this.keyObj.keyValue]) {
          this.inputVal = newVal[this.keyObj.keyName]
          if (!this.isSelFinish && newVal && !this.disabled) {
            this.getNameToCode(newVal[this.keyObj.keyName])
          } else {
            this.isSelFinish = false
          }
        } else {
          // 重置操作
          this.reset()
          // this.inputVal = ''
        }
      },
      immediate: true
    }
  },
  mounted() {
    on(document, 'click', this.handleDocumentClick)
  },
  destroyed() {
    off(document, 'click', this.handleDocumentClick)
  },
  methods: {
    blurChange() {
      if (this.visible) return
      this.inputVal = this.currentSelName
      this.showTooltip = false
      this.validateEvent()
    },
    focusInput() {
      this.visible = false
      this.showTooltip = this.inputVal.length === 0 && !this.disabled
    },
    validateEvent() {
      if (this.isValidate) {
        this.dispatch('ElFormItem', 'el.form.change', [this.value])
      }
    },
    getNameToCode(code) {
    },
    reset() {
      this.inputVal = ''
      this.currentSelName = ''
      this.isSelFinish = false
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
      // console.log('clickoutside')
      if (!this.$refs.tableElm.isSearching()) {
        this.visible = false
      }
    },
    tableSelChange(val) {
      this.currentSelName = val.medinsName
      if (this.bindType === 'code') {
        this.isSelFinish = true
        this.$emit('change', val.medinsCodg)
        this.$emit('changeObj', val)
        this.$nextTick(() => {
          this.inputVal = val.medinsName
        })
      } else if (this.bindType === 'name') {
        this.$emit('change', val.medinsName)
        this.$emit('changeObj', val)
        this.inputVal = val.medinsName
      } else if (this.bindType === 'object') {
        this.isSelFinish = true
        const obj = {
          ...val,
          [this.keyObj.keyValue]: val.medinsCodg,
          [this.keyObj.keyName]: val.medinsName
        }
        this.$emit('change', obj)
        this.$emit('changeObj', obj)
        this.inputVal = val.medinsName
      }
      this.visible = false
      this.searchDialogVisible = false
    },
    searchClick() {
      this.searchDialogVisible = true
    },
    clearClick() {
      if (this.bindType === 'code' || this.bindType === 'name') {
        this.$emit('change', '')
      } else {
        this.$emit('change', {
          [this.keyObj.keyValue]: '',
          [this.keyObj.keyName]: ''
        })
      }
      this.$emit('changeObj', {
        [this.keyObj.keyValue]: '',
        [this.keyObj.keyName]: ''
      })
      this.reset()
    },
    handleDocumentClick(e) {
      this.$refs.popover.handleDocumentClick(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.medical-institutions-select-wrapper{
  width: 100%;
  height: 32px;
  line-height: 32px;
}
.body-wrapper{
  height: 440px;
}
/deep/.el-input-group__append{
  overflow: hidden;
}

</style>
