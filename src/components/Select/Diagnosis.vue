<template>
  <!--  入院诊断-->
  <el-select :value="currValue" filterable remote :remote-method="remoteMethod" :disabled="_disabled" :loading="loading" placeholder="请选择" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="血管性假血友病" value="1" />
    <el-option label="金莲花药物反应" value="2" />
    <el-option label="视网膜脱离" value="3" />
    <el-option label="用尖锐物体进行加害" value="4" />
  </el-select>
</template>

<script>
export default {
  name: 'Diagnosis',
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
      currValue: this.value
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
    //  选择诊断
    handleSelectChange(v) {
      this.$emit('input', v)
    },
    //  远程搜索
    remoteMethod() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<style scoped>

</style>
