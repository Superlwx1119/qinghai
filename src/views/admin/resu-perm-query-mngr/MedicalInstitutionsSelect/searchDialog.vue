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
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      accordion
      class="filter-tree"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    >
      <template>
        <span>{{ data.name }}</span>
      </template>
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
    </span>
  </form-dialog>
</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import Table from './table'
// eslint-disable-next-line no-unused-vars
import { resource } from '@/api/Admin/user-management'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FormItems,
    // eslint-disable-next-line vue/no-unused-components
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
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      input1: '',
      titleShow: '选择资源',
      sureLoading: false,
      formItemsDatas: [
        { label: '机构编码', prop: 'medinsCodg', type: 'input' },
        { label: '机构名称', prop: 'medinsName', type: 'input' },
        { label: '机构级别', prop: 'instisLv', type: 'codeTable', codeKey: 'MEDINSLV', options: [], clearable: true, hidden: this.queCont === '2' },
        { label: '异地标志', prop: 'outFlag', type: 'codeTable', codeKey: 'OUT_TYPE', options: [], clearable: true }
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
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    isDialogVisible(newVal) {
      if (newVal) {
        this.search()
      }
    }
  },
  created() {
    this.resourcebtn()
  },
  methods: {
    resourcebtn() {
      // eslint-disable-next-line no-unused-vars
      const param = {
        roleId: 'adminRoleId',
        authType: 1,
        resuType: 1
      }
      resource(param).then(res => {
        console.log(res)
        this.data = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data)
      this.$emit('selFinish', { medinsName: data.name, resuCodg: data.data.resuCodg, resuId: data.data.resuId })
      // this.closeDialog()
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
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
        // this.$refs.tableRef.iniSearch()
      })
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        // this.$refs.tableRef.reset()
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
i{
  color: rgba(27, 109, 209,1);
}
</style>
