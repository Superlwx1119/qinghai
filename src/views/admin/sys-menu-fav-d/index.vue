<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 菜单收藏夹 -->
  <div class="item2 fav-menu">
    <section class="layer">
      <div class="box">
        <div class="box-header">
          <span class="box-title">查询条件</span>
        </div>
        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" label-width="90px">
            <el-row :gutter="24" style="margin-right:0!important;margin-left:0!important;">
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="子系统名称" prop="subsysId">
                  <subSysSelect ref="subSysSelect" @getSubsys="getSubsys" />
                  <!-- <el-input v-model="searchForm.subsysName" clearable placeholder="请输入" /> -->
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="菜单名称" prop="resuName">
                  <el-input v-model="searchForm.resuName" clearable placeholder="请输入" />
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
          <span class="box-title">菜单列表</span>
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
            style="width: 100%"
            border
            fit
          >
            <el-table-column label="序号" type="index" align="center" width="50" />
            <el-table-column prop="resuName" show-overflow-tooltip label="菜单名称" align="center" />
            <el-table-column :formatter="subsysFormat" prop="subsysId" show-overflow-tooltip label="子系统" align="center">
              <!-- <template slot-scope="scope">
                {{ scope.row.subsysId }}
              </template> -->
              <!-- {{ scope.row.subsysId|fliterTime }} -->
            </el-table-column>
            <el-table-column prop="menuPath" label="菜单路径" align="left" width="400" />
            <el-table-column prop="crteTime" label="经办时间" show-overflow-tooltip header-align="center" width="200" align="center">  <template slot-scope="scope">
              {{ scope.row.crteTime |parseTime }}
            </template>
              <!-- {{ scope.row.subsysId|fliterTime }} -->
            </el-table-column>

            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <el-button type="text" class="delete" @click.stop="del(scope.row)">删除</el-button>
              </template>
            </el-table-column></el-table>
        </div>
      </div>
    </section>
    <!-- 新增 -->
    <MenuAdd v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </div>
</template>
<script>
import MenuAdd from './menu-add/index'
import subSysSelect from '@/components/SubsysSelect/index'
import ApiObj from '@/api/Admin/user-management'
import { mapGetters } from 'vuex'
export default {
  name: 'UserManagement',
  components: {
    MenuAdd,
    subSysSelect
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
        sort: ''
      },
      tableData: [],
      tableLoading: false,
      options: []
    }
  },
  computed: {
    ...mapGetters([
      'subsysList'
    ])
  },
  watch: {},
  created() {
    this.getSysMenuFavD()
  },
  mounted() {
  },
  methods: {
    // 子系统过滤器
    subsysFormat(row, column) {
      const subsysId = row[column.property]
      if (!subsysId) {
        return '--'
      }
      let sysName = ''
      this.subsysList.forEach(element => {
        if (element.subsysId === subsysId) {
          sysName = element.subsysName
        }
      })
      if (!sysName) {
        sysName = subsysId
      }
      return sysName
    },
    // 切换获取子系统id
    getSubsys(data) {
      this.searchForm.subsysId = data
    },
    // 获取查询菜单收藏
    getSysMenuFavD() {
      const params = {
        ...this.searchForm
      }
      this.tableLoading = true
      ApiObj.sysMenuFavD(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
        this.tableLoading = false
      }).catch(() => { this.tableLoading = false })
    },
    // 查询
    search() {
      this.getSysMenuFavD()
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
      console.log(row, 'row')
      ApiObj.delMenu(row.menuFavId).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            dangerouslyUseHTMLString: true,
            message: `<strong>操作成功</strong><p>${res.message}</p>`,
            duration: 1000
          })
          this.cancelDialog(1)
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
      this.dataObj.mnitId = row.mnitId
    },
    //  重置
    restSearch() {
      this.$refs.searchForm.resetFields()
      this.$refs.subSysSelect.reset()
    },

    // 新增
    handleAdd() {
      this.dataObj.isShow = true
      this.dataObj.isModify = false
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
      this.getSysMenuFavD()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSysMenuFavD()
    },
    // 关闭弹出框
    cancelDialog(data) {
      this.dataObj.isShow = false
      this.dataObj.isModify = false
      this.dataObj.mnitId = ''
      if (data === 1) {
        this.getSysMenuFavD()
      }
      this.dataObj.rows = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .fav-menu{
    /deep/.el-table{
      height: 100%;
    }
  }
</style>
