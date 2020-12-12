<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    title="个人通讯录组"
    :is-show="isDialogVisible"
    size="middle"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <normal-layer :search-number="2">
      <template>
        <el-col>
          <span class="box-title">个人通讯录组名称</span>
          <el-input
            v-model="addrbookGrpName"
            style="width:80%;margin-bottom:2rem;"
            clearable
          />
        </el-col>
      </template>
      <template>
        <my-table-view v-loading="loading" height="400px" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData" />
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
    </span>
  </form-dialog>
</template>
<script>
import { getGrpMsgPage } from '@/api/MessageServer/index'
export default {
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '个人通讯录组'
    },
    addrbookGrpNo: {
      type: String,
      default: ''
    },
    addrbookGrpName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '短信标题', prop: 'title', type: 'input', message: '请输入', span: 24 },
        { label: '短信内容', prop: 'content', type: 'textarea', message: '请输入', span: 24, rows: 3 }
      ],
      queryForm: {
        title: '',
        content: ''
      },
      multipleSelection: [],
      fileList: [],
      columns: [
        { type: 'index', label: '序号' },
        { label: '姓名', prop: 'userName' },
        { label: '所属部门', prop: 'orgName' },
        { label: '邮箱', prop: 'mob' }
      ],
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入短信标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入短信内容', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      if (newVal) {
        this.search()
      }
    }
  },
  created() {
  },

  methods: {
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
      const form = {
        ...this.paginationQuery,
        addrbookGrpNo: this.addrbookGrpNo
      }
      this.loading = true
      getGrpMsgPage(form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          const num1 = res.data.pageSize * (res.data.pageNumber - 1) + 1
          const num2 = res.data.pageSize * res.data.pageNumber > res.data.recordCount ? res.data.recordCount : res.data.pageSize * res.data.pageNumber
          this.paginationQuery = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.recordCount,
            startRow: num1,
            endRow: num2
          }
        }
      }).finally(() => { this.loading = false })
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
