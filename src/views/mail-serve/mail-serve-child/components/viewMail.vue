<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isShowDetail"
    size="big"
    :before-close="handleClose"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <div class="orgEmailContent">
      <div style="margin:10px 0;height:300px">
        <div class="top">
          <b>发件人：</b><span style="color:#0000FF">{{ tableData.senderName }}</span><br>
          <b>发送时间：</b>{{ tableData.sendTime |renderTime }}<br>
          <b>收件人：</b><span style="color:#0000FF">{{ tableData.receiverName }}</span><br>
          <b>抄送人：</b><span style="color:#0000FF">{{ tableData.ccName |filterState }}</span><br>
          <b>主题：</b>{{ tableData.title }}<br>
        </div>
        <div class="content">
          <p v-html="tableData.content">{{ tableData.content }}</p>
        </div>
      </div>
      <!-- <el-button type="primary" @click="submit">提交</el-button> -->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="reply()">
        <i class="el-icon-s-comment" />
        回复
      </el-button>
      <el-button type="primary" @click="replyAll()">
        <i class="el-icon-s-comment" />
        回复全部
      </el-button>
      <el-button type="primary" @click="forward()">
        <i class="el-icon-right" />
        转发
      </el-button>
      <my-button type="close" @click="closeDialog" />
    </span>
  </form-dialog>
</template>
<script>
import { getEMail } from '@/api/Mail/index'
export default {
  filters: {
    renderTime(date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    filterState(val) {
      if (val === '') {
        return '无'
      } else {
        return val
      }
    }
  },
  model: {
    prop: 'isShowDetail',
    event: 'closeAll'
  },
  props: {
    isShowDetail: {
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
      tableData: {}
    }
  },
  computed: {
  },
  watch: {
    isShowDetail(v) {
      if (v) {
        this.getEmail()
      } else {
        this.$emit('readFlag', this.selectRow.rid)
      }
    }
  },
  methods: {
    getEmail() {
      getEMail({ rid: this.selectRow.rid }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data[0]
        }
      })
    },
    isShow(v) {
      this.$emit('closeAll', v)
    },
    resetForm() {
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('closeAll', false)
      this.$emit('search')
    },
    handleClose(done) {
      this.$emit('search')
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
.orgEmailContent{
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin:0 0 16px 0;
  .top{
    border: 1px solid #131313;
    background-color: #f8f8fa65;
    padding: 10px;
    line-height: normal;
    margin-top: 10px;
  }
  .content{
    position: relative;
    width: 100%;
    top: 120px;
    height: auto;
    border-bottom: 1px solid #131313;
    .p{
      line-height: 40px;
      height: 40px;
    }
  }
}
</style>
