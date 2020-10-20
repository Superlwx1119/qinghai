<template>
  <div class="resource-management">
    <!-- 安全角色管理 -->
    <section class="layer">
      <el-row :gutter="12" style="margin-right:0!important;margin-left:0!important;">
        <el-col :span="6">
          <div class="box">
            <div class="box-header">
              <span class="box-title">邮件分组</span>
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
              <el-menu-item index="1" @click="chooseItem(1)">
                <i class="el-icon-folder" />
                <span slot="title">星标置顶</span>
              </el-menu-item>
              <el-menu-item index="2" @click="chooseItem(2)">
                <i class="el-icon-folder" />
                <span slot="title">收件箱</span>
              </el-menu-item>
              <el-menu-item index="3" @click="chooseItem(3)">
                <i class="el-icon-folder" />
                <span slot="title">草稿箱</span>
              </el-menu-item>
              <el-menu-item index="4" @click="chooseItem(4)">
                <i class="el-icon-folder" />
                <span slot="title">已发送邮件</span>
              </el-menu-item>
              <el-menu-item index="5" @click="chooseItem(5)">
                <i class="el-icon-folder" />
                <span slot="title">已删除邮件</span>
              </el-menu-item>
              <el-menu-item index="6" @click="chooseItem(6)">
                <i class="el-icon-folder" />
                <span slot="title">预算文件夹</span>
              </el-menu-item>
              <el-menu-item index="7" @click="chooseItem(7)">
                <i class="el-icon-folder" />
                <span slot="title">其他文件夹</span>
              </el-menu-item>
            </el-menu>

          </div>
        </el-col>
        <el-col :span="18">
          <el-header style="padding:0.5rem 0;height:auto;">
            <el-button type="primary" @click="charge()">
              <i class="el-icon-download" />
              收取
            </el-button>
            <el-button type="primary" @click="replyshoe()">
              <i class="el-icon-edit-outline" />
              写邮件
            </el-button>
            <el-button type="primary" @click="getCurrentUserbtn()">
              <i class="el-icon-s-comment" />
              回复
            </el-button>
            <el-button type="primary" @click="getCurrentUserbtn()">
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
          <template>
            <my-table-view v-loading="loading" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData" />
          </template>
        </el-col>
      </el-row>
    </section>
    <MailReply v-model="isShowAdd" />
  </div>
</template>

<script>
import { getCurrentUser } from '@/api/Common/Request'
import { queryMail, getUnReadCount, getStarEMailList, getEMailInbox, getDraft, getEMailOutbox, getEMailBin, getArchiveEMailList } from '@/api/Mail'
import { listitem1, listitem2, listitem3, listitem4 } from './listitem'
import MailReply from './mailReply'
export default {
  name: 'ResourceManagement',
  components: {
    MailReply
  },
  mixins: [],
  props: {
  },
  data() {
    return {
      multipleSelection: [],
      loading: false,
      // 表列
      columns: [],
      // 数据
      tableData: [],
      isShowAdd: false,
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
    this.columns = listitem1
  },
  mounted() {

  },
  methods: {
    charge() {
      this.getUnReadCounts()
      const param = {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        prntGrpNo: 1,
        emailType: '02'
      }
      getEMailInbox(param).then(res => {
        this.tableData = res.data.result
      })
    },
    changeSelection(val) {
      this.tableData = val
    },
    // 子列表
    chooseItem(value) {
      this.getUnReadCounts()
      const param = {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        prntGrpNo: 1,
        emailType: '02'
      }
      switch (value) {
        case 1:
          this.columns = listitem1
          getStarEMailList(param).then(res => {
            this.tableData = res.data.result
          })
          break
        case 2:
          this.columns = listitem1
          getEMailInbox(param).then(res => {
            this.tableData = res.data.result
          })
          break
        case 3:
          this.columns = listitem2
          getDraft(param).then(res => {
            this.tableData = res.data.result
          })
          break
        case 4:
          this.columns = listitem3
          getEMailOutbox(param).then(res => {
            this.tableData = res.data.result
          })
          break
        case 5:
          this.columns = listitem4
          getEMailBin(param).then(res => {
            this.tableData = res.data.result
          })
          break
        case 6:
          this.columns = listitem3
          getArchiveEMailList(param).then(res => {
            this.tableData = res.data.result
          })
          break
        case 7:
          this.columns = listitem1
          getStarEMailList(param).then(res => {
            this.tableData = res.data.result
          })
          break
        default:
          this.columns = listitem1
          this.getUnReadCounts()
          break
      }
    },
    replyshoe() {
      console.log('123')
      this.isShowAdd = true
    },
    getUnReadCounts() {
      getUnReadCount().then(res => console.log(res))
    },
    getCurrentUserbtn() {
      const that = this
      getCurrentUser().then(res =>
        that.$message({
          message: '警告',
          type: 'warning'
        })
      )
    },
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
    },
    // 切换每页的数量
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
    // 关闭弹出框
    cancel(data) {
      this.isShowAdd = false
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
