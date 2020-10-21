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
        <FormItems ref="searchForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" />
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">收信人列表</span>
      </div>
      <template>
        <my-table-view
          v-loading="loading"
          :data="tableData"
          height="400px"
          :border="true"
          :multiple-selection.sync="multipleSelection"
          :is-configheader="true"
          :max-cloumns="40"
          :columns="columns"
        >
          <template slot="operation" slot-scope="scope">
            <my-button icon="delete" title="删除" @click="deleteRow(scope)" />
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="saveBtn()">审批</el-button>
    </span>
  </form-dialog>
</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
// eslint-disable-next-line no-unused-vars
import object from 'element-resize-detector/src/detection-strategy/object'
import { addSms } from '@/api/MessageServer/index'
export default {
  components: { FormItems },
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
      default: '审批'
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
      tableData: [],
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '短信标题', prop: 'smsTtl', type: 'input', span: 24, disabled: 'disabled' },
        { label: '短信内容', prop: 'smsCont', type: 'textarea', span: 24, rows: 3, disabled: 'disabled' },
        { label: '审批结果', prop: 'apprRslt:', type: 'select', options: [{ label: '不通过', value: '0' }, { label: '通过', value: '1' }] },
        { label: '审批意见', prop: 'apprOpnn', type: 'textarea', span: 24, rows: 3 }
      ],
      rules: {
        apprRslt: [{ required: true, message: '请选择审批结果', trigger: 'blur' }]
      },
      queryForm: {
        smsTtl: '',
        smsCont: '',
        apprRslt: '',
        apprOpnn: ''
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
      }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      this.queryForm.smsTtl = this.daterow.smsTtl
      this.queryForm.smsCont = this.daterow.smsCont
    }
  },
  created() {
  },

  methods: {
    saveBtn() {
      // this.$refs.searchForm.validate((valid) => {
      //   if (valid) {
      const that = this
      const param = {
        ...this.queryForm
      }
      console.log(param)
      addSms(param).then(res => {
        that.$message({
          message: '审批成功',
          type: 'success'
        })
        this.closeDialog()
      })
      //   }
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
    pageChange(datas) {
      this.paginationQuery.pageSize = datas.pagination.pageSize
      this.paginationQuery.pageNumber = datas.pagination.pageNum
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
