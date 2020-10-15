<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (top.location !== location) {
        this.isIframe = true
      } else {
        document.getElementsByClassName('app-main')[0].classList.add('height')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  // height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
}

.fixed-header+.app-main {
  padding-top: 50px;
}
.height {
  height: calc(100% - 98px);
}
.hasTagsView {
  .app-main {
    min-height: calc(100vh - 98px);
  }

  .fixed-header+.app-main {
    padding-top: 98px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
