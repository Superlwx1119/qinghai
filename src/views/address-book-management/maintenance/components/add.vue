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
        <FormItems ref="ruleForm" :items-datas="itemsDatas" :is-grid="false" :rules="rules" :form-datas="queryForm" :model="queryForm">
          <template slot="userIdList">
            <el-input v-model="queryForm.userIdListname" placeholder="请选择联系人" class="input-with-select" disabled>
              <el-button slot="append" icon="el-icon-search" @click="showAdditem()" />
            </el-input>
          </template>
        </FormItems>
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
            <el-button type="primary" icon="el-icon-edit" @click="showDialog(scope.row)" />
          </template>
        </my-table-view>
      </template>
    </normal-layer>
    <AddList v-model="isShowAddList" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" @click="send()">发送</el-button>
    </span>

  </form-dialog>
</template>
<script>
import AddList from './addlist'
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
        { label: '个人通讯录组名称', prop: 'orgName' },
        { label: '组内成员', prop: 'uactName' },
        { label: '创建时间', prop: 'visFlag' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      isShowAddList: false,
      isShowAdd: false,
      showAdd: false,
      loading: false,
      itemsDatas: [
        { label: '个人通讯录组名称', prop: 'title', type: 'input', message: '请输入', span: 24 }],
      queryForm: {
        title: ''
      },
      tableData: [],
      rules: {
        title: [
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
