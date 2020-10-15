<template>
  <el-drawer :title="title" :class="newClass + 'drawer-components'" :size="size" :direction="direction" :visible.sync="visible" :with-header="withHeader" @closed="close">
    <slot />
    <slot name="footer" />
  </el-drawer>
</template>

<script>
export default {
  name: 'Drawer',
  components: {},
  mixins: [],
  props: {
    size: { type: [Number, String], default: '620px' },
    title: { type: String, default: '标题' },
    direction: { type: String, default: 'rtl' },
    show: { type: Boolean, default: false },
    withHeader: { type: Boolean, default: true },
    newClass: { type: String, default: '' }
  },
  data() {
    return {
      visible: this.show
    }
  },
  computed: {
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.visible = this.show
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    close() {
      this.$emit('update:show', false)
      this.$emit('resetForm')
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-components {
  >>> .el-drawer__header {
    padding: 12px 10px;
    line-height: 1;
    margin-bottom: 0;
    color: #fff;
    font-weight: 700;
    background-color: $--color-primary;
  }
  >>> .drawer-footer {
    position: absolute;
    padding: 10px;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: right;
  }
}
</style>
