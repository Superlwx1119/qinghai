<template>
  <div class="resource-management">
    <!-- 安全角色管理 -->
    <section class="layer">
      <el-row :gutter="12" style="margin-right:0!important;margin-left:0!important;">
        <el-col :span="6">
          <div class="box">
            <div class="box-header">
              <span class="box-title">邮件管理</span>
            </div>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              active-text-color="#000"
              background-color="#fff"
              text-color="#000"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="1">
                <i class="el-icon-folder" />
                <span slot="title">星标置顶</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-folder" />
                <span slot="title">收件箱</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-folder" />
                <span slot="title">草稿箱</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-folder" />
                <span slot="title">已发送邮件</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-folder" />
                <span slot="title">已删除邮件</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-folder" />
                <span slot="title">预算文件夹</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-folder" />
                <span slot="title">其他文件夹</span>
              </el-menu-item>
            </el-menu>

          </div>
        </el-col>
        <el-col :span="18">
          <el-header style="padding:0.5rem 0;height:auto;">
            <el-button type="primary">
              <i class="el-icon-download" />
              答复
            </el-button>
            <el-button type="primary">
              <i class="el-icon-edit-outline" />
              写邮件
            </el-button>
            <el-button type="primary">
              <i class="el-icon-s-comment" />
              回复
            </el-button>
            <el-button type="primary">
              <i class="el-icon-s-comment" />
              回复全部
            </el-button>
            <el-button type="primary">
              <i class="el-icon-right" />
              转发
            </el-button>
            <el-button type="primary">
              <i class="el-icon-box" />
              预算
            </el-button>
            <el-button type="primary">
              <i class="el-icon-folder-add" />
              分组管理
            </el-button>
            <el-input v-model="emailSbj" placeholder="请输入邮件主题" style="width:12rem;lin-height:2rem;height:100%">
              <el-button slot="append" icon="el-icon-search" @click="search" />
            </el-input>
          </el-header>
          <role-maintenance ref="roleMaintenance" :data-obj="nodeInfo" class="height100b" @reloadNode="reloadNode" @clearAdding="clearAdding" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import ApiObj from '@/api/Admin/user-management'
// eslint-disable-next-line no-unused-vars
import { queryMail } from '@/api/Mail/index'

import RoleMaintenance from './role-maintenance/index'
export default {
  name: 'ResourceManagement',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RoleMaintenance
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      emailSbj: '',
      nodeInfo: {}
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
    search() {
      // eslint-disable-next-line no-unused-vars
      const params = {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        prntGrpNo: 1
      }
      params.emailSbj = this.emailSbj
      console.log(params)
      queryMail(params).then(res => {
        console.log(res)
      })
    },
    // 清空节点并重新加载
    reloadNode() {
      const node = this.rootNode.parent
      this.freshNode(node)
    },
    // 解除新增状态
    clearAdding() {
      this.isAdding = false
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
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
