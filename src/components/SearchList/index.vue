<!-- 左侧查询+列表 -->
<template>
  <div class="box search-list">
    <div class="box-body">
      <div class="tab-body-search" :style="{'min-height':searchHeight}">
        <!-- 搜索栏插槽 -->
        <slot />
        <el-collapse-transition>
          <div v-show="searchShow">
            <!-- 展开搜索栏插槽 -->
            <slot name="more" />
          </div>
        </el-collapse-transition>
        <div class="text-right">
          <!-- 功能按钮插槽 -->
          <slot name="btn" />
          <el-button @click="searchShow = !searchShow">{{ searchShow?'收起':'展开' }}</el-button>
        </div>
      </div>
      <slot name="table" />
      <div class="list-box" :style="{'top':searchHeight, 'height': `calc(100% - ${listBoxHeight})`}">
        <!--        <div class="box">-->
        <!--          <div class="box-header handle">-->
        <!--            <span class="box-title">阿卡设计费</span>-->
        <!--            <div class="box-tools">-->
        <!--              <el-button type="primary">buttonCont</el-button>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="box-body">-->

        <!--            <List :is-border="true" :is-selection="true" :columns="columns" :data="listData.value"></List>-->
        <!--          </div>-->
        <!--        </div>-->
        <el-checkbox-group v-model="checkedList" @change="listCheck">
          <el-radio-group v-model="radio">
            <div v-for="(item, index) in listData.value" :key="index" class="list-content" @click="listSelect(item, index)">
              <div class="list-box-title">
                <div class="title-text">
                  <el-checkbox v-if="selection.show && selection.type === 'checkbox'" :label="index" />
                  <el-radio v-if="selection.show && selection.type === 'radio'" :label="index" @change="listRadio" />
                  <div class="title-index">{{ index + 1 }}</div>
                  <div class="title-content">
                    {{ Object.values(listData.label)[0] }}：<span>{{ Object.values(item)[0] }}</span>
                  </div>
                </div>
                <i class="el-icon-caret-right arrow" />
                <!--                <span class="step-arrow" />-->
              </div>
              <div class="list-box-content">
                <div v-for="(data, i) in Object.keys(listData.label)" v-show="i !== 0 && i < (listData.number || 5)" :key="i" class="list-box-text">
                  <label>{{ listData.label[data] }}</label>：<span>{{ item[data] }}</span>
                </div>
              </div>
            </div>
          </el-radio-group>
        </el-checkbox-group>
      </div>
      <el-pagination
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        layout="total, prev, next, jumper"
        :total="pageInfo.total"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 搜索栏高度
    searchHeight: {
      type: String,
      default: '150px'
    },
    // list选择
    selection: {
      type: Object,
      default: () => {
        return {
          show: false,
          type: 'checkbox'
        }
      }
    },
    // list内容
    listData: {
      type: Object,
      default: () => {
        return {
          value: [], // row
          label: {}, // text
          number: 5 // list显示内容数量
        }
      }
    },
    // 分页信息
    pageInfo: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  data() {
    return {
      radio: '', // radio选中
      checkedList: [], // 选中List列表
      searchShow: false, // 展开搜索
      listActive: 0 // 当前选中List
    }
  },
  computed: {
    // list-box高度
    listBoxHeight() {
      return (Number(this.searchHeight.match(/\d/g).join('')) + 50) + 'px'
    }
  },
  watch: {
    // 当前选中列表样式
    listActive: {
      handler(index) {
        this.$nextTick(() => {
          document.querySelectorAll('.list-content').forEach(item => {
            item.classList.remove('active')
          })
          document.querySelectorAll('.list-content')[index].classList.add('active')
          this.$emit('getListData', this.listData.value[index])
        })
      },
      immediate: true
    }
  },
  methods: {
    // list选中
    listSelect(data, index) {
      this.radio = index
      this.listActive = index
    },
    // checkbox选中
    listCheck(val) {
      console.log(val)
    },
    // radio选中
    listRadio(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
$list-search-height: 150px; // 搜索栏收起高度
$active-color: #3BA0F6; // active颜色
.search-list {
  // height: 100%;
  .box-body {
    padding: 0;
    .tab-body-search { // 左查询
      position: absolute;
      padding: 10px;
      // min-height: $list-search-height;
      width: 100%;
      background-color: #FAFAFA;
      overflow-y: hidden;
      z-index: 999;
    }
    .list-box { // 列表容器
      position: absolute;
      // top: $list-search-height;
      width: calc(100% + 10px);
      // height: calc(100% - 200px);
      overflow-y: scroll;
      .el-checkbox-group {
        width: 100%;
        font-size: inherit;
        .el-radio-group {
          width: 100%;
          font-size: inherit;
          &>div {
            margin-top: 0;
          }
          .list-content { // 列表内容
            width: calc(100% - 10px);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            border-bottom: 1px solid #E3E3E5;
            padding: 12px 22px;
            white-space: nowrap;
            cursor: pointer;
            &:hover::before {
              content: '';
              position: absolute;
              right: 0;
              height: 100%;
              width: 0;
              // border-right: 3px solid $--primary-blue;
            }
            &:hover::after {
              content: '';
              position: absolute;
              width: 10px;
              height: 10px;
              right: -16px;
              top: 50%;
              transform: translateY(-50%);
              border: 6px solid transparent;
              // border-left: 10px solid $--primary-blue;
              width: 0;
              height: 0px;
            }
            .list-box-title { // 列表标题
              position: relative;
              font-size: 14px;
              font-weight: bold;
              /*line-height: 28px;*/
              width: 100%;
              .title-text {
                /*display: inline-block;*/
                overflow: hidden;
                text-overflow: ellipsis;
                width: calc(100% -  12px);
                font-size: 0;
                .title-index {
                  width: 18px;
                  height: 18px;
                  text-align: center;
                  border: 1px solid #333;
                  display: inline-block;
                  vertical-align: middle;
                  border-radius: 50%;
                  font-size: 12px;
                  line-height: 16px;
                  margin-right: 5px;
                }
                .title-content {
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 14px;
                  width: calc(100% - 50px);
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  /*color: #101010;*/
                }
                .el-checkbox, .el-radio{
                  margin-right: 10px;
                  display: inline-block;
                  vertical-align: middle;
                  position: relative;
                  top: 1px;
                  /deep/ .el-checkbox__label,/deep/ .el-radio__label {
                    display: none;
                  }
                }
              }
              span {
                line-height: 28px;
              }
              .arrow {
                position: absolute;
                top: 50%;
                right: 0;
                width: 12px;
                transform: translate(0, -50%);
              }
              .step-arrow {
                position: absolute;
                top: 50%;
                right: 0;
                width: 12px;
                transform: translate(0, -50%);
                &:after,&:before{
                  content:"";
                  display:inline-block;
                  position:absolute;
                  height:8px;
                  width:2px;
                  background:#c0c4cc;
                }
                &:before{
                  transform:rotate(-45deg) translateY(-2px);
                  transform-origin:0 0;
                }
                &:after{
                  transform:rotate(45deg) translateY(2px);
                  transform-origin:100% 100%;
                }
              }
            }
            .list-box-content {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: flex-start;
              flex-wrap: wrap;
              font-size: 0;
              padding-left: 24px;
              .list-box-text {
                line-height: 1.5;
                color: #101010;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
                label {
                  cursor: pointer;
                  color: #636363;
                  font-size: 14px;
                  font-weight: bold;
                }
                span {
                  color: #636363;
                  margin-right: 15px;
                  font-size: 14px;
                }
              }
            }
          }
          .active {
            background-color: #E4F0FD;
            // .list-box-title {
              // color: $--primary-blue;
              // .title-text .title-index {
                // border-color: $--primary-blue;
              // }
            // }
            &::before {
              content: '';
              position: absolute;
              right: 0;
              height: 100%;
              width: 0;
              // border-right: 3px solid $--primary-blue;
            }
            &::after {
              content: '';
              position: absolute;
              width: 10px;
              height: 10px;
              right: -16px;
              top: 50%;
              transform: translateY(-50%);
              border: 6px solid transparent;
              // border-left: 10px solid $--primary-blue;
              width: 0;
              height: 0px;
            }
          }
        }
      }
    }
    .el-pagination {
      position:absolute;
      width:100%;
      bottom:10px;
      /deep/ .el-pagination__jump {
        margin-left: 10px;
      }
    }
    ::-webkit-scrollbar {
      height: 0;
      width: 0;
    }
  }
}
</style>
