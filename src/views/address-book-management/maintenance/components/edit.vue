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
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm" />
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">通讯录组列表</span>
      </div>
      <template>
        <my-table-view v-loading="loading" height="300px" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" @click="deleteRow(scope)" />
          </template>
        </my-table-view>
      </template>
    </normal-layer>
    <AddList v-model="isShowAddList" @stagingData="stagingData" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send()">保存</el-button>
    </span>

  </form-dialog>
</template>
<script>
import AddList from './addlist'
// eslint-disable-next-line no-unused-vars
import { offAddrbookGrpDput, deleteGrpD } from '@/api/AddressBook'
export default {
  components: { AddList },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    selectitem: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    },
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '个人通讯录组'
    }
  },
  data() {
    return {
      paginationQuery: {},
      columns: [
        { type: 'index', label: '序号' },
        { label: '姓名', prop: 'uactName' },
        { label: '所属部门', prop: 'orgName' },
        { label: '邮件', prop: 'email' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      isShowAddList: false,
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '个人通讯录组名称', prop: 'addrbookGrpName', type: 'input', message: '请输入', span: 24 }],
      queryForm: {
        addrbookGrpName: ''
      },
      rules: {
        addrbookGrpName: [
          { required: true, message: '请输入个人通讯录组名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      console.log(newVal)
      if (newVal) {
        this.queryForm.addrbookGrpName = sessionStorage.getItem('title')
      }
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
    addbtn() {
      this.isShowAddList = true
    },
    stagingData(val) {
      this.tableData = val
    },
    deleteRow(rows) {
      console.log(rows)
      const that = this
      that.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGrpD(rows.row.addrbookGrpDetllistId).then(res => {
          // that.tableData.splice(rows.rowIndex, 1)
          that.$message({
            type: 'success',
            message: '删除成功!'
          })
          that.$emit('editsearch', this.selectitem)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    send() {
      const that = this
      that.selectitem.addrbookGrpName = that.queryForm.addrbookGrpName
      this.$refs.ruleForm.elForm.validate((valid) => {
        if (valid) {
          offAddrbookGrpDput(that.selectitem).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$emit('search')
          })
        }
      })
      this.$emit('closeAll', false)
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
