<!-- 简单表单组件
该组件只适用两种情况： 1：弹框固定： span=8， 2.栅格 :md="12" :lg="8" :xl="6"
注意： itemsDatas的prop 对于的是 fromDatas的数据字段
-->
<template>
  <el-form
    ref="elForm"
    v-bind="this.$attrs"
    :label-width="labelWidth"
    :class="[isTableExpend ? 'table-expend-from-box' : '' , 'el-from-config']"
    label-position="right"
    @submit.native.prevent
    v-on="$listeners"
  >
    <el-row :gutter="12">
      <el-col
        v-for="(item, index) in itemsDatas"
        v-show="!item.hidden"
        :key="item.label + item.prop"
        :md="item.md || md"
        :lg="item.lg || lg"
        :xl="item.xl || xl"
        :span="item.span || span"
      >
        <!-- form里面需要分模块，目前设置为mouduleItems 数组 -->
        <el-row
          v-if="item.type === 'divider' && Array.isArray(item.mouduleItems)"
          :key="item.label + item.type + index"
          :gutter="12"
          :class="['moudule-items', itemsDatas.length === index + 1 ? '' : 'not-last-moudule-items']"
        >
          <el-divider content-position="left">{{ item.label }}</el-divider>

          <el-col
            v-for="subItem in item.mouduleItems"
            :key="subItem.label + subItem.type"
            :md="subItem.md || md"
            :lg="subItem.lg || lg"
            :xl="subItem.xl || xl"
            :span="subItem.span || span"
          >
            <type-form-items
              :item="subItem"
              :form-datas="formDatas"
            >
              <template v-if="subItem.type=='custom'">
                <slot :slot="subItem.prop" :name="subItem.prop" :item="subItem" :form-data="formDatas" />
              </template>
            </type-form-items>
          </el-col>
        </el-row>

        <!-- 正常模块类型 -->
        <type-form-items
          v-else
          :item="item"
          :form-datas="formDatas"
        >
          <template v-if="item.type=='custom'">
            <slot :slot="item.prop" :name="item.prop" :item="item" :form-data="formDatas" />
          </template>
        </type-form-items>
      </el-col>
      <el-col
        :class="handleBtnPosition"
        :md="12"
        :lg="8"
        :xl="6"
      >
        <slot />
      </el-col>

    </el-row>
  </el-form>
</template>

<script>

