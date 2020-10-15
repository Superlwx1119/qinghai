<template>
  <!--  险种查询
      只适用于预缴管理-单位预缴
      只适用于预缴管理-单位预缴
      只适用于预缴管理-单位预缴
      只适用于预缴管理-单位预缴
      只适用于预缴管理-单位预缴
      只适用于预缴管理-单位预缴
-->
  <el-select
    v-model="select"
    :disabled="disabled"
    :placeholder="placeholder"
    filterable
    style="width: 100%;"
    @change="valueChange"
  >
    <el-option
      v-for="item in sel_options"
      :key="item.dataVal"
      :label="item.dispVal"
      :value="item.dataVal"
    />
  </el-select>
</template>

<script>
import { getInsutype } from '@/api/PaymentInAdvance/PaymentInAdvanceManage/Request'

export default {
  name: 'MakeCardBank',
  components: {},
  mixins: [],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择险种'
    }
  },
  data() {
    return {
      select: '',
      sel_options: []
    }
  },
  computed: {},
  watch: {
    value(newVal) {
      if (newVal) {
        this.select = newVal
      } else {
        this.select = ''
      }
    }
  },
  created() {
    this.getOptions()
  },
  mounted() {
  },
  methods: {
    getOptions() {
      getInsutype().then(res => {
        this.sel_options = res.data.insutype
      }).catch(err => {
        this.$msgError(err.message)
      })
    },
    valueChange(v) {
      this.$emit('change', v)
    }
  }
}
</script>

<style scoped>

</style>
