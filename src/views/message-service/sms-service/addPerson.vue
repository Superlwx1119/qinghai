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
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane name="通讯录" label="通讯录">
        <Address ref="Address" :selection="multipleSelection" @changeSelection="changeSelection" />
      </el-tab-pane>
      <el-tab-pane name="通讯录组" label="通讯录组">
        <AddressList ref="AddressList" :selection="multipleSelection" @changeSelection="changeSelection" />
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="saveCurrent">暂存</el-button>
    </span>
  </form-dialog>
</template>
<script>
import Address from './address'
import AddressList from './addressList'
export default {
  components: { Address, AddressList },
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
      default: '短信接收人信息表'
    },
    currentData: {
      type: Array,
      default: () => []
    },
    fixFlag: { // 定点标志（0：非定点，1：定点）
      type: String,
      default: ''
    },
    queCont: { // 查询内容（1：机构，2：药店）
      type: String,
      default: ''
    }
  },
  data() {
    return {
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
        { label: '姓名', prop: '姓名', width: '120px' },
        { label: '所属部门', prop: '所属部门', width: '120px' },
        { label: '手机号码', prop: '手机号码' },
        { label: '操作', type: 'operation', fixed: 'right', width: '200px' }
      ],
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      },
      selection: [],
      rules: {
        title: [
          { required: true, message: '请输入短信标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入短信内容', trigger: 'blur' }
        ]
      },
      tableData: [],
      activeName: '通讯录'
    }
  },
  computed: {
  },
  watch: {
    currentData: {
      handler(val) {
        if (val.length !== 0) {
          this.multipleSelection = val
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.Address.search()
    // })
  },

  methods: {
    saveCurrent() {
      this.$emit('changeSelection', this.selection)
      this.closeDialog()
      // if (this.activeName === '通讯录') {
      //   this.$nextTick(() => {
      //     this.$refs.Address.multipleSelection = []
      //   })
      // } else {
      //   this.$nextTick(() => {
      //     this.$refs.AddressList.multipleSelection = []
      //   })
      // }
    },
    changeSelection(val) {
      this.selection = val
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
      this.activeName = '通讯录'
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
