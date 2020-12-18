<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 个人信息修改 -->
  <div class="form-box">
    <section class="layer">
      <div class="box">
        <div class="box-header">
          <span class="box-title">个人信息修改</span>
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
import { updateUser } from '@/api/Admin/user-management'
import { current } from '@/api/Common/Request'
import validator from '@/utils/el-validator'
// import Crypto from '@/utils/mix-code'
// import {
//   mapGetters
// } from 'vuex'
export default {
  name: '',
  components: {
    FormItems
  },
  mixins: [],
  props: {},
  data() {
    return {
      queryForm: {
        uact: '',
        uactId: '',
        tel: '',
        mob: '',
        email: ''
      },
      currentUser: [],
      itemsDatas: [
        { label: '用户账号', prop: 'uact', type: 'input', disabled: true },
        { label: '联系电话', prop: 'tel', type: 'input' },
        { label: '手机号码', prop: 'mob', type: 'input' },
        { label: '电子邮箱', prop: 'email', type: 'input' }
      ],
      rules: {
        tel: [{ validator: validator, regexp: 'tel', trigger: 'blur' }],
        mob: [{ required: true, validator: validator, regexp: 'phone', trigger: 'blur' }],
        email: [{ validator: validator, regexp: 'email', trigger: 'blur' }]
      }
    }
  },
  computed: {
    // ...mapGetters([
    //   'token'
    // ])
  },
  watch: {},
  created() {
    this.getCurrentUser()
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
      const params = Object.assign({ ...this.currentUser }, { tel: this.queryForm.tel }, { mob: this.queryForm.mob }, { email: this.queryForm.email })
      updateUser(params).then(res => {
        if (res.code === 0) {
          this.$msgSuccess('操作成功！')
          this.resetForm()
        } else {
          this.$alert(`<div class="myalert-header">操作失败</div>
            <div class="myalert-content">${res.message}</div>`, {
            dangerouslyUseHTMLString: true, confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    // 获取当前账号角色信息
    getCurrentUser() {
      current().then(res => {
        this.currentUser = res.data
        this.roleId = this.currentUser[0].data.admrolId
        this.getTreeData(this.currentUser[0].data.admrolId)
      })
    },
    resetForm() {
      this.queryForm.tel = ''
      this.queryForm.mob = ''
      this.queryForm.email = ''
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
