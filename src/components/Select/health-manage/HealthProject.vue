<template>
  <!--  体检项目-->
  <el-select
    :value="currValue"
    style="width: 100%"
    :disabled="_disabled"
    filterable
    remote
    :remote-method="remoteMethod"
    :loading="loading"
    placeholder="请输入体检项目名称或编码"
    @input="handleSelectChange($event)"
  >
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id" />
  </el-select>
</template>

<script>
export default {
  name: 'HealthProject',
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
        { name: '身高', id: 1 },
        { name: '体重', id: 2 },
        { name: '视力', id: 3 }
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
