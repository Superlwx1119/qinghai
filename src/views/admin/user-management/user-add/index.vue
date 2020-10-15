<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:31:02
 * @LastEditTime: 2019-09-27 20:46:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user-add">
    <!-- 用户新增弹窗 -->
    <el-dialog
      v-elDragDialog
      :close-on-click-modal="false"
      :visible.sync="dataObj.isShow"
      :title="`${dataObj.isModify ? '修改' : '新增'}账户信息`"
      width="70%"
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
            <el-form-item label="证件号码" prop="certNO">
              <el-input v-model="searchForm.certNO" :disabled="dataObj.isModify" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="certType">
              <el-select v-model="searchForm.certType" :disabled="dataObj.isModify" placeholder="请选择" style="width:100%" clearable>
                <el-option
                  v-for="item in certTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="searchForm.userName" :disabled="dataObj.isModify" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户账号" prop="uact">
              <el-input v-model="searchForm.uact" :disabled="dataObj.isModify" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="searchForm.pwd" type="password" disabled placeholder="密码由系统生成" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登录方式" prop="lginWay">
              <el-checkbox-group v-model="searchForm.lginWay">
                <el-checkbox v-for="(item, i) in lginWayList" :key="i" :label="item.value">{{ item.label }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="mob">
              <el-input v-model="searchForm.mob" style="width:100%" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办公电话" prop="tel">
              <el-input v-model="searchForm.tel" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="searchForm.email" style="width:100%" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="组织机构" prop="orguntId">
              <OrgaUnit v-if="casIsshow" ref="OrgaUnitRef" @getOrgaUnits="getOrgaUnits" />
              <el-input v-else v-model="searchForm.orgName" readonly style="width:100%" placeholder="请输入" @click.native="changeOrg" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始日期" prop="uactBegntime">
              <el-date-picker
                v-model="searchForm.uactBegntime"
                :picker-options="pickerOptionsStart"
                style="width:100%"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日期" prop="uactEndtime">
              <el-date-picker
                v-model="searchForm.uactEndtime"
                :picker-options="pickerOptionsEnd"
                style="width:100%"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
              />
              <!-- <el-input v-model="searchForm.uactEndtime" style="width:100%" readonly /> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述信息" prop="dscr">
              <el-input v-model="searchForm.dscr" style="width:100%" type="textarea" resize="none" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="" @click="cancelDialog(0)">关闭</el-button>
        <el-button v-if="!dataObj.isModify" type="primary" @click="submitForm('searchForm')">确定</el-button>
        <el-button v-if="dataObj.isModify" type="primary" @click="modifyForm('searchForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import {
  getSixRandom
} from '@/utils/index'
import { mapGetters } from 'vuex'
import ApiObj from '@/api/Admin/user-management'
import OrgaUnit from '@/components/OrgaUnit'
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  name: 'UserAdd',
  components: {
    OrgaUnit
  },
  directives: { elDragDialog },
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
      casIsshow: true,
      certTypeList: [
      ],
      userExtInfo: {},
      isPwdChanged: false, // 密码是否修改
      lginWayList: [{ value: '1', label: '密码' }, { value: '2', label: 'CA' }, { value: '3', label: '扫码' }], // 登录方式
      mnitId: '',
      searchForm: {
        lginWay: ['1', '2', '3'],
        uact: '',
        certNO: '',
        certType: '', // 99身份证
        userName: '',
        pwd: '', // 监测类别
        mob: '',
        tel: '',
        email: '',
        orguntId: '',
        uactBegntime: '',
        uactEndtime: '',
        dscr: ''
      },
      pickerOptionsStart: {
        disabledDate: time => {
          const endDateVal = this.searchForm.uactEndtime
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          const beginDateVal = this.searchForm.uactBegntime
          if (beginDateVal) {
            return (
              time.getTime() < new Date(beginDateVal).getTime()
            )
          }
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
        uact: [{ required: true, message: '请输入用户账号', trigger: 'change' }],
        certNO: [{ required: true, message: '请输入证件号码', trigger: 'change' }],
        certType: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'publicCode'
    ])
  },
  watch: {},
  created() {
    this.$nextTick(() => {
      this.certTypeList = this.publicCode.codes.CERT_TYPE
      // 如果是修改，先查询数据
      if (this.dataObj.isModify) {
        this.searchForm = this.dataObj.row
        this.$refs.OrgaUnitRef.assignmentTree(this.searchForm.orgName)
        this.casIsshow = false
      }
    })
  },
  mounted() {

  },
  methods: {
    changeOrg() {
      this.casIsshow = true
    },
    changeDate(value) {
    },
    // 获取组织机构
    getOrgaUnits(data) {
      this.searchForm.orguntId = data[data.length - 1]
    },
    //  新增保存
    submitForm(foconstame) {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          if (this.searchForm.pwd === '') {
            this.searchForm.pwd = getSixRandom() + '@abc'
          }
          const params = this.searchForm
          ApiObj.user(params).then(res => {
            if (res.code === 0) {
              this.$alert(`<div class="myalert-header">操作成功</div>
                    <div class="myalert-content">用户名${this.searchForm.uact}的密码是${this.searchForm.pwd}</div>`, {
                dangerouslyUseHTMLString: true, confirmButtonText: '确定',
                type: 'success'
              })
              this.cancelDialog(1)
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
    // 修改保存
    modifyForm(formName) {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          const params = this.searchForm
          ApiObj.updateUser(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                dangerouslyUseHTMLString: true,
                message: `<strong>操作成功</strong><p>${res.message}</p>`,
                duration: 1000
              })
              this.cancelDialog(1)
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
.user-add {
  /deep/.el-checkbox-group {
    .el-checkbox+.el-checkbox{
      margin-left:0px;
    }
  }
}
</style>
