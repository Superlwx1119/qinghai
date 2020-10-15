<template>
  <!--  人员类型-->
  <el-select
    :value="currValue"
    multiple
    placeholder="请选择"
    :disabled="_disabled"
    style="width: 100%"
    @input="handleSelectChange($event)"
  >
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id" />
  </el-select>
</template>

<script>
export default {
  name: 'PersonalType',
  components: {},
  mixins: [],
  props: {
    value: {
      type: Array,
      default: () => { return [] }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
    handleSelectChange(v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style scoped>

</style>
