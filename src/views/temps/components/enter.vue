<template>
  <!-- <el-dialog title="入院登记" :visible.sync="show" width="1200px" :before-close="close"> -->
  <form-dialog title="入院登记" :is-show="show" @update:isShow="updateIsShow" @resetForm="resetForm">
    <el-form ref="form" :model="form" label-width="105px">
      <div class="box">
        <!-- <div class="box-header">
          <span class="box-title">入院登记</span>
        </div> -->
        <div class="box-body query">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="证件类型" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码" prop="code">
                <el-input v-model="form.code" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button>重置</el-button>
              <el-button type="primary">查询</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="box">
        <div class="box-header">
          <span class="box-title">基本信息</span>
        </div>
        <div class="box-body result">
          <el-row :gutter="10" type="flex">
            <el-col :span="6">
              <label>姓名:</label>
              <span>某某</span>
            </el-col>
            <el-col :span="4">
              <label>性别:</label>
              <span>男</span>
            </el-col>
            <el-col :span="4">
              <label>年龄:</label>
              <span>30</span>
            </el-col>
            <el-col :span="4">
              <label>联系电话:</label>
              <span>30</span>
            </el-col>
            <el-col :span="6">
              <label>人员状态:</label>
              <span>30</span>
            </el-col>
          </el-row>
          <el-row :gutter="10" type="flex">
            <el-col :span="6">
              <label>身份证号码:</label>
              <span> 298239238293 </span>
            </el-col>
            <el-col :span="6">
              <label>困难人员类别:</label>
              <span>一般</span>
            </el-col>
            <el-col :span="12">
              <label>所属单位:</label>
              <span>一般</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="box" style="margin-top:16px;">
        <div class="box-header">
          <span class="box-title">住院信息</span>
        </div>
        <div class="box-body">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="住院号" prop="no">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医保就医号" prop="type">
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
              <el-form-item label="入院诊断" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入院科室" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入院病区" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="床位号" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手术名称" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系地址" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代办人" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="代办人证件类型" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代办人证件号码" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代办人联系电话" prop="type">
                <el-input v-model="form.no" placeholder="placeholder" />
              </el-form-item>
            </el-col> -->
            <el-col :span="24">
              <el-form-item label="临床试验" prop="resource">
                <el-radio-group v-model="form.resource">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="病情备注" prop="no">
                <el-input v-model="form.no" type="textarea" :rows="2" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="其它诊断" prop="type">
                <el-select v-model="form.type" style="width: 100%" placeholder="请选择">
                  <el-option label="aa" value="bb" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <slot />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">登记</el-button>
      <el-button @click="close">取消</el-button>
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
      select: '1',
      infoShow: false, // 人员信息收缩栏
      peopleInfo: {
        name: '张三',
        sex: '男',
        age: '58',
        IDCard: '430682193208080432',
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
