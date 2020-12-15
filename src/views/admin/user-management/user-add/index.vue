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
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dataObj.isShow"
      :title="`${dataObj.isModify ? '修改' : '新增'}账户信息`"
      width="70%"
      @close="cancelDialog"
    >
      <form-items ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm" :rules="rules" :is-grid="false">
        <template slot="certType">
          <el-select v-model="queryForm.certType" :disabled="dataObj.isModify" placeholder="请选择" style="width:100%" clearable>
            <el-option
              v-for="item in certTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </template>
        <template slot="certNO">
          <el-input v-model="queryForm.certNO" :disabled="dataObj.isModify" placeholder="请输入" style="width:100%" clearable />
        </template>
        <template slot="uact">
          <el-input v-model="queryForm.uact" :disabled="dataObj.isModify" placeholder="请输入" style="width:100%" clearable />
        </template>
        <template slot="pwd">
          <el-input v-model="queryForm.pwd" :disabled="dataObj.isModify" placeholder="请输入" style="width:100%" clearable />
        </template>
        <template slot="lginWay">
          <el-checkbox-group v-model="queryForm.lginWay">
            <el-checkbox v-for="(item, i) in lginWayList" :key="i" :label="item.value">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </template>
        <template slot="orguntId">
          <OrgaUnit v-if="casIsshow" ref="OrgaUnitRef" @getOrgaUnits="getOrgaUnits" />
          <el-input v-else v-model="queryForm.orgName" readonly style="width:100%" placeholder="请输入" @click.native="changeOrg" />
        </template>
        <template slot="uactBegntime">
          <el-date-picker
            v-model="queryForm.uactBegntime"
            :picker-options="pickerOptionsStart"
            style="width:100%"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
          />
        </template>
        <template slot="uactEndtime">
          <el-date-picker
            v-model="queryForm.uactEndtime"
            :picker-options="pickerOptionsEnd"
            style="width:100%"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
          />
        </template>
      </form-items>
      <span slot="footer" class="dialog-footer">
        <el-button type="" @click="cancelDialog(0)">关闭</el-button>
        <el-button v-if="!dataObj.isModify" type="primary" @click="submitForm('queryForm')">确定</el-button>
        <el-button v-if="dataObj.isModify" type="primary" @click="modifyForm('queryForm')">确定</el-button>
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
import validator from '@/utils/el-validator'
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
      queryForm: {
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
      itemsDatas: [
        { label: '证件号码', prop: 'certNO', type: 'custom' },
        { label: '证件类型', prop: 'certType', type: 'custom' },
        { label: '姓名', prop: 'userName', type: 'input' },
        { label: '手机号码', prop: 'mob', type: 'input' },
        { label: '办公电话', prop: 'tel', type: 'input' },
        { label: '邮箱', prop: 'email', type: 'input' },
        { label: '用户账号', prop: 'uact', type: 'custom' },
        { label: '密码', prop: 'pwd', type: 'custom' },
        { label: '组织机构', prop: 'orguntId', type: 'custom' },
        { label: '登录方式', prop: 'lginWay', type: 'custom' },
        { label: '开始日期', prop: 'uactBegntime', type: 'custom' },
        { label: '结束日期', prop: 'uactEndtime', type: 'custom' },
        { label: '描述信息', prop: 'dscr', type: 'textarea', rows: 5, span: 24 }
      ],
      pickerOptionsStart: {
        disabledDate: time => {
          const endDateVal = this.queryForm.uactEndtime
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          const beginDateVal = this.queryForm.uactBegntime
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
        certNO: [{ validator: validator, regexp: 'identityCard', required: true, trigger: 'change' }],
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
        this.queryForm = this.dataObj.row
        this.$refs.OrgaUnitRef.assignmentTree(this.queryForm.orgName)
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
      this.queryForm.orguntId = data[data.length - 1]
    },
    //  新增保存
    submitForm() {
      this.$refs.queryForm.elForm.validate((valid) => {
        if (valid) {
          if (this.queryForm.pwd === '') {
            this.queryForm.pwd = getSixRandom() + '@abc'
          }
          const params = this.queryForm
          ApiObj.user(params).then(res => {
            if (res.code === 0) {
              this.$alert(`<div class="myalert-header">操作成功</div>
                    <div class="myalert-content">用户名${this.queryForm.uact}的密码是${this.queryForm.pwd}</div>`, {
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
        } else {
          console.log(111)
        }
      })
    },
    // 修改保存
    modifyForm() {
      this.$refs.queryForm.elForm.validate((valid) => {
        if (valid) {
          const params = this.queryForm
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
      this.$refs.queryForm.resetFields()
    },
    // 关闭
    cancelDialog(data) {
      this.$refs.queryForm.elForm.resetFields()
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
