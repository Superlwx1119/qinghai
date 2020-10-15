<template>
  <form-dialog title="新增数据元" :is-show="visible" @update:isShow="updateIsShow" @resetForm="resetForm">
    <el-form ref="addForm" :model="addForm" :rules="rules">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="数据元标识符" label-width="100px" prop="Identifier">
            <el-input v-model="addForm.Identifier" placeholder="请输入数据元标识符" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据元编码" label-width="100px" prop="Code">
            <el-input v-model="addForm.Code" placeholder="请输入数据元编码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="数据元中文名" label-width="100px" prop="CnName">
            <el-input v-model="addForm.CnName" placeholder="请输入数据元中文名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="管理域" label-width="100px" prop="domainAdmin">
            <el-select
              v-model="addForm.domainAdmin"
              clearable
              placeholder="请选择管理域"
              allow-create
              style="width:100%"
            >
              <el-option label="aaa" value="1" />
              <el-option label="bbb" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="数据元类型" label-width="100px" prop="DataElementType">
            <el-select
              v-model="addForm.DataElementType"
              clearable
              placeholder="请选择数据元类型"
              allow-create
              style="width:100%"
            >
              <el-option label="aaa" value="1" />
              <el-option label="bbb" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据元精度" label-width="100px" prop="Precision">
            <el-input v-model="addForm.Precision" placeholder="请输入数据元精度" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelEdit()">取消</el-button>
      <el-button type="primary" @click="submit('addForm')">保存</el-button>
    </span>
  </form-dialog>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    show: { type: Boolean, default: () => false }
  },
  data() {
    return {
      visible: false,
      addForm: {
        Identifier: '',
        Code: '',
        CnName: '',
        domainAdmin: '',
        DataElementType: '',
        Precision: ''

      },
      rules: {
        Identifier: [{ required: true, message: '请输入数据元标识符', trigger: 'blur' }],
        Code: [{ required: true, message: '请输入数据元编码', trigger: 'blur' }],
        CnName: [{ required: true, message: '请输入数据元中文名', trigger: 'blur' }],
        DataElementType: [{ required: true, message: '请选择数据元类型', trigger: 'blur' }],
        Precision: [{ required: true, message: '请输入数据元精度', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {
    show() {
      this.visible = this.show
    }
  },
  created() {},
  mounted() {},
  methods: {
    updateIsShow(v) {
      this.$emit('update:show', v)
    },
    resetForm() {
      this.$refs.addForm.resetFields()
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.cancelEdit()
          this.$msgSuccess('保存成功')
        } else {
          return false
        }
      })
    },
    cancelEdit() {
      this.visible = false
      this.resetForm()
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang = "scss" scoped>

</style>
