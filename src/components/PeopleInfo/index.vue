<template>
  <div class="peopleInfo">
    <div class="info-box">
      <div class="info-content">
        <div v-for="item in options" :key="item.label" class="info-item">
          <span class="item-label">{{ item.label + '：' }}</span>
          <span class="item-text">{{ info[item.key] }}</span>
        </div>
      </div>
      <div v-if="showDetail || showFund || showTotal" class="info-btn">
        <el-button type="primary" @click="checkFund">基金状态</el-button>
        <el-button type="primary" @click="totalCheck">累计信息</el-button>
        <el-button type="primary" @click="checkMore">更多信息</el-button>
      </div>
    </div>
    <!--    基金状态弹窗-->
    <fund-status :show="fundStatusVisible" @update:show="fundShow" />
    <!--    累计信息弹窗-->
    <total-info :info="totalInfo" :show="totalInfoVisible" @update:show="totalShow" />
    <!--   详细信息弹窗-->
    <detail-info :show="detailInfoVisible" @update:show="detailShow" />
  </div>
</template>

<script>
import FundStatus from './dialog/fund-status'
import TotalInfo from './dialog/total-info'
import DetailInfo from './dialog/detail-info'
export default {
  name: 'BaseInfo',
  components: {
    'fund-status': FundStatus,
    'total-info': TotalInfo,
    'detail-info': DetailInfo
  },
  mixins: [],
  props: {
    isSelect: {// 是否点击床位弹出下拉
      type: Boolean,
      default: false
    },
    showFund: {// 显示基金信息
      type: Boolean,
      default: true
    },
    showTotal: {//  显示累计信息
      type: Boolean,
      default: true
    },
    showDetail: {// 显示详细信息
      type: Boolean,
      default: true
    },
    showDetailEdit: {// 详细信息显示编辑
      type: Boolean,
      default: false
    },
    info: {
      type: [Array, Object],
      default: () => { return [] }
    },
    options: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      currPeople: 1, // 当前选中住院列表中的某项数据
      peopleList: [
        { name: '张三', bedNo: '01' },
        { name: '李四', bedNo: '02' }
      ],
      bedNo: '01',
      fundStatusVisible: false, // 基金状态弹窗
      totalInfoVisible: false, // 累计信息弹窗
      detailInfoVisible: false, // 更多信息弹窗
      totalInfo: { // 累计信息数据
        yearTotalPay: '5638',
        yearCivilServantsPay: '4638',
        yearWholePay: '5638',
        monthCivilServantsSubsidies: '4638',
        yearSeriousIllnessSubsidies: '5638',
        yearEnterpriseFund: '4638'
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
    checkFund() {
      this.fundStatusVisible = true
    },
    fundShow(v) {
      this.fundStatusVisible = v
    },
    totalCheck() {
      this.totalInfoVisible = true
    },
    totalShow(v) {
      this.totalInfoVisible = v
    },
    checkMore() {
      this.detailInfoVisible = true
    },
    detailShow(v) {
      this.detailInfoVisible = v
    }
  }
}
</script>

<style lang="scss" scoped>
  .peopleInfo{
    .info-box {
      display: flex;
      min-height: 50px;
      .info-content {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .info-item {
          display: inline-block;
          font-size: 14px;
          .item-label {
            display: inline-block;
            vertical-align: middle;
            min-width: 85px;
            text-align: right;
            font-weight: bold;
            color: #464646;
          }
          .item-text {
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            /*min-width: 55px;*/
            color: #7F7F7F;
          }
        }
      }
      .info-btn {
        width: 320px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
