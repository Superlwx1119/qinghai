<template>
  <!--  医疗机构-->
  <el-select :value="currValue" style="width: 100%" :disabled="_disabled" filterable remote :remote-method="remoteMethod" :loading="loading" placeholder="请输入医疗机构编码或名称" @input="handleSelectChange($event)">
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id" />
  </el-select>
</template>

<script>
export default {
  name: 'MedicalInstitution',
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
        { name: '湘雅附一', id: 1 },
        { name: '省人民医院', id: 2 },
        { name: '省妇幼保健院', id: 3 }
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
      this.$emit('change', v)
    }
  }
}
</script>

<style scoped>

</style>
