<template>
  <!-- 零报情形类别 -->
  <el-select
    :value="currValue"
    style="width: 100%"
    :disabled="_disabled"
    placeholder="请选择"
    :filterable="allowCreate"
    :allow-create="allowCreate"
    :default-first-option="allowCreate"
    @input="handleSelectChange($event)"
  >
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id" />
  </el-select>
</template>

<script>
export default {
  name: 'SporadicReimbursementSituationType',
  components: {},
  mixins: [],
  props: {
    allowCreate: {
      type: Boolean,
      default: false
    },
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
        { name: '市内就医', id: 1 },
        { name: '异地就医', id: 2 },
        { name: '不予受理', id: 3 },
        { name: '其它', id: 4 }
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
