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
        <section class="layer height100b">
          <div class="box height100b">
            <div class="box-header handle">
              <span class="box-title">角色信息</span>
              <div class="box-tools">
                <el-form :inline="true">
                  <el-dropdown>
                    <el-button type="primary">
                      导出<i class="el-icon-arrow-down el-icon--right" />
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="handleClick()">导出当页</el-dropdown-item>
                      <el-dropdown-item @click="handleClick()">导出选中</el-dropdown-item>
                      <el-dropdown-item @click="handleClick()">导出全部</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
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
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
          />
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
          />
        </div>
      </el-col>
    </el-row>
  </normal-layer>
</template>

<script>
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import PageHandle from '@/mixins/pageHandle'
import RoleMaintenance from './role-maintenance/index'
import MedicalInstitutionsSelect from './MedicalInstitutionsSelect'
// 获取用户账户
import { getCurrentUser } from '@/api/Common/Request'
import moment from 'moment'
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
      filterText: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
      showDetailDialog: false,
      dialogTitle: '新增',
      showEditDialog: false,
      value: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getCurrentUsers()
  },
  methods: {
    handleClick() {
      console.log('1231')
    },
    getCurrentUsers() {
      const that = this
      getCurrentUser().then(res => {
        this.$nextTick(() => {
          that.data = res.data
        })
        sessionStorage.setItem('orgUntId', res.data.this.orgUntId)
      }).catch(err => console.log(err))
    },
    // 查询方法
    filterNode(value, data) {
      if (!value) return true
      // eslint-disable-next-line no-undef
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data)
    },
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
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

