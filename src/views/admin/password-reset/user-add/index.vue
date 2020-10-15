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
              <el-input v-model="searchForm.certNO" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="certType">
              <el-select v-model="searchForm.certType" placeholder="请选择" style="width:100%" clearable>
                <el-option
                  v-for="item in certTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="searchForm.userName" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户账号" prop="uact">
              <el-input v-model="searchForm.uact" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="searchForm.pwd" placeholder="请输入" />
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
              <el-input v-model="searchForm.orguntId" style="width:100%" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始日期" prop="uactBegntime">
              <el-input v-model="searchForm.uactBegntime" style="width:100%" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日期" prop="uactEndtime">
              <el-input v-model="searchForm.uactEndtime" style="width:100%" readonly />
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
// import commomApi from '@/api/commonApi/commonApi.js'

import ApiObj from '@/api/Admin/user-management'
// import ItemQuery from '../item-monitoring-add/item-query'
// import MedinsQuery from '../item-monitoring-add/medins-query'
// import DepartmentQuery from '../item-monitoring-add/department-query'
export default {
  name: 'UserAdd',
  components: {
    // 'item-query': ItemQuery,
    // 'medins-query': MedinsQuery,
    // 'department-query': DepartmentQuery
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
      certTypeList: [{ label: '身份证', value: '99' }],
      userExtInfo: {},
      isPwdChanged: false, // 密码是否修改
      lginWayList: [{ value: '1', label: '密码' }, { value: '2', label: 'CA' }, { value: '3', label: '扫码' }], // 登录方式
      mnitId: '',
      searchForm: {
        lginWay: ['1', '2', '3'],
        uact: '',
        certNO: '',
        certType: '99', // 99身份证
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
        uact: [{ required: true, message: '请输入用户账号', trigger: 'change' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$nextTick(() => {
      // this.getDropList()
      // 如果是修改，先查询数据
      if (this.dataObj.mnitId !== '') {
        this.fillDetaisData()
      }
    })
  },
  mounted() {

  },
  methods: {
    getDropLconst() {
      // let params = 'servitem_type,techcnt,rish_deg,mediType,medMcsType,psn_lv,psn_type,task_type,exeAlgolib,prov_code,aaa027'
      // commomApi.getCodeValueListMultiple(params).then(res => {
      //   // console.log(res)
      //   if (res.data.code === 0) {
      //     this.taskTypeList = res.data.data.task_type
      //     this.poolareaList = res.data.data.aaa027
      //     this.exeAlgolibList = res.data.data.exeAlgolib
      //     this.servitemTypeList = res.data.data.servitem_type
      //     this.provCodeList = res.data.data.prov_code
      //   }
      // })
    },
    fillDetaisData() {
      // let params = {
      //   mnitId: this.dataObj.mnitId// 监测ID
      //   // taskId: this.dataObj.taskId
      // }
      // ApiObj.getItemMonitoringAddDetail(params).then(res => {
      //   if (res.data.code === 0) {
      //     this.searchForm = res.data.data
      //   } else {
      //     this.$alert(`<div class="myalert-header">操作失败</div>
      //       <div class="myalert-content">${res.data.message}</div>`, {
      //       dangerouslyUseHTMLString: true, confirmButtonText: '确定',
      //       type: 'error'
      //     })
      //   }
      // })
    },
    //  新增保存
    submitForm(foconstame) {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          const params = this.searchForm
          ApiObj.user(params).then(res => {
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
    // 修改保存
    modifyForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     let params = {
      //       provCode: this.searchForm.provCode,
      //       poolarea: this.searchForm.poolarea,
      //       medinsId: this.searchForm.medinsId,
      //       medinsName: this.searchForm.medinsName,
      //       servitemId: this.searchForm.servitemId,
      //       stdCode: this.searchForm.stdCode,
      //       stdName: this.searchForm.stdName,
      //       polDocno: this.searchForm.polDocno,
      //       croDept: this.searchForm.croDept,
      //       croDeptName: this.searchForm.croDeptName,
      //       itemPric: this.searchForm.itemPric,
      //       prcunt: this.searchForm.prcunt,
      //       monWkld: this.searchForm.monWkld,
      //       trtPsntime: this.searchForm.trtPsntime,
      //       loclPsntime: this.searchForm.loclPsntime,
      //       outPsntime: this.searchForm.outPsntime,
      //       medInc: this.searchForm.medInc,
      //       fillMon: this.searchForm.fillMon,
      //       inhospDept: this.searchForm.inhospDept,
      //       memo: this.searchForm.memo,
      //       mnitType: this.searchForm.mnitType,
      //       mnitId: this.searchForm.mnitId
      //     }
      //     ApiObj.updateItemMonitoringAdd(params).then(res => {
      //       if (res.data.code === 0) {
      //         this.$message({
      //           type: 'success',
      //           dangerouslyUseHTMLString: true,
      //           message: `<strong>操作成功</strong><p>${res.data.message}</p>`,
      //           duration: 1000
      //         })
      //         this.cancelDialog()
      //       } else {
      //         this.$alert(`<div class="myalert-header">操作失败</div>
      //           <div class="myalert-content">${res.data.message}</div>`, {
      //           dangerouslyUseHTMLString: true, confirmButtonText: '确定',
      //           type: 'error'
      //         })
      //       }
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
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
