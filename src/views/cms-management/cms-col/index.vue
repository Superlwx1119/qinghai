<template>
  <div class="height-full">
    <el-row :gutter="12" style="height:100%;">
      <el-col :span="6" style="height:100%;">
        <section class="layer" style="height:100%;">
          <div class="tree-box box">
            <div class="box-header">
              <span class="box-title">栏目标题</span>
            </div>
            <select-tree :selectdata="selectdata" />
          </div>
        </section>
      </el-col>
      <el-col :span="18" style="height:100%;">
        <normal-layer
          :search-number="itemsDatas.length"
        >
          <template slot="search-header">
            <form-items ref="ruleFrom" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm">
              <my-button type="reset" title="重置" @click="reset" />
              <my-button type="search" title="查询" @click="search" />
            </form-items>
          </template>

          <div slot="table-title" class="box-header handle">
            <span class="box-title">申报基本信息</span>
            <div slot="title-btns" class="box-tools">
              <my-button type="other" title="新增父级标题" />
            </div>
          </div>
          <template>
            <MyTableView v-loading="loading" :border="true" :columns="columns" :data="tableData" :multiple-selection.sync="multipleSelection">
              <template slot="operation" slot-scope="scope">
                <!-- 编辑 -->
                <my-button icon="edit" @click="checkDetail('edit',scope.row)" />
                <!-- 详情 -->
                <my-button icon="detail" @click="checkDetail('details',scope.row)" />
                <!-- 审核 -->
                <my-button icon="audit" @click="checkDetail('audit',scope.row)" />
                <!-- 提交 -->
                <my-button icon="submit" @click="checkDetail('submit',scope.row)" />
                <!-- 发布 -->
                <my-button icon="finished" @click="checkDetail('finished',scope.row)" />
                <!-- 取消发布 -->
                <my-button icon="unfinished" @click="checkDetail('unfinished',scope.row)" />
                <!-- 删除 -->
                <my-button icon="delete" @click="checkDetail('delete',scope.row)" />
              </template>
            </MyTableView>
            <Pagination :data="paginationQuery" @refresh="pageChange" />
          </template>
        </normal-layer>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import { cmsPage, Alllin } from '@/api/CmsApi'
import selectTree from './selectTree'
export default {
  components: {
    selectTree
  },
  mixins: [pageHandle],
  data() {
    return {
      selectdata: [],
      multipleSelection: [],
      queryForm: {
        tmplTtl: ''
      },
      // 查询条件
      itemsDatas: [
        { label: '模板标题', prop: 'tmplTtl', type: 'input' },
        // { label: '模板标题', prop: 'tmplTtql', type: 'codeTable', codeKey: 'SBMT_STAS' },
        { label: '提交状态', prop: 'select1', type: 'select', options: [{ label: '1', value: '未提交' }, { label: '2', value: '已提交' }] },
        { label: '发布状态', prop: 'select1', type: 'select', options: [{ label: '1', value: '未发布' }, { label: '2', value: '已发布' }] }
      ],
      // 跨省赴外就医清算明细表
      columns: [
        // { type: 'selection' },
        { type: 'index', label: '序号' },
        { label: '模板标题', prop: 'confirmStas' },
        { label: '应用机构', prop: 'mdtrtareaProvName' },
        { label: '审批人', prop: 'mdtrtareaProvName' },
        { label: '审批意见', prop: 'mdtrtareaProvName' },
        { label: '审批时间', prop: 'mdtrtareaProvName' },
        { label: '审批结果', prop: 'mdtrtareaProvName' },
        { label: '提交状态', prop: 'mdtrtareaProvName' },
        { label: '操作', type: 'operation', fixed: 'right', minWidth: '200' }
      ],
      tableData: [
        { confirmStas: '123' }
      ],
      detailTitle: '',
      detailData: {},
      isDetailVisible: false,
      listArr: []
    }
  },
  watch: {},
  created() {
    Alllin().then(res => {
      this.selectdata = res.data
      console.log(this.selectdata)
      for (let i = 0; i < this.selectdata.length; i++) {
        if (this.selectdata[i].prntColNo === '0') {
          this.selectdata.splice(i, 1)
          this.selectdata[i].children = []
          this.listArr.push(this.selectdata[i])
        }
      }
      console.log(this.selectdata)
      for (let i = 0; i < this.listArr.length; i++) {
        for (let j = 0; j < this.selectdata.length; j++) {
          if (this.listArr[i].opter === this.selectdata[j].opter) {
            this.listArr[i].children.push(this.selectdata[j])
          }
        }
      }
      console.log(this.listArr)
    })
  },
  methods: {
    // pageSize: 10
    // pageNumber: 1
    // total: 18
    // rcdNo: 0
    // colTtl: 12
    // sbmtStas: 1
    // ralStas: 1
    search() {
      this.$refs.ruleFrom.elForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const params = {
            pageNum: this.paginationQuery.pageNum,
            pageSize: this.paginationQuery.pageSize,
            total: this.paginationQuery.total,
            ...this.queryForm
          }
          cmsPage(params).then(res => {
            // this.loading = true
            this.tableData = res.data.result
          }).catch(err => console.log(err))
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.servitemTypeName.indexOf(value) !== -1
    },
    getLeftTreeData() {},
    handleNodeClick(data) {
      this.pageChange()
    },
    checkDetail(type, val) {
      // switch (type) {
      //   case 'value':
      //     break
      //   default:
      //     break;
      // }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
