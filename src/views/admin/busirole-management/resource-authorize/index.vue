<template>
  <div class="resource-authorize">
    <!-- 可用菜单 -->
    <section class="layer">
      <el-row :gutter="12">
        <el-col :span="24">
          <div class="box">
            <div class="box-header">
              <span class="box-title">选择资源授权</span>
              <div class="box-tools">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                  <el-form-item prop="filterText">
                    <el-input
                      v-model="filterText"
                      placeholder="输入关键字进行过滤"
                      suffix-icon="el-icon-search"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="restSearch">重置</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="saveBusiroleResc">保存</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div v-loading="treeLoading" class="box-body" style="height:calc(100% - 36px)" element-loading-spinner="el-loading1">
              <!-- <el-tree ref="tree" :data="treeData" :props="defaultProps" :default-expanded-keys="['all']" :filter-node-method="filterNode" node-key="id" show-checkbox @node-click="handleNodeClick" /> -->
              <el-tree
                ref="tree"
                :data="treeData"
                :props="defaultProps"
                :default-expanded-keys="['menu']"
                :filter-node-method="filterNode"
                node-key="id"
                show-checkbox
                @node-click="handleNodeClick"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span :class="{'special-node':data.data.resuType==='4'}">{{ node.label }}</span>
                </span></el-tree>
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
      roleId: '',
      nodeRoleId: '',
      currentUser: [],
      resuNodeDTOs: ''
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
    this.getCurrentUser()
  },
  mounted() {

  },
  methods: {
    // 获取已勾选
    getCheckedNodes() {
      const checkArr = this.$refs.tree.getCheckedNodes()
      const halfCheckArr = this.$refs.tree.getHalfCheckedNodes()
      const newCheckArr = checkArr.filter(obj => obj.name !== '菜单列表' && obj.name !== '组件')
      const newHalfCheckArr = halfCheckArr.filter(obj => obj.name !== '菜单列表' && obj.name !== '组件')

      this.resuNodeDTOs = [...newHalfCheckArr, ...newCheckArr]
    },
    // 保存资源
    saveBusiroleResc() {
      if (!this.nodeRoleId) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请选择一个业务角色</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
        return
      }
      this.getCheckedNodes()
      const params = {
        authType: '2',
        roleId: this.nodeRoleId,
        roleType: '1,4',
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
    // 获取当前账号角色信息
    getCurrentUser() {
      ApiObj.currentUser().then(res => {
        this.currentUser = res.data
        this.roleId = this.currentUser[0].data.admrolId
        this.getTreeData(this.currentUser[0].data.admrolId)
      })
    },
    // 获取已选择节点
    setCheckedNodes(data) {
      this.nodeRoleId = data
      const params = {
        roleId: data,
        resuType: '1',
        authType: '2'
      }
      ApiObj.busiroleResources(params).then(res => {
        if (res.code === 0) {
          const arr = []
          this.$refs.tree.setCheckedKeys(arr)
          this.$refs.tree.setCheckedNodes(res.data)
          // res.data.forEach(item => {
          //   this.$refs.tree.setChecked(item.resuId, true, false)
          // })
          this.treeLoading = false
        }
      }).catch(err => err)
    },

    // 节点过滤器
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 获取可授权树数据
    getTreeData(id) {
      const params = {
        roleId: id,
        resuType: '1',
        authType: '1'
      }
      this.treeLoading = true
      ApiObj.busiroleResource(params).then(res => {
        if (res.code === 0) {
          this.listData = res.data
          const arr = [{ name: '菜单列表', children: [], data: { resuType: 'diy' }, id: 'menu' }, { name: '组件', data: { resuType: 'diy' }, children: [], id: 'component' }]
          this.listData.forEach((item, index) => {
            if (item.parentId === '-1') {
              arr[0].children.push(item)
            } else {
              arr[1].children.push(item)
            }
          })
          arr.forEach((item, index) => {
            if (item.children.length === 0) {
              arr.splice(index, 1)
            }
          })
          this.treeData = arr
          this.treeLoading = false
        }
      }).catch(err => err)
    },

    handleNodeClick(data, node) {

    },
    // 重置
    restSearch() {
      this.filterText = ''
    }
  }
}
</script>

<style scoped lang="scss">
.resource-authorize {
  height: 100%;
.special-node{
  color: $--color-primary;
  font-size: 12px;
}
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
