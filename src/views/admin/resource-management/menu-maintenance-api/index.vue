<template>
  <div class="menu-maintenance">
    <!-- 资源管理 -->
    <section class="layer height100b">
      <div class="box">
        <div class="box-header handle">
          <span class="box-title">组件维护</span>
          <div class="box-tools">
            <el-button @click="restSearch">重置</el-button>
            <!-- <el-button :disabled="!searchForm.resuId&&!searchForm.parent" type="success" @click="handleSave">保存</el-button> -->
            <el-button type="success" @click="handleSave">保存</el-button>
          </div>
        </div>

        <div class="box-body">
          <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="80px">
            <el-row>
              <el-col :md="12" :lg="8" :xl="8">
                <el-form-item label="组件名称" prop="resuName">
                  <el-input v-model="searchForm.resuName" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="8">
                <el-form-item label="组件编号" prop="resuCodg">
                  <el-input v-model="searchForm.resuCodg" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="8">
                <el-form-item label="子系统" prop="subsysId">
                  <el-select v-model="searchForm.subsysId" :disabled="subSysIsDisabled" placeholder="请选择" style="width:100%" clearable>
                    <el-option
                      v-for="item in subsysList"
                      :key="item.subsysId"
                      :label="item.subsysName"
                      :value="item.subsysId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="8">
                <el-form-item label="默认组件" prop="pubComtFlag">
                  <el-select v-model="searchForm.pubComtFlag" placeholder="请选择" style="width:100%" clearable>
                    <el-option
                      v-for="item in defaultComList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="24">
                <el-form-item label="组件路径" prop="resuPath">
                  <el-input v-model="searchForm.resuPath" clearable placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="24">
                <el-form-item label="组件图标" prop="resuIcon">
                  <el-input v-model="searchForm.resuIcon" clearable placeholder="请输入">
                    &nbsp;&nbsp;&nbsp;<template slot="prepend"><el-popover
                      placement="bottom-start"
                      width="1200"
                      trigger="click"
                    >
                      <el-scrollbar style="height:100%">
                        <div style="width:100%;height:200px;">
                          <ul class="fas-icon-list">
                            <li v-for="(item,index) in iconList" :key="index" @click="changeIcon(item)"><i :class="item" /></li>
                          </ul>
                        </div>
                      </el-scrollbar>
                      <i slot="reference" class="el-icon-setting" />
                    </el-popover></template>&nbsp;&nbsp;&nbsp;
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="24">
                <el-form-item label="说明" prop="dscr">
                  <el-input v-model="searchForm.dscr" :rows="5" resize="none" clearable placeholder="请输入" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { sysAll, sysResuD, addSysResuD, updateResu } from '@/api/Admin/user-management'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'ResourceManagement',
  components: {

  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      iconList: [
        'el-icon-platform-eleme',
        'el-icon-eleme',
        'el-icon-delete-solid',
        'el-icon-delete',
        'el-icon-s-tools',
        'el-icon-setting',
        'el-icon-user-solid',
        'el-icon-user',
        'el-icon-phone',
        'el-icon-phone-outline',
        'el-icon-more',
        'el-icon-more-outline',
        'el-icon-star-on',
        'el-icon-star-off',
        'el-icon-s-goods',
        'el-icon-goods',
        'el-icon-warning',
        'el-icon-warning-outline',
        'el-icon-question',
        'el-icon-info',
        'el-icon-remove',
        'el-icon-circle-plus',
        'el-icon-success',
        'el-icon-error',
        'el-icon-zoom-in',
        'el-icon-zoom-out',
        'el-icon-remove-outline',
        'el-icon-circle-plus-outline',
        'el-icon-circle-check',
        'el-icon-circle-close',
        'el-icon-s-help',
        'el-icon-help',
        'el-icon-minus',
        'el-icon-plus',
        'el-icon-check',
        'el-icon-close',
        'el-icon-picture',
        'el-icon-picture-outline',
        'el-icon-picture-outline-round',
        'el-icon-upload',
        'el-icon-upload2',
        'el-icon-download',
        'el-icon-camera-solid',
        'el-icon-camera',
        'el-icon-video-camera-solid',
        'el-icon-video-camera',
        'el-icon-message-solid',
        'el-icon-bell',
        'el-icon-s-cooperation',
        'el-icon-s-order',
        'el-icon-s-platform',
        'el-icon-s-fold',
        'el-icon-s-unfold',
        'el-icon-s-operation',
        'el-icon-s-promotion',
        'el-icon-s-home',
        'el-icon-s-release',
        'el-icon-s-ticket',
        'el-icon-s-management',
        'el-icon-s-open',
        'el-icon-s-shop',
        'el-icon-s-marketing',
        'el-icon-s-flag',
        'el-icon-s-comment',
        'el-icon-s-finance',
        'el-icon-s-claim',
        'el-icon-s-custom',
        'el-icon-s-opportunity',
        'el-icon-s-data',
        'el-icon-s-check',
        'el-icon-s-grid',
        'el-icon-menu',
        'el-icon-share',
        'el-icon-d-caret',
        'el-icon-caret-left',
        'el-icon-caret-right',
        'el-icon-caret-bottom',
        'el-icon-caret-top',
        'el-icon-bottom-left',
        'el-icon-bottom-right',
        'el-icon-back',
        'el-icon-right',
        'el-icon-bottom',
        'el-icon-top',
        'el-icon-top-left',
        'el-icon-top-right',
        'el-icon-arrow-left',
        'el-icon-arrow-right',
        'el-icon-arrow-down',
        'el-icon-arrow-up',
        'el-icon-d-arrow-left',
        'el-icon-d-arrow-right',
        'el-icon-video-pause',
        'el-icon-video-play',
        'el-icon-refresh',
        'el-icon-refresh-right',
        'el-icon-refresh-left',
        'el-icon-finished',
        'el-icon-sort',
        'el-icon-sort-up',
        'el-icon-sort-down',
        'el-icon-rank',
        'el-icon-loading',
        'el-icon-view',
        'el-icon-c-scale-to-original',
        'el-icon-date',
        'el-icon-edit',
        'el-icon-edit-outline',
        'el-icon-folder',
        'el-icon-folder-opened',
        'el-icon-folder-add',
        'el-icon-folder-remove',
        'el-icon-folder-delete',
        'el-icon-folder-checked',
        'el-icon-tickets',
        'el-icon-document-remove',
        'el-icon-document-delete',
        'el-icon-document-copy',
        'el-icon-document-checked',
        'el-icon-document',
        'el-icon-document-add',
        'el-icon-printer',
        'el-icon-paperclip',
        'el-icon-takeaway-box',
        'el-icon-search',
        'el-icon-monitor',
        'el-icon-attract',
        'el-icon-mobile',
        'el-icon-scissors',
        'el-icon-umbrella',
        'el-icon-headset',
        'el-icon-brush',
        'el-icon-mouse',
        'el-icon-coordinate',
        'el-icon-magic-stick',
        'el-icon-reading',
        'el-icon-data-line',
        'el-icon-data-board',
        'el-icon-pie-chart',
        'el-icon-data-analysis',
        'el-icon-collection-tag',
        'el-icon-film',
        'el-icon-suitcase',
        'el-icon-suitcase-1',
        'el-icon-receiving',
        'el-icon-collection',
        'el-icon-files',
        'el-icon-notebook-1',
        'el-icon-notebook-2',
        'el-icon-toilet-paper',
        'el-icon-office-building',
        'el-icon-school',
        'el-icon-table-lamp',
        'el-icon-house',
        'el-icon-no-smoking',
        'el-icon-smoking',
        'el-icon-shopping-cart-full',
        'el-icon-shopping-cart-1',
        'el-icon-shopping-cart-2',
        'el-icon-shopping-bag-1',
        'el-icon-shopping-bag-2',
        'el-icon-sold-out',
        'el-icon-sell',
        'el-icon-present',
        'el-icon-box',
        'el-icon-bank-card',
        'el-icon-money',
        'el-icon-coin',
        'el-icon-wallet',
        'el-icon-discount',
        'el-icon-price-tag',
        'el-icon-news',
        'el-icon-guide',
        'el-icon-male',
        'el-icon-female',
        'el-icon-thumb',
        'el-icon-cpu',
        'el-icon-link',
        'el-icon-connection',
        'el-icon-open',
        'el-icon-turn-off',
        'el-icon-set-up',
        'el-icon-chat-round',
        'el-icon-chat-line-round',
        'el-icon-chat-square',
        'el-icon-chat-dot-round',
        'el-icon-chat-dot-square',
        'el-icon-chat-line-square',
        'el-icon-message',
        'el-icon-postcard',
        'el-icon-position',
        'el-icon-turn-off-microphone',
        'el-icon-microphone',
        'el-icon-close-notification',
        'el-icon-bangzhu',
        'el-icon-time',
        'el-icon-odometer',
        'el-icon-crop',
        'el-icon-aim',
        'el-icon-switch-button',
        'el-icon-full-screen',
        'el-icon-copy-document',
        'el-icon-mic',
        'el-icon-stopwatch',
        'el-icon-medal-1',
        'el-icon-medal',
        'el-icon-trophy',
        'el-icon-trophy-1',
        'el-icon-first-aid-kit',
        'el-icon-discover',
        'el-icon-place',
        'el-icon-location',
        'el-icon-location-outline',
        'el-icon-location-information',
        'el-icon-add-location',
        'el-icon-delete-location',
        'el-icon-map-location',
        'el-icon-alarm-clock',
        'el-icon-timer',
        'el-icon-watch-1',
        'el-icon-watch',
        'el-icon-lock',
        'el-icon-unlock',
        'el-icon-key',
        'el-icon-service',
        'el-icon-mobile-phone',
        'el-icon-bicycle',
        'el-icon-truck',
        'el-icon-ship',
        'el-icon-basketball',
        'el-icon-football',
        'el-icon-soccer',
        'el-icon-baseball',
        'el-icon-wind-power',
        'el-icon-light-rain',
        'el-icon-lightning',
        'el-icon-heavy-rain',
        'el-icon-sunrise',
        'el-icon-sunrise-1',
        'el-icon-sunset',
        'el-icon-sunny',
        'el-icon-cloudy',
        'el-icon-partly-cloudy',
        'el-icon-cloudy-and-sunny',
        'el-icon-moon',
        'el-icon-moon-night',
        'el-icon-dish',
        'el-icon-dish-1',
        'el-icon-food',
        'el-icon-chicken',
        'el-icon-fork-spoon',
        'el-icon-knife-fork',
        'el-icon-burger',
        'el-icon-tableware',
        'el-icon-sugar',
        'el-icon-dessert',
        'el-icon-ice-cream',
        'el-icon-hot-water',
        'el-icon-water-cup',
        'el-icon-coffee-cup',
        'el-icon-cold-drink',
        'el-icon-goblet',
        'el-icon-goblet-full',
        'el-icon-goblet-square',
        'el-icon-goblet-square-full',
        'el-icon-refrigerator',
        'el-icon-grape',
        'el-icon-watermelon',
        'el-icon-cherry',
        'el-icon-apple',
        'el-icon-pear',
        'el-icon-orange',
        'el-icon-coffee',
        'el-icon-ice-tea',
        'el-icon-ice-drink',
        'el-icon-milk-tea',
        'el-icon-potato-strips',
        'el-icon-lollipop',
        'el-icon-ice-cream-square',
        'el-icon-ice-cream-round'
      ],
      // 子系统列表
      subsysList: [],
      defaultComList: [],
      treeLoading: false,
      searchForm: {
        dscr: '',
        pubComtFlag: '',
        resuIcon: '',
        resuName: '',
        resuPath: '',
        subsysId: ''
      },
      rules: {
        resuName: [{ required: true, message: '请输入菜单名称', trgger: 'blur' }],
        resuCodg: [{ required: true, message: '请输入菜单编号', trgger: 'blur' }],
        subsysId: [{ required: true, message: '请选择子系统', trgger: 'change' }]
      },
      tableLoading: false,
      subSysIsDisabled: true
    }
  },
  computed: {
    ...mapGetters([
      'publicCode'
    ])
  },
  watch: {

  },
  created() {
    this.sysAll()
    this.defaultComList = this.publicCode.codes.PUB_COMT_FLAG
  },
  mounted() {

  },
  methods: {

    // 获取所有子系统
    sysAll() {
      sysAll().then(res => {
        if (res.code === 0) {
          this.subsysList = res.data
        }
      })
    },
    // 父组件新增时调用
    addNewMenu(data) {
      this.subSysIsDisabled = false
      let prntResuId = '0'
      let subsysId = ''
      if (data.level !== 1) {
        prntResuId = data.data.data.resuId
        subsysId = data.data.data.subsysId
      }
      this.searchForm = {
        dscr: '',
        resuCodg: '',
        resuIcon: '',
        resuName: '新增小组件',
        resuPath: '',
        subsysId: subsysId,
        parent: data.data,
        prntResuId: prntResuId,
        resuId: null,
        resuType: '3'
      }
      //  let pathArr = this.fnDeep(data)
      // let pathStr = `/${pathArr.reverse().join('/')}/`
    },
    // 获取菜单详情
    getMenuInfo(id) {
      sysResuD(id).then(res => {
        if (res.code === 0) {
          this.searchForm = res.data
          this.$store.commit('CHANGE_RESOURCEINFO', res.data)
        }
      })
    },
    // 编辑菜单
    modifyMenu() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          const params = this.searchForm
          updateResu(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                dangerouslyUseHTMLString: true,
                message: `<strong>操作成功</strong><p>${res.message}</p>`,
                duration: 1000
              })
              this.$emit('updateNode', this.searchForm)
              // this.$refs.searchForm.resetFields()
            } else {
              this.$alert(`<div class="myalert-header">操作失败</div>
              <div class="myalert-content">${res.message}</div>`, {
                dangerouslyUseHTMLString: true, confirmButtonText: '确定',
                type: 'error'
              })
            }
          })
        }
      })
    },
    handleSave() {
      // if(!this.searchForm.resuId&&!this.searchForm.parent){

      // }
      if (this.searchForm.resuId) {
        this.modifyMenu()
      } else {
        this.saveMenu()
      }
    },
    // 保存菜单
    saveMenu() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          const params = this.searchForm
          addSysResuD(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                dangerouslyUseHTMLString: true,
                message: `<strong>操作成功</strong><p>${res.message}</p>`,
                duration: 1000
              })
              this.$emit('updateNodeSave', res.data)
              this.$refs.searchForm.resetFields()
              this.subSysIsDisabled = true
            } else {
              this.$alert(`<div class="myalert-header">操作失败</div>
              <div class="myalert-content">${res.message}</div>`, {
                dangerouslyUseHTMLString: true, confirmButtonText: '确定',
                type: 'error'
              })
            }
          })
        }
      })
    },
    changeIcon(icon) {
      this.searchForm.resuIcon = icon
    },
    // 查询
    search() {
      this.getTableData(this.kpiFcode)
    },
    // 重置
    restSearch() {
      this.$refs.searchForm.resetFields()
    }

  }
}
</script>

<style scoped lang="scss">
  .height100b{
    height: 100%;
  }
  .menu-maintenance{
//     /deep/ .fas-icon-list {
//     list-style-type: none;
//     margin: 0;
//     padding: 0;
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     li {
//     width: 30px;
//     height: 30px;
//     margin: 5px;
//     // list-style: none;
//     // display: flex;
// }
// }
    /deep/.el-icon-popper {
    max-height: 400px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    }
    /deep/.el-input-group__prepend{
      span{
        display: inline-block;
        width:40px;
        height: 100%;
        cursor: pointer;
        text-align: center;
        i{
          display: inline-block;
          width:100%;
          height: 100%;
        }
      }
    }
  }

</style>
