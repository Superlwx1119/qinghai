<template>
  <div>
    <el-row :gutter="12" style="height:100%;">
      <el-col :span="6" style="height:100%;">
        <section class="layer" style="height:100%;">
          <div class="tree-box box">
            <div class="box-header">
              <span class="box-title">栏目标题</span>
            </div>
            <select-tree :selectdata="selectdata" :pagination-query="paginationQuery" @leftselect="leftselect" />
          </div>
        </section>
      </el-col>
      <el-col :span="18" style="height:100%;">
        <normal-layer
          :search-number="itemsDatas.length"
        >
          <template slot="search-header">
            <form-items ref="ruleFrom" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm">
              <my-button type="reset" title="重置" @click="reset()" />
              <my-button type="search" title="查询" @click="search" />
            </form-items>
          </template>

          <div slot="table-title" class="box-header handle">
            <span class="box-title">申报基本信息</span>
            <div slot="title-btns" class="box-tools">
              <my-button type="success" title="新增父级标题" @click="addlan()" />
            </div>
          </div>
          <template>
            <MyTableView v-loading="loading" :border="true" :columns="columns" :data="tableData" :multiple-selection.sync="multipleSelection">
              <template slot="operation" slot-scope="scope">
                <!-- 编辑 -->
                <my-button v-show="scope.row.ralStas === '0'" icon="edit" @click="checkDetail('edit',scope.row)" />
                <!-- 详情 -->
                <!-- <my-button icon="detail" @click="checkDetail('details',scope.row)" /> -->
                <!-- 审核 -->
                <!-- <my-button icon="audit" @click="checkDetail('audit',scope.row)" /> -->
                <!-- 提交 -->
                <my-button v-show="scope.row.sbmtStas === '0'" icon="submit" @click="checkDetail('submit',scope.row)" />
                <!-- 发布 -->
                <my-button v-show="scope.row.ralStas=== '0'" icon="finished" @click="checkDetail('finished',scope.row)" />
                <!-- 取消发布 -->
                <my-button v-show="scope.row.ralStas=== '1'" icon="unfinished" @click="checkDetail('unfinished',scope.row)" />
                <!-- 删除 -->
                <my-button v-show="scope.row.ralStas=== '0'" icon="delete" @click="checkDetail('delete',scope.row)" />
              </template>
            </MyTableView>
            <Pagination :data="paginationQuery" @refresh="pageChange" />
          </template>
        </normal-layer>
        <Addlan v-model="addShow" :addlandata="Addlandata" @addsave="addsave" @editway="editway" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import { Alllin, allselect, cmsCol, colcont, edit } from '@/api/CmsApi'
import selectTree from './selectTree'
import Addlan from './compenet/addlan'
export default {
  components: {
    selectTree,
    Addlan
  },
  mixins: [pageHandle],
  data() {
    return {
      Addlandata: {},
      addShow: false,
      selectdata: [],
      multipleSelection: [],
      queryForm: {
        rcdNo: 0,
        colTtl: '',
        sbmtStas: '',
        ralStas: ''
      },
      // 查询条件
      itemsDatas: [
        { label: '模板标题', prop: 'colTtl', type: 'input' },
        { label: '提交状态', prop: 'sbmtStas', type: 'select', options: [{ label: '0', value: '未提交' }, { label: '1', value: '已提交' }] },
        { label: '发布状态', prop: 'ralStas', type: 'select', options: [{ label: '0', value: '未发布' }, { label: '1', value: '已发布' }] }
      ],
      // 跨省赴外就医清算明细表
      columns: [
        // { type: 'selection' },
        { type: 'index', label: '序号' },
        { label: '栏位标题', prop: 'colTtl' },
        { label: '审批人', prop: 'apprer' },
        { label: '审批意见', prop: 'apprRslt' },
        { label: '审批时间', prop: 'apprTime' },
        { label: '审批结果', prop: 'apprRslt' },
        { label: '发布状态', prop: 'ralStas' },
        { label: '可见范围', prop: 'visScp' },
        { label: '提交状态', prop: 'sbmtStas' },
        { label: '操作', type: 'operation', fixed: 'right', width: '150' }
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
      for (let i = 0; i < this.selectdata.length; i++) {
        if (this.selectdata[i].prntColNo === '0') {
          this.listArr.push(this.selectdata[i])
          this.selectdata[i].children = []
          this.selectdata.splice(i, 1)
        }
      }
      for (let i = 0; i < this.listArr.length; i++) {
        for (let j = 0; j < this.selectdata.length; j++) {
          if (this.listArr[i].opter === this.selectdata[j].opter) {
            this.listArr[i].children.push(this.selectdata[j])
            this.selectdata.splice(j, 1)
          }
        }
      }
      this.selectdata = this.listArr
    })
    this.leftselect(0)
  },
  methods: {
    leftselect(rcdNo, val) {
      const that = this
      let value = {}
      if (val && (val.sbmtStas !== '' || val.ralStas !== '')) {
        value = {
          sbmtStas: val.sbmtStas === '未提交' ? '0' : (val.sbmtStas === '已提交' ? '1' : ''),
          ralStas: val.ralStas === '未发布' ? '0' : (val.ralStas === '已发布' ? '1' : ''),
          colTtl: val.colTtl
        }
      }
      const params = {
        rcdNo: rcdNo,
        pageNumber: this.paginationQuery.pageNum,
        pageSize: this.paginationQuery.pageSize,
        total: this.paginationQuery.total,
        ...value
      }
      allselect(params).then(res => {
        that.tableData = res.data.result
        that.loading = false
      })
    },
    search() {
      this.$refs.ruleFrom.elForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.leftselect(this.queryForm.rcdNo, this.queryForm)
        }
      })
    },
    reset() {
      this.queryForm.rcdNo = 0
      this.queryForm.colTtl = ''
      this.queryForm.sbmtStas = ''
      this.queryForm.ralStas = ''
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
      switch (type) {
        case 'edit':
          this.editfunction(val)
          break
        case 'submit':
          this.submitfunction(val)
          break
        case 'finished':
          this.finishedfunction(val)
          break
        case 'unfinished':
          this.unfinishedfunction(val)
          break
        case 'delete':
          this.deletefunction(val)
          break
        default:
          this.editfunction(val)
          break
      }
      console.log(val)
    },
    submitfunction(val) {
      const that = this
      that.$confirm('提交后的申请将不可更改,是否确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        cmsCol(val).then(res => {
          that.search()
          that.$message({
            type: 'success',
            message: '提交成功!'
          })
        })
      })
    },
    finishedfunction(val) {},
    unfinishedfunction(val) {},
    deletefunction(val) {},
    // 新增方法
    addlan() {
      this.addShow = true
      this.Addlandata = ''
    },
    addsave(val) {
      colcont(val).then(res => {
        this.addShow = false
        this.search()
      })
    },
    // 编辑方法
    editfunction(val) {
      this.Addlandata = val
      this.addShow = true
    },
    editway(val) {
      edit(val)
      // eslint-disable-next-line no-lone-blocks
      {
        this.addShow = false
        this.search()
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
