<template>
  <form-dialog size="small" :title="dialogTitle" :is-show="isDialogVisible" @update:isShow="isShow" @resetForm="resetForm">
    <el-form ref="examineForm" :model="examineForm" :rules="rules" label-width="105px">
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item :label="type + '状态'" prop="examineStatus">
            <el-radio-group v-model="examineForm.examineStatus" @change="changeStatus">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="type + '意见'" prop="remarks">
            <el-input v-model="examineForm.remarks" type="textarea" :rows="3" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog()">取消</el-button>
      <el-button type="primary" @click="save()">保存</el-button>
    </span>
  </form-dialog>
</template>
<script>
export default {
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '审核'
    }
  },
  data() {
    return {
      radio: '1',
      value: true,
      examineForm: {
        examineStatus: 1,
        remarks: ''
      },
      rules: {}
    }
  },
  methods: {
    resetForm() {
      this.$emit('update:isShow', false)
      this.$refs.examineForm.resetFields()
    },
    closeDialog() {
      this.$emit('update:isShow', false)
    },
    save() {
      this.$refs.examineForm.validate((valid) => {
        if (valid) {
          this.$msgSuccess('保存成功')
          this.$emit('saveSet', this.examineForm)
          this.$emit('update:isShow', false)
          this.$refs.examineForm.resetFields()
        }
      })
    },
    isShow(v) {
      this.$emit('update:isShow', v)
    },
    changeStatus(v) {
      if (v === 2) {
        this.rules = { remarks: [{ required: true, message: '请输入', trigger: 'blur' }] }
      } else {
        this.$refs.examineForm.resetFields()
        this.rules = {}
      }
    }
  }
}
</script>
