<!-- 医药/医疗机构 选择 -->
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
      <Table ref="tableElm" style="margin-top: 10px" :search-val="inputVal" @currentChange="tableSelChange" />
      <div slot="reference" class="address-multiple-select-box">
        <el-input ref="reference" v-model="inputVal" :disabled="disabled" placeholder="双击选择菜单后查询" clearable @input="inputChangeEvent" @clear="clearClick" @blur="blurChange" @focus="focusInput">
          <el-button slot="append" :disabled="disabled || inputVal.length > 0" icon="el-icon-search" @click="searchClick" />
        </el-input>
      </div>
    </el-popover>
    <search-dialog v-model="searchDialogVisible" :dialog-title="dialogTitle" @selFinish="tableSelChange" />
  </div>
</template>

<script>
import SearchDialog from './searchDialog'
import { on, off } from 'element-ui/lib/utils/dom'
import emitter from 'element-ui/lib/mixins/emitter'
import PageHandle from '@/mixins/pageHandle'
import Table from './table'
// import { adminRoleId } from '@/api/Admin/user-management'
// import { unit } from '@/api/Common/Request'
// 获取用户账户
export default {
  components: {
    SearchDialog,
    Table
  },
  // eslint-disable-next-line no-undef
  mixins: [emitter, PageHandle],
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
    bindType: { // v-model绑定的类型，code:绑定编码， name: 绑定名称，object: 绑定对象，对象内为keyobj的key值
      type: String,
      default: 'code'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    keyObj: { // 当bindType为ojbect时才生效
      type: Object,
      default: () => {
        return {
          keyValue: 'certNO',
          keyName: 'uact'
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
      showTooltip: false,
      orgUntId: ''
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
  created() {
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
      console.log(val)
      this.currentSelName = val.uact
      if (this.bindType === 'code') {
        this.isSelFinish = true
        this.$emit('change', val.certNO)
        this.$emit('changeObj', val)
        this.$nextTick(() => {
          this.inputVal = val.uact
        })
      } else if (this.bindType === 'name') {
        this.$emit('change', val.uact)
        this.$emit('changeObj', val)
        this.inputVal = val.uact
      } else if (this.bindType === 'object') {
        this.isSelFinish = true
        const obj = {
          ...val,
          [this.keyObj.keyValue]: val.certNO,
          [this.keyObj.keyName]: val.uact
        }
        this.$emit('change', obj)
        this.$emit('changeObj', obj)
        this.inputVal = val.uact
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
