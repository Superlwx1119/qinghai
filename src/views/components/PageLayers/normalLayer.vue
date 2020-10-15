<!-- 正常上下两栏布局 -->
<!--
分两部分，头部搜索框，底部table列表，正常标准页面
注意：头部搜索条件1-7， searchNumber，超过七个则不适用
searchNumber: 查询条件个数 默认2个(不包括操作按钮栏)
-->
<template>
  <div :class="['third-index', 'item'+ searchNumber]">
    <section class="layer layer-query">
      <div class="box">
        <div class="box-body">
          <slot name="search-header" />
        </div>
      </div>
    </section>
    <section class="layer layer-result">
      <div class="box">
        <slot name="table-title">
          <!-- titleName titleNeedHandle -->
          <box-title v-bind="this.$attrs">
            <slot name="title-btns" />
          </box-title>
        </slot>

        <div class="box-body">
          <slot />
        </div>
      </div>
    </section>

    <slot name="other" />
  </div>
</template>

<script>
import BoxTitle from './box-title'
export default {
  components: {
    BoxTitle
  },
  props: {
    searchNumber: {
      type: Number,
      default: 2
    }
  }
}
</script>
