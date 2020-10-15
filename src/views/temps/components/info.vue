<template>
  <div v-if="show" class="box people-info">
    <el-form ref="infoForm" :model="info" label-width="105px">
      <el-row :gutter="10">
        <el-col class="border-right" :span="21">
          <el-col :span="5">
            <el-form-item label="人员：">{{ info.name }} {{ info.sex }} {{ info.age }}</el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="身份证号码：">{{ info.IDCard }}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="人员身份：">{{ info.identity }}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="人员状态：">{{ info.status }}</el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="困难人员类别：">{{ info.level }}</el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="所属单位：">{{ info.unit }}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="住院次数：">{{ info.times }}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话：">{{ info.mobile }}</el-form-item>
          </el-col>
        </el-col>
        <el-col class="text-center" :span="3">
          <el-button type="info">基金状态</el-button>
          <el-button type="info">累计信息</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Info',
  components: {},
  mixins: [],
  props: {
    show: {
      type: Boolean,
      default: () => { return false }
    },
    info: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .people-info {
    .el-form-item {
      margin-bottom: 3px;
    }
    .border-right {
      border-right: 1px solid #aaaaaa;
    }
    .text-center {
      text-align: center;
    }
    .el-button + .el-button {
      margin: 0;
    }
  }
</style>
