<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:31:02
 * @LastEditTime: 2019-09-27 20:46:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="busirole-add">
    <!-- 新增业务角色 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dataObj.isShow"
      title="新增业务角色"
      width="50%"
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
          <el-col :span="24">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="searchForm.roleName" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色编码" prop="roleCodg">
              <el-input v-model="searchForm.roleCodg" placeholder="请输入" />
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
        <el-button type="primary" @click="submitForm('searchForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ApiObj from '@/api/Admin/user-management'
// import OrgaUnit from '@/components/OrgaUnit'
export default {
  name: 'UserAdd',
  components: {
    // OrgaUnit
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
      casIsshow: true,
      userExtInfo: {},
      mnitId: '',
      searchForm: {
        dscr: '',
        roleCodg: '',
        roleName: ''
      },

      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
        roleCodg: [{ required: true, message: '请输入角色编码', trigger: 'change' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {

  },
  methods: {
    //  新增保存
    submitForm(foconstame) {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          const params = this.searchForm
          ApiObj.busiRoleAdd(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                dangerouslyUseHTMLString: true,
                message: `<strong>操作成功</strong><p>${res.message}</p>`,
                duration: 1000
              })
              this.cancelDialog(this.searchForm)
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
      this.$emit('cancelDialog', data)
      this.$refs['searchForm'].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.busirole-add {
  /deep/.el-checkbox-group {
    .el-checkbox+.el-checkbox{
      margin-left:0px;
    }
  }
}
</style>
