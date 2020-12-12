<!-- 树状选择器 菜单-->
<template class="menu_search">
  <el-popover
    ref="popover"
    placement="bottom-start"
    trigger="click"
    class="menu_search"
    @show="onShowPopover"
    @hide="onHidePopover"
  >
    <el-tree
      ref="tree"
      :style="`min-width: ${treeWidth}`"
      :data="treeData"
      :props="props"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :default-expand-all="false"
      class="select-tree"
      highlight-current
      @node-click="onClickNode"
    >
      <span slot-scope="{ node }" class="custom-tree-node">
        <svg-icon v-if="node.expanded===true&&node.isLeaf===false" icon-class="folder-open" />
        <svg-icon v-if="node.expanded===false&&node.isLeaf===false" icon-class="folder-close" />
        <svg-icon v-if="node.isLeaf" icon-class="menu" /> <span>{{ node.label }}</span>
      </span>
    </el-tree>
    <el-input
      slot="reference"
      ref="input"
      v-model="labelModel"
      :style="`width: ${width}px;`"
      :class="{ 'rotate': showStatus }"
      :placeholder="placeholder"
      clearable
      suffix-icon="el-icon-arrow-down"
    />
  </el-popover>
</template>

<script>
import ApiObj from '@/api/Admin/user-management'
export default {
  name: 'Pagination',
  // 设置绑定参数
  model: {
    prop: 'value',
    event: 'selected'
  },
  props: {
    // 接收绑定参数
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    // 输入框宽度
    width: {
      type: String,
      default: () => {
        return ''
      }
    },
    // 选项数据
    options: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    // 输入框占位符
    placeholder: {
      type: String,
      required: false,
      default: '请选择'
    },
    // 树节点配置选项
    props: {
      type: Object,
      required: false,
      default: () => ({
        parent: 'parentId',
        value: 'rowGuid',
        label: 'areaName',
        children: 'children'
      })
    }
  },
  data() {
    return {
      // 树状菜单显示状态
      showStatus: false,
      // 菜单宽度
      treeWidth: 'auto',
      // 输入框显示值
      labelModel: '',
      // 实际请求传值
      valueModel: '0',
      treeData: []
    }
  },
  computed: {
    // 是否为树状结构数据
    dataType() {
      const jsonStr = JSON.stringify(this.treeData)
      return jsonStr.indexOf(this.props.children) !== -1
    },
    // 若非树状结构，则转化为树状结构数据
    data() {
      return this.dataType ? this.treeData : this.switchTree()
    }
  },
  watch: {
    labelModel(val) {
      if (!val) {
        this.valueModel = ''
      }
      this.$refs.tree.filter(val)
    },
    value(val) {
      this.labelModel = this.queryTree(this.data, val)
    }
  },
  created() {
    // 检测输入框原有值并显示对应 label
    if (this.value) {
      this.labelModel = this.queryTree(this.data, this.value)
    }
    // 获取输入框宽度同步至树状菜单宽度
    this.$nextTick(() => {
      this.treeWidth = `${(this.width || this.$refs.input.$refs.input.clientWidth) - 24}px`
    })
    this.getTreeData()
  },
  methods: {
    // 获取树数据
    getTreeData() {
      const params = {
        authType: 1
      }
      this.treeLoading = true
      ApiObj.menuElet(params).then(res => {
        if (res.code === 0) {
          const arr = []
          console.log(res.data, 'ooo')
          // const arr = [{ name: '菜单列表', children: [], parentId: '0', id: 'menu' }, { name: '组件', children: [], parentId: '0', id: 'components' }]
          res.data.forEach((item, index) => {
            if (item.parentId === '-1') {
              arr.push(item)
            }
          })
          this.treeData = arr
          this.treeLoading = false
        }
      }).catch(err => err)
    },
    // 单击节点
    onClickNode(node) {
      this.labelModel = node[this.props.label]
      this.valueModel = node[this.props.value]
      this.onCloseTree()
      if (node.children && node.children.length > 0) {
        return
      }
      this.sendMessageToParent(node)
    },
    sendMessageToParent(obj) {
      // 下面也可以用（window.parent.postMessage({txt:txt});） top代表父元素的最顶层
      window.top.postMessage(obj)
    },
    // 偏平数组转化为树状层级结构
    switchTree() {
      return this.cleanChildren(this.buildTree(this.options, '0'))
    },
    // 隐藏树状菜单
    onCloseTree() {
      this.$refs.popover.showPopper = false
    },
    // 显示时触发
    onShowPopover() {
      this.showStatus = true
      this.$refs.tree.filter(false)
    },
    // 隐藏时触发
    onHidePopover() {
      this.showStatus = false
      this.$emit('selected', this.valueModel)
    },
    // 树节点过滤方法
    filterNode(query, data) {
      if (!query) return true
      return data[this.props.label].indexOf(query) !== -1
    },
    // 搜索树状数据中的 ID
    queryTree(tree, id) {
      let stark = []
      stark = stark.concat(tree)
      while (stark.length) {
        const temp = stark.shift()
        if (temp[this.props.children]) {
          stark = stark.concat(temp[this.props.children])
        }
        if (temp[this.props.value] === id) {
          return temp[this.props.label]
        }
      }
      return ''
    },
    // 将一维的扁平数组转换为多层级对象
    buildTree(data, id = '0') {
      const fa = (parentId) => {
        const temp = []
        for (let i = 0; i < data.length; i++) {
          const n = data[i]
          if (n[this.props.parent] === parentId) {
            n.children = fa(n.rowGuid)
            temp.push(n)
          }
        }
        return temp
      }
      return fa(id)
    },
    // 清除空 children项
    cleanChildren(data) {
      const fa = (list) => {
        list.map((e) => {
          if (e.children.length) {
            fa(e.children)
          } else {
            delete e.children
          }
          return e
        })
        return list
      }
      return fa(data)
    }
  }
}
</script>

<style scoped lang="scss">
.menu_search{
  max-width: 100px;
   /deep/.el-input__inner{
    border-radius: 0px;
  }
}

  .el-input.el-input--suffix {
    cursor: pointer;
    overflow: hidden;
  }
  .el-input.el-input--suffix.rotate .el-input__suffix {
    transform: rotate(180deg);
  }
  .select-tree {
    max-height: 350px;
    overflow-y: scroll;
  }
  /* 菜单滚动条 */
  .select-tree::-webkit-scrollbar {
    z-index: 11;
    width: 6px;
  }
  .select-tree::-webkit-scrollbar-track,
  .select-tree::-webkit-scrollbar-corner {
    background: #fff;
  }
  .select-tree::-webkit-scrollbar-thumb {
    border-radius: 5px;
    width: 6px;
    background: #b4bccc;
  }
  .select-tree::-webkit-scrollbar-track-piece {
    background: #fff;
    width: 6px;
  }
</style>
