<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:31:02
 * @LastEditTime: 2019-09-27 20:46:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="subsystem-add">
    <!--子系统新增 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dataObj.isShow"
      :title="`${dataObj.isModify ? '修改' : '新增'}子系统`"
      width="70%"
      @close="cancelDialog"
    >
      <FormItems ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm" :is-grid="false" :rules="rules" />
      <span slot="footer" class="dialog-footer">
        <el-button type="" @click="cancelDialog(0)">关闭</el-button>
        <el-button v-if="!dataObj.isModify" type="primary" @click="submitForm('queryForm')">确定</el-button>
        <el-button v-if="dataObj.isModify" type="primary" @click="modifyForm('queryForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import ApiObj from '@/api/Admin/user-management'
export default {
  name: 'SubsystemAdd',
  components: {
    FormItems
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
      queryForm: {
        sysPath: '',
        subsysCodg: '',
        subsysName: '',
        dscr: ''
      },
      itemsDatas: [
        { label: '子系统名称', prop: 'subsysName', type: 'input', span: 8 },
        { label: '子系统编码', prop: 'subsysCodg', type: 'input', span: 8 },
        { label: '系统路径', prop: 'sysPath', type: 'input', span: 8 },
        { label: '说明', prop: 'dscr', type: 'textarea', span: 24, rows: 5 }
      ],
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
        subsysName: [{ required: true, message: '请输入子系统名称', trigger: 'blur' }],
        subsysCodg: [{ required: true, message: '请输入子系统编码', trigger: 'blur' }],
        sysPath: [{ required: true, message: '请输入子系统路径', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$nextTick(() => {
      if (this.dataObj.isModify) {
        this.fillDetaisData()
      }
    })
  },
  mounted() {

  },
  methods: {
    fillDetaisData() {
      this.queryForm = this.dataObj.row
    },
    //  新增保存
    submitForm(foconstame) {
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          const params = this.queryForm
          ApiObj.addSysSubsysD(params).then(res => {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.queryForm
          ApiObj.updateSubsys(params).then(res => {
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
        } else {
          return false
        }
      })
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
.subsystem-add {
  /deep/.el-checkbox-group {
    .el-checkbox+.el-checkbox{
      margin-left:0px;
    }
  }
}
</style>
