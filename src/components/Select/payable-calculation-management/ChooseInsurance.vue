<template>
  <!-- 选择险种 -->
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
  name: 'ChooseInsurance',
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
        { name: '基本医疗保险', id: 2 },
        { name: '大额互助', id: 3 }
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
