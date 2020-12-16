<!-- 搜索弹框 -->
<template>
  <form-dialog
    v-dialogDrag
    class="audit-dialog-wrapper"
    :title="isEditTitle"
    :is-show="isDialogVisible"
    size="middle"
    @update:isShow="isShow"
    @resetForm="resetForm"
  >
    <FormItems ref="queryForm" v-model="queryForm" v-loading="loading" :items-datas="itemsDatas" :form-datas="queryForm" :is-grid="false" :item-span="24" />
    <span slot="footer" class="dialog-footer">
      <my-button type="close" @click="closeDialog">关闭</my-button>
      <my-button type="save" @click="saveEdit">保存</my-button>
    </span>
  </form-dialog>
</template>
<script>
import { offFileD } from '@/api/DocumentServices/index'
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
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      queryForm: { dscr: '' },
      itemsDatas: [{ label: '文件说明', prop: 'dscr', type: 'textarea', rows: '5' }]
    }
  },
  computed: {
  },
  watch: {
    isDialogVisible: {
      handler(v) {
        if (v) {
          this.queryForm = JSON.parse(JSON.stringify(this.rowData))
          console.log(this.queryForm)
        }
      },
      deep: true
    }
  },
  created() {
  },

  methods: {
    reset() {
    },
    closeDialog() {
      this.$emit('closeAll', false)
    },
    isShow(v) {
      this.$emit('closeAll', false)
    },
    // 保存修改
    saveEdit() {
      this.loading = true

      const params = Object.assign({}, { preset: { hidden: { shrEdit: true, onlineEdit: true }}}, this.queryForm)
      offFileD(params).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.$msgSuccess('修改成功！')
          this.closeDialog()
          this.$emit('search')
        }
      }).catch(() => {
        this.loading = false
      })
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
