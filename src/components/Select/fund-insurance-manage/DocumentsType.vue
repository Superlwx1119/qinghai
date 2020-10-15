<template>
  <!--  单据类型-->
  <el-select
    :value="currValue"
    style="width: 100%"
    :disabled="_disabled"
    placeholder="请选择"
    @input="handleSelectChange($event)"
  >
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id" />
  </el-select>
</template>

<script>
export default {
  name: 'DocumentsType',
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
      currValue: this.value,
      options: [
        { name: '正常征缴单', id: 1 },
        { name: '补缴征缴单', id: 2 },
        { name: '基术补差征缴单', id: 3 }
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

<style scoped lang="scss"></style>
