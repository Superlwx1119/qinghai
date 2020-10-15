<template>
  <!-- <el-dialog title="入院登记" :visible.sync="show" width="1200px" :before-close="close"> -->
  <form-dialog title="入院登记" :is-show="show" width="1000px" new-class="big" @update:isShow="updateIsShow" @resetForm="resetForm">
    <el-form ref="form" :model="form" :rules="rules" label-width="105px">
      <div class="box">
        <!-- <div class="box-header">
          <span class="box-title">住院信息</span>
        </div> -->
        <div class="box-body">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="住院号" prop="no">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医保就医号号" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="待遇类别" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转院申请" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="待遇类别" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转院申请" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="住院号" prop="no">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医保就医号号" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="待遇类别" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转院申请" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="待遇类别" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转院申请" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">登记</el-button>
    </span>
  </form-dialog>
</template>

<script>
// import Info from './info'
export default {
  name: 'Enter',
  // components: {
  //   'info': Info
  // },
  mixins: [],
  props: {
    show: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      form: {
        date: null,
        cardNo: null,
        type: null,
        code: null,
        resource: 0
      },
      rules: {
        type: { required: true }
      },
      select: '1',
      infoShow: false, // 人员信息收缩栏
      peopleInfo: {
        name: '张三',
        sex: '男',
        age: '58',
        IDCard: '4306242193208080432',
        identity: '城镇职工',
        status: '在职',
        level: '正常',
        times: '1',
        unit: '广东省加多宝集团',
        mobile: '17788996162'
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
    updateIsShow(v) {
      this.$emit('update:show', v)
    },
    resetForm() {
      this.$refs.addForm.resetFields()
    },
    //  读卡按下回车
    readCard() {
      this.infoShow = true
    },
    close() {
      this.$emit('update:show', false)
    },
    confirm() {}
  }
}
</script>

<style scoped lang="scss">
  /deep/.el-input-group__prepend .el-select .el-input {
    width: 130px;
  }
</style>
