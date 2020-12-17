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
    <normal-layer :search-number="2">
      <template slot="search-header">
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :form-datas="queryForm" :model="queryForm" />
      </template>
    </normal-layer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send()">保存</el-button>
    </span>
  </form-dialog>
</template>
<script>
import { offAddrbookB } from '@/api/AddressBook/index'
export default {
  components: { },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    daterow: {
      type: Array,
      default: () => []
    },
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '备注信息'
    },
    rowlin: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '备注信息', prop: 'memo', type: 'textarea', message: '请输入', span: 24, rows: 5 }
      ],
      queryForm: {
        memo: ''
      }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      this.queryForm.memo = this.rowlin.memo
    }
  },
  created() {
  },

  methods: {
    isShow(v) {
      this.$emit('closeAll', false)
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
      })
    },
    reset() {},
    send() {
      const that = this
      const param = {
        ...that.rowlin
      }
      param.memo = that.queryForm.memo
      offAddrbookB(param).then(res => {
        that.$msgSuccess(res.message)
        that.$refs.ruleForm.elForm.resetFields()
        that.$emit('closeAll', false)
        that.$emit('search')
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
</style>
