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
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :form-datas="queryForm" :model="queryForm">
          <template slot="userName">
            <el-input v-model="queryForm.userName" placeholder="请选择联系人" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search()" />
            </el-input>
          </template>
        </FormItems>
        <template>
          <my-table-view v-loading="loading" :multiple-selection.sync="multipleSelection" :border="true" height="300px" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
            <template slot="operation" slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="showDialog(scope.row)" />
            </template>
          </my-table-view>
          <Pagination :data="paginationQuery1" @refresh="pageChange1" />
        </template>
      </template>
    </normal-layer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send()">暂存</el-button>
    </span>
  </form-dialog>
</template>
<script>
import { addrBookpage } from '@/api/AddressBook'
export default {
  components: { },
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
      default: '人员分配列表'
    }
  },
  data() {
    return {
      multipleSelection: [],
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '姓名', prop: 'userName', type: 'custom', span: 24 }
      ],
      queryForm: {
        userName: ''
      },
      columns: [
        { type: 'selection' },
        { type: 'index', label: '序号' },
        { label: '姓名', prop: 'uactName' },
        { label: '所属部门', prop: 'orgName' },
        { label: '邮件', prop: 'email' }
      ],
      tableData: [],
      paginationQuery1: { pageSize: 10, pageNumber: 1, total: 0, startRow: 0, endRow: 0 }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible: {
      handler(v) {
        this.search()
      },
      deep: true
    }
  },
  methods: {
    search() {
      this.loading = true
      const param = {
        pageSize: this.paginationQuery1.pageSize,
        pageNumber: this.paginationQuery1.pageNumber,
        total: this.paginationQuery1.total,
        ...this.queryForm
      }
      addrBookpage(param).then(res => {
        this.loading = false
        this.tableData = res.data.result
        this.paginationQuery1 = {
          pageSize: res.data.pageSize,
          pageNumber: res.data.pageNumber,
          total: res.data.total,
          startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
          endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
        }
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
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
      this.$emit('closeAll', false)
      this.$emit('stagingData', this.multipleSelection)
    },
    // 切换分页
    pageChange1(v) {
      this.paginationQuery1.pageSize = v.pagination.pageSize
      this.paginationQuery1.pageNumber = v.pagination.pageNum
      this.search()
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
