<template>
  <div class="function-list">
    <!-- API -->

    <section class="layer" style="height:100%">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">API列表</span>
          <div class="box-tools">
            <el-button :disabled="!resourceInfo.resuId" type="success" @click="addNewAPI">新增</el-button>
          </div>
        </div>

        <div class="box-body">
          <el-table
            v-loading="APITableLoading"
            :data="APITableData"
            height="string"
            element-loading-spinner="el-loading1"
            highlight-current-row
            style="width: 100%"
            border
            fit
          >
            <el-table-column label="序号" type="index" align="center" width="50" />
            <el-table-column prop="resuName" show-overflow-tooltip label="API名称" align="center" />
            <el-table-column prop="resuPath" show-overflow-tooltip label="API路径" align="center" />
            <el-table-column prop="dscr" show-overflow-tooltip label="说明" align="center" />
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <el-button type="text" class="modify" @click.stop="modifyAPI(scope.row)">修改</el-button>
                <el-button type="text" class="delete" @click.stop="delApi(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </section>
    <FunctionAdd v-if="dataObjFunc.isShow" :data-obj="dataObjFunc" @cancelDialog="cancelFunctionAdd" />
    <ApiAdd v-if="dataObjAPI.isShow" :data-obj="dataObjAPI" @cancelDialog="cancelAPIAdd" />
  </div>
</template>

<script>
import { delResource, sysr } from '@/api/Admin/user-management'
import FunctionAdd from './function-add/index'
import ApiAdd from './API-add/index'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'ResourceManagement',
  components: {
    FunctionAdd, ApiAdd
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      radio: '',
      treeLoading: false,
      searchForm: {
        dscr: '',
        resuCodg: '',
        resuIcon: '',
        resuName: '',
        resuPath: '',
        subsysId: ''
      },
      tableLoading: false,
      functionTableData: [],
      functionTableLoading: false,
      APITableLoading: false,
      APITableData: [],
      dataObjFunc: {
        isShow: false
      },
      dataObjAPI: {
        isShow: false,
        functionInfo: {}
      },
      activeRow: {}
    }
  },
  computed: {
    ...mapGetters([
      'resourceInfo'
    ])
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    clearData() {
      this.APITableData = []
    },
    modifyAPI(row) {
      this.dataObjAPI.row = Object.assign({}, row)
      this.dataObjAPI.isShow = true
      this.dataObjAPI.modify = true
    },
    // 删除api
    delApi(row) {
      this.$confirm('此操作将永久删除该API, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delResource(row.resuId).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.handleCurrentChange(this.activeRow)
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
    // 新增api
    addNewAPI() {
      this.dataObjAPI.isShow = true
      this.dataObjAPI.modify = false
    },
    // 关闭新增api
    cancelAPIAdd(data) {
      this.dataObjAPI.isShow = false
      if (data === 1) {
        this.handleCurrentChange(this.activeRow)
      }
    },
    handleCurrentChange(row) {
      this.activeRow = row
      this.APITableLoading = true
      this.dataObjAPI.functionInfo = row
      sysr(row.resuId).then(res => {
        if (res.code === 0) {
          this.APITableData = res.data
          this.APITableLoading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .height100b{
    height: 100%;
  }
  .height50b{
    height: 50%;
  }
  .function-list{
  }

</style>
