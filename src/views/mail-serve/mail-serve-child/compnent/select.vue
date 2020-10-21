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
          <span class="box-title">收件人信息表</span>
        </div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane name="通讯录" label="通讯录">
            <AddressList ref="AddressList" :selection="multipleSelection" @changeSelection="changeSelection" @rightcheckchange="rightcheckchange" />
          </el-tab-pane>
          <el-tab-pane name="通讯录组" label="通讯录组">
            <Address ref="Address" :selection="multipleSelection" @changeSelection="changeSelection" />
          </el-tab-pane>
        </el-tabs>
      </template>
    </normal-layer>
    <span slot="footer" class="dialog-footer">
      <el-button v-show="activeName == '通讯录'?true:false" @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send">确定</el-button>
    </span>
  </form-dialog>
</template>
<script>
import { array } from 'jszip/lib/support'
import Address from './address'
import AddressList from './addressList'
export default {
  components: { AddressList, Address },
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
      activeName: '通讯录',
      userlist: [],
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '标题', prop: 'title', type: 'input', message: '请输入', span: 24 },
        { label: '接收人', prop: 'perpo', type: 'custom', span: 24 },
        { label: '内容', prop: 'content', type: 'textarea', message: '请输入', span: 24, rows: 3 }
      ],
      queryForm: {
        title: '',
        content: '',
        perpo: ''
      },
      multipleSelection: [],
      fileList: [],
      columns: [
        { type: 'index', label: '序号' },
        { label: '姓名', prop: 'userName', width: '120px' },
        { label: '所属部门', prop: 'orgName', width: '120px' },
        { label: '手机号码', prop: 'mob' },
        { label: '操作', type: 'operation', fixed: 'right', width: '200px' }
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
        perpo: [
          { required: true, message: '请选择联系人', trigger: 'blur' }
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
      console.log(newVal)
    }
  },
  created() {
  },

  methods: {
    send() {
      this.closeDialog()
      this.$emit('changeSelection', this.tableData)
    },
    handleClick() {
      if (this.activeName === '通讯录') {
        this.$nextTick(() => {
          this.$refs.Address.search()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.AddressList.search()
        })
      }
    },
    rightcheckchange(val) {
      this.$emit('rightcheckchange', val)
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
