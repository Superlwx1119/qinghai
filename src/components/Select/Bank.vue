<template>
  <!--  手术名称-->
  <el-select :value="currValue" filterable remote :remote-method="remoteMethod" :disabled="_disabled" :loading="loading" placeholder="请选择" style="width: 100%" @input="handleSelectChange($event)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { getCodeTableDetailConvergence } from '@/api/Common/Request'
export default {
  name: 'OperationName',
  components: {},
  mixins: [],
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currValue: this.value,
      loading: false,
      options: []
    }
  },
  computed: {
    _disabled: function() {
      return this.disabled
    }
  },
  watch: {
    value: function(newValue) {
      this.currValue = newValue
    }
  },
  created() {
    this.getSelect()
  },
  mounted() {
  },
  methods: {
    handleSelectChange(v) {
      this.$emit('input', v)
      this.$emit('change', v)
    },
    //  远程搜索
    remoteMethod() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    // 下拉码表
    getSelect() {
      const params = {
        codeType: 'bank_type_code'
      }
      getCodeTableDetailConvergence(params).then(res => {
        if (res.code === 0) {
          const bank_type_code = res.data.bank_type_code.map(item => { // 科室名称
            return { label: item.dispVal, value: item.dataVal }
          })
          this.options = bank_type_code
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
