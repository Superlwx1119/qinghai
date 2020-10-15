<template>
  <form-dialog title="基金状态信息" :is-show="visible" width="1000px" new-class="big" @update:isShow="updateIsShow" @resetForm="resetForm">
    <section>
      <Box>
        <FormItems ref="searchForm" :is-grid="false" :items-datas="itemsDatas" :form-datas="searchForm">
          <template slot="type">
            <el-select v-model="searchForm.type" placeholder="请选择">
              <el-option label="大病基金" value="1" />
              <el-option label="门诊统筹基金" value="2" />
              <el-option label="企业补充基金" value="3" />
              <el-option label="统筹基金" value="4" />
            </el-select>
          </template>
        </FormItems>
        <div style="margin-bottom: 10px;text-align: right">
          <my-button type="reset" title="重置" @click="reset" />
          <my-button type="search" title="查询" @click="iniSearch" />
        </div>

        <my-table-view v-loading="loading" :columns="tableColumns" :data="fundData" />
      </Box>
    </section>

    <span slot="footer" class="dialog-footer">
      <my-button type="close" titile="关闭" @click="close" />
    </span>
  </form-dialog>
</template>

<script>
export default {
  name: 'FundStatus',
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
        { label: '查询日期', prop: 'date', type: 'dateRange', span: 16 },
        { label: '基金类型', prop: 'type', type: 'custom' }
      ],
      searchForm: {
        date: null,
        type: null
      },
      tableColumns: [
        { label: '序号', type: 'index' },
        { label: '基金名称', prop: 'fundName' },
        { label: '期间', prop: 'date' },
        { label: '基金状态', prop: 'fundStatus' }
      ],
      fundData: [
        { fundName: '统筹基金', date: '2020-05-22', fundStatus: '已参保' },
        { fundName: '大病基金', date: '2020-05-23', fundStatus: '未参保' }
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
      this.$refs.searchForm.resetFields()
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
