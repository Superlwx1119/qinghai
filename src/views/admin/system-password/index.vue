<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 密码修改 -->
  <div class="form-box">
    <section class="layer">
      <div class="box">
        <div class="box-header">
          <span class="box-title">密码修改</span>
        </div>
        <div class="box-body passwor-box">
          <el-form ref="ruleForm" :model="searchForm" :rules="rules" status-icon label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户账号" prop="uact">
              <el-input v-model="searchForm.uact" autocomplete="off" readonly="" />
            </el-form-item>
            <el-form-item label="输入旧密码" prop="oldPwd">
              <el-input v-model="searchForm.oldPwd" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="输入新密码" prop="newPwd">
              <el-input v-model="searchForm.newPwd" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="newPwdAgain">
              <el-input v-model="searchForm.newPwdAgain" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
import { password } from '@/api/Admin/user-management'
// import Crypto from '@/utils/mix-code'
import {
  mapGetters
} from 'vuex'
export default {
  name: '',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    var validatePwd = (rule, value, callback) => {
      console.log(value, 'value')
      if (value !== this.searchForm.newPwd) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      searchForm: {
        uact: '',
        newPwd: '',
        newPwdAgain: '',
        uactId: '',
        oldPwd: ''
      },
      rules: {
        newPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        newPwdAgain: [{ required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  watch: {},
  created() {
    const user = JSON.parse(window.sessionStorage.getItem('hsa-portal-user'))
    this.searchForm.uact = user.userAcct
    this.searchForm.uactId = user.userAcctId
  },
  mounted() {
    // this.getConditionList()
  },
  methods: {
    async logout() {
      this.isOut = true
      setTimeout(() => {
        this.isOut = false
      }, 5000)
      await this.$store.dispatch('user/logout')
      this.$store.commit('app/CLEAR_TAB_ACTIVE')
      this.$router.push(`/login`)
    },
    submitForm() {
      // let params = this.searchForm
      this.$store.dispatch('user/GET_TOKEN').then(res => {
        const params = Crypto.encrypt(JSON.stringify(this.searchForm), this.token)
        password(params).then(res => {
          if (res.code === 0) {
            this.$confirm('密码修改成功，请重新登录', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
            // this.logout()
            }).catch(() => {

            })
          } else {
            this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">${res.message}</div>`, {
              dangerouslyUseHTMLString: true, confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      })
    },
    resetForm() {
      this.searchForm.newPwd = ''
      this.searchForm.newPwdAgain = ''
    }
  }
}
</script>

<style lang="scss">
  .form-box{
    // width: 700px;
    height:100%;
    margin: 0 auto;
    .layer{
      height: 100%;
    }
    .passwor-box{
      width: 700px;
      margin: 0 auto;
    }
  }
</style>
