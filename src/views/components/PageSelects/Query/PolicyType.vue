<template>
  <!--  政策类型-->
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
      :key="item.polTypeNo"
      :label="item.polTypeDscr"
      :value="item.polTypeNo"
    />
  </el-select>
</template>

<script>
import { listPolType } from '@/api/PayableComputingManagement/NormalComputingManagement/EmployeePolicyMaintenance'

export default {
  name: 'PolicyType',
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
      default: '请选择'
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
  },
  mounted() {
    this.getOptions()
  },
  methods: {
    getOptions() {
      listPolType({}).then(res => {
        this.sel_options = res.data
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
