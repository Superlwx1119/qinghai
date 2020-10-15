<template>
  <!--  零报原因-->
  <el-cascader :value="currValue" :disabled="_disabled" :options="options" style="width: 100%;" :props="props" @input="handleSelectChange($event)" />
</template>

<script>
export default {
  name: 'SporadicReimbursementReason',
  components: {},
  mixins: [],
  props: {
    value: {
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [
        { label: '异地就医', value: '1', children: [
          { label: '已办异地就医备案', value: '11' },
          { label: '已办异地就医备案（转诊）', value: '12' },
          { label: '已办异地就医备案（急诊）', value: '13' },
          { label: '新生儿待遇追溯（异地医院）', value: '14' },
          { label: '未办理异地就医备案', value: '15' }
        ] },
        { label: '市内就医', value: '2', children: [
          { label: '待遇出错（起付线、比例或目录）', value: '21' },
          { label: '欠费3个月内补缴', value: '22' },
          { label: '非个人原因迟缴费', value: '23' }
        ] },
        { label: '其它原因', value: '3', children: [
          { label: '认定为非生育保险费', value: '31' },
          { label: '参保人已死亡拨付其他账号', value: '32' },
          { label: '原件发票已提供其他单位报销', value: '33' }
        ] },
        { label: '不予受理', value: '4', children: [
          { label: '不属于异地就医范围', value: '41' },
          { label: '因由第三人负担的医疗费用', value: '42' },
          { label: '其他不予受理的原因', value: '43' }
        ] }
      ],
      currValue: this.value,
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      }
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
