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
          <FormItems ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :is-grid="false" :form-datas="queryForm" :rules="rules" :item-span="24">
            <div>
              <MyButton type="reset" @click="resetForm('queryForm')" />
              <MyButton type="submit" @click="submitForm('queryForm')" />
            </div>
          </FormItems>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import { password } from '@/api/Admin/user-management'
// import Crypto from '@/utils/mix-code'
import {
  mapGetters
} from 'vuex'
export default {
  name: '',
  components: {
    FormItems
  },
  mixins: [],
  props: {},
  data() {
    var validatePwd = (rule, value, callback) => {
      console.log(value, 'value')
      if (value !== this.queryForm.newPwd) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      queryForm: {
        uact: '',
        newPwd: '',
        newPwdAgain: '',
        uactId: '',
        oldPwd: ''
      },
      itemsDatas: [
        { label: '用户账号', prop: 'uact', type: 'input' },
        { label: '输入旧密码', prop: 'oldPwd', type: 'input' },
        { label: '输入新密码', prop: 'newPwd', type: 'input' },
        { label: '确认密码', prop: 'newPwdAgain', type: 'input' }
      ],
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
    this.queryForm.uact = user.userAcct
    this.queryForm.uactId = user.userAcctId
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
      // let params = this.queryForm
      this.$store.dispatch('user/GET_TOKEN').then(res => {
        const params = Crypto.encrypt(JSON.stringify(this.queryForm), this.token)
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
      this.queryForm.oldPwd = ''
      this.queryForm.newPwd = ''
      this.queryForm.newPwdAgain = ''
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
