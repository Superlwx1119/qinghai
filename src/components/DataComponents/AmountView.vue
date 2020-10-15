<!-- table-item 的金额展示 -->

<!--
    金额展示为蓝色，并且单位放到数字后面

    value： 金额

    unit： 单位

-->

<template>
  <span>
    <span class="amount-text-color">{{ amount }}</span>
    <span v-if="unit">{{ unit }}</span>
  </span>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    unit: {
      type: String,
      default: '(元)'
    }
  },
  data() {
    return {
      amount: 0
    }
  },
  watch: {
    value: {
      handler(val) {
        // this.amount = val ? parseFloat(val).toFixed(2) : '0.00'
        this.amount = val || '0.00'
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.amount-text-color {
    color: $gradual;
}
</style>
