<!-- 非弹框 铺满 子页面 -->
<template>
  <transition name="el-fade-in-linear">
    <div v-show="show" class="my-children-page-wrapper">
      <div class="header">
        <slot name="title">
          <el-page-header :content="title" @back="goBack">
            <div slot="content" class="title-box">
              <div class="title">{{ title }}</div>
              <div class="handle">
                <MyButton type="other" title="返回" @click="goBack" />
                <slot name="view-head-tools" />
              </div>
            </div>
          </el-page-header>
        </slot>
      </div>

      <!-- 主体内容 -->
      <div class="content">
        <slot />
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'closeAll'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      this.$emit('closeAll', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-children-page-wrapper{
  padding-top: 50px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $bg;
  z-index: 2000;
  box-sizing: border-box;
  .header{
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #fff;
    border-radius: 2px;
  }
  .content{
    height: 100%;
    overflow: hidden auto;
  }
  /deep/.el-page-header{
    line-height: 40px !important;
    .el-page-header__left {
      display: none;
    }
    .el-page-header__content{
      flex: 1;
    }
    .title-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title{
        padding-left: 14px;
        font-size: 16px;
        font-weight: bold;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          width: 6px;
          height: 14px;
          left: 0;
          top: 13px;
          background-color: #1b65b9;
        }
      }
      .handle {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
