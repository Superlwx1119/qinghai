<template>
  <div class="busirole-maintenance">
    <!-- 表格 -->
    <section class="layer height100b">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">业务角色列表</span>
          <div class="box-tools">
            <el-button type="success" @click="addNewBusRole">新增</el-button>
            <el-button type="danger" @click="delBusRole">删除</el-button>
          </div>
        </div>
        <div class="box-body" style="padding:0px;">
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            height="string"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%"
            border
            fit
          >
            <el-table-column align="center" width="50">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.$index" class="textRadio" @change.native="getCurrentRow(scope.row,scope.$index)">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="序号" type="index" align="center" width="50" />
            <el-table-column prop="roleName" show-overflow-tooltip label="角色名称" align="center" />
            <el-table-column prop="roleCodg" show-overflow-tooltip label="角色编码" align="center" />
            <el-table-column prop="dscr" label="描述信息" align="center" width="400" />
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
    <BusRoleAdd v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </div>
</template>

<script>
import BusRoleAdd from './role-add/index'
import { secRoleBusirole, delBusiRoles } from '@/api/Admin/user-management'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'ResourceManagement',
  components: {
    BusRoleAdd
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      dataObj: {
        isShow: false
      },
      radio: '',
      treeLoading: false,
      searchForm: {
        dscr: '',
        roleName: ''
      },
      currentPage: 1,
      pageSize: 15,
      total: 0,
      startRow: 0,
      endRow: 0,
      tableLoading: false,
      tableData: [],
      currentRow: {}
    }
  },
  computed: {
    ...mapGetters([
      'securityRoleId'
    ])
  },
  watch: {

  },
  created() {
  },
  mounted() {

  },
  methods: {
    // 清空页面数据
    clearData() {
      this.tableData = []
    },
    cancelDialog(data) {
      this.dataObj.isShow = false
      if (data === 1) {
        this.getRoleBusList(this.securityRoleId)
      }
    },
    delBusRole() {
      this.$confirm('此操作将删除角色【' + this.currentRow.roleName + '】, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = [this.currentRow]
        params.forEach(item => {
          item.admrolId = this.securityRoleId
          item.admrolBizrolType = '1'
        })
        delBusiRoles(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.getRoleBusList(this.securityRoleId)
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
    addNewBusRole() {
      // console.log(this.securityRoleId, 'thisrr')
      if (this.securityRoleId) {
        this.dataObj.isShow = true
      } else {
        this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">请先选择安全角色或保存新增安全角色</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
      }
    },
    getCurrentRow(row, index) {
      this.currentRow = row
    },
    // 获取角色列表
    getRoleBusList(id) {
      this.tableLoading = true
      const params = {
        pageSize: this.pageSize,
        total: this.total,
        pageNumber: this.currentPage
      }
      secRoleBusirole(id, params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          this.total = res.data.recordCount
          const num1 = this.pageSize * (this.currentPage - 1) + 1
          const num2 = this.pageSize * this.currentPage > this.total ? this.total : this.pageSize * this.currentPage
          this.startRow = num1
          this.endRow = num2
          this.tableLoading = false
        }
      })
    },
    changeIcon(icon) {
      this.searchForm.resuIcon = icon
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoleBusList(this.securityRoleId)
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getRoleBusList(this.securityRoleId)
    }
  }
}
</script>

<style scoped lang="scss">
  .height100b{
    height: 100%;
  }
  .busirole-maintenance{
    /deep/.el-table{
      height: calc(100% - 30px);
    }

    /deep/.el-icon-popper {
    max-height: 400px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    }
    /deep/.el-input-group__prepend{
      span{
        display: inline-block;
        width:40px;
        height: 100%;
        cursor: pointer;
        text-align: center;
        i{
          display: inline-block;
          width:100%;
          height: 100%;
        }
      }
    }
  }

</style>
