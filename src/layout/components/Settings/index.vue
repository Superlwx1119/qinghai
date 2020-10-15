<template>
  <div class="drawer-container">
    <div class="drawer-header" title="费用明细">已获取事项列表</div>
    <div class="drawer-body">
      <my-table-view v-loading="loading" :columns="columns" :data="tableData" :multiple-selection.sync="multipleSelection" @rowClick="handleClick" />
      <Pagination :data="paginationQuery" @refresh="pageChange" />
    </div>
  </div>
</template>

<script>
// import ThemePicker from '@/components/ThemePicker'
import pageHandle from '@/mixins/pageHandle'
import { tableColumns } from './tableConfig'
import { getTasks, getAcceptDetail } from '@/layout/components/Settings/SettingApi'

export default {
  components: { },
  mixins: [pageHandle],
  data() {
    return {
      loading: false,
      columns: tableColumns,
      multipleSelection: [],
      tableData: []
    }
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    }
  },
  created() {
    // 获取已获取事项列表
    getTasks(this.paginationQuery).then(res => {
      if (res.code === 0) {
        this.tableData = res.data.data
        this.setPaginationQuery(res.data)
      } else {
        this.$msgError(res.message)
      }
    })
  },
  methods: {
    handleClick({ row, column, cell }) {
      var params = { acpId: row.acpId }
      // var params = { acpId: '20200817271' }
      getAcceptDetail(params).then(res => {
        if (res.code === 0) {
          const matter = Object.assign(res.data, params, { nodeCode: row.nodeCode })
          console.log(matter, 'matter')
          this.$store.dispatch('matter/addMatter', matter)
          this.$store.dispatch('matter/closeRightpanel', true)
        } else {
          this.$msgError(res.messsage)
        }
      })
    },
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  // padding: 24px;
  // padding-top:0 ;
  height: 100%;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }
.drawer-header{
          background-color: #3b71e8;
    height: 48px;
    line-height: 48px;
    padding: 0 10px;
    color: #fff;
    font-weight: 700;
    margin-bottom: 0;
}
.drawer-body{
  height: calc(100% - 48px);
  padding: 10px;
}
  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
