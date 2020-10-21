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
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm">
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
      rules: {
        // title: [
        //   { required: true, message: '请输入短信标题', trigger: 'blur' }
        // ]
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
    search() {
      const param = {
        pageSize: 10,
        pageNumber: 1,
        total: 259,
        ...this.queryForm
      }
      addrBookpage(param).then(res => {
        this.tableData = res.data.result
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
