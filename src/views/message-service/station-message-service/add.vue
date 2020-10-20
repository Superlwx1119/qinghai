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
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm">
          <template slot="userIdList">
            <el-input v-model="queryForm.userIdListname" placeholder="请选择联系人" class="input-with-select" disabled>
              <el-button slot="append" icon="el-icon-search" @click="showAdditem()" />
            </el-input>
          </template>
        </FormItems>
      </template>
    </normal-layer>
    <select-btn v-model="isShowAdd" @changeSelection="changeSelection" @rightcheckchange="rightcheckchange" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send()">发送</el-button>
    </span>
  </form-dialog>
</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
// eslint-disable-next-line no-unused-vars
import object from 'element-resize-detector/src/detection-strategy/object'
import { array } from 'jszip/lib/support'
import { offMsgD } from '@/api/MessageServer'
import selectBtn from './select'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { FormItems, selectBtn },
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
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '标题', prop: 'title', type: 'input', message: '请输入', span: 24 },
        { label: '接收人', prop: 'userIdList', type: 'custom', span: 24 },
        { label: '内容', prop: 'content', type: 'textarea', message: '请输入', span: 24, rows: 3 }
      ],
      queryForm: {
        title: '',
        content: '',
        userIdList: [],
        userIdListname: ''
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
        userIdList: [
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
      console.log(this.queryForm)
      this.$refs.ruleForm.elForm.validate((valid) => {
        if (valid) {
          const params = {
            ...this.queryForm
          }
          for (let i = 0; i < this.queryForm.userIdList.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (this.queryForm.userIdList[i].indexOf(',') != -1) {
              params.userIdList.push(this.queryForm.userIdList[i].split(',')[0])
            }
          }
          offMsgD(params).then(res => console.log(res))
        }
      })
    },
    showAdditem(value) {
      this.isShowAdd = true
    },
    deleteRow(row) {
      this.tableData.splice(row.rowIndex, 1)
    },
    changeSelection(val) {
      this.tableData = val
      for (let i = 0; i < this.tableData.length; i++) {
        this.queryForm.userIdList.push(this.tableData[i].userAcctIdList)
        this.queryForm.userIdListname += this.tableData[i].userNameList
      }
      console.log(this.queryForm)
    },
    rightcheckchange(val) {
      console.log(val)
      this.queryForm.userIdList = val.idlist
      for (let i = 0; i < val.userlist.length; i++) {
        this.queryForm.userIdListname += val.userlist[i]
      }
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
