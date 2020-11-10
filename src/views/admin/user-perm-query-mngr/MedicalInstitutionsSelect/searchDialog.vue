<!-- 搜索弹框 -->
<template>
  <form-dialog
    class="audit-dialog-wrapper"
    :title="titleShow"
    :is-show="isDialogVisible"
    size="big"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <div class="header-box">
      <form-items
        ref="dataForm"
        :is-grid="false"
        :items-datas="itemsDatas"
        :form-datas="dataForm"
      >
        <my-button type="reset" title="重置" @click="reset" />
        <my-button type="search" title="查询" @click="search" />
      </form-items>
    </div>

    <Table
      ref="tableRef"
      :is-input-search="false"
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
import PageHandle from '@/mixins/pageHandle'
import Table from './table'
import { mapGetters } from 'vuex'
// 获取列表
// eslint-disable-next-line no-unused-vars

export default {
  components: {
    FormItems,
    Table
  },
  mixins: [PageHandle],
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
    }
  },
  data() {
    return {
      titleShow: '选择用户',
      sureLoading: false,
      itemsDatas: [
        { label: '用户账户', prop: 'uact', type: 'input' },
        { label: '姓名', prop: 'userName', type: 'input' },
        { label: '证件号码', prop: 'certNO', type: 'input' },
        { label: '账号状态', prop: 'uactStas', type: 'select', options: [], clearable: false },
        { label: '组织机构', prop: 'orguntId', type: 'component', componentName: 'OrgaUnit', folder: 'Common' }
      ],
      dataForm: {
        uact: '',
        userName: '',
        certNO: '',
        uactStas: '',
        orguntId: ''
      },
      currentRow: null,
      pageInfo: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'publicCode'
    ])
  },
  watch: {
    isDialogVisible(newVal) {
      if (newVal) {
        // this.search()
      }
    }
  },
  created() {
    this.$set(this.itemsDatas[3], 'options', this.publicCode.codes.UACT_STAS)
  },
  methods: {
    search() {
      this.$nextTick(() => {
        this.$refs.tableRef.iniSearch()
      })
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        this.$refs.tableRef.reset()
      })
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
}
</style>
