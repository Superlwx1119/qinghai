<template>
  <!-- <el-dialog title="入院登记" :visible.sync="show" width="1200px" :before-close="close"> -->
  <form-dialog title="入院登记" :is-show="show" size="big" @update:isShow="updateIsShow" @resetForm="resetForm">
    <table class="table-data">
      <tbody>
        <tr>
          <td>姓名</td>
          <td>张某某</td>
          <td>性别</td>
          <td>女</td>
          <td>性别</td>
          <td>女</td>
        </tr>
        <tr>
          <td>异动类型</td>
          <td>变更</td>
          <td>IC卡号</td>
          <td colspan="3">12344567</td>
        </tr>
        <tr>
          <td>账号余额余额</td>
          <td>1000.00</td>
          <td>本次充值金额</td>
          <td>1000.00</td>
          <td>本次充值金额</td>
          <td>1000.00</td>
        </tr>
        <tr>
          <td>异动类型</td>
          <td>变更</td>
          <td>IC卡号</td>
          <td colspan="3">12344567</td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>张某某</td>
          <td>性别</td>
          <td>女</td>
          <td>性别</td>
          <td>女</td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>张某某</td>
          <td>性别</td>
          <td>女</td>
          <td>性别</td>
          <td>女</td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>张某某</td>
          <td>性别</td>
          <td>女</td>
          <td>性别</td>
          <td>女</td>
        </tr>
      </tbody>
    </table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">登记</el-button>
    </span>
  </form-dialog>
</template>

<script>
// import Info from './info'
export default {
  name: 'Enter',
  // components: {
  //   'info': Info
  // },
  mixins: [],
  props: {
    show: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      form: {
        date: null,
        cardNo: null,
        type: null,
        code: null,
        resource: 0
      },
      rules: {
        type: { required: true }
      },
      select: '1',
      infoShow: false, // 人员信息收缩栏
      peopleInfo: {
        name: '张三',
        sex: '男',
        age: '58',
        IDCard: '4306242193208080432',
        identity: '城镇职工',
        status: '在职',
        level: '正常',
        times: '1',
        unit: '广东省加多宝集团',
        mobile: '17788996162'
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    updateIsShow(v) {
      this.$emit('update:show', v)
    },
    resetForm() {
      this.$refs.addForm.resetFields()
    },
    //  读卡按下回车
    readCard() {
      this.infoShow = true
    },
    close() {
      this.$emit('update:show', false)
    },
    confirm() {}
  }
}
</script>

<style scoped lang="scss">
  /deep/.el-input-group__prepend .el-select .el-input {
    width: 130px;
  }
</style>
