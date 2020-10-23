<template>
  <el-form-item
    :label="item.label"
    :prop="item.prop"
    :label-width="item.labelWidth"
  >
    <div v-if="item.type === 'input'" class="form-item-box">
      <el-input
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :maxlength="item.maxLength || '50'"
        :type="item.dataType || 'text'"
        clearable
        :placeholder="item.placeholder || '请输入'"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type === 'number'" class="form-item-box">
      <!-- 针对国家标准 带% 设置percentage：true -->
      <el-input-number
        v-model.number="formDatas[item.prop]"
        v-unit="item.unit+ '_' +item.prop"
        :min="item.min || 0"
        :max="item.max"
        :precision="getPrecision(item.precision)"
        :step="item.step || 0.01"
        :disabled="item.disabled"
        controls-position="right"
        :controls="true"
        :placeholder="item.placeholder || '请输入'"
        :class="[item.unit ? 'el-input-number-unit'+ '_' + item.prop : item.percentage ? 'el-input-number-percentage' : '']"
        v-on="item.events || {}"
      />
      <!-- 默认只能输入两位小数 -->
      <!-- <number-el-input
        v-model.number="formDatas[item.prop]"
        :min-value="item.min"
        :max-value="item.max"
        :disabled="item.disabled"
        :regexp-str="item.regexpStr || /^-?\d+\.?\d{0,2}$/"
        clearable
        :placeholder="item.placeholder || '请输入'"
      /> -->
    </div>

    <template v-else-if="item.type === 'textarea'">
      <el-input
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :rows="item.rows || 2"
        :autosize="item.autosize === false ? false : item.autosize || true "
        :maxlength="item.maxLength || 200"
        show-word-limit
        type="textarea"
        placeholder="请输入"
        v-on="item.events || {}"
      />
    </template>

    <div v-else-if="item.type === 'select'" :class="needFixedHeight(item)">
      <el-select
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :multiple="item.multiple"
        placeholder="请选择"
        :filterable="item.filterable"
        :clearable="item.clearable"
        style="width:100%; height: 100%"
        v-on="item.events || {}"
      >
        <template v-if="item.options">
          <el-option
            v-if="item.isAll"
            label="全部"
            value="ALL"
          />
          <el-option
            v-for="obj in item.options"
            :key="item.valueKey ? obj[item.valueKey] : obj.value"
            :label="item.labelKey ? obj[item.labelKey] : obj.label"
            :value="item.valueKey ? obj[item.valueKey] : obj.value"
          />
        </template>
        <template v-else>
          <el-option label="选项1" value="1" />
          <el-option label="选项2" value="2" />
        </template>
      </el-select>
    </div>

    <!-- item 需要传codeKey: 'XXX_XXX'，告诉组件加载什么码值 -->
    <div v-else-if="item.type === 'codeTable'" :class="needFixedHeight(item)">
      <el-select
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :multiple="item.multiple"
        placeholder="请选择"
        :filterable="item.filterable"
        :clearable="item.clearable"
        style="width:100%; height: 100%"
        v-on="item.events || {}"
      >
        <el-option
          v-if="item.isAll"
          label="全部"
          value="ALL"
        />
        <el-option
          v-for="obj in item.options"
          :key="obj.dataVal"
          :label="obj.dispVal"
          :value="obj.dataVal"
        />
      </el-select>
    </div>

    <div v-else-if="item.type === 'radio'" :class="needFixedHeight(item)">
      <el-radio-group v-model="formDatas[item.prop]" v-on="item.events || {}">
        <el-radio
          v-for="obj in item.options"
          :key="item.labelKey ? obj[item.labelKey] : obj.label"
          :label="item.labelKey ? obj[item.labelKey] : obj.label"
        >{{ item.nameKey ? obj[item.nameKey] : obj.name }}</el-radio>
      </el-radio-group>
    </div>

    <div v-else-if="item.type === 'checkbox'" :class="needFixedHeight(item)">
      <el-checkbox-group v-model="formDatas[item.prop]" v-on="item.events || {}">
        <el-checkbox
          v-for="obj in item.options"
          :key="item.labelKey ? obj[item.labelKey] : obj.label"
          :label="item.labelKey ? obj[item.labelKey] : obj.label"
        >{{ item.nameKey ? obj[item.nameKey] : obj.name }}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div v-else-if="item.type === 'cascader'" class="form-item-box">
      <el-cascader
        v-model="formDatas[item.prop]"
        :props="{ checkStrictly: true }"
        :options="item.options"
        clearable
        style="width:100%; height: 100%"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type === 'date'" class="form-item-box">
      <el-date-picker
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :clearable="item.clearable"
        type="date"
        placeholder="选择日期"
        style="width:100%; height: 100%"
        :picker-options="item.pickerOptions || {}"
        :value-format="item.valueFormat || 'yyyy-MM-dd'"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type === 'dateMoon'" class="form-item-box">
      <el-date-picker
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :clearable="item.clearable"
        type="month"
        placeholder="选择月份"
        :picker-options="item.pickerOptions || {}"
        :value-format="item.valueFormat || 'yyyy-MM'"
        style="width:100%; height: 100%"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type === 'dateYear'" class="form-item-box">
      <el-date-picker
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :clearable="item.clearable"
        type="year"
        placeholder="选择年份"
        style="width:100%; height: 100%"
        :picker-options="item.pickerOptions || {}"
        :value-format="item.valueFormat || 'yyyy'"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type === 'dateRange'" class="form-item-box">
      <el-date-picker
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :clearable="item.clearable"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width:100%; height: 100%"
        :picker-options="item.pickerOptions || {}"
        :value-format="item.valueFormat || 'yyyy-MM-dd'"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type === 'dateTime'" class="form-item-box">
      <el-date-picker
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :clearable="item.clearable"
        type="datetime"
        placeholder="选择日期时间"
        style="width:100%; height: 100%"
        :picker-options="item.pickerOptions || {}"
        :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type === 'dateTimeRange'" class="form-item-box">
      <el-date-picker
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        type="datetimerange"
        range-separator="至"
        :clearable="item.clearable"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        style="width:100%; height: 100%"
        :picker-options="item.pickerOptions || {}"
        :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type === 'monthRange'" class="form-item-box">
      <el-date-picker
        v-model="formDatas[item.prop]"
        :disabled="item.disabled"
        :clearable="item.clearable"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        style="width:100%; height: 100%"
        :picker-options="item.pickerOptions || {}"
        :value-format="item.valueFormat || 'yyyy-MM'"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type=='file'" :class="needFixedHeight(item)">
      <upload-files v-model="formDatas[item.prop]" :disabled="item.disabled" v-bind="item.params" v-on="item.events || {}" />
    </div>

    <div v-else-if="item.type=='import'" :class="needFixedHeight(item)">
      <my-button type="import" title="上传" @click="showUplaodDialog = true" />
      <upload-dialog
        v-model="showUplaodDialog"
        :download-url="formDatas[item.downloadUrl] || 'xxx'"
        :uploaded-url="formDatas[item.uploadUrl] || []"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type=='switch'" class="form-item-box">
      <el-switch
        v-model="formDatas[item.prop]"
        :active-text="formDatas[item.prop] === (item.activeVal || true) ? item.activeText || '是': item.inactiveText ||'否'"
        :active-value="item.activeVal !== undefined ? item.activeVal : true"
        :inactive-value="item.inactiveVal !== undefined ? item.inactiveVal : false"
        style="height: 100%;"
        v-on="item.events || {}"
      />
    </div>

    <div v-else-if="item.type=='custom'" :class="needFixedHeight(item)">
      <slot :name="item.prop" :item="item" :form-data="formDatas" />
    </div>

    <!-- 需要prop, componentName, folder or allPath -->
    <!-- 注意： 仅支持v-model传参 以及change事件 的组件-->
    <div v-else-if="item.type=='component'" :class="needFixedHeight(item)">
      <template v-if="item.fn">
        <!-- 为了适配老版本 -->
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
    </div>

    <!-- 正常值显示，不做编辑，目前应用于表格折叠内 -->
    <div v-else :class="needFixedHeight(item)">
      <div class="item-content-box">
        <!-- 时间 -->
        <beyond-hiddenBox
          v-if="item.customProp == 'date' || item.customProp == 'mom-date'"
          :text-content="momentDate(formDatas[item.prop], item['format'])"
        />
        <!-- 其他 -->
        <beyond-hiddenBox v-else :text-content="formDatas[item.prop]" />
      </div>
    </div>

  </el-form-item>
