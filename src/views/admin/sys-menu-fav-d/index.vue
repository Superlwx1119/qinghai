<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 菜单收藏夹 -->
  <div class="item2 fav-menu">
    <normal-layer
      :search-number="itemsDatas.length"
      title-name="菜单收藏夹列表"
      title-need-handle
    >
      <template slot="search-header">
        <FormItems ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm">
          <template slot="subsysId">
            <subSysSelect ref="subSysSelect" @getSubsys="getSubsys" />
          </template>
          <div>
            <MyButton type="reset" @click="reset" />
            <MyButton type="search" @click="iniSearch" />
          </div>
        </FormItems>
      </template>
      <template slot="title-btns">
        <my-button type="add" title="新增" @click="handleAdd" />
      </template>
      <template>
        <my-table-view v-loading="loading" :columns="columns" :data="tableData" :have-expand="false" :max-cloumns="100" :is-configheader="false">
          <template slot="operation" slot-scope="scope">
            <MyButton icon="delete" title="删除" @click.stop="del(scope.row)" />
            <MyButton icon="moveUp" title="上移" @click="moveUp(scope.rowIndex,scope.row)" />
            <MyButton icon="moveDown" title="下移" @click.stop="moveDown(scope.rowIndex,scope.row)" />
          </template>
          <template slot="subsysId" slot-scope="scope">
            {{ scope.row.subsysId|fliterSubsystem }}
          </template>
          <template slot="crteTime" slot-scope="scope">
            {{ scope.row.crteTime |parseTime }}
          </template>
        </my-table-view>
      </template>
    </normal-layer>
    <!-- 新增 -->
    <MenuAdd v-if="dataObj.isShow" :data-obj="dataObj" @cancelDialog="cancelDialog" />
  </div>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import { tableColumns } from './tableConfig'
import MenuAdd from './menu-add/index'
import subSysSelect from '@/components/SubsysSelect/index'
import ApiObj from '@/api/Admin/user-management'
import { moveUpMenu, moveDownMenu } from '@/api/Admin/user-management'
import { mapGetters } from 'vuex'
export default {
  name: 'UserManagement',
  components: {
    NormalLayer,
    FormItems,
    MenuAdd,
    subSysSelect
  },
  filters: {
    // 过滤子系统
    fliterSubsystem(value) {
      switch (value) {
        case '201912211619040000006100000000':
          return '基础信息管理子系统'
        case '201912251129150000006500000000':
          return '报表中心'
        case '201912231522320000006200000000':
          return '信用评价管理子系统'
        case '202001041436400000008400000000':
          return '电子凭证后台管理'
        case '202005251014140000015133140000':
          return '通用综合查询统计平台'
        case '202007101443010000001133130000':
          return '测试子系统1'
        case '201912171924320000003700000000':
          return '跨省异地就医管理子系统'
        case '12':
          return '基金运行及审计监管子系统'
        case '18001':
          return '内部控制子系统'
        case '14001':
          return '内部统一门户子系统'
        case '201912241906580000006400000000':
          return '宏观大数据子系统'
        case '202001031129080000008200000000':
          return '消息中心'
        case '201912241859460000006300000000':
          return '运行监测'
        case '21':
          return '医疗保障智能监管子系统'
        case '202004041646411002383333100000':
          return '医保业务基础子系统'
        case '202009151816210000000133130000':
          return '问题管理子系统'
        case '1':
          return '支付方式管理子系统'
        case '22':
          return '医疗服务价格管理子系统'
        case '201912201146120000005100000000':
          return '招采子系统'
        case '202002261528080000003100000000':
          return '招采子系统省本级'
        case '202001031411000000008300000000':
          return 'workflow管理中心'
        case '201912181344280000003900000000':
          return 'xxl-job'
        case '202007130857360000002233130000':
          return '智能报表'
      }
    }
  },
  mixins: [pageHandle],
  props: {},
  data() {
    return {
      dataObj: {
        isShow: false,
        isQuery: false,
        isModify: false,
        rows: {}
      },
      itemsDatas: [
        { label: '子系统名称', prop: 'subsysId', type: 'custom' },
        { label: '菜单名称', prop: 'resuName', type: 'input' }
      ],
      queryForm: {
        subsysId: '',
        resuName: ''
      },
      columns: tableColumns,
      tableData: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'subsysList'
    ])
  },
  watch: {},
  created() {
  },
  mounted() {
    this.iniSearch()
  },
  methods: {
    // 查询
    search() {
      this.getSysMenuFavD()
    },
    // 切换获取子系统id
    getSubsys(data) {
      this.queryForm.subsysId = data
    },
    // 获取查询菜单收藏
    getSysMenuFavD() {
      const params = {
        ...this.queryForm
      }
      this.loading = true
      ApiObj.sysMenuFavD(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    del(row) {
      this.$confirm(`<div class="myalert-header">操作提醒</div><div class="myalert-content">确认删除？</div>`, {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleterow(row)
        })
        .catch(() => {

        })
    },
    // 删除
    deleterow(row) {
      this.loading = true
      ApiObj.delMenu(row.menuFavId).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.$message({
            type: 'success',
            dangerouslyUseHTMLString: true,
            message: `<strong>操作成功</strong><p>${res.message}</p>`,
            duration: 1000
          })
          this.cancelDialog(1)
        } else {
          this.loading = false
          this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">${res.message}</div>`, {
            dangerouslyUseHTMLString: true, confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    // 上移
    moveUp(index, row) {
      if (index === 0) {
        this.$msgInfo('处于顶端，不能继续上移')
        return
      } else {
        this.loading = true
        const params = {
          upId: row.menuFavId, // 该行数据id
          downId: this.tableData[index - 1].menuFavId // 上一行数据的id
        }
        moveUpMenu(params).then(res => {
          this.$msgSuccess('上移成功！')
          this.loading = false
          this.iniSearch()
        }).catch(() => {
          this.loading = false
        })
      }
    },
    // 下移
    moveDown(index, row) {
      if ((index + 1) === this.tableData.length) {
        this.$msgInfo('处于底端，不能继续下移')
      } else {
        this.loading = true
        const params = {
          upId: row.menuFavId, // 该行数据id
          downId: this.tableData[index + 1].menuFavId // 上一行数据的id
        }
        moveDownMenu(params).then(res => {
          this.$msgSuccess('下移成功！')
          this.loading = false
          this.iniSearch()
        }).catch(() => {
          this.loading = false
        })
      }
    },
    // 新增
    handleAdd() {
      this.dataObj.isShow = true
      this.dataObj.isModify = false
    },
    // 关闭弹出框
    cancelDialog(data) {
      this.dataObj.isShow = false
      this.dataObj.isModify = false
      this.dataObj.mnitId = ''
      if (data === 1) {
        this.getSysMenuFavD()
      }
      this.dataObj.rows = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .fav-menu{
    /deep/.el-table{
      height: 100%;
    }
  }
</style>
