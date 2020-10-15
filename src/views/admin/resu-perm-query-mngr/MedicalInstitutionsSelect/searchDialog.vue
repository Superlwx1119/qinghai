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
    <div class="demo-input-size">
      <el-input
        v-model="input1"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
      />
    </div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="1-1-1"
          class="el-menu-vertical-demo"
          background-color="#fff"
          active-text-color="red"
          text-color="#000"

          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <span
                class="el-tree-node__expand-icon
                  el-icon-caret-bottom"
              />
              <i
                class="el-icon-folder-opened"
              />
              <span>菜单列表</span>
            </template>
            <el-submenu index="1-1">
              <template slot="title">
                <span
                  class="el-tree-node__expand-icon
                  el-icon-caret-right"
                />
                <i
                  class="el-icon-folder-opened"
                />
                统一门户内部系统</template>
              <el-menu-item index="1-1-1">
                <i
                  class="el-icon-folder"
                />
                系统管理</el-menu-item>
              <el-menu-item index="1-1-2">
                <i
                  class="el-icon-folder"
                />
                系统管理</el-menu-item>
              <el-menu-item index="1-1-3">
                <i
                  class="el-icon-folder"
                />
                系统管理</el-menu-item>
              <el-menu-item index="1-1-4">
                <i
                  class="el-icon-folder"
                />
                系统管理</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
    </span>
  </form-dialog>
</template>
<script>
import FormItems from '@/views/components/PageLayers/form-items'
import Table from './table'
// import { getCodeTableDetailConvergence } from '@/api/Common/CodeTableRequest'
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
    isDialogVisible(newVal) {
      if (newVal) {
        this.search()
      }
    }
  },
  created() {},
  methods: {
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
}
i{
  color: rgba(27, 109, 209,1);
}
</style>
