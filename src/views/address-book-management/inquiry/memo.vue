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
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm">
          <template slot="userIdList">
            <el-input v-model="queryForm.userIdListname" placeholder="请选择联系人" class="input-with-select" disabled>
              <el-button slot="append" icon="el-icon-search" @click="showAdditem()" />
            </el-input>
          </template>
        </FormItems>
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
        { label: '备注信息', prop: 'content', type: 'textarea', message: '请输入', span: 24, rows: 5 }
      ],
      queryForm: {
        title: '',
        content: '',
        userIdList: [],
        userIdListname: ''
      },
      rules: {
        // title: [
        //   { required: true, message: '请输入短信标题', trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      console.log(newVal)
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
        // this.$refs.tableRef.reset()
      })
    },
    send() {
      const param = {
        content: this.content,
        ...this.rowlin
      }
      offAddrbookB(param).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.isDialogVisible = false
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
