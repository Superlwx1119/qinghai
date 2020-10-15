<template>
  <!-- CMS模板编辑 -->
  <div class="item2">
    <section class="layer">
      <div class="box">
        <div class="box-header">
          <span class="box-title">查询条件</span>
        </div>
        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" label-width="105px">
            <el-row :gutter="12">
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="模板标题" prop="teplTiele" class="clearmargin">
                  <el-input v-model="searchForm.tmplTitle" clearable placeholder="请输入" style="width:100%;" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6" class="right" style="text-align:right">
                <el-button @click="restSearch">重置</el-button>
                <el-button type="primary" @click="search">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
    <section class="layer">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">模板信息</span>
          <div class="box-tools">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="success" @click="addItem">新增</el-button>
          </div>
        </div>
        <div class="box-body">
          <el-table
            ref="infoTable"
            v-loading="table.loading"
            :data="table.tableData"
            height="tableHeight"
            element-loading-spinner="el-loading1"
            border
            fit
            highlight-current-row
            @selection-change="selectRows"
          >
            <el-table-column :reserve-selection="true" type="selection" width="55" align="center" />
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column prop="title" align="center" show-overflow-tooltip label="模板标题" />
            <el-table-column prop="institutions" align="center" show-overflow-tooltip label="应用机构" width="210" />
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="审批人" width="140" />
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="审批意见" width="140" />
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="审批时间" width="140" />
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="审批结果" width="140" />
            <el-table-column prop="approval" align="center" show-overflow-tooltip label="提交状态" width="140" />
            <el-table-column label="操作" width="140" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button type="text" class="modify" @click="detail(scope.row)">详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="table.pageNum"
            :page-sizes="[15, 30, 50, 100]"
            :page-size="table.pageSize"
            :total="table.total"
            layout="total, prev, pager, next, sizes, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </section>
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dataObj.show"
      title="模板编辑"
      width="80%"
      @close="closeDialog"
    >
      <dialog-item ref="dialogItem" />
      <span slot="footer" class="dialog-footer">
        <el-button type="" @click="closeDialog">关闭</el-button>
        <el-button type="primary" @click="dialogSave">暂存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dialogItem from './dialog-item'
export default {
  name: 'CmsTmpl',
  components: {
    'dialog-item': dialogItem
  },
  data() {
    return {
      searchForm: {
        tmplTitle: ''
      },
      searchInfo: {},
      table: {
        tableData: [],
        selectData: [],
        pageNum: 1,
        pageSize: 15,
        total: 0,
        startRow: 0,
        endRow: 0,
        loading: false
      },
      dataObj: {
        show: false
      }
    }
  },
  created() {
    this.search()
  },
  methods: {
    // 查询
    search() {
      this.table.loading = true
      const params = this.searchForm
      this.searchInfo = Object.assign({}, params)
      this.table.pageNum = 1
      this.pageChange()
    },
    // 页码
    pageChange() {
      const params = this.searchInfo
      params.pageNum = this.table.pageNum
      params.pageSize = this.table.pageSize
      this.table.loading = false
    },
    // 表格选择
    selectRows(rows) {
      this.table.selectData = rows
    },
    // 提交
    submit() {
      if (this.table.selectData.length === 0) {
        this.$message.info('请选中一条申请')
        return false
      }
    },
    // 新增弹窗
    addItem() {
      this.dataObj.show = true
    },
    // 关闭弹窗
    closeDialog() {
      this.$refs.dialogItem.reset()
      this.dataObj.show = false
    },
    // 新增保存
    dialogSave() {
      this.$refs.dialogItem.save()
    },
    // 分页导航
    handleSizeChange(size) {
      this.table.pageSize = size
      this.pageChange()
    },
    // 分页选择
    handleCurrentChange(currentPage) {
      this.table.pageNum = currentPage
      this.pageChange()
    },
    // 重置
    restSearch() {
      this.$refs['searchForm'].resetFields()
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
