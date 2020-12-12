<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isaddgroup"
    size="middle"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <div class="box">
      <div class="box-header">
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm" />
      </div>
      <div class="box-body">
        <p v-for="(item,i) in tableData" :key="i" style="height:40px;line-height:40px;display: flex;justify-content: space-between;">
          <span>{{ item.label }}</span>
          <span><my-button type="delete" title="删除" @click="deleteRow(item)" /></span>
        </p>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send">添加</el-button>
    </span>
  </form-dialog>
</template>
<script>
import { addGroup, getEMailGroups, delTree } from '@/api/Mail'
// import { addGroup } from '@/api/Mail'
export default {
  components: {},
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
      loading: false,
      itemsDatas: [
        { label: '新增分组名称', prop: 'title', type: 'input', message: '请输入', span: 24 }],
      queryForm: {
        title: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入短信标题', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  computed: {
  },
  watch: {
    isaddgroup: {
      handler(v) {
        if (v) {
          this.getEMailGroups()
        }
      },
      deep: true
    }
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
      this.$refs.ruleForm.elForm.validate((valid) => {
        if (valid) {
          addGroup(this.queryForm.title).then(res => {
            if (res.code === 0) {
              this.$msgSuccess('新增成功！')
              this.getEMailGroups()
              // console.log(111)
            }
          }).catch(() => {
            console.log(1111)
          })
        } else {
          return false
        }
      })
    },
    getEMailGroups() {
      getEMailGroups({}).then(res => {
        if (res.code === 0) {
          const resultData = res.data
          this.tableData = resultData
        }
      })
    },
    deleteRow(item) {
      this.$msgConfirm(`分组【${item.label}】内邮件会被一同删除，是否删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTree(item.id).then(res => {
          if (res.code === 0) {
            this.$msgSuccess('操作成功！')
            this.getEMailGroups()
          }
        }).catch(() => {
        })
      })
      // delTree()
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
.box{
  height: 300px !important;
}
.el-dialog /deep/.el-dialog__body {
    padding: 16px;

}
</style>
