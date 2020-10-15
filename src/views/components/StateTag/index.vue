<!-- 状态标签 -->
<!--
  tagType: pass 已完成（已通过等） nopass 失败（不通过等）,
           going 进行中（复审等等）, nostart 未开始
 -->
<template>
  <el-tag
    v-bind="this.$attrs"
    :type="customType"
    effect="dark"
    :title="title || contentTitle"
    style="height: 22px; line-height: 19px"
    v-on="$listeners"
  >
    <slot>
      {{ title || contentTitle }}
    </slot>
  </el-tag>
</template>

<script>
export default {
  props: {
    tagType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      contentTitle: '',
      stateArr: [
        { tagType: 'pass', title: '通过', type: 'success' },
        { tagType: 'nopass', title: '失败', type: 'danger' },
        { tagType: 'going', title: '进行中', type: 'warning' },
        { tagType: 'nostart', title: '未开始', type: 'info' }
      ]
    }
  },
  computed: {
    customType() {
      return this.typeHandle()
    }
  },
  methods: {
    typeHandle() {
      if (this.tagType) {
        const typeObj = this.stateArr.find(item => this.tagType === item.tagType)
        if (typeObj) {
          this.contentTitle = typeObj.title
          return typeObj.type
        } else {
          this.contentTitle = '未知状态'
          return 'info'
        }
      } else {
        this.contentTitle = '未知状态'
        return 'info'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
