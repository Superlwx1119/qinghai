<template>
  <!--  通讯录组维护 -->
  <div class="Inquiry">
    <normal-layer :search-number="1">
      <template slot="search-header">
        <FormItems :items-datas="itemsDatas" :form-datas="queryForm">
          <div>
            <el-button @click="reset('queryForm')">重置</el-button>
            <el-button type="primary" @click="iniSearch('queryForm')">查询</el-button>
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header handle">
        <span class="box-title">通讯录组列表</span>
        <div slot="title-btns" class="box-tools">
          <el-button type="success">新增</el-button>
        </div>
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
        { label: '个人通讯录组名称', prop: '个人通讯录组名称', type: 'input', message: '请输入' }
      ],
      columns: [
        { type: 'index', label: '序号' },
        { label: '个人通讯录组名称', prop: '个人通讯录组名称' },
        { label: '组内成员', prop: '组内成员' },
        { label: '创建时间', prop: '创建时间' },
        { label: '操作', type: 'operation', fixed: 'right' }
      ],
      tableData: [
        { 个人通讯录组名称: 'xxx', 组内成员: 'xxx', 创建时间: 'xxx' }
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
