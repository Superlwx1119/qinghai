<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:27:20
 * @LastEditTime: 2019-09-27 11:49:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 资源变更 -->
  <div class="item4 item-role-per">
    <normal-layer :search-number="itemsDatas.length">
      <template slot="search-header">
        <FormItems ref="queryForm" :model="queryForm" :items-datas="itemsDatas" :form-datas="queryForm" :rules="rules">
          <template slot="chgType">
            <el-select v-model="queryForm.chgType" placeholder="请选择" style="width:100%" clearable>
              <el-option
                v-for="item in chgTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </template>
          <template slot="daterange">
            <el-date-picker
              v-model="queryForm.daterange"
              :unlink-panels="true"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%"
              value-format="yyyy/MM/dd"
            />
          </template>
          <div>
            <MyButton type="reset" @click="reset" />
            <MyButton type="search" @click="iniSearch" />
          </div>
        </FormItems>
      </template>
      <div slot="table-title" class="box-header">
        <span class="box-title">子系统列表</span>
      </div>
      <template>
        <my-table-view v-loading="loading" :columns="columns" :data="tableData" :have-expand="false" :max-cloumns="100" :is-configheader="false" :multiple-selection.sync="multipleSelection">
          <template slot="qqqq" slot-scope="scope">
            {{ scope.row.chgType|fliterchgType }}
          </template>
        </my-table-view>
        <Pagination :data="pageInfo" @refresh="pageChange" />
      </template>
    </normal-layer>
  </div>
</template>
<script>
import pageHandle from '@/mixins/pageHandle'
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import { tableColumns } from './tableConfig'
import ApiObj from '@/api/Admin/user-management'
import moment from 'moment'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'UserManagement',
  components: {
    NormalLayer,
    FormItems
  },
  mixins: [pageHandle],
  props: {},
  data() {
    var validDate = (rule, value, callback) => {
      if (!value[0] || !value[1]) {
        callback(new Error('请选择起止日期'))
      } else {
        callback()
      }
    }
    return {
      disabledAll: true,
      dataObj: {
        isShow: false,
        isQuery: false,
        isModify: false,
        rows: {}
      },
      pageInfo: {
        pageNumber: 1,
        pageSize: 100,
        startRow: 0,
        endRow: 0,
        total: 0
      },
      queryForm: {
        resuType: '',
        resuName: '',
        chgType: '',
        optEndTime: '',
        optBeginTime: '',
        daterange: [moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format('YYYY/MM/DD hh:mm:ss'), moment(new Date()).format('YYYY/MM/DD hh:mm:ss')]
      },
      itemsDatas: [
        { label: '资源名称', prop: 'resuName', type: 'input' },
        { label: '资源类型', prop: 'resuType', type: 'input' },
        { label: '变更类型', prop: 'chgType', type: 'custom' },
        { label: '起止日期', prop: 'daterange', type: 'custom' }
      ],
      rules: {
        daterange: [{
          validator: validDate,
          trigger: 'blur'
        }]
      },
      tableData: [],
      loading: false,
      chgTypeList: [],
      columns: tableColumns
    }
  },
  computed: {
    ...mapGetters([
      'publicCode'
    ])
  },
  watch: {},
  created() {
  },
  mounted() {
    this.getUserList()
    this.chgTypeList = this.publicCode.codes.CHG_TYPE
  },
  methods: {
    search() {
      this.getUserList()
    },
    // 获取查询信息列表
    getUserList() {
      this.queryForm.optEndTime = this.queryForm.daterange[1]
      this.queryForm.optBeginTime = this.queryForm.daterange[0]
      const obj = Object.assign({}, this.queryForm)
      delete obj.daterange
      const params = {
        pageNumber: this.pageInfo.pageNumber,
        pageSize: this.pageInfo.pageSize,
        total: 0,
        ...obj
      }
      this.loading = true
      ApiObj.resuChgPage(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          const num1 = res.data.pageSize * (res.data.pageNumber - 1) + 1
          const num2 = res.data.pageSize * res.data.pageNumber > this.total ? this.total : res.data.pageSize * res.data.pageNumber
          this.pageInfo = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.recordCount || 0,
            startRow: num1 || 0,
            endRow: num2 || 0
          }
        }
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    pageChange(data) {
      this.pageInfo.pageSize = data.pagination.pageSize
      this.pageInfo.pageNumber = data.pagination.pageNum
      this.search()
    }
  }
}
</script>

<style lang="scss">
.item-role-per{
  height: 100%;
  .role-perssion-list{
       height: calc(100% - 176px);
     }
}

</style>
