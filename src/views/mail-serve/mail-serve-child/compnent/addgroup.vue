<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isaddgroup"
    size="small"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <normal-layer :search-number="2">
      <template slot="search-header">
        <div slot="table-title" class="box-header handle">
          <span class="box-title">分组列表</span>
        </div>
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm" />
      </template>
    </normal-layer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send()">添加</el-button>
    </span>
  </form-dialog>
</template>
<script>
import { addGroup } from '@/api/Mail'
export default {
  components: { },
  model: {
    prop: 'isaddgroup',
    event: 'closeAll'
  },
  props: {
    daterow: {
      type: Array,
      default: () => []
    },
    isaddgroup: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '分组列表'
    }
  },
  data() {
    return {
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '分组名称', prop: 'title', type: 'input', message: '请输入', span: 24 }],
      queryForm: {
        title: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入短信标题', trigger: 'blur' }
        ]
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
        // this.reset()
        // this.$refs.tableRef.reset()
      })
    },
    send() {
      addGroup(this.queryForm.title).then(res => {
        console.log(res)
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
