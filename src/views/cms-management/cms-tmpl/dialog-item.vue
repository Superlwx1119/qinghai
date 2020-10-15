<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:31:02
 * @LastEditTime: 2019-09-27 20:46:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="tmpl-dialog">
    <el-form ref="Form" :model="form" :rules="rules" class="form-box" label-width="100px">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="模板标题" prop="tmplTitle">
            <el-input v-model="form.tmplTitle" clearable placeholder="请输入" style="width:100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="应用经办机构" prop="institutions">
            <el-input v-model="form.institutions" disabled placeholder="请输入" style="width:100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="模板内容" prop="editContent">
            <ql-editor :content="form.editContent" :options="editorOption" @change="onEditorChange" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'DialogItem',
  components: {
    'ql-editor': quillEditor
  },
  mixins: [],
  props: {
    dataObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        tmplTitle: '',
        institutions: '待遇保障司',
        editContent: ''
      },
      editorOption: {
        placeholder: '',
        readOnly: false
      },
      rules: {
        tmplTitle: [
          { required: true, message: '请填写模板标题', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  methods: {
    save() {
      this.$refs['Form'].validate((valid) => {
        if (valid) {
          console.log(this.form)
        }
      })
    },
    reset() {
      this.$refs['Form'].resetFields()
    },
    onEditorChange({ quill, html, text }) {
      this.form.editContent = html
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .ql-container {
  height: 250px;
}
</style>
