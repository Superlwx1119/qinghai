// 页面表头缩放组件大小变化是，按钮位置变化
const xl_show_number = 7// xl下面在不全部展开时显示个数
const lg_show_number = 5// lg下面在不全部展开时显示个数
const md_show_number = 3// md下面在不全部展开时显示个数
export default {
  data() {
    return {
      isCollapse: true // 默认折叠
    }
  },
  methods: {
    collapseClick() {
      if (!this.isCollapse) {
        // 先隐藏，然后再收起外壳
        this.collapseHandleClose()
      }
      this.isCollapse = !this.isCollapse
    },
    headerBoxChange(obj) {
      if (!obj) return
      if (obj.currentBoxHeight === obj.vueElm.height) {
        this.collapseHandleClose(obj)
      } else {
        // 暂不处理, 基本在这个里面不会有显示全部的
      }
    },
    collapseHandleClose(obj) {
      if (!obj) {
        obj = {
          windowWidth: window.innerWidth
        }
      }
      if (obj.windowWidth >= 992 && obj.windowWidth < 1200) {
        this.itemsDatas = this.itemsDatas.map((item, index) => {
          if (index < md_show_number) {
            item.hidden = false
          } else {
            item.hidden = true
          }
          return item
        })
      } else if (obj.windowWidth >= 1200 && obj.windowWidth < 1920) {
        this.itemsDatas = this.itemsDatas.map((item, index) => {
          if (index < lg_show_number) {
            item.hidden = false
          } else {
            item.hidden = true
          }
          return item
        })
      } else if (obj.windowWidth >= 1920) {
        this.itemsDatas = this.itemsDatas.map((item, index) => {
          if (index < xl_show_number) {
            item.hidden = false
          } else {
            item.hidden = true
          }
          return item
        })
        // this.$nextTick(() => {
        //   this.itemsDatas.forEach((item, index) => {
        //     if (index < xl_show_number) {
        //       item.hidden = false
        //     } else {
        //       item.hidden = true
        //     }
        //   })
        // })
      } else {
        // 暂不处理
      }
    },
    collapseHandleShowAll() {
      this.itemsDatas = this.itemsDatas.map((item, index) => {
        item.hidden = false
        return item
      })
    }
  }
}
