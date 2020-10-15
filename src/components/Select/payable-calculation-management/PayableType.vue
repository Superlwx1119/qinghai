<template>
  <!-- 应缴类型 -->
  <el-select
    :value="currValue"
    style="width: 100%"
    :disabled="_disabled"
    remote
    :remote-method="remoteMethod"
    :loading="loading"
    placeholder="请选择"
    @input="handleSelectChange($event)"
  >
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id" />
  </el-select>
</template>

<script>
export default {
  name: 'SelectUnits',
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
      loading: false,
      currValue: this.value,
      options: [
        { name: '全部', id: 1 },
        { name: '正常应缴', id: 2 },
        { name: '退收', id: 3 },
        { name: '正常补收', id: 4 },
        { name: '医疗补助金', id: 5 },
        { name: '特殊费用录入', id: 6 }
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
      this.$emit('input', v)
    }
  }
}
</script>

<style scoped lang="scss"></style>
