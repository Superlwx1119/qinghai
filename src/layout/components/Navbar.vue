<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
        <!-- <el-tooltip content="选择主题" effect="dark" placement="bottom">
          <ThemePicker class="right-menu-item hover-effect" style="line-height:73px;" @change="themeChange" />
        </el-tooltip> -->

      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <i class="el-icon-s-grid" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changeSkin('theme-default')">标准风格</el-dropdown-item>
          <el-dropdown-item divided @click.native="changeSkin('theme-blue')">蓝色风格</el-dropdown-item>
          <el-dropdown-item divided @click.native="changeSkin('theme-green')">绿色风格</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <i class="el-icon-user-solid" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>主页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
// import ThemePicker from '@/components/ThemePicker'
// import '@/assets/theme/custom-green/index.css'
// import '@/assets/theme/custom-blue/index.css'
// import '@/assets/theme/custom-darkblue/index.css'
export default {
  components: {
    // Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    // SizeSelect,
    Search
    // ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  created() {
    this.changeSkin('theme-default')
  },
  methods: {
    // 切换皮肤
    changeSkin(theme) {
      window.document.documentElement.setAttribute('class', theme)
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navbar;
  overflow: hidden;
  position: relative;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: $navbar - 4px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    margin-right: 30px;
    line-height: $navbar;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {

      .avatar-wrapper {
        position: relative;
        font-size: 24px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
