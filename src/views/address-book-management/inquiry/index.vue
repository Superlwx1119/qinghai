<template>
  <!--  通讯录查询 -->
  <div class="Inquiry">
    <normal-layer :search-number="4">
      <template slot="search-header">
        <FormItems :items-datas="itemsDatas" :form-datas="queryForm">
          <div>
            <el-button @click="reset('queryForm')">重置</el-button>
            <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header">
        <span class="box-title">通讯录列表</span>
      </div>
      <template>
        <my-table-view v-loading="loading" :border="true" :multiple-selection.sync="multipleSelection" :is-configheader="true" :max-cloumns="40" :columns="columns" :data="tableData">
          <template slot="operation" slot-scope="scope">
            <el-button type="text" @click="showDialog('edit',scope.row)">编辑</el-button>
            <el-button type="text" @click="showDialog('detail',scope.row)">查看</el-button>
            <el-button type="text" @click="showDialog('apply',scope.row)">申报</el-button>
            <el-button type="text" class="delete" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </my-table-view>
        <Pagination :data="paginationQuery" @refresh="pageChange" />
      </template>
    </normal-layer>
  </div>
</template>

<script>
import FormItems from '@/views/components/PageLayers/form-items'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import pageHandle from '@/mixins/pageHandle'
export default {
  name: 'Inquiry',
  components: { FormItems, NormalLayer },
  mixins: [pageHandle],
  data() {
    return {
      itemsDatas: [
        { label: '人员姓名', prop: '人员姓名', type: 'input', message: '请输入' },
        { label: '办公电话', prop: '办公电话', type: 'input', message: '请输入' },
        { label: '邮箱地址', prop: '邮箱地址', type: 'input', message: '请输入' },
        { label: '手机号码', prop: '手机号码', type: 'input', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '人员姓名', prop: '人员姓名' },
        { label: '办公电话', prop: '办公电话' },
        { label: '邮箱地址', prop: '邮箱地址' },
        { label: '手机号码', prop: '手机号码' },
        { label: '所属部门', prop: '所属部门' },
        { label: '备注信息', prop: '备注信息' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: [
        { 人员姓名: 'xxx', 办公电话: 'xxx', 邮箱地址: 'xxx', 手机号码: 'xxx', 所属部门: 'xxx', 备注信息: 'xxx' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang = "sass" scoped>

</style>