import TypeFormItems from './typeFormItems'
import { deepClone } from '@/utils'
import { getCodeTableDetailConvergence } from '@/api/Common/Request'
export default {
  components: {
    TypeFormItems
  },
  props: {
    // 默认响应式布局 md=12 lg=8 xl=6
    isGrid: {
      type: Boolean,
      default: true
    },
    // 是否是表格的expand内容
    isTableExpend: {
      type: Boolean,
      default: false
    },
    // 全局控制item的span， 默认8，只有isGrid为false才能用
    itemSpan: {
      type: Number,
      default: 8
    },
    labelWidth: {
      type: String,
      default: '105px'
    },
    itemsDatas: {
      type: Array,
      default: () => []
    },
    formDatas: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showUplaodDialog: false,
      elForm: null,
      resetFormData: null // 重置对象
    }
  },
  computed: {
    md() {
      if (this.isGrid) {
        return 12
      } else {
        return {}
      }
    },
    lg() {
      if (this.isGrid) {
        return 8
      } else {
        return {}
      }
    },
    xl() {
      if (this.isGrid) {
        return 6
      } else {
        return {}
      }
    },
    span() {
      if (this.isGrid) {
        return null
      } else {
        return this.itemSpan
      }
    },
    handleBtnPosition() {
      const itemLength = this.itemsDatas.length
      if (this.isGrid) { // 如果是响应式样式处理
        if (window.innerWidth < 1920 && itemLength <= 2) {
          return ''
        } else if (window.innerWidth < 1920 && itemLength === 3) {
          return 'handle-right'
        } else if (window.innerWidth >= 1920 && itemLength <= 3) {
          return ''
        } else {
          return 'handle-right'
        }
      } else {
        // 如果是弹框内部的，不用响应式，则两个以内的不做处理，大于两个则靠右
        if (itemLength <= 2) {
          return ''
        }
        return 'handle-right'
      }
    }
  },
  watch: {
    itemsDatas: {
      handler(newVal) {
        if (!(Array.isArray(newVal) && newVal.length > 0)) return
        const arr = newVal.filter(item => item.codeKey && item.type === 'codeTable')
        if (arr.length > 0) {
          this.getCodeTableOptions(arr.map(item => item.codeKey).join(','), arr)
        }
        // mouduleItems
        const moudulesArrs = newVal.filter(item => Array.isArray(item.mouduleItems) && item.mouduleItems.length > 0)
        moudulesArrs.forEach(item => {
          const arr = item.mouduleItems.filter(item => item.codeKey && item.type === 'codeTable')
          if (arr.length > 0) {
            this.getCodeTableOptions(arr.map(item => item.codeKey).join(','), arr)
          }
        })
      },
      immediate: true
    }
  },
  mounted() {
    this.elForm = this.$refs.elForm
  },
  methods: {
    getCodeTableOptions(codeType, codeItems) {
      const parms = {
        codeType
      }
      getCodeTableDetailConvergence(parms).then(res => {
        codeItems.forEach(item => {
          if (item.filterFn) {
            this.$set(item, 'options', item.filterFn(res.data[item.codeKey]))
          } else {
            this.$set(item, 'options', res.data[item.codeKey])
          }
        })
      })
    },
    // 设置重置对象，如果不设置则用form默认重置
    // 设置了resetFormData则重置对象为这个，如果没有设置则重置成父组件调用改方法时formDatas的数据
    setRestFormData(resetFormData) {
      // 推入队列做深度拷贝，尽最大可能减少页面的加载负荷
      setTimeout(() => {
        if (resetFormData && Object.keys(resetFormData).length > 0) {
          this.resetFormData = deepClone(resetFormData)
        } else {
          this.resetFormData = deepClone(this.formDatas)
        }
      }, 0)
    },
    // 表单数据重置，注意：如果穿了resetFormData那么表单则重置为resetFormData数据，如果不传则优先判断是否有setResetFromData
    // 如果也没有设置setResetFomrData(),那么调用element的表单重置
    resetFields(resetFormData) {
      if (resetFormData && Object.keys(resetFormData).length > 0) {
        this.resetData(deepClone(resetFormData))
      } else if (this.resetFormData && Object.keys(this.resetFormData).length > 0) {
        this.resetData()
      } else {
        this.$nextTick(() => {
          this.$refs.elForm.resetFields()
        })
      }
    },
    resetData(data) {
      if (data) {
        this.$emit('update:formDatas', data)
      } else {
        const cloneData = deepClone(this.resetFormData)
        this.$emit('update:formDatas', cloneData)
      }
      this.$nextTick(() => {
        this.$refs.elForm.clearValidate()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.handle-right{
  float: right !important;
  text-align: right !important;
}

/deep/.el-form {
  .el-form-item__label{
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 32px;
    line-height: 14px;
  }
}
.table-expend-from-box {
  /deep/.el-form-item__label {
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: $table-th-color;
    font-weight: 700;
    height: 36px !important;
    line-height: 16px !important;
  }
  /deep/.el-form-item{
    margin-bottom: 0 !important;
  }
  .item-content-box{
    height: 36px;
    line-height: 36px;
  }
}
/deep/.el-divider--horizontal{
  margin-top: 0;
  margin-bottom: 16px;
  .el-divider__text{
    color: #333;
  }
}
.moudule-items{
  margin-top: 5px;
  border: 1px solid #DCDFE6;
  border-top: none;
  border-radius: 3px;
}
.not-last-moudule-items{
  margin-bottom: 16px;
}
</style>
