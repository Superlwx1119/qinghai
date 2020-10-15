<template>
  <!-- 数据元维护 -->
  <div class="item2">
    <section class="layer layer-query">
      <div class="box">
        <!-- 查询条件头部使用组件方便日后修改 -->
        <ConditionHeader />
        <div class="box-body">
          <el-row :gutter="12">
            <el-form ref="searchForm" :rules="rules" :model="searchForm" label-width="105px">
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="数据元编码" prop="Code">
                  <el-input v-model="searchForm.Code" placeholder="请输入数据元编码" clearable />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="6">
                <el-form-item label="数据元中文名" prop="CnName">
                  <el-input
                    v-model="searchForm.CnName"
                    placeholder="请输入数据元中文名"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="12">
                <el-button @click="reset">重置</el-button>
                <el-button type="primary" @click="search">查询</el-button>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
    </section>
    <section class="layer layer-result">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">查询结果</span>
          <div class="box-tools">
            <el-button type="primary" @click="smallShow = true">small</el-button>
            <el-button type="primary" @click="middleShow = true">middle</el-button>
            <el-button type="primary" @click="bigShow = true">big</el-button>
            <el-button type="primary" @click="tableShow = true">tableData</el-button>
            <el-button type="primary" @click="show = true">buttonCont</el-button>
            <el-button type="primary" @click="openDialog">新增</el-button>
          </div>
        </div>
        <div class="box-body search-result">
          <List height="100%" :is-index="true" :is-border="true" :columns="tableColumns" :operates="tableOperates" :data="tableData" />
          <Pagination />
        </div>
      </div>
    </section>
    <!-- 新增弹窗-->
    <add-dialog :show="addVisible" @update:show="addShow" />

    <!-- 修改弹窗 -->
    <modify-dialog :form="modifyForm" :show="modifyVisible" @update:show="modifyShow" />
    <!-- 入院管理 -->
    <enter :show.sync="show" />

    <small-dialog :show.sync="smallShow" />
    <middle-dialog :show.sync="middleShow" />
    <big-dialog :show.sync="bigShow" />
    <table-data :show.sync="tableShow" />
  </div>
</template>

<script>
import AddDialog from './components/add'
import ModifyDialog from './components/modify'
import Enter from './components/enter'
import SmallDialog from './components/small-dialog'
import MiddleDialog from './components/middle-dialog'
import BigDialog from './components/big-dialog'
import tableData from './components/table-data'
export default {
  // name: 'DataSourceMaintenance',
  components: {
    'add-dialog': AddDialog,
    'modify-dialog': ModifyDialog,
    'enter': Enter,
    'small-dialog': SmallDialog,
    'middle-dialog': MiddleDialog,
    'big-dialog': BigDialog,
    'table-data': tableData
  },
  data() {
    return {
      show: false,
      smallShow: false,
      middleShow: false,
      bigShow: false,
      tableShow: false,
      addVisible: false,
      modifyVisible: false,
      searchForm: {
        Code: '',
        CnName: ''
      },
      modifyForm: {},
      tableData: [{
        id: '1',
        Identifier: '事项', // 数据元标识符
        Code: 'matter', // 数据元编码
        CnName: 'matt', // 数据元中文名
        domainAdmin: '', // 管理域
        DataElementType: '系统管理员', // 数据元类型
        Precision: '2020-04-28'// 数据元精度
      }, {
        id: '2',
        Identifier: '受理', // 数据元标识符
        Code: 'accept', // 数据元编码
        CnName: 'acp', // 数据元中文名
        domainAdmin: '', // 管理域
        DataElementType: '系统管理员', // 数据元类型
        Precision: '2020-04-28'// 数据元精度
      }, {
        id: '3',
        Identifier: '状态', // 数据元标识符
        Code: 'states', // 数据元编码
        CnName: 'stas', // 数据元中文名
        domainAdmin: '', // 管理域
        DataElementType: '系统管理员', // 数据元类型
        Precision: '2020-04-28'// 数据元精度
      }],
      tableOperates: {
        width: '200px',
        list: [
          { show: true, label: '修改', type: 'text',
            method: (key, row, index) => {
              this.modifyVisible = true
              this.modifyForm = { ...row }
            } },
          { show: true, label: '删除', type: 'text', class: 'delete',
            method: (key, row, index) => {
              this.$msgConfirm('确认删除数据元？').then(res => {
                this.$msgSuccess('删除成功')
              }).catch(() => {
                this.$msgInfo('取消删除')
              })
            }
          }
        ]
      },
      tableColumns: [
        { label: '数据元标识符', prop: 'Identifier', sortable: false, align: 'center' },
        { label: '数据元编码', prop: 'Code', sortable: false, align: 'center' },
        { label: '数据元中文名', prop: 'CnName', sortable: false, align: 'center' },
        { label: '管理域', prop: 'domainAdmin', sortable: false, align: 'center' },
        { label: '数据元类型', prop: 'DataElementType', sortable: false, align: 'center' },
        { label: '数据元精度', prop: 'Precision', sortable: false, align: 'center' }
      ],
      rules: {
        Identifier: [{ required: true, message: '请输入数据元标识符', trigger: 'blur' }],
        Code: [{ required: true, message: '请输入数据元编码', trigger: 'blur' }],
        CnName: [{ required: true, message: '请输入数据元中文名', trigger: 'blur' }],
        DataElementType: [{ required: true, message: '请选择数据元类型', trigger: 'blur' }],
        Precision: [{ required: true, message: '请输入数据元精度', trigger: 'blur' }]
      },
      AdminOptions: [
        { label: '糖尿病', value: '1' }
      ],
      TypeOptions: [
        { label: '糖尿病', value: '1' }
      ]
    }
  },
  mounted() {

  },
  methods: {
    // 成功提醒
    handleSuccess() {
      this.$msgSuccess('操作成功')
    },
    // 失败提醒
    handleError() {
      this.$msgError('操作失败')
    },
    // 确认框
    handleConfirm() {
      this.$msgConfirm('是否删除？').then(res => {
        this.$msgSuccess(res)
      }).catch(err => {
        this.$msgInfo(err)
      })
    },
    // 新增按钮
    openDialog() {
      this.addVisible = true
    },
    addShow(v) {
      this.addVisible = v
    },
    modifyShow(v) {
      this.modifyVisible = v
    },
    refresh(v) {
      console.log(v)
    },
    // 查询按钮
    search() {},
    // 重置按钮
    reset() {}
  }
}
</script>
<style lang="scss" scoped>

</style>
