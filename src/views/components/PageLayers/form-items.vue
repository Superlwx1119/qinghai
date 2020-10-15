<!-- 简单表单组件
该组件只适用两种情况： 1：弹框固定： span=8， 2.栅格 :md="12" :lg="8" :xl="6"
注意： itemsDatas的prop 对于的是 fromDatas的数据字段
-->
<template>
  <el-form
    ref="elForm"
    v-bind="this.$attrs"
    :label-width="labelWidth"
    :class="isTableExpend ? 'table-expend-from-box' : ''"
    label-position="right"
    v-on="$listeners"
  >
    <el-row :gutter="12">
      <el-col
        v-for="item in itemsDatas"
        v-show="!item.hidden"
        :key="item.label + item.prop"
        :md="item.md || md"
        :lg="item.lg || lg"
        :xl="item.xl || xl"
        :span="item.span || span"
      >
        <el-form-item
          :label="item.label"
          :prop="item.prop"
        >
          <template v-if="item.type === 'input'">
            <el-input
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :maxlength="item.maxLength || '50'"
              :type="item.dataType || 'text'"
              clearable
              :placeholder="item.placeholder || '请输入'"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'number'">
            <!-- <el-input
              v-model.number="formDatas[item.prop]"
              type="number"
              :max="item.max"
              :min="item.min"
              :disabled="item.disabled"
              clearable
              :placeholder="item.placeholder || '请输入'"
            /> -->
            <el-input-number
              v-model="formDatas[item.prop]"
              :min="item.min"
              :max="item.max"
              :precision="item.precision"
              clearable
              :disabled="item.disabled"
              :placeholder="item.placeholder || '请输入'"
              :controls="false"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'textarea'">
            <el-input
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :rows="item.rows || 2"
              :autosize="item.autosize || false"
              :maxlength="item.maxLength || 200"
              show-word-limit
              type="textarea"
              placeholder="请输入"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'select'">
            <el-select
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :multiple="item.multiple"
              placeholder="请选择"
              :filterable="item.filterable"
              style="width:100%; height: 100%"
              v-on="item.events || {}"
            >
              <template v-if="item.options">
                <el-option
                  v-for="obj in item.options"
                  :key="item.valueKey ? obj[item.valueKey] : obj.value"
                  :label="item.labelKey ? obj[item.labelKey] : obj.name"
                  :value="item.valueKey ? obj[item.valueKey] : obj.value"
                />
              </template>
              <template v-else>
                <el-option label="选项1" value="1" />
                <el-option label="选项2" value="2" />
              </template>
            </el-select>
          </template>

          <!-- item 需要传codeKey: 'XXX_XXX'，告诉组件加载什么码值 -->
          <template v-else-if="item.type === 'codeTable'">
            <el-select
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :multiple="item.multiple"
              placeholder="请选择"
              :filterable="item.filterable"
              style="width:100%; height: 100%"
              v-on="item.events || {}"
            >
              <el-option
                v-for="obj in item.options"
                :key="obj.dataVal"
                :label="obj.dispVal"
                :value="obj.dataVal"
              />
            </el-select>
          </template>

          <template v-else-if="item.type === 'radio'">
            <el-radio-group v-model="formDatas[item.prop]" v-on="item.events || {}">
              <el-radio
                v-for="obj in item.options"
                :key="item.labelKey ? obj[item.labelKey] : obj.label"
                :label="item.labelKey ? obj[item.labelKey] : obj.label"
              >{{ item.nameKey ? obj[item.nameKey] : obj.name }}</el-radio>
            </el-radio-group>
          </template>

          <template v-else-if="item.type === 'checkbox'">
            <el-checkbox-group v-model="formDatas[item.prop]" v-on="item.events || {}">
              <el-checkbox
                v-for="obj in item.options"
                :key="item.labelKey ? obj[item.labelKey] : obj.label"
                :label="item.labelKey ? obj[item.labelKey] : obj.label"
              >{{ item.nameKey ? obj[item.nameKey] : obj.name }}</el-checkbox>
            </el-checkbox-group>
          </template>

          <template v-else-if="item.type === 'cascader'">
            <el-cascader
              v-model="formDatas[item.prop]"
              :props="{ checkStrictly: true }"
              :options="item.options"
              clearable
              style="width:100%; height: 100%"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'date'">
            <el-date-picker
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :clearable="item.clearable"
              type="date"
              placeholder="选择日期"
              style="width:100%; height: 100%"
              :value-format="item.valueFormat || 'yyyy-MM-dd'"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'dateMoon'">
            <el-date-picker
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :clearable="item.clearable"
              type="month"
              placeholder="选择月份"
              :value-format="item.valueFormat || 'yyyy-MM'"
              style="width:100%; height: 100%"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'dateYear'">
            <el-date-picker
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :clearable="item.clearable"
              type="year"
              placeholder="选择年份"
              style="width:100%; height: 100%"
              :value-format="item.valueFormat || 'yyyy'"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'dateRange'">
            <el-date-picker
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :clearable="item.clearable"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%; height: 100%"
              :value-format="item.valueFormat || 'yyyy-MM-dd'"
              :unlink-panels="true"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'dateTime'">
            <el-date-picker
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :clearable="item.clearable"
              type="datetime"
              placeholder="选择日期时间"
              style="width:100%; height: 100%"
              :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'dateTimeRange'">
            <el-date-picker
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              type="datetimerange"
              range-separator="至"
              :clearable="item.clearable"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              style="width:100%; height: 100%"
              :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
              :unlink-panels="true"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type === 'monthRange'">
            <el-date-picker
              v-model="formDatas[item.prop]"
              :disabled="item.disabled"
              :clearable="item.clearable"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              style="width:100%; height: 100%"
              :value-format="item.valueFormat || 'yyyy-MM'"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type=='file'">
            <upload-files v-model="formDatas[item.prop]" :disabled="item.disabled" v-on="item.events || {}" />
          </template>

          <template v-else-if="item.type=='import'">
            <my-button type="import" title="上传" @click="showUplaodDialog = true" />
            <upload-dialog
              v-model="showUplaodDialog"
              :download-url="formDatas[item.downloadUrl] || 'xxx'"
              :uploaded-url="formDatas[item.uploadUrl] || []"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type=='switch'">
            <el-switch
              v-model="formDatas[item.prop]"
              :active-text="formDatas[item.prop] === item.activeVal ? item.activeText || '是': item.inactiveText ||'否'"
              :active-value="item.activeVal ? item.activeVal : true"
              :inactive-value="item.inactiveVal ? item.inactiveVal : false"
              style="height: 100%;"
              v-on="item.events || {}"
            />
          </template>

          <template v-else-if="item.type=='custom'">
            <slot :name="item.prop" :item="item" :form-data="formDatas" />
          </template>

          <!-- 需要prop, componentName, folder or allPath -->
          <!-- 注意： 仅支持v-model传参 以及change事件 的组件-->
          <template v-else-if="item.type=='component'">
            <template v-if="item.fn">
              <component
                :is="getComponent(item)"
                v-model="formDatas[item.prop]"
                v-bind="item.params"
                @change="item.fn"
              />
            </template>
            <template v-else>
              <component
                :is="getComponent(item)"
                v-model="formDatas[item.prop]"
                v-bind="item.params"
                v-on="item.events || {}"
              />
            </template>
          </template>

          <!-- 正常值显示，不做编辑，目前应用于表格折叠内 -->
          <template v-else>
            <div class="item-content-box">
              <!-- 时间 -->
              <beyond-hiddenBox
                v-if="item.customProp == 'date' || item.customProp == 'mom-date'"
                :text-content="momentDate(formDatas[item.prop], item['format'])"
              />
              <!-- 其他 -->
              <beyond-hiddenBox v-else :text-content="formDatas[item.prop]" />
            </div>
          </template>

        </el-form-item>
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
import BeyondHiddenBox from './beyondHiddenBox'
import { getCodeTableDetailConvergence } from '@/api/Common/Request'
// import AuditState from '../PageSelects/Query/AuditState.vue'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  components: {
    BeyondHiddenBox,
    // AuditState,
    // UploadDialog: () => import('../UploadDialog')
    UploadFiles: () => import('../UploadFiles')
  },
  filters: {
    setDate(value) {
      if (value) {
        return moment(value).format('YYYY MM DD HH:mm')
      } else {
        return ''
      }
    }
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
      elForm: null
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

        // 1-7都有item的全局样式，这里就不去做改变了，避免重叠影响到全局样式
        // if (itemLength <= 7) {
        //   return ''
        // }
        // 这里针对七个以上的
        // return 'handle-right'
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
      },
      immediate: true
    }
  },
  mounted() {
    this.elForm = this.$refs.elForm
  },
  methods: {
    momentDate(value, format) {
      if (!format) {
        format = 'DD MMM YYYY HH:mm'
      }
      if (value) {
        return moment(value).format(format)
      } else {
        return ''
      }
    },
    // 动态加载组件

    getComponent(item) {
      if (item.type === 'component' && item.Allpath) {
        return require(item.Allpath).default
      } else if (item.type === 'component' && item.folder) {
        return require('@/views/components/PageSelects/' + item.folder + '/' + item.componentName + '.vue').default
      }
    },
    getCodeTableOptions(codeType, codeItems) {
      const parms = {
        codeType
      }
      getCodeTableDetailConvergence(parms).then(res => {
        codeItems.forEach(item => {
          this.$set(item, 'options', res.data[item.codeKey])
        })
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

// /deep/.el-form-item__content{
//   line-height: 31px !important; //暂时解决时间范围选择问题
// }

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
</style>
