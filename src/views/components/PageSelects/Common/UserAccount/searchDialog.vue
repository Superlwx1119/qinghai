<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="dialogTitle"
    :is-show="isDialogVisible"
    size="big"
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
      />
      <div style="margin-left: 10px">
        <my-button type="reset" title="重置" @click="reset" />
        <my-button type="search" title="查询" @click="search" />
      </div>
    </div>

    <Table
      ref="tableRef"
      :is-input-search="false"
      :fix-flag="fixFlag"
      :que-cont="queCont"
      :query-params="dataForm"
      @currentChange="tableSelChange"
    />

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" :disabled="!currentRow" @click="submit">确认</el-button>
    </span>
  </form-dialog>

</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import Table from './table'
// import { getCodeTableDetailConvergence } from '@/api/Common/CodeTableRequest'
import { MEDINSLV } from '@/utils/constant'
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
      default: '医疗机构选择'
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
      sureLoading: false,
      formItemsDatas: [
        { label: '医疗机构编码', prop: 'medinsCodg', type: 'input' },
        { label: '医疗机构名称', prop: 'medinsName', type: 'input' },
        { label: '医疗机构级别', prop: 'instisLv', type: 'component', componentName: 'SingleSelect', folder: 'Common', params: {
          options: []
        }}
      ],
      dataForm: {
        medinsCodg: '',
        medinsName: '',
        instisLv: ''
      },
      currentRow: null
    }
  },
  watch: {
    isDialogVisible(newVal) {
      if (newVal) {
        this.search()
      }
    }
  },
  created() {
    this.getInstisLvDatas()
  },
  methods: {
    getInstisLvDatas() {
      const params = {
        codeType: MEDINSLV
      }
      // getCodeTableDetailConvergence(params).then(res => {
      //   this.$set(this.formItemsDatas[2].params, 'options', res.data[MEDINSLV])
      // })
    },
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
    submit() {
      this.$emit('selFinish', this.currentRow)
    }
  }
}
</script>
<style lang="scss" scoped>
.header-box{
  width: 100%;
  display: flex;
  .ruleFrom{
    flex: 1
  }
}
</style>
