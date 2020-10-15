<!-- 审核 确认框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="small"
    width="450px"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <form-items
      ref="ruleFrom"
      :model="dataForm"
      :rules="rules"
      :is-grid="false"
      :items-datas="formItemsDatas"
      :form-datas="dataForm"
    >
      <template slot="statue">
        <el-radio-group v-model="dataForm.statue" @change="changeEvent">
          <el-radio
            v-for="obj in auditOptions"
            :key="obj.label"
            :label="obj.label"
          >
            {{ obj.name }}
          </el-radio>
        </el-radio-group>
      </template>
    </form-items>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" :loading="sureLoading" @click="submit">确认</el-button>
    </span>
  </form-dialog>

</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
export default {
  components: {
    FormItems
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
      default: '标题'
    },
    handleName: {
      type: String,
      default: '审核'
    },
    auditOptions: {
      type: Array,
      default: () => {
        return [
          { label: '1', name: '审核通过' },
          { label: '2', name: '审核不通过' }
        ]
      }
    }
  },
  data() {
    return {
      sureLoading: false,
      formItemsDatas: [
        { label: this.handleName + '状态', prop: 'statue', type: 'custom', span: 24 },
        { label: this.handleName + '意见', prop: 'content', type: 'textarea', autosize: { minRows: 3 }, span: 24 }
      ],
      dataForm: {
        statue: '1',
        content: ''
      },
      rules: {
        statue: [{ required: true, message: '请选择', trigger: 'change' }]
      }
    }
  },
  methods: {
    resetForm() {
      this.$emit('closeAll', false)
      this.$refs.ruleFrom.elForm.resetFields()
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    changeEvent(val) {
      if (val === '1') {
        this.rules = {
          statue: [{ required: true, message: '请选择', trigger: 'blur' }]
        }
      } else {
        this.rules = {
          statue: [{ required: true, message: '请选择', trigger: 'blur' }],
          content: [{ required: true, message: '请输入', trigger: 'blur' }]
        }
      }
      this.$refs.ruleFrom.elForm.clearValidate()
    },
    submit() {
      this.$refs.ruleFrom.elForm.validate((valid) => {
        if (valid) {
          this.sureLoading = true
          this.$emit('submit', {
            data: this.dataForm,
            fn: (msg, statue = 'success') => {
              this.sureLoading = false
              if (statue === 'success') {
                this.$msgSuccess(msg || '提交成功')
                this.resetForm()
              }
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-radio+.el-radio {
  margin-left: 30px !important;
}
</style>
