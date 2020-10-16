<template>
  <!--CMS栏目内容编辑-->
  <div class="CmsColCont">
    <el-row :gutter="12" style="height:100%;">
      <el-col :span="6" style="height:100%;">
        <section class="layer" style="height:100%;">
          <div class="tree-box box">
            <div class="box-header">
              <span class="box-title">标题信息</span>
            </div>
            <el-input v-model="tree.filterText" placeholder="请输入标题名称" />
            <el-tree
              ref="elTree"
              :data="tree.treeData"
              :props="tree.defaultProps"
              :filter-node-method="filterNode"
              :default-expanded-keys="['1']"
              node-key="servitemType"
              accordion
              @node-click="handleNodeClick"
            >
              <span slot-scope="{ node }" class="span-ellipsis">
                <span :title="node.label">{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
        </section>
      </el-col>
      <el-col :span="18" style="height:100%;">
        <section class="layer">
          <div class="box">
            <div class="box-header">
              <span class="box-title">查询条件</span>
            </div>
            <div class="box-body">
              <el-form ref="searchForm" :model="searchForm" label-width="100px">
                <el-row :gutter="12">
                  <el-col :md="12" :lg="8" :xl="6">
                    <el-form-item label="栏目内容标题" prop="stdName">
                      <el-input v-model="searchForm.stdName" placeholder="请输入" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :lg="8" :xl="6">
                    <el-form-item label="提交状态" prop="declareStatus">
                      <el-select
                        v-model="searchForm.declareStatus"
                        placeholder="请选择"
                        style="width:100%;"
                        clearable
                      >
                        <el-option
                          v-for="item in selectList.stateList"
                          :key="item.dictValueCode"
                          :label="item.dictValueName"
                          :value="item.dictValueCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :lg="8" :xl="6" style="font-size:0;text-align:right;">
                    <el-button @click="resetForm">重置</el-button>
                    <el-button type="primary" @click="search">查询</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </section>
        <!-- 表格 -->
        <section class="layer ts">
          <div class="box">
            <div class="box-header handle">
              <span class="box-title">栏目内容</span>
              <div class="box-tools">
                <el-button type="primary">取消发布</el-button>
                <el-button type="primary">提交</el-button>
                <el-button type="success">新增</el-button>
              </div>
            </div>
            <div ref="mainTable" class="box-body">
              <el-table
                v-loading="table.loading"
                :data="table.tableData"
                height="calc(100% - 40px)"
                border
                fit
                element-loading-spinner="el-loading1"
                style="width: 100%;"
              >
                <el-table-column :reserve-selection="true" type="selection" width="55" align="center" />
                <el-table-column label="序号" type="index" align="center" width="50" />
                <el-table-column
                  min-width="100"
                  prop="stdName"
                  label="栏目标题"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column prop="admdvsName" label="栏目内容" align="center" show-overflow-tooltip />
                <el-table-column
                  prop="appyDateStr"
                  label="审批人"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="crtNodeName"
                  label="审批时间"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="crtNodeName"
                  label="审批意见"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="crtNodeName"
                  label="审批结果"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="crtNodeName"
                  label="审批状态"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="crtNodeName"
                  label="提交状态"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column width="180" label="操作" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="text" class="modify" @click.stop="isExamine(scope.row,'query')">详情</el-button>
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'CmsColCont',
  components: {},
  data() {
    return {
      tree: {
        treeData: [],
        filterText: '',
        defaultProps: {
          value: 'servitemType',
          label: 'servitemTypeName'
        }
      },
      table: {
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        loading: false
      },
      searchForm: {
        stdName: '',
        declareStatus: ''
      },
      searchInfo: {},
      selectList: {
        stateList: []
      }
    }
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.elTree.filter(val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 重置查询条件
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.pageChange()
    },
    filterNode(value, data) {
      if (!value) return true
      return data.servitemTypeName.indexOf(value) !== -1
    },
    getLeftTreeData() {},
    handleNodeClick(data) {
      this.pageChange()
    },
    // 查询
    search() {
      this.table.loading = true
      const params = this.searchForm
      this.searchInfo = Object.assign({}, params)
      this.table.pageNum = 1
      this.pageChange()
    },
    pageChange() {
      const params = this.searchInfo
      params.pageNum = this.table.pageNum
      params.pageSize = this.table.pageSize
      this.table.loading = false
    },
    //  重置
    restSearch() {
      this.$refs.searchForm.resetFields()
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.table.pageSize = val
      this.pageChange()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.table.pageNum = val
      this.pageChange()
    }
  }
}
</script>

<style scoped lang="scss">
.CmsColCont {
  height: 100%;

  .tree-box {
    overflow: auto;
    .el-tree {
      color: #303133;
    }
  }

  @media only screen and (min-width: 1441px) {
    .el-form .el-row .el-col:last-child {
      float: right;
      text-align: right;
    }
  }
  @media only screen and (max-width: 1440px) {
    .el-form .el-row .el-col:last-child {
      float: right;
      text-align: right;
    }
  }
  @media only screen and (max-width: 1024px) {
    .el-form .el-row .el-col:nth-child(3) .el-form-item {
      margin-bottom: 0;
    }
  }

  .ts {
    height: calc(100% - 120px);
    @media only screen and (max-width: 1440px) {
      height: calc(100% - 120px);
    }
    @media only screen and (max-width: 1024px) {
      height: calc(100% - 158px);
    }
  }
}
</style>

