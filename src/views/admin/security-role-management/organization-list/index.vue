<template>
  <div class="resource-management">
    <!-- 可管理的组织机构 -->
    <section class="layer">
      <el-row :gutter="12">
        <el-col :span="24">
          <div class="box">
            <div class="box-header">
              <span class="box-title">可管理的组织机构</span>
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
                    <el-button :disabled="!admrolId" type="primary" @click="saveUnit">保存</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div v-loading="treeLoading" class="box-body" style="height:calc(100% - 36px)" element-loading-spinner="el-loading1">
              <el-tree
                ref="tree"
                :props="defaultProps"
                :load="loadNode1"
                :filter-node-method="filterNode"
                :default-expanded-keys="['1']"
                node-key="id"
                show-checkbox
                lazy
                @node-click="handleNodeClick"
              />
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
        label: 'name',
        disabled: false
      },
      searchForm: {
        filterText: ''
      },
      resuNodeDTOs: [],
      admrolId: ''
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
  },
  mounted() {

  },
  methods: {
    // 清空数据
    clearData() {
      this.$refs.tree.setCheckedKeys([])
    },
    saveUnit() {
      this.getCheckedNodes()
      this.resuNodeDTOs.forEach(item => {
        item.admrolId = this.admrolId
      })
      const params = this.resuNodeDTOs
      ApiObj.saveUnits(params).then(res => {
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
      this.resuNodeDTOs = this.$refs.tree.getCheckedNodes()
    },
    // 获取已选择节点
    setCheckedNodes(data) {
      this.admrolId = data
      const params = data
      ApiObj.units(params).then(res => {
        if (res.code === 0) {
          const arr = []
          res.data.forEach(item => {
            arr.push(item.id)
          })
          this.$refs.tree.setCheckedKeys(arr)
        } else {
          this.$alert(`<div class="myalert-header">操作失败</div>
         <div class="myalert-content">${res.message}</div>`, {
            dangerouslyUseHTMLString: true, confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    // 节点过滤器
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    loadNode1(node, resolve) {
      if (node.level === 0) {
        const params = -1 + '/sub'
        ApiObj.units(params).then(res => {
          if (res.code === 0) {
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
    handleNodeClick(data) {
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
