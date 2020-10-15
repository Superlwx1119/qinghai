<template>
  <!-- 修改数据元 -->
  <form-dialog title="修改数据元" :is-show="visible" @update:isShow="updateIsShow">
    <el-form ref="modifyForm" :model="modifyForm" :rules="rules">
      <div class="box">

        <div class="box-body">
          <el-row :gutter="12">
            <el-col :span="12">
              <el-form-item label="数据元标识符" label-width="100px" prop="Identifier">
                <el-input v-model="modifyForm.Identifier" placeholder="请输入数据元标识符" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据元编码" label-width="100px" prop="Code">
                <el-input v-model="modifyForm.Code" placeholder="请输入数据元编码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="12">
              <el-form-item label="数据元中文名" label-width="100px" prop="CnName">
                <el-input v-model="modifyForm.CnName" placeholder="请输入数据元中文名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理域" label-width="100px" prop="domainAdmin">
                <el-select
                  v-model="modifyForm.domainAdmin"
                  clearable
                  placeholder="请选择管理域"
                  allow-create
                  style="width:100%"
                >
                  <el-option label="abc" value="1" />
                  <el-option label="def" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="12">
              <el-form-item label="数据元类型" label-width="100px" prop="DataElementType">
                <el-select
                  v-model="modifyForm.DataElementType"
                  clearable
                  placeholder="请选择数据元类型"
                  allow-create
                  style="width:100%"
                >
                  <el-option label="abc" value="1" />
                  <el-option label="def" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据元精度" label-width="100px" prop="Precision">
                <el-input v-model="modifyForm.Precision" placeholder="请输入数据元精度" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelEdit()">取消</el-button>
      <el-button type="primary" @click="submit('modifyForm')">保存</el-button>
    </span>
  </form-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    show: { type: Boolean, default: () => false }
  },
  data() {
    return {
      visible: this.show,
      rules: {}
    }
  },
  computed: {
    modifyForm: function() {
      return this.form
    }
  },
  watch: {
    show: function(newVal, oldVal) {
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
      this.$refs.modifyForm.resetFields()
    },
    submit(formName) {
      console.log(this.modifyForm.EngName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.cancelEdit()
          this.$msgSuccess('修改成功')
        } else {
          return false
        }
      })
    },
    cancelEdit() {
      this.visible = false
      this.$refs.modifyForm.clearValidate()
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang = "scss" scoped>

</style>
