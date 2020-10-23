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
        <FormItems ref="ruleFrom" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm" />
      </template>
    </normal-layer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send()">保存</el-button>
    </span>
  </form-dialog>
</template>
<script>
import { cmsColContAppl, getName } from '@/api/CmsApi'
export default {
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    daterow: {
      type: Object,
      default: () => {}
    },
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '模板编辑'
    }
  },
  data() {
    return {
      userinfor: {},
      editorOption: {},
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '审批人', prop: 'apprer', type: 'input', span: 12, disabled: 'disabled' },
        { label: '审批结果', prop: 'apprRslt', span: 12, type: 'select', options: [{ label: '1', value: '通过' }, { label: '2', value: '不通过' }] },
        { label: '审批意见', prop: 'apprOpnn', type: 'textarea', span: 24 }
      ],
      queryForm: {
        apprRslttmplTtl: '',
        apprer: '',
        apprOpnn: ''
      },
      rules: {
        apprRslt: [
          { required: true, message: '请选择审批结果', trigger: 'blur' }
        ],
        apprOpnn: [
          { required: true, message: '请输入审批意见', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      getName().then(res => {
        this.userinfor = res.data
        this.queryForm.apprer = this.userinfor
      })
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
      })
    },
    send() {
      console.log(this.queryForm)
      this.$refs.ruleFrom.elForm.validate((valid) => {
        if (valid) {
          const params = {
            ...this.daterow,
            ...this.queryForm
          }
          params.apprRslt = (params.apprRslt === '通过' ? '1' : '2')
          cmsColContAppl(params).then(res => {
            this.closeDialog()
            this.$emit('search')
          })
        }
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
