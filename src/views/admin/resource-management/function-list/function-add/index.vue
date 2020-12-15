<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:31:02
 * @LastEditTime: 2019-09-27 20:46:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="subsystem-add">
    <!--菜单新增功能 -->
    <el-dialog
      v-dialogDrag
      v-loading="loading"
      :close-on-click-modal="false"
      :visible.sync="dataObj.isShow"
      :title="`${dataObj.isModify ? '修改' : '新增'}功能`"
      width="800px"
      @close="cancelDialog"
    >
      <el-form
        ref="searchForm"
        :model="searchForm"
        :rules="rules"
        class="form-box"
        label-width="110px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="功能名称" prop="resuName">
              <el-input v-model="searchForm.resuName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="功能编号" prop="resuCodg">
              <el-input v-model="searchForm.resuCodg" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="菜单名称" prop="prntMenuName">
              <el-input v-model="searchForm.prntMenuName" placeholder="请输入" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明" prop="dscr">
              <el-input v-model="searchForm.dscr" :rows="5" style="width:100%" type="textarea" resize="none" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="" @click="cancelDialog(0)">关闭</el-button>
        <el-button v-if="!dataObj.modify" type="primary" @click="submitForm('searchForm')">确定</el-button>
        <el-button v-if="dataObj.modify" type="primary" @click="modifyForm('searchForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ApiObj from '@/api/Admin/user-management'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'SubsystemAdd',
  components: {
  },
  mixins: [],
  props: {
    dataObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      certTypeList: [{ label: '身份证', value: '99' }],
      userExtInfo: {},
      isPwdChanged: false, // 密码是否修改
      lginWayList: [{ value: '1', label: '密码' }, { value: '2', label: 'CA' }, { value: '3', label: '扫码' }], // 登录方式
      mnitId: '',
      searchForm: {
        prntMenuName: '',
        resuName: '',
        resuCodg: '',
        dscr: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      itemQueryList: {
        isShow: false
      },
      medinsQueryList: {
        isShow: false
      },
      departmentQueryList: {
        isShow: false
      },
      rules: {
        resuName: [{ required: true, message: '请输入功能名称', trigger: 'blur' }],
        resuCodg: [{ required: true, message: '请输入功能编码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'resourceInfo'
    ])
  },
  watch: {

  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      if (this.dataObj.modify) {
        this.searchForm = this.dataObj.row
      }
      this.searchForm.prntMenuName = this.resourceInfo.resuName
    })
  },
  methods: {
    //  新增保存
    submitForm(foconstame) {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          const menuInfo = {
            resuType: '4',
            prntResuId: this.resourceInfo.resuId,
            subsysId: this.resourceInfo.subsysId
          }
          const params = { ...this.searchForm, ...menuInfo }

          ApiObj.addSysResuD(params).then(res => {
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
        }
      })
    },
    // 修改保存
    modifyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const params = this.searchForm
          ApiObj.updateResu(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                dangerouslyUseHTMLString: true,
                message: `<strong>操作成功</strong><p>${res.message}</p>`,
                duration: 1000
              })
              this.loading = false
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
        } else {
          return false
        }
      })
    },
    //  重置
    restSearch() {
      this.$refs.searchForm.resetFields()
    },
    // 关闭
    cancelDialog(data) {
      this.$refs['searchForm'].resetFields()
      this.$emit('cancelDialog', data)
    }
  }
}
</script>

<style scoped lang="scss">
.subsystem-add {
  /deep/.el-checkbox-group {
    .el-checkbox+.el-checkbox{
      margin-left:0px;
    }
  }
}
</style>
