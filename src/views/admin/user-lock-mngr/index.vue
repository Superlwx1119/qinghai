<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 账号解锁查询 -->
  <normal-layer :search-number="itemsDatas.length" title-name="用户解锁列表">
    <template slot="search-header">
      <FormItems ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm">
        <div>
          <MyButton type="reset" @click="reset" />
          <MyButton type="search" @click="iniSearch" />
        </div>
      </FormItems>
    </template>
    <my-table-view v-loading="loading" :columns="columns" :data="tableData" :have-expand="false" :max-cloumns="100" :is-configheader="false" :multiple-selection.sync="multipleSelection">
      <template slot="operation" slot-scope="scope">
        <MyButton icon="edit" title="解锁" @click.stop="unlock(scope.row)" />
      </template>
    </my-table-view>
    <Pagination :data="pageInfo" @refresh="pageChange" />
  </normal-layer>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import { tableColumns } from './tableConfig'
import ApiObj from '@/api/Admin/user-management'
export default {
  name: 'UserManagement',
  components: {
    NormalLayer,
    FormItems
  },
  mixins: [pageHandle],
  props: {},
  data() {
    return {
      pageInfo: {
        pageNumber: 1,
        pageSize: 15,
        startRow: 0,
        endRow: 0,
        total: 0
      },
      queryForm: {
        uact: ''
      },
      itemsDatas: [
        { label: '用户账号', prop: 'uact', type: 'input' }
      ],
      columns: tableColumns,
      tableData: [],
      loading: false
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.iniSearch()
  },
  methods: {
    search() {
      this.getUserList()
    },
    unlock(row) {
      this.$confirm('确定要解锁' + row.uact + '?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = row.uact
        ApiObj.userUnlock(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
              <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取查询信息列表
    getUserList() {
      const params = {
        pageNumber: this.pageInfo.pageNumber,
        pageSize: this.pageInfo.pageSize,
        total: 0,
        ...this.queryForm
      }
      this.loading = true
      ApiObj.userLock(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          const num1 = res.data.pageSize * (res.data.pageNumber - 1) + 1
          const num2 = res.data.pageSize * res.data.pageNumber > res.data.total ? res.data.total : res.data.pageSize * res.data.pageNumber
          this.pageInfo = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.recordCount || 0,
            startRow: num1 || 0,
            endRow: num2 || 0
          }
        }
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 新增
    handleAdd() {
      this.dataObj.isShow = true
      this.dataObj.isModify = false
    },
    pageChange(data) {
      this.pageInfo.pageSize = data.pagination.pageSize
      this.pageInfo.pageNumber = data.pagination.pageNum
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-lock{
  /deep/.el-table{
    height:calc(100% - 32px)
  }
}
</style>
