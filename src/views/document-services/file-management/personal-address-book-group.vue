<!-- 搜索弹框 -->
<template>
  <form-dialog
    v-dialogDrag
    class="audit-dialog-wrapper"
    :title="isEditTitle"
    :is-show="isDialogVisible"
    size="big"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <FormItems ref="queryForm" v-model="queryForm" v-loading="loading" :items-datas="itemsDatas" :form-datas="queryForm" :is-grid="false" :item-span="24" />
    <p>组内成员：</p>
    <my-table-view v-loading="loading" :border="true" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData" />
    <Pagination :data="paginationQuery1" @refresh="pageChange1" />
    <span slot="footer" class="dialog-footer">
      <my-button type="close" @click="closeDialog">关闭</my-button>
    </span>
  </form-dialog>
</template>
<script>
import { getGrpMsgPage } from '@/api/DocumentServices/index'
export default {
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    isEditTitle: {
      type: String,
      default: ''
    },
    selectRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      columns: [
        { type: 'selection' },
        { label: '序号', type: 'index' },
        { label: '姓名', prop: 'uactName' },
        { label: '所属部门', prop: 'orgName' },
        { label: '邮箱', prop: 'email' }
      ],
      tableData: [],
      queryForm: { addrbookGrpName: '' },
      itemsDatas: [{ label: '个人通讯录组名称', prop: 'addrbookGrpName', type: 'input', disabled: true }],
      paginationQuery1: { pageSize: 10, pageNumber: 1, total: 0, startRow: 0, endRow: 0 }
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible: {
      handler(v) {
        if (v) {
          this.queryForm = JSON.parse(JSON.stringify(this.selectRow))
          this.getGrpMsgPage()
        }
      },
      deep: true
    }
  },
  created() {
  },

  methods: {
    getGrpMsgPage() {
      this.loading = true
      const params = {
        pageSize: this.paginationQuery1.pageSize,
        pageNumber: this.paginationQuery1.pageNumber,
        total: this.paginationQuery1.total,
        addrbookGrpNo: this.selectRow.addrbookGrpNo
      }
      getGrpMsgPage(params).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.tableData = res.data.result
        }
      }).catch(() => {
        this.loading = false
      })
    },
    pageChange1(v) {
      this.paginationQuery1.pageSize = v.pagination.pageSize
      this.paginationQuery1.pageNumber = v.pagination.pageNum
      this.getGrpMsgPage
    },
    reset() {
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        // this.$refs.tableRef.reset()
      })
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
