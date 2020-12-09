<template>
  <div class="menu-maintenance">
    <!-- 资源管理 -->
    <section class="layer height100b">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">菜单维护</span>
          <div class="box-tools">
            <el-button @click="restSearch">重置</el-button>
            <el-button :disabled="!searchForm.resuId&&!searchForm.parent" type="success" @click="handleSave">保存</el-button>
          </div>
        </div>

        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="80px">
            <el-row>
              <el-col :md="12" :lg="8" :xl="8">
                <el-form-item label="菜单名称" prop="resuName">
                  <el-input v-model="searchForm.resuName" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="8">
                <el-form-item label="菜单编号" prop="resuCodg">
                  <el-input v-model="searchForm.resuCodg" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="8">
                <el-form-item label="子系统" prop="subsysId">
                  <el-select v-model="searchForm.subsysId" placeholder="请选择" style="width:100%" clearable>
                    <el-option
                      v-for="item in subsysList"
                      :key="item.subsysId"
                      :label="item.subsysName"
                      :value="item.subsysId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="父级菜单" prop="resuPath">
                  <SelectMenu v-model="searchForm.prntResuId" :props="defaultProps" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="24">
                <el-form-item label="菜单路径" prop="resuPath">
                  <el-input v-model="searchForm.resuPath" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="24">
                <el-form-item label="菜单图标" prop="resuIcon">
                  <el-input v-model="searchForm.resuIcon" clearable placeholder="请输入">
                    &nbsp;&nbsp;&nbsp;<template slot="prepend"><el-popover
                      placement="bottom-start"
                      width="1200"
                      trigger="click"
                    >
                      <el-scrollbar style="height:100%">
                        <div style="width:100%;height:200px;">
                          <ul class="fas-icon-list">
                            <li v-for="(item,index) in iconList" :key="index" @click="changeIcon(item)"><i :class="item" /></li>
                          </ul>
                        </div>
                      </el-scrollbar>
                      <i slot="reference" class="el-icon-edit" />
                    </el-popover></template>&nbsp;&nbsp;&nbsp;
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="24">
                <el-form-item label="说明" prop="dscr">
                  <el-input v-model="searchForm.dscr" :rows="5" resize="none" clearable placeholder="请输入" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SelectMenu from '@/components/SelectMenu'
import { sysAll, sysResuD, addSysResuD, updateResu } from '@/api/Admin/user-management'
import { mapGetters } from 'vuex'
export default {
  name: 'ResourceManagement',
  components: {
    SelectMenu
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      iconList: [
      ],
      defaultProps: {
        parent: 'parentId', // 父级唯一标识
        value: 'id', // 唯一标识
        label: 'name', // 标签显示
        children: 'children' // 子级
      },
      // 子系统列表
      subsysList: [],
      treeLoading: false,
      searchForm: {
        dscr: '',
        resuCodg: '',
        resuIcon: '',
        resuName: '',
        resuPath: '',
        subsysId: ''
      },
      rules: {
        resuName: [{ required: true, message: '请输入菜单名称', trgger: 'blur' }],
        resuCodg: [{ required: true, message: '请输入菜单编号', trgger: 'blur' }],
        subsysId: [{ required: true, message: '请选择子系统', trgger: 'change' }]
      },
      tableLoading: false,
      subSysIsDisabled: true
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
    this.iconList = this.publicCode.iconList
    this.sysAll()
  },
  mounted() {

  },
  methods: {
    // 获取所有子系统
    sysAll() {
      sysAll().then(res => {
        if (res.code === 0) {
          this.subsysList = res.data
        }
      })
    },
    // 父组件新增时调用
    addNewMenu(data) {
      this.subSysIsDisabled = false
      let prntResuId = '-1'
      let subsysId = ''
      if (data.level !== 1 && data.level) {
        prntResuId = data.data.data.resuId
        subsysId = data.data.data.subsysId
      }
      this.searchForm = {
        dscr: '',
        resuCodg: '',
        resuIcon: '',
        resuName: '新增菜单',
        resuPath: '',
        subsysId: subsysId,
        parent: data.data,
        prntResuId: prntResuId,
        resuId: null,
        resuType: '1'
      }
    },
    // 获取菜单详情
    getMenuInfo(id) {
      if (typeof id === 'string') {
        sysResuD(id).then(res => {
          if (res.code === 0) {
            this.searchForm = res.data
            this.$store.commit('CHANGE_RESOURCEINFO', res.data)
          }
        })
      } else {
        if (id.id === 'menu' || id.id === 'components') {
          return
        }
        this.$refs.searchForm.resetFields()
        this.subSysIsDisabled = false
        let prntResuId = '-1'
        if (id.level !== 1 && id.level) {
          prntResuId = id.data.data.resuId
        }
        this.searchForm = {
          dscr: '',
          resuCodg: '',
          resuIcon: '',
          resuName: '新增菜单',
          resuPath: '',
          subsysId: '',
          parent: id.data,
          prntResuId: prntResuId,
          resuId: null,
          resuType: '1'
        }
      }
    },
    // 编辑菜单
    modifyMenu() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          const params = this.searchForm
          updateResu(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                dangerouslyUseHTMLString: true,
                message: `<strong>操作成功</strong><p>${res.message}</p>`,
                duration: 1000
              })
              this.$emit('updateNode', this.searchForm)
            } else {
              this.$alert(`<div class="myalert-header">操作失败</div>
              <div class="myalert-content">${res.message}</div>`, {
                dangerouslyUseHTMLString: true, confirmButtonText: '确定',
                type: 'error'
              })
            }
          })
        }
      })
    },
    handleSave() {
      if (this.searchForm.resuId) {
        this.modifyMenu()
      } else {
        this.saveMenu()
      }
    },
    // 保存菜单
    saveMenu() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          const params = this.searchForm
          addSysResuD(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                dangerouslyUseHTMLString: true,
                message: `<strong>操作成功</strong><p>${res.message}</p>`,
                duration: 1000
              })
              this.$emit('updateNodeSave', res.data)
              this.$refs.searchForm.resetFields()
              this.subSysIsDisabled = true
            } else {
              this.$alert(`<div class="myalert-header">操作失败</div>
              <div class="myalert-content">${res.message}</div>`, {
                dangerouslyUseHTMLString: true, confirmButtonText: '确定',
                type: 'error'
              })
            }
          })
        }
      })
    },
    changeIcon(icon) {
      this.searchForm.resuIcon = icon
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
//     /deep/ .fas-icon-list {
//     list-style-type: none;
//     margin: 0;
//     padding: 0;
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     li {
//     width: 30px;
//     height: 30px;
//     margin: 5px;
//     // list-style: none;
//     // display: flex;
// }
// }
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
