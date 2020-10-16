<template>
  <div class="busirole-maintenance">
    <section class="layer">
      <div class="box">
        <div class="box-body height100b" style="padding:0;height:100%;">
          <el-table
            v-loading="roleUserTableLoading"
            :data="roleUserTableData"
            height="String"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%"
            class="height100b"
            border
            fit
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            />
            <el-table-column label="序号" type="index" align="center" width="55" />
            <el-table-column prop="uact" show-overflow-tooltip label="角色名称" align="center" />
            <el-table-column prop="userName" show-overflow-tooltip label="角色类别" align="center" />
            <el-table-column prop="uactStas" show-overflow-tooltip label="描述信息" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.uactStas"
                  disabled
                  active-value="1"
                  inactive-value="3"
                  @change="switchChange(scope.$index,scope.row)"
                />

              </template>
            </el-table-column>
            <el-table-column prop="dscr" show-overflow-tooltip label="描述信息" align="center" />
          </el-table>
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]"
            :page-size="pageSize"
            :total="total"
            class="height100b"
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
  </div>
</template>

<script>
export default {
  name: 'BusiroleManage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      // 子系统列表
      dataObj: {
        isShow: false
      },
      treeLoading: false,
      searchForm: {
        dscr: '',
        roleCodg: '',
        roleName: ''
      },
      searchFormQuery: {
        filterText: ''
      },
      rules: {
        roleCodg: [{ required: true, message: '请输入角色编号', trigger: 'blur' }],
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      currentPage: 1,
      pageSize: 15,
      total: 0,
      startRow: 0,
      endRow: 0,
      roleUserTableData: [],
      roleUserTableLoading: false,
      roleId: '',
      selectedList: [],
      selectedListArr: []
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
  },
  mounted() {

  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('update:multipleSelection', val)
    },
    changeIcon(icon) {
      this.searchForm.resuIcon = icon
    },
    // 查询
    search() {
      // this.getTableData(this.kpiFcode)
    },
    // 重置
    restSearch() {

    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
      // this.getUserList()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      // this.getUserList()
    },
    cancelDialog() {
      this.dataObj.isShow = false
      this.getRelationUser(this.roleId)
    }
  }
}
</script>

<style scoped lang="scss">
  .height100b{
    height: 100%;
  }
</style>
