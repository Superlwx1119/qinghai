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
      <p style="text-align:center;font-size:18px;font-weight:bold;color:#303133">{{ inboxData.title }}</p>
      <div class="el-divider el-divider--horizontal">
        <div class="el-divider__text is-left">
          <b>接收时间：{{ inboxData.sendTime |renderTime }}</b>
        </div>
      </div>
      <div style="margin:5vh">
        <span style="font-size:16px">{{ inboxData.content }}</span>
      </div>
      <div class="el-divider el-divider--horizontal">
        <div class="el-divider__text is-right">
          <b>发送人：{{ inboxData.senderName }}</b>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="reply()">回复</el-button>
    </span>
    <Add v-model="isShowAdd" :dialog-title="replyDialogTitle" :select-row="selectRow" :is-reply-letters="isReplyLetters" @closeInbox="closeInbox" />
  </form-dialog>
</template>
<script>
import Add from './add'
export default {
  components: { Add },
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
    inboxData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addressee: '',
      flag: 'reply',
      isShowAdd: false,
      replyDialogTitle: '',
      selectRow: {},
      isReplyLetters: false
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 回复
    reply() {
      this.isShowAdd = true
      this.replyDialogTitle = '站内消息信息表'
      this.selectRow = this.inboxData
      this.isReplyLetters = true
    },
    reset() {
    },
    closeInbox() {
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('closeAll', false)
      this.$emit('search')
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
.el-divider__text.is-right {
    right: 20px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>
