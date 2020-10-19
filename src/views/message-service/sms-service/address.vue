<!-- 搜索弹框 -->
<template>
  <normal-layer :search-number="1">
    <template slot="search-header">
      <FormItems :items-datas="itemsDatas" :is-grid="false" :form-datas="queryForm">
        <div>
          <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
        </div>
      </FormItems>
    </template>
    <template>
      <my-table-view v-loading="loading" height="300px" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
        <template slot="operation" slot-scope="scope">
          <el-button type="text" @click="showDialog('edit',scope.row)">编辑</el-button>
          <el-button type="text" @click="showDialog('detail',scope.row)">查看</el-button>
          <el-button type="text" @click="showDialog('apply',scope.row)">申报</el-button>
          <el-button type="text" class="delete" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </my-table-view>
      <Pagination :data="paginationQuery" @refresh="pageChange" />
    </template>
  </normal-layer>

</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import upload from '@/api/DocumentServices/Api'
export default {
  components: { FormItems },
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
        { label: '搜索', prop: 'title', type: 'input', message: '请输入', span: 12 }
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
        total: 0
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
    this.url = upload.upload
  },

  methods: {
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
