<template>
  <div class="resource-management">
    <!-- 安全角色管理 -->
    <section class="layer">
      <el-row :gutter="12" style="margin-right:0!important;margin-left:0!important;">
        <el-col :span="6">
          <div class="box">
            <div class="box-header">
              <span class="box-title">安全管理角色树</span>
            </div>
            <div style="padding:0 10px;">
              <el-input
                v-model="filterText"
                placeholder="输入关键字进行过滤"
              />
            </div>
            <div v-loading="treeLoading" class="box-body" style="height:calc(100% - 68px)" element-loading-spinner="el-loading1">
              <el-tree
                ref="tree"
                :props="defaultProps"
                :load="loadNode1"
                :default-expanded-keys="idArr"
                :filter-node-method="filterNode"
                lazy
                node-key="id"
                @node-click="handleNodeClick"
                @node-contextmenu="newMenu"
              />
              <div v-show="menuShow&&currentUserRoleId==='adminRoleId'" id="menu" class="menu-box">
                <el-menu
                  text-color="#000"
                  @select="handleSelect"
                >
                  <el-menu-item index="1" class="menuItem">
                    <span slot="title">新增</span>
                  </el-menu-item>
                  <el-menu-item v-if="nodeInfo.level!==1" index="2" class="menuItem">
                    <span slot="title">删除</span>
                  </el-menu-item>
                </el-menu>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <!-- <div class="box handle-resoure">
            <div class="box-body height100b"> -->
          <el-tabs class="height100b" type="border-card">
            <el-tab-pane label="角色维护" class="height100b">
              <role-maintenance ref="roleMaintenance" :data-obj="nodeInfo" class="height100b" @reloadNode="reloadNode" @clearAdding="clearAdding" />
            </el-tab-pane>
            <el-tab-pane label="可用菜单" class="height100b"> <function-list ref="functionList" class="height100b" /></el-tab-pane>
            <el-tab-pane label="可分配菜单" class="height100b"> <share-menu ref="shareMenu" class="height100b" /></el-tab-pane>
            <el-tab-pane label="可管理组织机构" class="height100b"> <organization-list ref="organizationList" class="height100b" /></el-tab-pane>
            <el-tab-pane label="授权业务角色" class="height100b"> <authorize-busirole ref="authorizeBusirole" class="height100b" /></el-tab-pane>
          </el-tabs>
          <!-- </div>
          </div> -->
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import ApiObj from '@/api/Admin/user-management'
import RoleMaintenance from './role-maintenance/index'
import FunctionList from './function-list/index'
import ShareMenu from './share-menu/index'
import OrganizationList from './organization-list/index'
import authorizeBusirole from './authorize-busirole/index'
export default {
  name: 'ResourceManagement',
  components: {
    RoleMaintenance,
    FunctionList,
    ShareMenu,
    OrganizationList,
    authorizeBusirole
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      filterText: '',
      idArr: [],
      treeData: [
      ],
      treeLoading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      listData: '',
      searchForm: {
      },
      tableData: [],
      tableLoading: false,
      menuShow: false,
      nodedata: {},
      nodeInfo: {},
      rootResolve: '',
      rootNode: '',
      isAdding: false,
      userInfo: '',
      currentUserRoleId: ''// 当前用户角色id
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
    this.userInfo = JSON.parse(window.sessionStorage.getItem('hsa-portal-user'))
  },
  mounted() {

  },
  methods: {
    //  refreshNodeBy(id){
    //          let node = this.$refs.asyncTree.getNode(id); // 通过节点id找到对应树节点对象
    //          node.loaded = false;
    //          node.expand(); // 主动调用展开节点方法，重新查询该节点下的所有子节点
    //      },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 解除新增状态
    clearAdding() {
      this.isAdding = false
    },
    // 判断新增状态
    juddgeIsAdding() {
      this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">已有个新增在进行，请新增完毕之后在进行新的新增！</div>`, {
        dangerouslyUseHTMLString: true, confirmButtonText: '确定',
        type: 'warning'
      })
    },
    // 像子组件传递右键选择的treenod
    transeferNode(data) {
      this.$refs.roleMaintenance.getTreeNodeData(data)
    },
    // 添加或者删除点击事件
    handleSelect(data) {
      if (data === '1') {
        this.addNewOrg()
      } else {
        this.removeOrg()
      }
    },
    // 添加组织机构
    addNewOrg() {
      if (this.isAdding) {
        this.juddgeIsAdding()
        return
      }
      if (!this.nodeInfo.expanded) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请先展开${this.nodedata.name}节点，在进行新增！</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.isAdding = true
      this.append(this.nodedata)
    },
    // 删除安全角色
    removeOrg() {
      console.log(this.nodeInfo, ';;;')
      if (!this.nodeInfo.expanded) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请先展开${this.nodedata.name}节点，在进行删除操作！</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$confirm(`此操作将永久删除角色名为【${this.nodeInfo.data.name}】的角色, 是否继续?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ApiObj.delSecRole(this.nodeInfo.data.id).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.remove(this.nodeInfo, this.nodedata)
            this.reloadNode()
            this.chearTabData()
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'warning'
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
    // 鼠标右击触发事件
    newMenu(MouseEvent, object, Node, element) {
      this.nodedata = object// 存当前数据
      this.nodeInfo = Node// 存当前节点信息
      this.menuShow = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuShow = true // 显示模态窗口，跳出自定义菜单栏
      var menu = document.querySelector('#menu')
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      menu.style.display = 'block'
      if (MouseEvent.clientX > 180) {
        menu.style.left = 180 + 'px'
      } else {
        menu.style.left = MouseEvent.clientX - 0 + 'px'
      }
      if (MouseEvent.clientY > (document.body.clientHeight - 60)) {
        menu.style.top = document.body.clientHeight - 60 + 'px'
      } else {
        menu.style.top = MouseEvent.clientY + 'px'
      }
      // menu.style.left = MouseEvent.clientX - 0 + 'px'
      // menu.style.top = MouseEvent.clientY + 'px'
      this.transeferNode(Node)
    },
    foo() { // 取消鼠标监听事件 菜单栏
      this.menuShow = false
      document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    // 清空节点并重新加载
    reloadNode() {
      const node = this.rootNode.parent
      this.freshNode(node)
    },
    // 添加
    append(data) {
      const newChild = {
        name: '新增安全角色',
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.chearTabData()
      // this.$refs.institutionalMaintenance.addNewOrg(this.nodeInfo)
    },
    // 页面删除子节点
    remove(node, data) {
      if (node.childNodes.length > 0) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">该机构下有子机构请先删除子机构在进行删除</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      const parent = node.parent
      const children = parent.childNodes || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    loadNode1(node, resolve) {
      const _this = this
      this.rootNode = node
      this.rootResolve = resolve
      if (node.level === 0) {
        ApiObj.currentUser().then(res => {
          this.currentUserRoleId = res.data[0].id
          if (res.code === 0) {
            this.idArr.push(res.data[0].id)
            return resolve(res.data)
          }
        }).catch(err => err)
      }
      if (node.level > 2) return resolve([])
      setTimeout(() => {
        const loadParams = {
          parentId: node.data ? node.data.id : ''
        }
        ApiObj.adminRoles(loadParams).then(res => {
          if (res.code === 0) {
            _this.$refs.roleMaintenance.getRoleInfo(node.data.id)
            _this.$refs.roleMaintenance.getRoleInfoList(node.data.id + '/' + 'users')
            return resolve(res.data)
          }
        }).catch(err => err)
      }, 3000)
    },
    freshNode(node) {
      var theChildren = node.childNodes
      const loadParams = {
        parentId: node.data ? node.data.id : ''
      }
      ApiObj.adminRoles(loadParams).then(res => {
        if (res.code === 0) {
          theChildren.splice(0, theChildren.length)
          node.doCreateChildren(res.data)
        }
      })
    },
    handleNodeClick(data, node) {
      // if (this.isAdding) {
      //   this.$confirm(`当前有新增未完成项, 是否继续?`, {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.freshNode(node)
      //     var admrolId
      //     if (data.data) {
      //       admrolId = data.data.admrolId
      //       if (data.data.admrolId) {
      //         this.$refs.functionList.setCheckedNodes(admrolId)
      //         this.$refs.shareMenu.setCheckedNodes(admrolId)
      //         this.$refs.organizationList.setCheckedNodes(admrolId)
      //         this.$refs.authorizeBusirole.getRoleBusList(admrolId)
      //         this.$refs.roleMaintenance.getRoleInfo(admrolId)
      //         this.$refs.roleMaintenance.getRoleInfoList(admrolId + '/' + 'users')
      //         this.transeferNode(node)
      //       }
      //     } else {
      //       admrolId = ''
      //       // this.$refs.roleMaintenance.getRoleInfoList(admrolId + '/' + 'users')
      //       this.chearTabData()
      //       this.$refs.roleMaintenance.getRoleInfo(admrolId)
      //       this.transeferNode(node)
      //     }
      //     this.$store.commit('CHANGE_SECURITYROLEID', admrolId)
      //     this.isAdding = false
      //   }).catch(() => {
      //     this.$refs.tree.setCurrentKey(null)
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
      // }
      this.freshNode(node)
      var admrolId
      if (data.data) {
        admrolId = data.data.admrolId
        if (data.data.admrolId) {
          this.$refs.functionList.setCheckedNodes(admrolId)
          this.$refs.shareMenu.setCheckedNodes(admrolId)
          this.$refs.organizationList.setCheckedNodes(admrolId)
          this.$refs.authorizeBusirole.getRoleBusList(admrolId)
          this.$refs.roleMaintenance.getRoleInfo(admrolId)
          this.$refs.roleMaintenance.getRoleInfoList(admrolId + '/' + 'users')
          this.transeferNode(node)
        }
      } else {
        admrolId = ''
        // this.$refs.roleMaintenance.getRoleInfoList(admrolId + '/' + 'users')
        this.chearTabData()
        this.$refs.roleMaintenance.getRoleInfo(admrolId)
        this.transeferNode(node)
      }
      this.$store.commit('CHANGE_SECURITYROLEID', admrolId)
    },
    chearTabData() {
      this.$refs.functionList.clearData()
      this.$refs.shareMenu.clearData()
      this.$refs.organizationList.clearData()
      this.$refs.authorizeBusirole.clearData()
      this.$refs.roleMaintenance.clearData()
      this.$store.commit('REMOVE_SECURITYROLEID')
    }
  }
}
</script>

<style scoped lang="scss">
.resource-management {
  height: 100%;
   /deep/.el-tabs__content{
          height: calc(100% - 43px);
   }
 .menu-box{
      position: absolute;
      width: 94px;
      .el-menu{
        border-left:1px solid #e6e6e6;
        border-top:1px solid #e6e6e6;
      }
      /deep/.el-menu-item{
        height: 26px;
        line-height: 26px;
        border-bottom: 1px solid #e6e6e6;
      }
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

  .height100b{
      height: 100%;
  }
}
</style>
