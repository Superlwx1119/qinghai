<template>
  <!--  公共单选模板-->
  <el-select
    v-model="select"
    :disabled="disabled"
    :placeholder="placeholder"
    filterable
    style="width: 100%;"
    @change="valueChange"
  >
    <el-option
      v-for="item in sel_options"
      :key="item.dataVal"
      :label="item.dispVal"
      :value="item.dataVal"
    />
  </el-select>
</template>

<script>

export default {
  name: 'SingleSelect',
  mixins: [],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => { return [] }
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      select: '',
      sel_options: this.options
    }
  },
  computed: {},
  watch: {
    value(newVal) {
      if (newVal) {
        this.select = newVal
      } else {
        this.select = ''
      }
    },
    options: {
      handler(val) {
        this.sel_options = val
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    valueChange(v) {
      this.$emit('changeVal', v)
      this.$emit('change', v)
    }
  }
}
</script>

<style scoped>

</style>
