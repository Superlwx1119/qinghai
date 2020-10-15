<template>
  <form-dialog title="就诊信息及不受理回执信息" :is-show="visible" width="1000px" new-class="big" @update:isShow="updateIsShow" @resetForm="resetForm">
    <Box>
      <FormItems ref="searchForm" :is-grid="false" :items-datas="itemsDatas" :form-datas="searchForm">
        <my-button type="reset" title="重置" @click="reset" />
        <my-button type="search" title="查询" @click="iniSearch" />
      </FormItems>

      <my-table-view v-loading="loading" :columns="tableColumns" :data="fundData" />
    </Box>
    <span slot="footer" class="dialog-footer">
      <my-button type="close" title="关闭" @click="close" />
    </span>
  </form-dialog>
</template>

<script>
export default {
  name: 'DetailInfo',
  components: {},
  mixins: [],
  props: {
    show: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      visible: this.show,
      loading: false,
      itemsDatas: [
        { label: '查询日期', prop: 'date', type: 'dateRange', span: 12 }
      ],
      searchForm: {
        date: null
      },
      tableColumns: [
        { label: '序号', type: 'index' },
        { label: '医院名称', prop: 'fundName', sortable: false, align: 'center', overflow: true, width: '120px' },
        { label: '疾病名称', prop: 'fundName', sortable: false, align: 'center', overflow: true, width: '120px' },
        { label: '就诊日期', prop: 'date', sortable: false, align: 'center' },
        { label: '结算日期', prop: 'date', sortable: false, align: 'center' },
        { label: '业务类型', prop: 'fundStatus', sortable: false, align: 'center' },
        { label: '待遇类型', prop: 'fundStatus', sortable: false, align: 'center' },
        { label: '经办人', prop: 'fundStatus', sortable: false, align: 'center' },
        { label: '经办日期', prop: 'date', sortable: false, align: 'center' },
        { label: '回执类型', prop: 'fundStatus', sortable: false, align: 'center' }
      ],
      fundData: [
        { fundName: '统筹基金', date: '2020-05-22', fundStatus: '已参保' }
      ]
    }
  },
  computed: {},
  watch: {
    show() {
      this.visible = this.show
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    reset() {},
    search() {},
    updateIsShow(v) {
      this.$emit('update:show', v)
    },
    resetForm() {
      this.$refs['searchForm']['elForm'].resetFields()
    },
    close() {
      this.visible = false
      this.resetForm()
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped lang="scss"></style>
