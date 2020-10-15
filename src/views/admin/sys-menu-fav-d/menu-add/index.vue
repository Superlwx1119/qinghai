<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:31:02
 * @LastEditTime: 2019-09-27 20:46:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="menu-add">
    <!--新增菜单 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dataObj.isShow"
      title="菜单"
      width="70%"
      @close="cancelDialog"
    >
      <div class="scrollbar" style="padding-bottom:16px;">
        <el-scrollbar>
          <div class="height:480px;">
            <el-tree :data="treeData" :props="defaultProps" :default-expanded-keys="[expandedKey]" show-checkbox node-key="id" @check="checkNodes" />
          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="" @click="cancelDialog(0)">关闭</el-button>
        <el-button type="primary" @click="submitForm('searchForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ApiObj from '@/api/Admin/user-management'
export default {
  name: 'SubsystemAdd',
  components: {
  },
  mixins: [],
  props: {
    dataObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      treeData: [],
      treeLoading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      expandedKey: '',
      selectNodes: []
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.$nextTick(() => {
      this.getTreeData()
    })
  },
  mounted() {

  },
  methods: {
    checkNodes(checkedNode, checkedData) {
      this.checkedNodes = checkedData.checkedNodes.filter(item => {
        return item.children.length === 0
      })
      this.selectNodes = this.checkedNodes
    },
    // 获取树形节点列表
    getTreeData() {
      const parmas = {
        authType: 2,
        resuType: 1
      }
      ApiObj.resource(parmas).then(res => {
        this.treeData = res.data
        if (res.data[0]) {
          this.expandedKey = res.data[0].id
        }
      })
    },
    //  新增保存
    submitForm(foconstame) {
      console.log(this.checkedNodes, '.this.checkedNodes')
      if (this.selectNodes.length > 0) {
        const params = this.checkedNodes.map(item => {
          return { ...item.data, menuId: item.data.resuId, menuPath: item.data.resuPath }
        })
        console.log(params, 'parmas')
        ApiObj.saveList(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: `<strong>操作成功</strong><p>${res.message}</p>`,
              duration: 1000
            })
            this.cancelDialog(1)
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      } else {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请选择需要添加的菜单</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
      }
    },
    // 关闭
    cancelDialog(data) {
      this.$emit('cancelDialog', data)
    }
  }
}
</script>

<style scoped lang="scss">
.menu-add {
  /deep/.el-checkbox-group {
    .el-checkbox+.el-checkbox{
      margin-left:0px;
    }
  }
}
</style>
