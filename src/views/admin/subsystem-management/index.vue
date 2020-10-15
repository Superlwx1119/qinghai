<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 子系统管理 -->
  <div class="item2">
    <section class="layer">
      <div class="box">
        <div class="box-header">
          <span class="box-title">查询条件</span>
        </div>
        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" label-width="90px">
            <el-row :gutter="24" style="margin-right:0!important;margin-left:0!important;">
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="子系统名称" prop="subsysName">
                  <el-input v-model="searchForm.subsysName" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="子系统编码" prop="subsysCodg">
                  <el-input v-model="searchForm.subsysCodg" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6" class="text-right right">
                <el-button @click="restSearch">重置</el-button>
                <el-button type="primary" @click="search">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
    <!-- 表格 -->
    <section class="layer" style=" height: calc(100% - 109px);">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">子系统列表</span>
          <div class="box-tools">
            <el-button type="success" @click="handleAdd">新增</el-button>
          </div>
        </div>
        <div class="box-body">
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            height="string"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%;height:calc(100% - 31px)"
            border
            fit
          >
            <el-table-column label="序号" type="index" align="center" width="50" />
            <el-table-column prop="subsysName" show-overflow-tooltip label="子系统名称" align="center" />
            <el-table-column prop="subsysCodg" show-overflow-tooltip label="子系统编码" align="center" />
            <el-table-column prop="sysPath" show-overflow-tooltip label="系统路径" align="center" />
            <el-table-column prop="crterName" label="经办人" show-overflow-tooltip align="center" width="115" />
            <el-table-column prop="crteTime" label="经办时间" show-overflow-tooltip width="180" header-align="center" align="center">  <template slot-scope="scope">
              {{ scope.row.crteTime |parseTime }}
            </template>
            </el-table-column>
            <el-table-column prop="dscr" label="说明" align="center" width="400" />
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <!-- <el-button type="text" class="modify" @click.stop="details(scope.row)">详情</el-button> -->

                <my-button icon="edit" title="修改" @click.stop="modifyrow(scope.row)" />
                <my-button icon="delete" title="删除" @click.stop="del(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]"
            :page-size="pageSize"
            :total="total"
            layout="slot, prev, pager, next, sizes, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
            <template slot>
              <span class="el-pagination__total">{{ `总共${total}条 显示${startRow}-${endRow}条` }}</span>
            </template>
          </el-pagination>
        </div>
      </div>
    </section>
    <!-- 新增 -->
    <subsystem-add v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </div>
</template>
<script>
import subsystemAdd from './subsystem-add/index'
import ApiObj from '@/api/Admin/user-management'
export default {
  name: 'UserManagement',
  components: {
    subsystemAdd
  },
  mixins: [],
  props: {},
  data() {
    return {
      dataObj: {
        isShow: false,
        isQuery: false,
        isModify: false,
        rows: {}
      },
      currentPage: 1,
      pageSize: 15,
      total: 0,
      startRow: 0,
      endRow: 0,
      searchForm: {
        subsysName: '',
        subsysCodg: ''
      },
      tableData: [],
      tableLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getSubsystemList()
  },
  mounted() {
  },
  methods: {
    // 获取查询子系统列表
    getSubsystemList() {
      const params = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
        total: 0,
        ...this.searchForm
      }
      this.tableLoading = true
      ApiObj.sysSubsysD(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          this.total = res.data.recordCount
          const num1 = this.pageSize * (this.currentPage - 1) + 1
          const num2 = this.pageSize * this.currentPage > this.total ? this.total : this.pageSize * this.currentPage
          this.startRow = num1
          this.endRow = num2
        }
        this.tableLoading = false
      }).catch(() => { this.tableLoading = false })
    },
    // 查询
    search() {
      this.currentPage = 1
      this.pageSize = 15
      this.getSubsystemList()
    },
    del(row) {
      this.$confirm(`<div class="myalert-header">操作提醒</div><div class="myalert-content">确认删除？</div>`, {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleterow(row)
        })
        .catch(() => {

        })
    },
    // 删除
    deleterow(row) {
      const params = row.subsysId
      ApiObj.delSubsys(params).then(res => {
        if (res.code === 0) {
          this.getSubsystemList()
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
    },
    // 修改
    modifyrow(row) {
      this.dataObj.isShow = true
      this.dataObj.isModify = true
      this.dataObj.subsysId = row.subsysId
      this.dataObj.row = Object.assign({}, row)
    },
    //  重置
    restSearch() {
      this.$refs.searchForm.resetFields()
    },

    // 新增
    handleAdd() {
      this.dataObj.isShow = true
      this.dataObj.isModify = false
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
      this.getSubsystemList()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSubsystemList()
    },
    // 关闭弹出框
    cancelDialog(data) {
      this.dataObj.isShow = false
      this.dataObj.isModify = false
      this.dataObj.subsysId = ''
      if (data === 1) {
        this.getSubsystemList()
      }
      this.dataObj.rows = {}
    }
  }
}
</script>

<style lang="scss">

</style>
