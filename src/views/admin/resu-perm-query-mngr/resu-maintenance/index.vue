<template>
  <div class="menu-maintenance">
    <section class="layer" style="height:100%;">
      <div class="box">
        <div class="box-body">
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            height="string"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%;"
            border
            fit
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="50" />
            <el-table-column label="序号" type="index" align="center" width="50" />
            <el-table-column prop="uact" show-overflow-tooltip label="用户账号" align="center" />
            <el-table-column prop="userName" show-overflow-tooltip label="姓名" align="center" />
            <el-table-column prop="certNO" show-overflow-tooltip label="证件号码" align="center" />
            <el-table-column prop="tel" show-overflow-tooltip label="办公号码" align="center" />
            <el-table-column prop="mob" show-overflow-tooltip label="手机号码" align="center" />
            <el-table-column prop="uactStas" show-overflow-tooltip label="账号状态" align="center">
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
            <el-table-column prop="orgName" label="组织结构" align="center" />
            <el-table-column prop="dscr" label="描述信息" align="center" />
          </el-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { securityRoleUsersDel } from '@/api/Admin/user-management'
import {
  mapGetters
} from 'vuex'
import { array } from 'jszip/lib/support'
export default {
  name: 'ResourceManagement',
  components: {
  },
  mixins: [

  ],
  props: {
    tableData: {
      type: array,
      default: () => []
    }
  },
  data() {
    return {
      dataObj: {
        isShow: false
      },
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
      rules: {
        roleName: [{
          required: true, message: '请输入角色名称', trigger: 'blur'
        }]
      },
      // nodeInfo: {},
      selectedList: [],
      selectedListArr: []
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
    console.log(this.tableData)
  },
  methods: {
    // // 选择关联用户
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    }
    // handleSelectionChange(val) {
    //   if (this.securityRoleId) {
    //     this.selectedList = val
    //     this.selectedListArr = this.selectedList.map(item => {
    //       return {

    //         roleId: this.securityRoleId,
    //         roleName: this.searchForm.roleName,
    //         roleType: '1',
    //         ...item
    //       }
    //     })
    //   } else {
    //     this.$alert(`<div class="myalert-header">操作失败</div>
    //                 <div class="myalert-content">请选择一个安全角色</div>`, {
    //       dangerouslyUseHTMLString: true, confirmButtonText: '确定',
    //       type: 'warning'
    //     })
    //   }
    // },
  }
}
</script>

<style scoped lang="scss">
  .height100b{
    height: 100%;
  }

  .menu-maintenance{
    /deep/.el-icon-popper {
    max-height: 400px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    }
    /deep/.el-table{
      height: 100%;
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
