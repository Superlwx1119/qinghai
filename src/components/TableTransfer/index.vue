<template>
  <div class="TableTransfer">
    <el-row :gutter="10" type="flex">
      <el-col :span="9">
        <TransferItem :title="leftTitle" :table-data="leftData">
          <slot name="leftItem" />
        </TransferItem>
      </el-col>
      <el-col :span="2" style="text-align: center;position: relative">
        <div class="btn-group">
          <el-button type="primary" round icon="el-icon-d-arrow-left" @click="toLeft" />
          <el-button type="primary" round icon="el-icon-d-arrow-right" @click="toRight" />
        </div>
      </el-col>
      <el-col :span="13">
        <TransferItem :title="rightTitle" :table-data="rightData">
          <slot name="rightItem" />
        </TransferItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TransferItem from './TransferItem'
export default {
  name: '',
  components: {
    TransferItem
  },
  mixins: [],
  props: {
    leftTitle: { type: String, default: '' },
    rightTitle: { type: String, default: '' },
    leftData: { type: Array, default: () => { return [] } },
    rightData: { type: Array, default: () => { return [] } },
    leftSelect: { type: Array, default: () => { return [] } },
    rightSelect: { type: Array, default: () => { return [] } }
  },
  data() {
    return {
      lData: this.leftData,
      rData: this.rightData
    }
  },
  computed: {},
  watch: {
    leftData: function() {
      this.lData = this.leftData
    },
    rightData: function() {
      this.rData = this.rightData
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    toLeft() {
      if (this.rightSelect.length > 0) {
        this.rightSelect.forEach(item => {
          this.rData.splice(this.rData.indexOf(item), 1)
        })
        this.lData.push(...this.rightSelect)
      }
    },
    toRight() {
      if (this.leftSelect.length > 0) {
        this.leftSelect.forEach(item => {
          this.lData.splice(this.lData.indexOf(item), 1)
        })
        this.rData.push(...this.leftSelect)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .TableTransfer{
    .btn-group {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .el-button {
      margin: 0;
      + .el-button {
        margin-top: 10px;
      }
    }
  }
</style>
