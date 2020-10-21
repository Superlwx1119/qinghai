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
        <!-- <div slot="table-title" class="box-header handle">
          <span class="box-title">短信信息表</span>
        </div> -->
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm" />
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">通讯录组列表</span>
        <div slot="title-btns" class="box-tools">
          <el-button type="success" @click="addbtn()">新增</el-button>
        </div>
      </div>
      <template>
        <my-table-view v-loading="loading" height="300px" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <el-button type="primary" icon="el-icon-delete" @click.native.prevent="deleteRow(scope)" />
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
import { offAddrbookGrpD } from '@/api/AddressBook'
export default {
  components: { AddList },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    daterow: {
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
      tableData: [],
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
      this.tableData.splice(rows.rowIndex, 1)
    },
    send() {
      const that = this
      this.$refs.ruleForm.elForm.validate((valid) => {
        if (valid) {
          const addrbookGrpName = {
            addrbookGrpName: that.queryForm.addrbookGrpName
          }
          const params = {
            userList: this.tableData,
            offAddrbookGrpDDTO: addrbookGrpName
          }
          offAddrbookGrpD(params).then(res => {
            this.$message({
              message: '发送成功',
              type: 'success'
            })
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
