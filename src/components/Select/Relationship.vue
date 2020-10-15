<template>
  <!--  关系-->
  <el-select :value="currValue" placeholder="请选择" :disabled="_disabled" style="width: 100%" @input="handleSelectChange($event)">
    <el-option label="兄、弟、姐、妹" value="1" />
    <el-option label="父母" value="2" />
    <el-option label="配偶" value="3" />
  </el-select>
</template>

<script>
export default {
  name: 'Relationship',
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
