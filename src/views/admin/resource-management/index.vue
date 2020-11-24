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
            <div style="padding:0 10px;">
              <el-input
                v-model="filterText"
                placeholder="输入关键字进行过滤"
              />
            </div>
            <div v-loading="treeLoading" class="box-body" style="height:calc(100% - 68px)" element-loading-spinner="el-loading1">
              <el-tree ref="tree" :highlight-current="true" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" node-key="id" @node-contextmenu="newMenu" @node-click="handleNodeClick">
                <span slot-scope="{ node }" class="custom-tree-node">
                  <svg-icon v-if="node.expanded===true&&node.isLeaf===false" icon-class="folder-open" />
                  <svg-icon v-if="node.expanded===false&&node.isLeaf===false" icon-class="folder-close" />
                  <svg-icon v-if="node.isLeaf" icon-class="menu" /> <span>{{ node.label }}</span>
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
          <el-tabs v-show="resuTypeTag==='3'" class="height100b" type="border-card">
            <el-tab-pane label="组件" class="height100b">
              <MenuMaintenanceAPI ref="menuMaintenanceAPI" class="height100b" @refreshTree="refreshTree" />
            </el-tab-pane>
            <el-tab-pane label="组件api" class="height100b"> <FunctionListAPI ref="functionListAPI" class="height100b" /></el-tab-pane>
          </el-tabs>
          <el-tabs v-show="resuTypeTag==='1'" class="height100b" type="border-card">
            <el-tab-pane label="菜单" class="height100b">
              <menu-maintenance ref="menuMaintenance" class="height100b" @refreshTree="refreshTree" />
            </el-tab-pane>
            <el-tab-pane label="功能" class="height100b"> <function-list ref="functionList" class="height100b" /></el-tab-pane>
          </el-tabs>
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
      searchForm: {
      },
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
        this.$message({
          message: '不允许移动根节点',
          type: 'warning'
        })
      } else {
        const pchildNodes = this.nodeInfo.parent.childNodes
        let currentId = {}
        for (let i = 0; i < pchildNodes.length; i++) {
          if (pchildNodes[i].data.id === node.data.id) {
            currentId = i
          }
        }
        if (currentId === pchildNodes.length - 1) {
          this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">处于底端不能下移</div>`, {
            dangerouslyUseHTMLString: true, confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        const upid = currentId + 1
        const params = {}
        params.downId = node.data.id// 当前节点id
        params.upId = pchildNodes[upid].data.id// 下一个节点id
        ApiObj.moveNode(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.getTreeData()
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      }
    },
    // 节点上移
    upDept() {
      const node = this.nodeInfo
      if (node.data.parentId === '0') {
        this.$message({
          message: '不允许移动根节点',
          type: 'warning'
        })
      } else {
        const pchildNodes = this.nodeInfo.parent.childNodes
        let currentId = {}
        for (let i = 0; i < pchildNodes.length; i++) {
          if (pchildNodes[i].data.id === node.data.id) {
            currentId = i
          }
        }
        if (currentId === 0) {
          this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">处于顶端不能上移</div>`, {
            dangerouslyUseHTMLString: true, confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        const upid = currentId - 1
        const params = {}
        params.upId = node.data.id// 当前节点id
        params.downId = pchildNodes[upid].data.id// 上一个节点id
        ApiObj.moveNode(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.getTreeData()
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      }
    },
    // 删除组织机构
    removeOrg() {
      if (this.nodeInfo.childNodes.length > 0) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">该资源下有子菜单请先删除子菜单在进行删除</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'warning'
        })
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
              this.$message({
                type: 'success',
                dangerouslyUseHTMLString: true,
                message: `<strong>操作成功</strong><p>${res.message}</p>`,
                duration: 1000
              })
              this.remove(this.nodeInfo, this.nodedata)
              this.refreshTree()
            } else {
              this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请先展开${res.message}节点，在进行删除操作！</div>`, {
                dangerouslyUseHTMLString: true, confirmButtonText: '确定',
                type: 'warning'
              })
            }
          })
        } else {
          this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请先展开${this.nodedata.name}节点，在进行删除操作！</div>`, {
            dangerouslyUseHTMLString: true, confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    // 页面删除子节点
    remove(node, data) {
      const parent = node.parent
      const children = parent.childNodes || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    // 添加菜单
    addNewOrg() {
      console.log(this.isAdding, '?1')
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
      this.nodedata = object// 存当前数据
      this.nodeInfo = Node// 存当前节点信息
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
      var menu = document.querySelector('#menu')
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      menu.style.display = 'block'
      let calcWidth = 258
      let calcHeight = 108
      if (JSON.parse(this.$getSessionStorage('isIframe'))) {
        calcWidth = 0
        calcHeight = 0
      }
      if (MouseEvent.clientX > 305 + calcWidth) {
        menu.style.left = 305 + 'px'
      } else {
        menu.style.left = MouseEvent.clientX - calcWidth + 'px'
      }
      if (MouseEvent.clientY > (document.body.clientHeight - 60)) {
        menu.style.top = document.body.clientHeight - 60 - calcHeight + 'px'
      } else {
        menu.style.top = MouseEvent.clientY - calcHeight + 'px'
      }
    },
    foo() { // 取消鼠标监听事件 菜单栏
      this.menuShow = false
      document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    // 保存成功之后刷新下拉组件
    refreshTree() {
      this.clearAdding()
      console.log(this.isAdding, '?')
      this.getTreeData()
      this.$refs.functionListAPI.clearData()
      this.$refs.functionList.clearData()
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
          const arr = [{ name: '菜单列表', children: [], parentId: '0', id: 'menu' }, { name: '组件', children: [], parentId: '0', id: 'components' }]
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
        this.$alert(`<div class="myalert-header">操作失败</div>
        <div class="myalert-content">请先选择树结点！</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.resource-management {
  height: 100%;
   /deep/.el-tabs__content{
          height: calc(100% - 67px);
      }
 .menu-box{
      position: absolute;
      width: 94px;
      .el-menu{
        border:1px solid #e6e6e6;
        // border-top:1px solid #e6e6e6;
      }
      /deep/.el-menu-item{
        height: 26px;
        line-height: 26px;
        border-bottom: 1px solid #e6e6e6;
        color: rgb(96, 98, 102);
        background-color: rgb(255, 255, 255);
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
  // .handle-resoure{
  //     .box-body{
  //         height: 100;
  //     }

  // }
  .height100b{
      height: 100%;
  }
}
</style>
