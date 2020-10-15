<template>
  <!--  计划生育类型-->
  <el-select :value="currValue" :disabled="_disabled" placeholder="请选择" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="普通" value="1" />
    <el-option label="一般" value="2" />
  </el-select>
</template>

<script>
export default {
  name: 'FamilyPlanningType',
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
    handleSelectChange(v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style scoped>

</style>
