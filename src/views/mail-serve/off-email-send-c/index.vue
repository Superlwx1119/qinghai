<template>
  <div class="resource-management">
    <!-- 邮件服务 -->
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
              active-text-color="#409EFF"
              background-color="#fff"
              text-color="#000"
              @select="handleSelect"
            >
              <el-menu-item index="1" @click="chooseItem(1)">
                <i class="el-icon-folder" />
                <span slot="title">星标置顶</span>
              </el-menu-item>
              <el-menu-item index="2" @click="chooseItem(2)">
                <i class="el-icon-folder" />
                <span slot="title">收件箱（{{ mailCounts }}）</span>
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
                <span slot="title">归档文件夹</span>
              </el-menu-item>
              <el-submenu index="7" @click="chooseItem(7)">
                <template slot="title">
                  <i class="el-icon-folder" />
                  <span>其他文件夹</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="(item,index) in mailGroupList" :key="index.id" @click="chooseOther(item)">
                    <i class="el-icon-folder" />
                    {{ item.label }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
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
            <el-button type="primary" @click="reply()">
              <i class="el-icon-s-comment" />
              回复
            </el-button>
            <el-button type="primary" @click="replyAll()">
              <i class="el-icon-s-comment" />
              回复全部
            </el-button>
            <el-button type="primary" @click="forward()">
              <i class="el-icon-right" />
              转发
            </el-button>
            <el-button type="primary" @click="placeFile()">
              <i class="el-icon-box" />
              归档
            </el-button>
            <el-button type="primary" @click="Addgroup()">
              <i class="el-icon-folder-add" />
              分组管理
            </el-button>
            <el-input v-model="emailSbj" placeholder="请输入邮件主题" style="width:12rem;lin-height:2rem;height:100%">
              <el-button slot="append" icon="el-icon-search" @click="search" />
            </el-input>
          </el-header>
          <template>
            <my-table-view v-loading="loading" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData" @rowClick="handleCurrentChange">
              <template slot="select" slot-scope="scope">
                <el-radio v-model="rid" :label="scope.row.rid">{{ '' }}</el-radio>
              </template>
              <template slot="sendTime" slot-scope="scope">
                {{ scope.row.sendTime | renderTime }}
              </template>
              <template slot="star" slot-scope="scope">
                <svg v-if="scope.row.star === '1'" t="1607599859618" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3363" width="16" height="16" style="display: inline-block;vertical-align: middle;"><path d="M513.2 68.2l121.6 274.6 298.5 32-223.5 200.5 61.8 293.8-259.7-150.6-260.4 149.6 63-293.6L91.8 373.1l298.7-30.8L513.2 68.2z" p-id="3364" /></svg>
                <span v-if="scope.row.star === '0'" />
              </template>
              <template slot="status" slot-scope="scope">
                <state-tag :tag-type="scope.row.status | filterState" :title="scope.row.status === '1'?'已读':'未读'" />
              </template>
              <template slot="operation" slot-scope="scope">
                <my-button icon="send" title="快速回复" @click="quickResponse(scope.row)" />
                <my-button icon="detail" title="详情" @click="details(scope.row)" />
                <my-button icon="delete" title="删除" @click="deleteRow(scope.row)" />
              </template>
            </my-table-view>
            <Pagination :data="paginationQuery2" @refresh="pageChange2" />
          </template>
        </el-col>
      </el-row>
    </section>
    <MailReply v-model="isShowAdd" :select-row="selectRow" :is-reply-mail="isReplyMail" :is-forward-mail="isForwardMail" :dialog-title="dialogTitle" @search="chooseItem(parseInt(selectIndex))" />
    <viewMail v-model="isShowDetail" :dialog-title="detailTitle" :select-row="selectRow" @search="search" @readFlag="readFlag" />
    <AddGroup v-model="isaddgroup" />
  </div>
</template>

<script>
// import { getCurrentUser } from '@/api/Common/Request'
import { offEmailD, getUnReadCount, getStarEMailList, getEMailInbox, getDraft, getEMailOutbox, getEMailBin, getArchiveEMailList, deleteEMailByReceiver, updateArchiveStatus, readFlag, getEMailGroups, getEMailsFromGroup } from '@/api/Mail'
import pageHandle from '@/mixins/pageHandle'
import { listitem1, listitem2, listitem3, listitem4 } from './listitem'
import MailReply from './mailReply'
import viewMail from './components/viewMail'
import AddGroup from './components/addgroup'
export default {
  name: 'ResourceManagement',
  components: {
    MailReply,
    AddGroup,
    viewMail
  },
  filters: {
    renderTime(date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    filterState(val) {
      if (val === '0') {
        return 'nopass'
      } else if (val === '1') {
        return 'pass'
      }
    }
  },
  mixins: [pageHandle],
  props: {
  },
  data() {
    return {
      loading: false,
      // 表列
      columns: [],
      // 数据
      tableData: [],
      isShowAdd: false,
      isShowDetail: false,
      isaddgroup: false,
      emailSbj: '',
      nodeInfo: {},
      rid: '',
      selectRow: {},
      selectIndex: '2', // 当前激活的菜单的唯一标识
      isReplyMail: false, // 是否是回复邮件
      isForwardMail: false, // 是否是转发邮件
      dialogTitle: '', // 弹出框名称
      detailTitle: '', // 详情的弹出框名称
      paginationQuery2: { pageSize: 10, pageNumber: 1, total: 0, startRow: 0, endRow: 0 },
      mailCounts: '',
      mailGroupList: []// 存放其他文件夹的数据
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
    this.getEMailGroups()
    this.getUnReadCounts()
    this.getEMailInbox()
  },
  methods: {
    charge() {
      this.getUnReadCounts()
      this.getEMailInbox()
    },
    // 获取其他文件夹的内容
    getEMailGroups() {
      getEMailGroups({}).then(res => {
        if (res.code === 0) {
          this.mailGroupList = res.data
        }
      })
    },
    getEMailInbox() {
      const param = {
        pageSize: this.paginationQuery2.pageSize,
        pageNumber: this.paginationQuery2.pageNumber,
        total: this.paginationQuery2.total,
        prntGrpNo: 1
      }
      getEMailInbox(param).then(res => {
        this.tableData = res.data.result
        this.paginationQuery2 = {
          pageSize: res.data.pageSize,
          pageNumber: res.data.pageNumber,
          total: res.data.total,
          startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
          endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
        }
      })
    },
    changeSelection(val) {
      this.tableData = val
    },
    // 子列表
    handleSelect(key) {
      this.selectIndex = key
    },
    chooseItem(value) {
      // debugger
      const param = {
        pageSize: this.paginationQuery2.pageSize,
        pageNumber: this.paginationQuery2.pageNumber,
        total: this.paginationQuery2.total,
        prntGrpNo: 1
      }
      switch (value) {
        case 1:
          this.columns = listitem1
          this.loading = true
          getStarEMailList(param).then(res => {
            this.loading = false
            this.tableData = res.data.result
            this.paginationQuery2 = {
              pageSize: res.data.pageSize,
              pageNumber: res.data.pageNumber,
              total: res.data.total,
              startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
              endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
            }
          }).catch(() => {
            this.loading = false
          })
          break
        case 2:
          this.columns = listitem1
          this.loading = true
          getEMailInbox(param).then(res => {
            this.loading = false
            this.tableData = res.data.result
            this.paginationQuery2 = {
              pageSize: res.data.pageSize,
              pageNumber: res.data.pageNumber,
              total: res.data.total,
              startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
              endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
            }
          }).catch(() => {
            this.loading = false
          })
          break
        case 3:
          this.columns = listitem2
          this.loading = true
          getDraft(param).then(res => {
            this.loading = false
            this.tableData = res.data.result
            this.paginationQuery2 = {
              pageSize: res.data.pageSize,
              pageNumber: res.data.pageNumber,
              total: res.data.total,
              startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
              endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
            }
          }).catch(() => {
            this.loading = false
          })
          break
        case 4:
          this.columns = listitem3
          this.loading = true
          getEMailOutbox(param).then(res => {
            this.loading = false
            this.tableData = res.data.result
            this.paginationQuery2 = {
              pageSize: res.data.pageSize,
              pageNumber: res.data.pageNumber,
              total: res.data.total,
              startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
              endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
            }
          }).catch(() => {
            this.loading = false
          })
          break
        case 5:
          this.columns = listitem4
          this.loading = true
          getEMailBin(param).then(res => {
            this.loading = false
            this.tableData = res.data.result
            this.paginationQuery2 = {
              pageSize: res.data.pageSize,
              pageNumber: res.data.pageNumber,
              total: res.data.total,
              startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
              endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
            }
          }).catch(() => {
            this.loading = false
          })
          break
        case 6:
          this.columns = listitem3
          this.loading = true
          getArchiveEMailList(param).then(res => {
            this.loading = false
            this.tableData = res.data.result
            this.paginationQuery2 = {
              pageSize: res.data.pageSize,
              pageNumber: res.data.pageNumber,
              total: res.data.total,
              startRow: (res.data.pageNumber - 1) * res.data.pageSize + 1 ? (res.data.pageNumber - 1) * res.data.pageSize + 1 : 0,
              endRow: res.data.total > res.data.pageSize * res.data.pageNumber ? res.data.pageNumber * res.data.pageSize : res.data.total
            }
          }).catch(() => {
            this.loading = false
          })
          break
      }
    },
    replyshoe() {
      this.isShowAdd = true
      this.isReplyMail = false
      this.dialogTitle = '写邮件'
    },
    // 回复
    reply() {
      const selectIndexToNum = parseInt(this.selectIndex)
      if (selectIndexToNum === 4) {
        this.$msgInfo('此文件夹内邮件不支持此功能')
        return false
      } else {
        if (this.rid === '') {
          this.$msgWarning('请选择邮件')
        } else {
          this.isReplyMail = true
          this.isShowAdd = true
          this.selectRow
          this.dialogTitle = `回复：${this.selectRow.title}`
        }
      }
    },
    // 回复全部
    replyAll() {
      const selectIndexToNum = parseInt(this.selectIndex)
      if (selectIndexToNum === 4) {
        this.$msgInfo('此文件夹内邮件不支持此功能')
        return false
      } else {
        if (this.rid === '') {
          this.$msgWarning('请选择邮件')
        } else {
          this.isReplyMail = true
          this.isShowAdd = true
          this.selectRow
          this.dialogTitle = `回复全部：${this.selectRow.title}`
        }
      }
    },
    // 转发
    forward() {
      if (this.rid === '') {
        this.$msgInfo('请选择邮件')
      } else {
        this.isForwardMail = true
        this.isShowAdd = true
        this.selectRow
        this.dialogTitle = `转发：${this.selectRow.title}`
      }
    },
    // 归档
    placeFile() {
      if (this.rid === '') {
        this.$msgInfo('请选择邮件')
      } else {
        const params = {
          rid: this.selectRow.rid,
          star: '1'
        }
        updateArchiveStatus(params).then(res => {
          if (res.code === 0) {
            console.log(this.selectIndex, 'selectIndex')
            this.$msgSuccess('归档成功！')
            this.chooseItem(parseInt(this.selectIndex))
          }
        }).catch(() => {

        })
      }
    },
    getUnReadCounts() {
      getUnReadCount().then(res => {
        if (res.code === 0) {
          this.mailCounts = res.data
        }
      })
    },
    search() {
      this.chooseItem(parseInt(this.selectIndex))
      this.getUnReadCounts()
    },
    // 查看详情
    details(row) {
      this.isShowDetail = true
      this.detailTitle = `主题：${row.title}`
      this.selectRow = row
      row.status === '1'
    },
    // 快速回复
    quickResponse(row) {
      this.$msgConfirm(`是否快速回复${row.senderName}的【${row.title}】?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        const senders = []
        senders.push(row.sender)
        const params = {
          ccIdList: [],
          emailCont: '已读',
          recpIdList: senders,
          offEmailDetlCDTO: {
            attId: [],
            cc: '',
            draftAttOssIdList: [],
            emailRid: row.rid,
            emailSbj: `回复：${row.title}`,
            recp: row.senderName
          }
        }
        offEmailD(params).then(res => {
          if (res.code === 0) {
            this.getUnReadCounts()
            this.readFlag(row.rid)
            this.$msgSuccess('操作成功！')
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.$msgInfo('')
      })
    },
    // 删除行
    deleteRow(row) {
      this.$msgConfirm('是否将所选邮件删除移动到已删除邮件文件夹?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteEMailByReceiver(row.rid).then(res => {
          if (res.code === 0) {
            this.search()
            this.$msgSuccess('操作成功！')
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.$msgInfo('')
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
    Addgroup() {
      this.isaddgroup = true
    },
    handleCurrentChange({ row, column, cell }) {
      this.selectRow = row
    },
    // 刷新已读标志
    readFlag(v) {
      const param = v
      readFlag(param).then(res => {
        if (res.code === 0) {
          this.getEMailInbox()
        }
      })
    },
    // 切换分页
    pageChange2(v) {
      this.paginationQuery2.pageSize = v.pagination.pageSize
      this.paginationQuery2.pageNumber = v.pagination.pageNum
      this.chooseItem(parseInt(this.selectIndex))
    },
    // 选择其他文件夹里的文件
    chooseOther(item) {
      const params = {
        pageSize: this.paginationQuery2.pageSize,
        pageNumber: this.paginationQuery2.pageNumber,
        total: this.paginationQuery2.total,
        groupId: item.id,
        prntGrpNo: '1'
      }
      this.loading = true
      getEMailsFromGroup(params).then(res => {
        this.loading = false
        this.tableData = res.data.result
        this.paginationQuery2 = {
          pageSize: res.data.pageSize,
          pageNumber: res.data.pageNumber,
          total: res.data.total,
          startRow: res.data.startRow,
          endRow: res.data.endRow
        }
      }).catch(() => {
        this.loading = false
      })
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
            overflow: scroll;

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
  };
  /deep/.pf-table{
    height: calc(100% - 86px) !important;
  }
}
</style>
