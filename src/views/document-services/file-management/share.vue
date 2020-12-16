<!-- 搜索弹框 -->
<template>
  <form-dialog
    v-dialogDrag
    class="audit-dialog-wrapper"
    :title="isShareTitle"
    :is-show="isDialogVisible"
    size="big"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >

    <el-tabs v-model="activeName" type="border-card" @tab-click="changeTab">

      <el-tab-pane label="通讯录" name="first" style="height:400px">
        <FormItems ref="queryForm1" v-model="queryForm1" v-loading="loading" :items-datas="itemsDatas1" :form-datas="queryForm1" :is-grid="false" :item-span="16">
          <div>
            <el-button type="primary" @click="search1">查询</el-button>
          </div>
        </FormItems>
        <my-table-view v-loading="loading1" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns1" :data="tableData1" />
        <Pagination :data="paginationQuery1" @refresh="pageChange1" />
      </el-tab-pane>
      <el-tab-pane label="通讯录组" name="second" style="height:400px">
        <FormItems ref="queryForm2" v-model="queryForm2" v-loading="loading" :items-datas="itemsDatas2" :form-datas="queryForm2" :is-grid="false" :item-span="16">
          <div>
            <el-button type="primary" @click="search2">查询</el-button>
          </div>
        </FormItems>
        <my-table-view v-loading="loading2" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns2" :data="tableData2">
          <template slot="operation" slot-scope="scope">
            <my-button icon="detail" @click="detailRow(scope.row)" />
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery2" @refresh="pageChange2" />
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <my-button type="close" @click="closeDialog">关闭</my-button>
      <my-button type="save" @click="saveEdit">保存</my-button>
    </span>
    <personalAddressBookGroup v-model="isDetailDialog" :is-detal-title="isDetalTitle" :select-row="selectRow" />
  </form-dialog>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import { share, getGrpByPage } from '@/api/DocumentServices/index'
import personalAddressBookGroup from './personal-address-book-group'
export default {
  components: { personalAddressBookGroup },
  mixins: [pageHandle],
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    isShareTitle: {
      type: String,
      default: ''
    },
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isDetailDialog: false,
      isDetalTitle: '',
      activeName: 'first',
      loading: false,
      loading1: false,
      loading2: false,
      paginationQuery1: { pageSize: 10, pageNumber: 1, total: 0, startRow: 0, endRow: 0 },
      paginationQuery2: { pageSize: 10, pageNumber: 1, total: 0, startRow: 0, endRow: 0 },
      queryForm1: { userName: '' },
      queryForm2: { addrbookGrpName: '' },
      itemsDatas1: [{ label: '搜索', prop: 'userName', type: 'input' }],
      itemsDatas2: [{ label: '搜索', prop: 'addrbookGrpName', type: 'input' }],
      columns1: [
        { type: 'selection' },
        { label: '序号', type: 'index' },
        { label: '姓名', prop: 'userName' },
        { label: '所属部门', prop: 'orgName' },
        { label: '手机号', prop: 'tel' }
      ],
      columns2: [
        { type: 'selection' },
        { label: '序号', type: 'index' },
        { label: '个人通讯录组名称', prop: 'addrbookGrpName' },
        { label: '组内成员', prop: 'userNameList' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData1: [],
      tableData2: [],
      selectRow: {}
    }
  },
  watch: {
    isDialogVisible: {
      handler(v) {
        if (v) {
          this.search1()
          this.search2()
        }
      },
      deep: true
    }
  },
  methods: {
    changeTab(tab) {
      if (name === 'first') {
        this.search1()
      } else {
        this.search2()
      }
    },
    search1() {
      const params = {
        pageSize: this.paginationQuery1.pageSize,
        pageNumber: this.paginationQuery1.pageNumber,
        total: this.paginationQuery1.total,
        userName: this.queryForm1.userName
      }
      this.loading1 = true
      share(params).then(res => {
        if (res.code === 0) {
          this.loading1 = false
          this.tableData1 = res.data.result
          this.paginationQuery1 = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.total,
            startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
            endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
          }
        }
      }).catch(() => {
        this.loading1 = false
      })
    },
    search2() {
      const params = {
        pageSize: this.paginationQuery2.pageSize,
        pageNumber: this.paginationQuery2.pageNumber,
        total: this.paginationQuery2.total,
        addrbookGrpName: this.queryForm2.addrbookGrpName
      }
      this.loading2 = true
      getGrpByPage(params).then(res => {
        if (res.code === 0) {
          this.loading2 = false
          this.tableData2 = res.data.result
          this.paginationQuery2 = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.total,
            startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
            endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
          }
        }
      }).catch(() => {
        this.loading2 = false
      })
    },
    pageChange1(v) {
      this.paginationQuery1.pageSize = v.pagination.pageSize
      this.paginationQuery1.pageNumber = v.pagination.pageNum
      this.search('first')
    },
    pageChange2(v) {
      this.paginationQuery2.pageSize = v.pagination.pageSize
      this.paginationQuery2.pageNumber = v.pagination.pageNum
      this.search('second')
    },
    // 查看第二个表格的详情
    detailRow(row) {
      this.isDetailDialog = true
      this.isDetalTitle = '个人通讯录组'
      this.selectRow = row
    },
    reset() {
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    // 保存修改
    saveEdit() {
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        // this.$refs.tableRef.reset()
      })
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
