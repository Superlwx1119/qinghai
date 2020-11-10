<!-- 用户权限管理 -->
<template>
  <normal-layer
    :search-number="itemsDatas.length"
  >
    <template slot="search-header">
      <form-items
        :items-datas="itemsDatas"
        :form-datas="queryForm"
      >
        <template slot="uact">
          <medical-institutions-select
            v-model="queryForm.uact"
            dialog-title="xxx"
            @changeObj="getFixmedins"
          />
        </template>
        <el-button @click="reset">重置</el-button>
        <el-button
          type="primary"
          @click="search"
        >查询</el-button>
      </form-items>
    </template>
    <el-row :gutter="12" style="margin-right:0!important;margin-left:0!important;" class="height100b">
      <el-col :span="12" class="height100b">
        <section class="layer height100b">
          <div class="box height100b">
            <div class="box-header handle">
              <span class="box-title">用户权限管理列表</span>
              <div class="box-tools">
                <el-form :inline="true">
                  <el-dropdown>
                    <el-button type="primary">
                      导出<i class="el-icon-arrow-down el-icon--right" />
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="handleClick()">导出当页</el-dropdown-item>
                      <el-dropdown-item @click="handleClick()">导出选中</el-dropdown-item>
                      <el-dropdown-item @click="handleClick()">导出全部</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form>
              </div>
            </div>
            <my-table-view v-loading="loading" :columns="columns" :data="tableData" :have-expand="false" :max-cloumns="100" :is-configheader="false" :multiple-selection.sync="multipleSelection">
              <template slot="valiFlag" slot-scope="scope">
                {{ scope.row.valiFlag | fliterroleType }}
              </template>
            </my-table-view>
          </div>
        </section>
      </el-col>
      <el-col :span="12" class="height100b">
        <section class="layer height100b">
          <div class="box height100c">
            <div class="box-header handle">
              <span class="box-title">角色权限信息</span>
            </div>
            <el-select
              v-model="filterText"
              placeholder="输入关键字进行过滤"
              style="width:100%"
              @change="changeEvent()"
            >
              <el-option
                v-for="item in newArr"
                :key="item.bizRoleId"
                :label="item.roleName"
                :value="item.bizRoleId"
              />
            </el-select>
            <el-tree
              ref="tree"
              class="filter-tree"
              :data="roleList"
              :props="defaultProps"
              :default-expand-all="false"
            />
          </div>
        </section>
      </el-col>
    </el-row>
  </normal-layer>
</template>

<script>
import NormalLayer from '@/views/components/PageLayers/normalLayer'
import FormItems from '@/views/components/PageLayers/form-items'
import PageHandle from '@/mixins/pageHandle'
import MedicalInstitutionsSelect from './MedicalInstitutionsSelect'
// 获取用户账户
import { getCurrentUser } from '@/api/Common/Request'
import { tableColumns } from './tableConfig'
import { one, anotherOne, rolePermissions } from '@/api/Admin/user-management'

export default {
  components: {
    NormalLayer,
    FormItems,
    MedicalInstitutionsSelect
    // EditDialog
  },
  mixins: [PageHandle],
  data() {
    return {
      filterText: '',
      roleList: [{
        name: '菜单列表',
        children: []
      }, {
        name: '组件',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      loading: false,
      multipleSelection: [],
      itemsDatas: [
        { label: '用户账号', prop: 'uact', type: 'custom', slotName: 'uact' },
        { label: '姓名', prop: 'userName', type: 'input', disabled: true },
        { label: '证件号码', prop: 'certNO', type: 'input', disabled: true }
      ],
      queryForm: {
        uact: '',
        userName: '',
        certNO: '',
        roleId: '',
        authType: '',
        resuType: '',
        uactId: ''
      },
      showDetailDialog: false,
      dialogTitle: '新增',
      showEditDialog: false,
      value: '',
      columns: tableColumns,
      tableData: [],
      newArr: []
    }
  },
  created() {
    this.getCurrentUsers()
  },
  methods: {
    handleClick() {
      console.log('1231')
    },
    getCurrentUsers() {
      const that = this
      getCurrentUser().then(res => {
        this.$nextTick(() => {
          that.data = res.data
        })
        sessionStorage.setItem('orgUntId', res.data.this.orgUntId)
      }).catch(err => console.log(err))
    },
    // 查询方法
    filterNode(value, data) {
      if (!value) return true
      // eslint-disable-next-line no-undef
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data)
    },
    registrationClick() {
      this.$msgSuccess('')
    },
    getFixmedins(val) {
      this.queryForm.uact = val.uact
      this.queryForm.userName = val.userName
      this.queryForm.certNO = val.certNO
      this.queryForm.roleId = val.roleId
      this.queryForm.authType = val.authType
      this.queryForm.resuType = val.resuType
      this.queryForm.uactId = val.uactId
      this.search()
    },
    async search() {
      if (this.tableData.length !== 0) {
        this.$msgInfo('请勿重复查询重复数据！')
        return false
      } else {
        await anotherOne(this.queryForm.uactId).then(res => {
          if (res.data) {
            this.tableData.push(res.data)
            this.newArr.push({ bizRoleId: res.data.admrolId, roleName: res.data.roleName })
          }
        })
        await one(this.queryForm.uactId).then(res => {
          if (res.data) {
            for (let i = 0; i < res.data.length; i++) {
              var newObj = {
                roleName: res.data[i].roleName,
                valiFlag: res.data[i].valiFlag,
                dscr: res.data[i].dscr
              }
              this.tableData.push(newObj)
            }
            res.data.forEach(ele => {
              this.newArr.push({ bizRoleId: ele.bizRoleId, roleName: ele.roleName })
              this.filterText = this.newArr[0].bizRoleId
            })
            this.changeEvent(this.newArr.bizRoleId)
          }
        })
      }
    },
    changeEvent(filterText) {
      this.roleList = [{
        name: '菜单列表',
        children: []
      }, {
        name: '组件',
        children: []
      }]
      const params = {
        roleId: this.filterText,
        authType: 2,
        resuType: 1
      }
      rolePermissions(params).then(res => {
        if (res.data) {
          // this.roleList = res.data
          const menuList = res.data.filter(item => {
            return item.parentId === '-1'
          })
          const propList = res.data.filter(item => {
            return item.parentId === '0'
          })
          menuList.forEach(item => {
            this.roleList[0].children.push(item)
          })
          propList.forEach(item => {
            this.roleList[1].children.push(item)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.height100b{
      height: 100%;
  }
  .height100c{
    height: 100%;
    overflow: scroll;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

