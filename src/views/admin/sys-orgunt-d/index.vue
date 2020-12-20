<template>
  <div class="sys-orgunt-d">
    <!-- 组织机构管理 -->
    <section class="layer">
      <el-row :gutter="12" style="margin-left:0px;">
        <el-col :span="6">
          <div class="box">
            <div class="box-header">
              <span class="box-title">组织机构树</span>
            </div>
            <div
              v-loading="treeLoading"
              class="box-body"
              style="height:calc(100% - 42px)"
              element-loading-spinner="el-loading1"
            >
              <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
              <el-tree
                ref="tree"
                :props="defaultProps"
                :load="loadNode1"
                :filter-node-method="filterNode"
                :default-expanded-keys="idArr"
                highlight-current
                node-key="id"
                lazy
                style="height:calc(100% - 32px);"
                @node-contextmenu="newMenu"
                @node-click="handleNodeClick"
              >
                <span slot-scope="{ node }" class="custom-tree-node">
                  <svg-icon v-if="node.expanded===true&&node.isLeaf===false" icon-class="folder-open" />
                  <svg-icon v-if="node.expanded===false&&node.isLeaf===false" icon-class="folder-close" />
                  <svg-icon v-if="node.isLeaf" icon-class="organization" /> <span :title="node.label">{{ node.label }}</span>
                </span>
              </el-tree>
              <div v-show="menuShow" id="menu" class="menu-box">
                <el-menu
                  text-color="#000"
                  @select="handleSelect"
                >
                  <el-menu-item index="1" class="menuItem">
                    <span slot="title">新增</span>
                  </el-menu-item>
                  <el-menu-item index="2" class="menuItem">
                    <span slot="title">删除</span>
                  </el-menu-item>
                </el-menu>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="box handle-resoure">
            <div class="box-body height100b pd0">
              <el-tabs class="height100b" type="border-card">
                <el-tab-pane label="机构维护" class="height100b">
                  <InstitutionalMaintenance ref="institutionalMaintenance" class="height100b" @reloadNode="reloadNode" @clearAdding="clearAdding" />
                </el-tab-pane>
                <el-tab-pane label="用户信息" class="height100b">
                  <UserInfo ref="UserInfo" class="height100b" />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>

  </div>
</template>

<script>
import ApiObj from '@/api/Admin/user-management'
import InstitutionalMaintenance from './institutional-maintenance/index'
import UserInfo from './user-info/index'

