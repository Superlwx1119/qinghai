<template>
  <!--单位信息-->
  <el-select
    :value="currValue"
    style="width: 100%"
    :disabled="_disabled"
    filterable
    remote
    :return-label="returnLabel"
    :remote-method="remoteMethod"
    :loading="loading"
    placeholder="请输入单位名称或编码"
    @input="handleSelectChange($event)"
  >
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id" />
  </el-select>
</template>

<script>
import { getSelectLabel } from '@/utils'

export default {
  name: 'CompanyInfo',
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
    },
    returnLabel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      currValue: this.value,
      options: [
        { name: 'aaa', id: 1 },
        { name: 'bbb', id: 2 },
        { name: 'ccc', id: 3 }
      ]
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
  },
  mounted() {
  },
  methods: {
    remoteMethod(query) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    handleSelectChange(v) {
      if (this.returnLabel) {
        this.$emit('input', v)
        this.$emit('select', { id: v, label: getSelectLabel(v, this.options, 'id', 'name') })
      } else {
        this.$emit('input', v)
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
