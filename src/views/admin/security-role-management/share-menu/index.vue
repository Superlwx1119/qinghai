<template>
  <div class="resource-management">
    <!-- 可用菜单 -->
    <section class="layer">
      <el-row :gutter="12">
        <el-col :span="24">
          <div class="box">
            <div class="box-header">
              <span class="box-title">选择可分配菜单</span>
              <div class="box-tools">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                  <el-form-item>
                    <el-input
                      v-model="filterText"
                      placeholder="输入关键字进行过滤"
                      suffix-icon="el-icon-search"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button>重置</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="saveShareResource">保存</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div v-loading="treeLoading" class="box-body" style="height:calc(100% - 36px)" element-loading-spinner="el-loading1">
              <el-tree ref="tree" :data="treeData" :props="defaultProps" :default-expanded-keys="['1']" :filter-node-method="filterNode" node-key="id" show-checkbox @node-click="handleNodeClick" />
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import ApiObj from '@/api/Admin/user-management'
export default {
  name: 'ResourceManagement',
  components: {
  },
  mixins: [
  ],
  props: {
  },
  data() {
    return {
      filterText: '',
      treeData: [],
      treeLoading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      listData: '',
      searchForm: {
        filterText: ''
      },
      kpiFcode: '',
      kpiFname: '',
      tableData: [],
      tableLoading: false,
      resuNodeDTOs: []
    }
  },
  computed: {

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getTreeData()
  },
  mounted() {

  },
  methods: {
    saveShareResource() {
      this.getCheckedNodes()
      const params = {
        authType: '1',
        resourceType: '1',
        roleId: this.roleId,
        roleType: '1',
        resuNodeDTOs: this.resuNodeDTOs
      }
      ApiObj.shareResources(params).then(res => {
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
    },
    getCheckedNodes() {
      const checkArr = this.$refs.tree.getCheckedNodes()
      const halfCheckArr = this.$refs.tree.getHalfCheckedNodes()
      const newCheckArr = checkArr.filter(obj => obj.name !== '菜单列表' && obj.name !== '组件')
      const newHalfCheckArr = halfCheckArr.filter(obj => obj.name !== '菜单列表' && obj.name !== '组件')

      this.resuNodeDTOs = [...newHalfCheckArr, ...newCheckArr]
    },
    // 获取已选择节点
    setCheckedNodes(data) {
      this.roleId = data
      const params = {
        roleId: this.roleId,
        resuType: '1',
        authType: 1
      }
      this.treeLoading = true
      ApiObj.resourceTree(params).then(res => {
        if (res.code === 0) {
          const arr = []
          this.$refs.tree.setCheckedKeys(arr)
          res.data.forEach(item => {
            this.$refs.tree.setChecked(item.id, true, false)
          })
          this.treeLoading = false
        }
      }).catch(err => err)
    },

    // 节点过滤器
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 获取树数据
    getTreeData() {
      const params = {
        roleId: this.roleId,
        resuType: '1',
        authType: 1
      }
      this.treeLoading = true
      ApiObj.menuElet(params).then(res => {
        if (res.code === 0) {
          this.listData = res.data
          const arr = [{ name: '菜单列表', children: [] }, { name: '组件', children: [] }]
          this.listData.forEach((item, index) => {
            if (item.parentId === '-1') {
              arr[0].children.push(item)
            } else {
              arr[1].children.push(item)
            }
          })
          this.treeData = arr
          this.treeLoading = false
        }
      }).catch(err => err)
    },
    handleNodeClick(data) {
      if (data.id) {
        this.$refs.menuMaintenance.getMenuInfo(data.id)
        this.$refs.functionList.getFunctionList(data.id)
      }
    },
    clearData() {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>

<style scoped lang="scss">
.resource-management {
  height: 100%;

  .layer {
    height: 100%;

    .el-row {
      height: 100%;

      .el-col {
        height: 100%;

        &:first-child{

          .box {
            height: 100%;

            .el-tree {
              height: 100%;
              overflow: auto;

              /deep/ .el-tree-node__content > .el-tree-node__label {
                width: 100%;
                // @include one-line-text
                // word-wrap:break-word;
                // word-break:normal;
              }
            }
          }
        }

      }
    }
  }
  .handle-resoure{
      .box-body{
          height: 100;
      }
      /deep/.el-tabs__content{
          height: calc(100% - 67px);
      }
  }
  .height100b{
      height: 100%;
  }
}
</style>
