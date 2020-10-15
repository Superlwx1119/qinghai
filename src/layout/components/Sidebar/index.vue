<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-input v-model="menuLike" clearable placeholder="输入菜单名" class="menuInput" />
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in menus" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      menuLike: '',
      menus: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    menuLike: function(newVal) {
      if (newVal === '') {
        this.menus = this.permission_routes
      } else {
        this.allMenusLoop()
      }
    }
  },
  created() {
    this.menus = this.permission_routes
  },
  methods: {
    allMenusLoop() {
      var allMenus = JSON.parse(JSON.stringify(this.permission_routes))
      allMenus.forEach(el => {
        if (el.children) {
          this.leafMenuLoop(el.children)
        }
      })
      allMenus.forEach(el => {
        if (el.children) {
          this.parentMenuLoop(el.children)
        }
      })
      allMenus.forEach(el => {
        if (el.children) {
          var tag = 0
          el.children.forEach(ele => {
            if (ele.hidden) {
              tag++
            }
          })
          if (tag === el.children.length) {
            el.hidden = true
          }
        }
      })
      this.menus = allMenus
    },
    // 递归洗一遍叶子节点（不匹配的就hidden）
    leafMenuLoop(menus) {
      menus.forEach(el => {
        if (!el.children) {
          if (el.meta.title.indexOf(this.menuLike) === -1) {
            el.hidden = true
          }
        } else {
          this.leafMenuLoop(el.children)
        }
      })
    },
    // 递归洗一遍父节点（子节点全hidden的就hidden）
    parentMenuLoop(menus) {
      menus.forEach(el => {
        if (el.children) {
          var tag = 0
          el.children.forEach(ele => {
            if (!ele.children) {
              if (ele.hidden) {
                tag++
              }
            } else {
              this.parentMenuLoop(ele.children)
            }
          })
          if (tag === el.children.length) {
            el.hidden = true
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.menuInput {
  border: none;
  &.el-input{
    .el-input__inner{
    border: none;
    border-radius: 0;
    background-color: rgb(55,122,199);
    padding-left: 20px;
    color: #fff;
    height: 40px;
    }
  }
}
</style>
