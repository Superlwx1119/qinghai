<template>
  <!--  审核状态-->
  <el-select :value="currValue" placeholder="请选择" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="审核通过" value="1" />
    <el-option label="审核不通过" value="2" />
  </el-select>
</template>

<script>
export default {
  name: 'AuditStatus',
  components: {},
  mixins: [],
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      currValue: this.value
    }
  },
  computed: {},
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
    handleSelectChange(v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style scoped>

</style>
