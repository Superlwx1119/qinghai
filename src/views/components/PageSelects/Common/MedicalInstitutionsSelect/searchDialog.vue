<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="titleShow"
    :is-show="isDialogVisible"
    size="middle"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <div class="header-box">
      <form-items
        ref="ruleFrom"
        class="ruleFrom"
        :is-grid="false"
        :items-datas="formItemsDatas"
        :form-datas="dataForm"
      >
        <my-button type="reset" title="重置" @click="reset" />
        <my-button type="search" title="查询" @click="search" />
      </form-items>
    </div>

    <Table
      ref="tableRef"
      :is-input-search="false"
      :fix-flag="fixFlag"
      :que-cont="queCont"
      :query-params="dataForm"
      @currentChange="tableSelChange"
      @currentChangeSubmit="currentChangeSubmit"
    />

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" :disabled="!currentRow" @click="submit">确认</el-button>
    </span>
  </form-dialog>

</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import Table from './table'
// import { getCodeTableDetailConvergence } from '@/api/Common/CodeTableRequest'
export default {
  components: {
    FormItems,
    Table
  },
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    fixFlag: { // 定点标志（0：非定点，1：定点）
      type: String,
      default: ''
    },
    queCont: { // 查询内容（1：机构，2：药店）
      type: String,
      default: ''
    }
  },
  data() {
    return {
      titleShow: '选择资源',
      sureLoading: false,
      formItemsDatas: [
        { label: '机构编码', prop: 'medinsCodg', type: 'input' },
        { label: '机构名称', prop: 'medinsName', type: 'input' },
        { label: '机构级别', prop: 'instisLv', type: 'codeTable', codeKey: 'MEDINSLV', options: [], clearable: true, hidden: this.queCont === '2' },
        { label: '异地标志', prop: 'outFlag', type: 'codeTable', codeKey: 'OUT_TYPE', options: [], clearable: true
          // filterFn: (data) => {
          //   data.unshift({ dispVal: '本地', dataVal: '0' })
          //   return data
          // }
        }
      ],
      dataForm: {
        medinsCodg: '',
        medinsName: '',
        instisLv: '',
        outFlag: ''
      },
      currentRow: null
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible(newVal) {
      if (newVal) {
        this.search()
      }
    }
  },
  created() {
    // this.getInstisLvDatas()
  },
  methods: {
    // getInstisLvDatas() {
    //   const params = {
    //     codeType: 'MEDINSLV,OUT_TYPE'
    //   }
    //   getCodeTableDetailConvergence(params).then(res => {
    //     this.$set(this.formItemsDatas[2], 'options', res.data['MEDINSLV'])
    //     this.$set(this.formItemsDatas[3], 'options', res.data['OUT_TYPE'])
    //   })
    // },
    reset() {
      this.dataForm = {
        medinsCodg: '',
        medinsName: '',
        instisLv: ''
      }
    },
    search() {
      this.$nextTick(() => {
        this.$refs.tableRef.iniSearch()
      })
    },
    resetForm() {
      this.reset()
      this.$refs.tableRef.reset()
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    tableSelChange(val) {
      this.currentRow = val
    },
    currentChangeSubmit(val) {
      this.currentRow = val
      this.submit()
    },
    submit() {
      this.$emit('selFinish', this.currentRow)
    }
  }
}
</script>
<style lang="scss" scoped>
.header-box{
  width: 100%;
  margin-bottom: 10px;
  // display: flex;
  // .ruleFrom{
  //   flex: 1
  // }
}
</style>