export default {
  name: 'ResourceManagement',
  components: {
    InstitutionalMaintenance,
    UserInfo
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      // 新增按钮
      menuShow: false,
      nodedata: {},
      nodeInfo: {},
      filterText: '',
      treeData: [],
      treeLoading: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        disabled: false
      },
      searchForm: {
        filterText: ''
      },
      tableData: [],
      tableLoading: false,
      rootNode: '',
      rootResolve: '',
      idArr: [],
      isAdding: false
    }
  },
  computed: {

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {},
  mounted() {

  },
  methods: {
    // 解除新增状态
    clearAdding() {
      this.isAdding = false
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
      if (!this.isAdding) {
        if (!this.nodeInfo.expanded) {
          this.$msgError(`请先展开${this.nodedata.name}节点，在进行新增！`)
          return
        }
        this.append(this.nodedata)
        this.isAdding = true
      } else {
        this.$msgWarning('已有个新增在进行，请新增完毕之后在进行新的新增！')
      }
    },
    // 删除组织机构
    removeOrg() {
      if (!this.nodeInfo.expanded) {
        this.$msgError(`请先展开${this.nodedata.name}节点，在进行删除操作！`)
        return
      }
      if (!this.nodeInfo.data.id) {
        this.remove(this.nodeInfo, this.nodedata)
        return
      }
      this.$msgConfirm(`此操作将永久删除【${this.nodeInfo.data.name}】组织机构，确认删除吗`).then(() => {
        ApiObj.uct(this.nodeInfo.data.id).then(res => {
          if (res.code === 0) {
            ApiObj.orgTree(this.nodeInfo.data.id).then(res => {
              if (res.code === 0) {
                this.$msgSuccess(res.message)
                this.remove(this.nodeInfo, this.nodedata)
                this.reloadNode()
              } else {
                this.$msgError(`请先展开${res.message}节点，在进行删除操作！`)
              }
            })
          } else {
            this.$msgError(`请先展开${this.nodedata.name}节点，在进行删除操作！`)
          }
        })
      }).catch(() => {})
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
      if (MouseEvent.clientX > 305) {
        menu.style.left = 305 + 'px'
      } else {
        menu.style.left = MouseEvent.clientX - 0 + 'px'
      }
      if (MouseEvent.clientY > (document.body.clientHeight - 60)) {
        menu.style.top = document.body.clientHeight - 60 + 'px'
      } else {
        menu.style.top = MouseEvent.clientY + 'px'
      }
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
    freshNode(node) {
      var theChildren = node.childNodes
      if (node.level === 0) {
        const params = -1 + '/sub'
        ApiObj.units(params).then(res => {
          if (res.code === 0) {
            theChildren.splice(0, theChildren.length)
            node.doCreateChildren(res.data)
          }
        }).catch(err => err)
      } else {
        const loadParams = node.data.id + '/sub'
        ApiObj.units(loadParams).then(res => {
          if (res.code === 0) {
            theChildren.splice(0, theChildren.length)
            node.doCreateChildren(res.data)
          }
        }).catch(err => err)
      }
    },
    // 添加
    append(data) {
      const newChild = {
        name: '新增机构',
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.$refs.institutionalMaintenance.addNewOrg(this.nodeInfo)
      this.$refs.UserInfo.resetTableData()
    },
    // 页面删除子节点
    remove(node, data) {
      console.log(node, 'node')
      if (node.childNodes.length > 0) {
        this.$msgError('该机构下有子机构请先删除子机构在进行删除')
        return
      }
      const parent = node.parent
      const children = parent.childNodes || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    // 节点过滤器
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    loadNode1(node, resolve) {
      this.rootNode = node
      this.rootResolve = resolve
      if (node.level === 0) {
        const params = -1 + '/sub'
        ApiObj.units(params).then(res => {
          if (res.code === 0) {
            this.idArr.push(res.data[0].id)
            return resolve(res.data)
          }
        }).catch(err => err)
      } else {
        const loadParams = node.data.id + '/sub'
        ApiObj.units(loadParams).then(res => {
          if (res.code === 0) {
            return resolve(res.data)
          }
        }).catch(err => err)
      }
    },
    handleNodeClick(data, node) {
      if (data.id) {
        this.$refs.institutionalMaintenance.getMenuInfo(data.id)
        this.$refs.UserInfo.getFunctionList(data.id)
      } else {
        this.$refs.institutionalMaintenance.getAddingOrg(data)
        this.$refs.UserInfo.resetTableData()
      }
    }

  }
}

</script>

<style scoped lang="scss">
  .sys-orgunt-d {
    height: 100%;

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

          &:first-child {

            .box {
              height: 100%;

              .el-tree {
                height: 100%;
                overflow: auto;

                /deep/ .el-tree-node__content>.el-tree-node__label {
                  width: 100%;
                }
                 /deep/ .custom-tree-node{
                   width: 100%;
                span{
                  display: inline-block;
                  width:70%;
                  overflow: hidden;
                  text-overflow:ellipsis;
                   white-space: nowrap;
                }
              }
              }
            }
          }

        }
      }
    }

    .handle-resoure {

      /deep/.el-tabs__content {
        padding: 0;
        height: calc(100% - 43px);
      }
    }

    .height100b {
      height: 100%;
    }

    .el-tabs--border-card {
      border: 0;
    }
  }

</style>
