<template>
  <!--  职工政策--款项-->
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
      :key="item.finc"
      :label="item.fincName"
      :value="item.finc"
    />
  </el-select>
</template>

<script>
import { listFinc } from '@/api/PayableComputingManagement/NormalComputingManagement/EmployeePolicyMaintenance'
export default {
  name: 'FincSelect',
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
      listFinc({}).then(res => {
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
