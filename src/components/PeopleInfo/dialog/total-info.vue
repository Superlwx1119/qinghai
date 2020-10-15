<template>
  <form-dialog title="累计信息（单位：元）" :is-show="visible" width="720px" new-class="middle" @update:isShow="updateIsShow">
    <div class="box">
      <div class="box-body">
        <table class="table-data total-info">
          <tbody>
            <tr>
              <td>本年业务总费用</td>
              <td>{{ info.yearTotalPay | toThousandFilter }}</td>
              <td>本年公务员基金支付</td>
              <td>{{ info.yearCivilServantsPay | toThousandFilter }}</td>
            </tr>
            <tr>
              <td>本年统筹基金支付</td>
              <td>{{ info.yearWholePay | toThousandFilter }}</td>
              <td>当前月公务员门诊补助</td>
              <td>{{ info.monthCivilServantsSubsidies | toThousandFilter }}</td>
            </tr>
            <tr>
              <td>本年大病补助</td>
              <td>{{ info.yearSeriousIllnessSubsidies | toThousandFilter }}</td>
              <td>本年企业补充基金</td>
              <td>{{ info.yearEnterpriseFund | toThousandFilter }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
    </span>
  </form-dialog>
</template>

<script>
export default {
  name: 'TotalInfo',
  components: {},
  mixins: [],
  props: {
    info: { type: Object, default: () => { return {} } },
    show: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      visible: this.show
    }
  },
  computed: {},
  watch: {
    show() {
      this.visible = this.show
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    updateIsShow(v) {
      this.$emit('update:show', v)
    },
    close() {
      this.visible = false
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped lang="scss">
  .total-info tr>td:nth-child(2n-1) {
    width: 160px;
  }
</style>
