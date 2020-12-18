<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="big"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >

    <div class="box">
      <p style="text-align:center;font-size:18px;font-weight:bold;color:#303133">{{ selectRow.title }}</p>
      <div class="el-divider el-divider--horizontal">
        <div class="el-divider__text is-left">
          <b>发送时间：{{ selectRow.sendTime |renderTime }}</b>
        </div>
      </div>
      <div style="margin:5vh">
        <span style="font-size:16px">{{ selectRow.content }}</span>
      </div>
      <div class="el-divider el-divider--horizontal">
        <div class="el-divider__text is-left">
          <b>收件人</b>
        </div>
      </div>
      <div style="margin-left:5vh">
        <span style="color:blue;font-size:16px">{{ addressee }}</span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <!-- <el-button type="primary" @click="send()">发送</el-button> -->
    </span>
  </form-dialog>
</template>
<script>
import { queryRecerName } from '@/api/MessageServer'
export default {
  filters: {
    renderTime(date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
  },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    selectRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addressee: ''
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible: {
      handler(v) {
        if (v) {
          this.queryRecerName()
        }
      },
      deep: true
    }
  },
  methods: {
    queryRecerName() {
      console.log(this.selectRow)
      queryRecerName(this.selectRow.receiver).then(res => {
        if (res.code === 0) {
          this.addressee = res.data
        }
      })
    },
    reset() {
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        // this.$refs.tableRef.reset()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-box{
  width: 100%;
  margin-bottom: 10px;
}
i{
  color: rgba(27, 109, 209,1);
}
.el-divider {
    background-color: #dcdfe6;
    position: relative;
}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
}
.el-divider__text {
    position: absolute;
    background-color: #fff;
    padding: 0 20px;
    color: #303133;
}
b{
  font-weight: bold;
}
.el-divider__text.is-left {
    left: 20px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>
