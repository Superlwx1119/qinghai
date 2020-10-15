<!-- 资源权限管理 -->
<template>
  <normal-layer
    :search-number="itemsDatas.length"
    title-name="查询结果"
    title-need-handle
  >
    <template slot="search-header">
      <form-items :items-datas="itemsDatas" :form-datas="queryForm">
        <template slot="fixmedinsCode">
          <medical-institutions-select
            v-model="dataForm.fixmedinsCode"
            dialog-title="xxx"
            :fix-flag="fixFlag"
            :que-cont="queCont"
            @changeObj="getFixmedins"
          />
        </template>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="search">查询</el-button>
      </form-items>
    </template>

    <template slot="title-btns">
      <el-dropdown>
        <el-button type="primary">
          导出
          <i
            class="el-icon-arrow-down el-icon--right"
          />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>导出选中</el-dropdown-item>
          <el-dropdown-item>导出当页</el-dropdown-item>
          <el-dropdown-item>导出全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <resu-maintenance ref="roleMaintenance" :table-data="tableData" class="height100b" />
    <Pagination />
  </normal-layer>
</template>
<script>
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import PageHandle from '@/mixins/pageHandle'
import userAccount from '@/views/components/PageSelects/Common/UserAccount'
import ResuMaintenance from './resu-maintenance/index'
import MedicalInstitutionsSelect from './MedicalInstitutionsSelect'
import moment from 'moment'
export default {
  components: {
    NormalLayer,
    FormItems,
    // eslint-disable-next-line vue/no-unused-components
    userAccount,
    ResuMaintenance,
    MedicalInstitutionsSelect
  },
  mixins: [PageHandle],
  data() {
    return {
      dataForm: {
        fixmedinsCode: '',
        fixmedinsName: '',
        initSetlDclaNo: '',
        fundPayType: '',
        poolareaFundPayType: '',
        audtDetAmt: '',
        audtDetDscr: '',
        audtDetSouc: ''
      },
      fixFlag: '1',
      queCont: '1',
      tableLoading: false,
      loading: false,
      multipleSelection: [],
      itemsDatas: [
        { label: '用户账号', prop: 'fixmedinsCode', type: 'custom', slotName: 'fixmedinsCode' },
        { label: '姓名', prop: 'xxx', type: 'input', disabled: true },
        { label: '证件号码', prop: 'xxx', type: 'input', disabled: true }
      ],
      queryForm: {
        xxx: '',
        xxx1: '',
        dateRange: [
          moment().startOf('month').format('YYYY-MM-DD'),
          moment().endOf('month').format('YYYY-MM-DD')
        ]
      },
      columns: [],
      tableData: [
        { uact: '123', userName: 'xxx', nameCode: 'xxx', uactStas: '1' },
        { uact: 'sdfs', userName: 'xxx', nameCode: 'xxx', uactStas: '3' },
        { uact: '345', userName: 'xxx', nameCode: 'xxx', uactStas: '1' }
      ],
      showDetailDialog: false,
      dialogTitle: '新增',
      showEditDialog: false
    }
  },
  methods: {
    registrationClick() {
      this.$msgSuccess('')
    },
    getFixmedins(val) {
      this.dataForm.fixmedinsCode = val.medinsCodg
      this.dataForm.fixmedinsName = val.medinsName
      this.dataForm.fixmedinsType = val.medinsName
    }
  }
}
</script>

<style lang="scss" scoped>
.item-role-per{
  height: 100%;
  .role-perssion-list{
       height: calc(100% - 176px);
     }
}
.height100b{
      height: 95%;
  }

</style>

