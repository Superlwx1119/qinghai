<template>
  <div>
    <input :value="selectValue" type="hidden">
    <FormDialog :title="title" :is-show.sync="isShow" :width="width" :height="height">
      <el-row :gutter="5" class="searchBar" style="margin-bottom:5px">
        <el-col v-if="!!classify && classify.show" :span="10">
          <template v-if="classify.type == 'tree'">
            <pf-tree-select v-model="selectClassifyObj" :data="options" :default-props="classify.props" height="300px" width="100%" size="small" style="width:100%;" />
            <!-- <el-tree :data="options" :props="classify.props" @node-click="handleNodeClick"></el-tree> -->
          </template>
          <template v-else>
            <el-select v-model="selectClassify" size="small" style="width:100%;" @change="refresh">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-col>
        <el-col :span="8">
          <el-input v-model="keyword" :placeholder="searchPlaceholder" class="input-with-select" size="small">
            <el-button slot="append" icon="el-icon-search" @click="loadDialogList(true)" />
          </el-input>
        </el-col>
      </el-row>
      <List
        ref="dialogList"
        :columns="tableCols"
        :data="tableData"
        :is-border="true"
        :is-selection="multiple"
        :multiple="multiple"
        :default-selections="defaultSelections"
        :row-key="rowKey"
        @handleSelect="handleSelect"
      />
      <Pagination ref="dialogPagination" :data="pagination" @refresh="refresh" />
      <el-row style="text-align: right;">
        <el-button type="primary" size="small" @click="submit()">确定</el-button>
        <el-button size="small" @click="close">关闭</el-button>
      </el-row>
    </FormDialog>
  </div>
</template>
<style lang="less">
  @import '../../less/form.less';
</style>
<script>
import FormDialog from '@/components/dialog/formDialog'
import SearchBar from '@/components/form/searchBar'
import List from '@/components/list/default'
import Pagination from '@/components/pagination/default'
export default {
  name: 'ListDialog',
  components: {
    FormDialog,
    SearchBar,
    List,
    Pagination
  },
  props: {
    api: { type: Function, default: null },
    params: { type: Object, default: () => {} },
    isSelection: { type: Boolean, default: true },
    tableCols: { type: Array, default: () => [] },
    searchKey: { type: String, default: () => {} },
    searchPlaceholder: { type: String, default: '请输入内容' },
    title: { type: String, default: '标题' },
    multiple: { type: Boolean, default: true },
    rowKey: { type: String | Array, default: 'id' },
    pageSize: { type: Number, default: 10 },
    value: Object | Array | String,
    initData: Object | Array,
    width: { type: String, default: '60%' },
    height: { type: String, default: '1000px' },
    classify: { type: Object, default: () => {} }, // 分类数据{api:接口，searchKey:用于查询的key，labelKey:显示名称字段，valueKey:值字段}
    searchParamMapping: { type: Array, default: () => [] } // 查询条件值替换，适用于选择全部的时候传值为‘’
  },
  data() {
    return {
      buttons: [
        { label: '刷新', icon: 'el-icon-refresh-right', method: () => {
          this.loadDialogList()
        } }
      ],
      tableData: [],
      selectRows: [], // 选中行
      defaultSelections: [],
      searchParams: {},
      pagination: { pageSize: this.pageSize, pageNum: 1, total: 0 }, // 分页数据
      isShow: false,
      keyword: '',
      options: [], // 分类下拉选项
      selectClassify: '', // 选中分类
      selectClassifyObj: {},
      filters: {}
    }
  },
  computed: {
    selectValue: {
      get: function() {
        return this.value
      },
      set: function(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    // 监控选中行
    selectRows(rows) {
      this.handleSelect(rows)
    },
    selectClassifyObj(data) {
      this.selectClassify = data[this.classify.valueKey]
      this.pagination.pageNum = 1
      this.loadDialogList()
    }
  },
  created() {

  },
  methods: {
    loadClassify() {
      this.options = []
      if (this.classify.api) {
        const params = this.classify.params ? this.classify.params : {}
        this.classify.api(params).then((response) => {
          const rows = response.rows ? response.rows : response
          if (this.classify.type == 'tree') {
            this.options = response.rows
          } else {
            rows.map(item => {
              this.options.push({ label: item[this.classify.labelKey], value: item[this.classify.valueKey] })
            })
            this.selectClassify = this.options.length > 0 ? this.options[0].value : null
          }
          if (this.classify.initClassify) {
            this.selectClassify = this.classify.initClassify
          }
          this.loadDialogList()
        })
      }
    },
    loadDialogList(resetPage) {
      if (resetPage) {
        this.pagination.pageNum = 1
      }
      var params = {
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.pageNum,
        sort: '',
        order: '',
        filters: this.filters,
        searchFilters: this.searchParams
      }
      params = Object.assign(params, this.params)
      if (this.selectClassify) {
        params.filters = params.filters ? params.filters : {}
        if (this.classify.searchParamMapping && this.classify.searchParamMapping.length > 0) {
          this.classify.searchParamMapping.map(ele => {
            if (this.classify.searchKey == ele.key && this.selectClassify == ele.value) {
              this.selectClassify = ele.targetValue
            }
          })
        }
        params.searchFilters[this.classify.searchKey] = this.selectClassify
      }
      if (this.searchKey) {
        params.searchFilters[this.searchKey] = this.keyword
      }
      this.api(params).then((response) => {
        if (response.state) {
          // 解析字典字段
          this.tableCols.forEach(item => {
            if (item.type == 'dic') {
              response.rows.map(ele => {
                if (ele[item.prop]) {
                  ele[item.prop] = JSON.parse(ele[item.prop]).value
                }
              })
            } else if (item.type == 'dateTime') {
              response.rows.map(ele => {
                ele[item.prop] = this.utils.formatDateTime(ele[item.prop])
              })
            } else if (item.type == 'date') {
              response.rows.map(ele => {
                ele[item.prop] = ele[item.prop] ? this.utils.formatDate(ele[item.prop]) : ''
              })
            }
            // 格式化日期字段
          })
          this.tableData = response.rows ? response.rows : response
          this.pagination.total = response.total
          // 通知列表组件刷新
          this.$refs.dialogList.$emit('update')
          // 默认选中
          this.defaultSelections = []
          if (this.initData && this.initData.length > 0) {
            this.tableData.forEach(element => {
              var existValue = this.initData.find((ele) => {
                return ele == element[this.rowKey]
              })
              if (existValue) {
                this.defaultSelections.push(element)
              }
            })
          }
        } else {
          this.utils.error(response.msg)
        }
      })
    },
    // 刷新
    refresh(data) {
      if (data.pagination) {
        this.pagination = data.pagination
      }
      if (data.searchParams) {
        this.searchParams = data.searchParams
        this.pagination.pageNum = 1
      }
      this.loadDialogList()
    },
    create(filters) {
      this.filters = filters
      if (this.classify && this.classify.show) {
        this.loadClassify()
      } else {
        this.loadDialogList()
      }
      this.isShow = false
      this.isShow = !this.isShow
    },
    // 关闭
    close() {
      this.keyword = ''
      this.isShow = false
    },
    // 选中行
    handleSelect(rows) {
      this.selectRows = rows
    },
    // 确认
    submit() {
      let array = []
      if (this.multiple) {
        // 多选
        this.selectRows.forEach(element => {
          array.push(element)
        })
      } else {
        // 单选
        array = this.selectRows
      }
      this.selectValue = array
      this.close()
    }
  }
}
</script>
