<template>
  <div class="menu-maintenance">
    <!-- 机构维护 -->
    <div class="box noshadow">
      <div class="box-header handle">
        <span class="box-title">机构维护</span>
        <div class="box-tools">
          <el-button @click="restSearch">重置</el-button>
          <el-button type="success" @click="organizManageSave">保存</el-button>
        </div>
      </div>
      <div class="box-body">
        <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="105px">
          <el-row>
            <el-col :span="8" class="h48">
              <el-form-item label="组织机构类型" prop="orgTypeCode">
                <el-select v-model="searchForm.orgTypeCode" placeholder="请选择" style="width:100%" clearable>
                  <el-option
                    v-for="item in ORGTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16" prop="uscc" class="h48">
              <el-form-item label="统一社会信用代码">
                <el-input v-model="searchForm.uscc" clearable placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24" class="h48">
              <el-form-item label="组织机构名称" prop="orgName">
                <el-input v-model="searchForm.orgName" clearable placeholder="请输入" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24" class="h48">
                <el-form-item label="上级组织机构" prop="prntOrgId">
                <SelectLoadTree :props="defaultProps" v-model="searchForm.prntOrgId"/></el-form-item>
              </el-col> -->
            <el-col :md="12" :lg="8" :xl="8" class="h48">
              <el-form-item label="简称" prop="abbr">
                <el-input v-model="searchForm.abbr" clearable placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8" class="h48">
              <el-form-item label="医保单位编码" prop="orgCodg">
                <el-input v-model="searchForm.orgCodg" clearable placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8" class="h48">
              <el-form-item label="医保区划" prop="admdvs">
                <el-input v-model="searchForm.admdvs" clearable placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="说明" prop="dscr">
                <el-input v-model="searchForm.dscr" :rows="5" resize="none" clearable placeholder="请输入" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { organizManage, organizManageSave, orgMage } from '@/api/Admin/user-management'
import {
  mapGetters
} from 'vuex'
// import SelectLoadTree from '@/components/SelectLoadTree'
export default {
  name: 'ResourceManagement',
  components: {
    // SelectLoadTree
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      defaultProps: {
        parent: 'prntOrgId', // 父级唯一标识
        value: 'orguntId', // 唯一标识
        label: 'name', // 标签显示
        children: 'children' // 子级
      },
      none: '',
      // 组织机构类型类别
      ORGTypeList: [],
      // 子系统列表
      treeLoading: false,
      searchForm: {
        dscr: '',
        poolareaCodg: '',
        orgCodg: '',
        abbr: '',
        orgName: '',
        orgTypeCode: '',
        prntOrgId: '', // 父节点id
        lv: '',
        admdvs: ''
      },
      rules: {
        orgTypeCode: [{ required: true, message: '请选择组织机构类型', trgger: 'change' }],
        orgCodg: [{ required: true, message: '请输入系统单位编码', trgger: 'blur' }],
        admdvs: [{ required: true, message: '请输入统筹区划编码', trgger: 'blur' }],
        orgName: [{ required: true, message: '请输入组织机构名称', trgger: 'blur' }],
        abbr: [{ required: true, message: '请输入简称', trgger: 'blur' }]
        // prntOrgId: [{ required: true, message: '请选择父节点', trgger: 'blur' }]
      },
      tableLoading: false,
      rootResolve: '',
      rootNode: '',
      isEdit: false
    }
  },
  computed: {
    ...mapGetters([
      'publicCode'
    ])
  },
  watch: {

  },
  created() {
    this.ORGTypeList = this.publicCode.codes.ORG_TYPE_CODG
  },
  mounted() {

  },
  methods: {
    // 循环对象拿到id组成路径
    fnDeep(object) {
      const arr = []
      let point = object
      while (point.parent) {
        arr.push(point.data.id)
        point = point.parent
      }
      if (point.data) {
        arr.push(point.data.id)
      }
      return arr
    },
    // 新增机构时父组件调用
    addNewOrg(data) {
      this.searchForm = {
        dscr: '',
        poolareaCodg: '',
        orgCodg: '',
        abbr: '',
        orgName: '',
        orgTypeCodg: '',
        prntOrgId: '', // 父节点id
        lv: ''
      }
      this.isEdit = false
      const pathArr = this.fnDeep(data)
      const pathStr = `/${pathArr.reverse().join('/')}/`
      this.searchForm.prntOrgId = data.data.id
      this.searchForm.lv = data.level + 1
      // this.$refs.searchForm.resetFields()
      this.searchForm.abbr = '新增机构'
      this.searchForm.orgName = '新增机构'
      this.searchForm.prntPath = pathStr
    },
    // 保存机构信息
    organizManageSave() {
      if (!this.searchForm.prntOrgId) {
        this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">请先在组织机构树中选择机构</div>`, {
          dangerouslyUseHTMLString: true, confirmButtonText: '确定',
          type: 'error'
        })
        return
      }
      if (this.isEdit) {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
            this.searchForm.poolareaCodg = this.searchForm.admdvs
            const params = this.searchForm
            orgMage(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  dangerouslyUseHTMLString: true,
                  message: `<strong>操作成功</strong><p>${res.message}</p>`,
                  duration: 1000
                })
                this.$refs.searchForm.resetFields()
                this.$emit('reloadNode')
              } else {
                this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">${res.message}</div>`, {
                  dangerouslyUseHTMLString: true, confirmButtonText: '确定',
                  type: 'error'
                })
              }
            })
          } else {
            return false
          }
        })
      } else {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
            this.searchForm.poolareaCodg = this.searchForm.admdvs
            const params = this.searchForm
            organizManageSave(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  dangerouslyUseHTMLString: true,
                  message: `<strong>操作成功</strong><p>${res.message}</p>`,
                  duration: 1000
                })
                this.$refs.searchForm.resetFields()
                this.$emit('reloadNode')
                this.$emit('clearAdding')
              } else {
                this.$alert(`<div class="myalert-header">操作失败</div>
                    <div class="myalert-content">${res.message}</div>`, {
                  dangerouslyUseHTMLString: true, confirmButtonText: '确定',
                  type: 'error'
                })
              }
            })
          } else {
            return false
          }
        })
      }
    },
    // 获取菜单详情
    getMenuInfo(id) {
      organizManage(id).then(res => {
        if (res.code === 0) {
          this.searchForm = res.data
          window.sessionStorage.setItem('org-user-info', JSON.stringify(res.data))
          this.isEdit = true
        }
      })
    },
    getAddingOrg(data) {
      this.$refs.searchForm.resetFields()
      this.searchForm.orgName = data.name
      window.sessionStorage.setItem('org-user-info', '')
    },
    changeIcon(icon) {
      this.searchForm.resuIcon = icon
    },
    // 查询
    search() {
      this.getTableData(this.kpiFcode)
    },
    // 重置
    restSearch() {
      this.$refs.searchForm.resetFields()
    }

  }
}
</script>

<style scoped lang="scss">
  .height100b{
    height: 100%;
  }
  .menu-maintenance{
    /deep/.el-icon-popper {
    max-height: 400px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    }
    /deep/.el-input-group__prepend{
      span{
        display: inline-block;
        width:40px;
        height: 100%;
        cursor: pointer;
        text-align: center;
        i{
          display: inline-block;
          width:100%;
          height: 100%;
        }
      }
    }
  }

</style>
