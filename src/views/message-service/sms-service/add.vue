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
        <div slot="table-title" class="box-header handle">
          <span class="box-title">短信信息表</span>
        </div>
        <FormItems ref="ruleFrom" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" />
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">收信人列表</span>
        <div slot="title-btns" class="box-tools">
          <el-button v-show="daterow.state" type="success" @click="showAdditem(1)">新增</el-button>
        </div>
      </div>
      <template>
        <my-table-view v-loading="loading" height="400px" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <my-button icon="delete" title="删除" @click="deleteRow(scope)" />
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button v-show="daterow.state" type="primary" @click="saveBtn()">保存</el-button>
    </span>
    <AddPerson v-model="showAdd" :current-data="tableData" @changeSelection="changeSelection" />
  </form-dialog>
</template>
<script>
import AddPerson from './addPerson'
import FormItems from '@/views/components/PageLayers/form-items'
// eslint-disable-next-line no-unused-vars
import object from 'element-resize-detector/src/detection-strategy/object'
import { addSms } from '@/api/MessageServer/index'
import { array } from 'jszip/lib/support'
export default {
  components: { FormItems, AddPerson },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    daterow: {
      type: array,
      default: () => []
    },
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '新增'
    },
    fixFlag: {
      type: String,
      default: ''
    },
    queCont: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '短信标题', prop: 'smsTtl', type: 'input', span: 24 },
        { label: '短信内容', prop: 'smsCont', type: 'textarea', span: 24, rows: 3 }
      ],
      // rules: {
      //   smsTtl: [{ required: true, message: '请输入短信标题', trigger: 'blur' }],
      //   smsCont: [{ required: true, message: '请输入短信内容', trigger: 'blur' }]
      // },
      queryForm: {
        smsTtl: '',
        smsCont: ''
      },
      multipleSelection: [],
      fileList: [],
      columns: [
        { type: 'index', label: '序号' },
        { label: '姓名', prop: 'userName' },
        { label: '所属部门', prop: 'orgName' },
        { label: '手机号码', prop: 'mob' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      },
      tableData: []
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
    saveBtn() {
      // this.$refs.ruleFrom.elForm.validate((valid) => {
      if (this.queryForm.smsTtl && this.queryForm.smsCont) {
        const that = this
        const param = {}
        param.offSmsDDTO = JSON.stringify(this.queryForm)
        param.addSmsList = JSON.stringify(this.tableData)
        addSms(param).then(res => {
          that.$message({
            message: '保存成功',
            type: 'success'
          })
          this.closeDialog()
        })
      } else {
        this.$message.error('请填写标题以及内容')
      }
      // })
    },
    showAdditem(value) {
      if (value === 1) {
        this.showAdd = true
      }
    },
    deleteRow(row) {
      this.tableData.splice(row.rowIndex, 1)
    },
    changeSelection(val) {
      this.tableData = val
    },
    handleAvatarSuccess() {
      this.closeDialog()
      this.$emit('search')
    },
    reset() {
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    pageChange(data) {
      this.paginationQuery.pageSize = data.pagination.pageSize
      this.paginationQuery.pageNumber = data.pagination.pageNum
      this.search()
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        // this.$refs.tableRef.reset()
      })
    },
    search() {

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
