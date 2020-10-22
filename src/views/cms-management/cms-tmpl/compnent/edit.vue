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
        <FormItems ref="ruleFrom" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm">
          <template slot="tmplCont">
            <quill-editor ref="text" v-model="queryForm.tmplCont" style="height:20rem; margin-bottom:5rem;" class="myQuillEditor" :options="editorOption" />
            <!-- <el-button type="primary" @click="submit">提交</el-button> -->
          </template>
        </FormItems>
      </template>
    </normal-layer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send()">暂存</el-button>
    </span>
  </form-dialog>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { cmsedit } from '@/api/CmsApi'
export default {
  components: { quillEditor },
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
      editorOption: {},
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '模板标题', prop: 'tmplTtl', type: 'input', message: '请输入', span: 24 },
        { label: '应用经办机构', prop: 'appOptins', type: 'input', span: 24, disabled: 'disabled' },
        { label: '模板内容', prop: 'tmplCont', type: 'custom', span: 24 }
      ],
      queryForm: {
        tmplTtl: '',
        appOptins: '',
        tmplCont: ''
      },
      rules: {
        tmplTtl: [
          { required: true, message: '请输入模板标题', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      this.queryForm.tmplTtl = this.daterow.tmplTtl
      this.queryForm.appOptins = this.daterow.appOptins
      this.queryForm.tmplCont = this.daterow.tmplCont
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
      this.$refs.ruleFrom.elForm.validate((valid) => {
        if (valid) {
          const params = {
            ...this.daterow,
            ...this.queryForm
          }
          cmsedit(params).then(res => {
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
