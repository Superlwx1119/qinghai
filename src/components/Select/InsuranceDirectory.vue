<template>
  <!--  医疗目录编码-->
  <el-select :value="currValue" style="width: 100%" :disabled="_disabled" filterable remote :remote-method="remoteMethod" :loading="loading" placeholder="请输入医保项目或编码" @input="handleSelectChange($event)">
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id" />
  </el-select>
</template>

<script>
export default {
  name: 'InsuranceDirectoryCode',
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
        { name: '阿莫西林', id: 1 },
        { name: '阿莫西林', id: 2 },
        { name: '阿莫西林', id: 3 }
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

<style scoped>

</style>
