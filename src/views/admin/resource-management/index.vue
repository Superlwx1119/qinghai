<template>
  <div class="resource-management">
    <!-- 资源管理 -->
    <section class="layer">
      <el-row :gutter="12">
        <el-col :span="6">
          <div class="box">
            <div class="box-header">
              <span class="box-title">资源树</span>
            </div>
            <div>
              <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
            </div>
            <div
              v-loading="treeLoading"
              class="box-body"
              style="height:calc(100% - 68px)"
              element-loading-spinner="el-loading1"
            >
              <el-tree
                ref="tree"
                :highlight-current="true"
                :data="treeData"
                :props="defaultProps"
                :filter-node-method="filterNode"
                :default-expanded-keys="['menu']"
                node-key="id"
                @node-contextmenu="newMenu"
                @node-click="handleNodeClick"
              >
                <span slot-scope="{ node }" class="custom-tree-node">
                  <svg-icon v-if="node.expanded===true&&node.isLeaf===false" icon-class="folder-open" />
                  <svg-icon v-if="node.expanded===false&&node.isLeaf===false" icon-class="folder-close" />
                  <svg-icon v-if="node.isLeaf" icon-class="menu" /> <span :title="node.label">{{ node.label }}</span>
                </span>
              </el-tree>
              <div v-show="menuShow" id="menu" class="menu-box">
                <el-menu text-color="#000" @select="handleSelect">
                  <el-menu-item index="1" class="menuItem">
                    <span slot="title">新增</span>
                  </el-menu-item>
                  <el-menu-item :disabled="nodeInfo.level===1" index="2" class="menuItem">
                    <span slot="title">删除</span>
                  </el-menu-item>
                  <el-menu-item :disabled="nodeInfo.level===1" index="3" class="menuItem">
                    <span slot="title">上移</span>
                  </el-menu-item>
                  <el-menu-item :disabled="nodeInfo.level===1" index="4" class="menuItem">
                    <span slot="title">下移</span>
                  </el-menu-item>
                </el-menu>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="box handle-resoure">
            <div class="box-body height100b">
              <el-tabs v-show="resuTypeTag==='3'" class="height100b">
                <el-tab-pane label="组件" class="height100b">
                  <MenuMaintenanceAPI
                    ref="menuMaintenanceAPI"
                    class="height100b"
                    @updateNode="updateNode"
                    @updateNodeSave="updateNodeSave"
                  />
                </el-tab-pane>
                <el-tab-pane label="组件api" class="height100b">
                  <FunctionListAPI ref="functionListAPI" class="height100b" />
                </el-tab-pane>
              </el-tabs>
              <el-tabs v-show="resuTypeTag==='1'" class="height100b" type="border-card">
                <el-tab-pane label="菜单" class="height100b">
                  <menu-maintenance
                    ref="menuMaintenance"
                    class="height100b"
                    @updateNode="updateNode"
                    @updateNodeSave="updateNodeSave"
                  />
                </el-tab-pane>
                <el-tab-pane label="功能" class="height100b" type="border-card">
                  <function-list ref="functionList" class="height100b" />
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
import MenuMaintenance from './menu-maintenance/index'
import FunctionList from './function-list/index'
import MenuMaintenanceAPI from './menu-maintenance-api/index'
import FunctionListAPI from './function-list-api/index'
export default {
  name: 'ResourceManagement',
  components: {
    MenuMaintenance,
    FunctionList,
    MenuMaintenanceAPI,
    FunctionListAPI
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      filterText: '',
      menuShow: false,
      treeData: [],
      treeLoading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      searchForm: {},
      nodedata: '',
      nodeInfo: '',
      resuTypeTag: '1',
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
  created() {
    this.getTreeData()
  },
  mounted() {

  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 切换当前菜单id
    changeResourceId(id) {
      this.$store.commit('CHANGE_RESOURCEID', id)
    },
    // 删除当前菜单id
    removeResourceId() {
      this.$store.commit('REMOVE_RESOURCEID')
    },
    // 解除新增状态
    clearAdding() {
      this.isAdding = false
    },
    // 判断新增状态
    juddgeIsAdding() {
      this.$msgError('已有个新增在进行，请新增完毕之后在进行新的新增！')
    },
    // 刷新当前选中的树

    // 添加或者删除点击事件
    handleSelect(data) {
      if (data === '1') {
        this.addNewOrg()
      } else if (data === '2') {
        this.removeOrg()
      } else if (data === '3') {
        this.upDept()
      } else if (data === '4') {
        this.downDept()
      }
    },
    // 下移
    downDept() {
      const node = this.nodeInfo
      if (node.data.parentId === '0') {
        this.$msgWarning('不允许移动根节点')
      } else {
        const pchildNodes = this.nodeInfo.parent.childNodes
        let currentId = {}
        for (let i = 0; i < pchildNodes.length; i++) {
          if (pchildNodes[i].data.id === node.data.id) {
            currentId = i
          }
        }
        if (currentId === pchildNodes.length - 1) {
          this.$msgWarning('处于底端不能下移')
          return
        }
        const upid = currentId + 1
        const params = {}
        params.downId = node.data.id // 当前节点id
        params.upId = pchildNodes[upid].data.id // 下一个节点id
        ApiObj.moveNode(params).then(res => {
          if (res.code === 0) {
            this.$msgSuccess(res.message)
            this.getTreeData()
          } else {
            this.$msgError(res.message)
          }
        })
      }
    },
    // 节点上移
    upDept() {
      const node = this.nodeInfo
      if (node.data.parentId === '0') {
        this.$msgWarning('不允许移动根节点')
      } else {
        const pchildNodes = this.nodeInfo.parent.childNodes
        let currentId = {}
        for (let i = 0; i < pchildNodes.length; i++) {
          if (pchildNodes[i].data.id === node.data.id) {
            currentId = i
          }
        }
        if (currentId === 0) {
          this.$msgWarning('处于顶端不能上移')
          return
        }
        const upid = currentId - 1
        const params = {}
        params.upId = node.data.id // 当前节点id
        params.downId = pchildNodes[upid].data.id // 上一个节点id
        ApiObj.moveNode(params).then(res => {
          if (res.code === 0) {
            this.$msgSuccess(res.message)
            this.getTreeData()
          } else {
            this.$msgError(res.message)
          }
        })
      }
    },
    // 删除资源
    removeOrg() {
      if (this.nodeInfo.childNodes.length > 0) {
        this.$msgWarning('该资源下有子菜单请先删除子菜单在进行删除!')
        return
      }
      if (!this.nodeInfo.data.id) {
        this.remove(this.nodeInfo, this.nodedata)
        return
      }
      ApiObj.uct(this.nodeInfo.data.id).then(res => {
        if (res.code === 0) {
          ApiObj.delResource(this.nodeInfo.data.id).then(res => {
            if (res.code === 0) {
              this.$msgSuccess(res.message)
              this.remove(this.nodeInfo, this.nodedata)
              // this.refreshTree()
            } else {
              this.$msgError(res.message)
            }
          })
        } else {
          this.$msgWarning('请先展开${this.nodedata.name}节点，在进行删除操作！')
        }
      })
    },
    // 页面删除子节点
    remove(node, data) {
      this.$refs.tree.remove(node)
      this.$refs.menuMaintenance.restSearch()
      this.$refs.menuMaintenanceAPI.restSearch()
      this.clearAdding()
    },
    // 添加菜单
    addNewOrg() {
      if (this.isAdding) {
        this.juddgeIsAdding()
        return
      }
      this.isAdding = true
      this.append(this.nodedata)
    },
    // 添加
    append(data) {
      if (data.name === '菜单列表' || (data.data && data.data.resuType === '1')) {
        const newChild = {
          name: '新增菜单',
          children: []
        }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
        this.$refs.menuMaintenance.addNewMenu(this.nodeInfo)
      } else {
        const newChild = {
          name: '新增小组件',
          children: []
        }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)

        this.$refs.menuMaintenanceAPI.addNewMenu(this.nodeInfo)
      }
    },
    // 鼠标右击触发事件
    newMenu(MouseEvent, object, Node, element) {
      this.nodedata = object // 存当前数据
      this.nodeInfo = Node // 存当前节点信息
      this.menuShow = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuShow = true // 显示模态窗口，跳出自定义菜单栏
      if (this.nodedata.data) {
        this.resuTypeTag = this.nodedata.data.resuType
      } else {
        if (this.nodedata.name === '组件') {
          this.resuTypeTag = '3'
        } else if (this.nodedata.name === '菜单列表') {
          this.resuTypeTag = '1'
        }
      }
      console.log(MouseEvent, 'ooo')
      var menu = document.querySelector('#menu')
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      menu.style.display = 'block'

      if (MouseEvent.clientX > 180) {
        menu.style.left = 180 + 'px'
      } else {
        menu.style.left = MouseEvent.clientX - 0 + 'px'
      }
      if (MouseEvent.clientY > (document.body.clientHeight - 120)) {
        menu.style.top = document.body.clientHeight - 120 + 'px'
      } else {
        menu.style.top = MouseEvent.clientY + 'px'
      }
    },
    foo() { // 取消鼠标监听事件 菜单栏
      this.menuShow = false
      document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    // 保存成功之后刷新下拉组件
    refreshTree(data) {
      this.clearAdding()
      this.getTreeData()
      this.$refs.functionListAPI.clearData()
      this.$refs.functionList.clearData()
    },
    updateNodeSave(data) {
      this.clearAdding()
      const length = this.$refs.tree.getNode(data.prntResuId).childNodes.length
      this.$refs.tree.getNode(data.prntResuId).childNodes[length - 1].data.name = data.resuName
      this.$refs.tree.getNode(data.prntResuId).childNodes[length - 1].data.id = data.resuId
      this.$refs.tree.getNode(data.prntResuId).childNodes[length - 1].data.resuType = data.resuType
      this.$refs.tree.getNode(data.prntResuId).childNodes[length - 1].data.data = {
        id: data.resuId,
        resuType: data.resuType,
        resuName: data.resuName,
        resuId: data.resuId
      }
    },
    updateNode(data) {
      if (data.resuId) {
        this.$refs.tree.getNode(data.resuId).data.name = data.resuName
      }
    },
    // 获取树数据
    getTreeData() {
      const params = {
        authType: 1
      }
      this.treeLoading = true
      ApiObj.menuElet(params).then(res => {
        if (res.code === 0) {
          this.listData = res.data
          const arr = [{
            name: '菜单列表',
            children: [],
            parentId: '1',
            id: 'menu'
          }
          // {
          //   name: '组件',
          //   children: [],
          //   parentId: '0',
          //   id: 'components'
          // }
          ]
          this.listData.forEach((item, index) => {
            if (item.parentId === '-1') {
              arr[0].children.push(item)
            }
            // else {
            //   arr[1].children.push(item)
            // }
          })
          this.treeData = arr
          this.treeLoading = false
        }
      }).catch(err => err)
    },
    handleNodeClick(data, node) {
      if (data.data) {
        this.resuTypeTag = data.data.resuType
        if (data.id) {
          if (this.resuTypeTag === '3') {
            this.$refs.menuMaintenanceAPI.getMenuInfo(data.id)
            this.$refs.functionListAPI.handleCurrentChange(data.data)
          } else {
            this.$refs.menuMaintenance.getMenuInfo(data.id)
            this.$refs.functionList.getFunctionList(data.id)
          }
        }
      } else {
        this.$refs.menuMaintenance.getMenuInfo(data)
      }
    },
    // 新增
    addNewList() {
      if (this.kpiFcode != null && this.kpiFcode !== '') {
        this.dialogObj.isShow = true
        this.dialogObj.kpiFcode = this.kpiCode
        this.dialogObj.kpiFname = this.kpiFname + '-' + this.kpiName
      } else {
        this.$msgError('请先选择树结点！')
      }
    }
  }
}

</script>

<style scoped lang="scss">
  .resource-management {
    height: 100%;
    min-width: 1000px;
    min-height: 768px;

    .menu-box {
      position: absolute;
      width: 94px;

      .el-menu {
        border: 1px solid #e6e6e6;
        // border-top:1px solid #e6e6e6;
      }

      /deep/.el-menu-item {
        height: 26px;
        line-height: 26px;
        border-bottom: 1px solid #e6e6e6;
        background-color:#fff ;
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

                /deep/ .custom-tree-node {
                  width: 100%;

                  span {
                    display: inline-block;
                    width: 70%;
                    // min-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
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
      .box-body {
        height: 100;
      }

      /deep/.el-tabs__content {
        height: calc(100% - 67px);
      }
    }

    .height100b {
      height: 100%;
    }
  }

</style>
