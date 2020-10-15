<!-- 用户权限管理 -->
<template>
  <normal-layer
    :search-number="itemsDatas.length"
    title-name="查询结果"
    title-need-handle
  >
    <template slot="search-header">
      <form-items
        :items-datas="itemsDatas"
        :form-datas="queryForm"
      >
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
        <el-button
          type="primary"
          @click="search"
        >查询</el-button>
      </form-items>
    </template>
    <el-row :gutter="12" style="margin-right:0!important;margin-left:0!important;" class="height100b">
      <el-col :span="12" class="height100b">
        <section class="layer height100b" style="border:1px solid #666666">
          <div class="box height100b" style="border:1px solid #455445">
            <div class="box-header handle height100b">
              <span class="box-title">角色信息</span>
              <div class="box-tools">
                <el-form :inline="true">
                  <el-button type="primary">导出
                    <i
                      class="el-icon-arrow-down"
                    />
                  </el-button>
                </el-form>
              </div>
            </div>
            <role-maintenance
              ref="roleMaintenance"
            />
          </div>
        </section>
      </el-col>
      <el-col :span="12">
        <div class="box">
          <div class="box-header handle">
            <span class="box-title">角色权限信息</span>
          </div>
          <template>
            <el-select v-model="value" style="width:100%" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </div>
      </el-col>
    </el-row>
    <!-- <edit-dialog v-model="showEditDialog" :dialog-title="dialogTitle" /> -->
  </normal-layer>
</template>

<script>
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import PageHandle from '@/mixins/pageHandle'
import RoleMaintenance from './role-maintenance/index'
import MedicalInstitutionsSelect from './MedicalInstitutionsSelect'
// import Columns from './listCloumns'
import moment from 'moment'
// import EditDialog from './edit-dialog'
export default {
  components: {
    RoleMaintenance,
    NormalLayer,
    FormItems,
    MedicalInstitutionsSelect
    // EditDialog
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
      loading: false,
      multipleSelection: [],
      itemsDatas: [
        { label: '用户账号', prop: 'fixmedinsCode', type: 'custom', slotName: 'fixmedinsCode' },
        { label: '姓名', prop: 'xxx', type: 'input', disabled: true },
        { label: '证件号码', prop: 'xxx', type: 'input', disabled: true }
      ],
      queryForm: {
        xxx: '',
        xxx1: '123',
        dateRange: [
          moment().startOf('month').format('YYYY-MM-DD'),
          moment().endOf('month').format('YYYY-MM-DD')
        ]
      },
      columns: [],
      tableData: [
        { name: '白兰花', code: 'xxx', nameCode: 'xxx' },
        { name: '白兰花', code: 'xxx', nameCode: 'xxx' }
      ],
      showDetailDialog: false,
      dialogTitle: '新增',
      showEditDialog: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
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

<style scoped lang="scss">
.height100b{
      height: 100%;
      border: 1px solid red;
  }
</style>