</template>

<script>
import BeyondHiddenBox from '../beyondHiddenBox'
import Unit from '@/directive/unit/index'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  components: {
    BeyondHiddenBox,
    // AuditState,
    // UploadDialog: () => import('../UploadDialog')
    UploadFiles: () => import('../../UploadFilesCard'),
    NumberElInput: () => import('../../NumberElInput')
  },
  directives: { Unit },
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
    item: {
      type: Object,
      default: () => {}
    },
    formDatas: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getPrecision(val) {
      if (val === 0) {
        return 0
      }
      return val || 2
    },
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
    needFixedHeight(item) {
      const isGrid = this.$parent.isGrid
      const span = this.$parent.span
      if (!isGrid && item.span !== 24 && span !== 24) {
        return 'form-item-box'
      }
      if (this.isGrid && item.xl !== 24) {
        return 'form-item-box'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item-box{
  width: 100%;
  height: 32px;
  line-height: 32px;
}
/deep/.el-checkbox-group .el-checkbox+.el-checkbox{
  margin-left: 0;
}
.el-input-number-percentage{
  /deep/.el-input-number__increase::before{
    pointer-events:none;
    color: #606266;
    position: absolute;
    left: - 31px;
    content: '%';
    height: 200%;
    line-height: 32px;
    width: 30px;
    background: #f0f2f5;
    border-left: 1px solid #DCDFE6;
  }
}
/deep/.el-textarea{
  .el-textarea__inner{
    padding-bottom: 16px
  }
  .el-input__count{
    line-height: 1;
  }
}
</style>
