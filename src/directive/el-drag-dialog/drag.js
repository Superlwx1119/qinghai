export default {
  bind(el, binding, vnode, oldVnode) {
    // 弹框可拉伸最小宽高

    const minWidth = 400

    const minHeight = 300

    // 初始非全屏

    let isFullScreen = false

    // 当前宽高

    let nowWidth = 0

    // let nowHight = 0

    // 当前顶部高度

    let nowMarginTop = 0

    // 获取弹框头部（这部分可双击全屏）

    const dialogHeaderEl = el.querySelector('.el-dialog__header')

    // 弹窗

    const dragDom = el.querySelector('.el-dialog')

    // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；

    dragDom.style.overflow = 'auto'

    // 清除选择头部文字效果

    // dialogHeaderEl.onselectstart = new Function("return false");

    // 头部加上可拖动cursor

    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);

    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    const moveDown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight
      // 获取到的值带px 正则匹配替换

      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px

      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)

        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')

        styT = +sty.top.replace(/\px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离

        let l = e.clientX - disX

        let t = e.clientY - disY

        // 移动当前元素
        // 边界处理
        if (-(l) > minDragDomLeft) {
          l = -minDragDomLeft
        } else if (l > maxDragDomLeft) {
          l = maxDragDomLeft
        }

        if (-(t) > minDragDomTop) {
          t = -minDragDomTop
        } else if (t > maxDragDomTop) {
          t = maxDragDomTop
        }
        dragDom.style.left = `${l + styL}px`

        dragDom.style.top = `${t + styT}px`

        // 将此时的位置传出去

        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function(e) {
        document.onmousemove = null

        document.onmouseup = null
      }
    }

    dialogHeaderEl.onmousedown = moveDown

    // 双击头部全屏效果

    dialogHeaderEl.ondblclick = (e) => {
      if (isFullScreen === false) {
        // var nowHight = dragDom.clientHeight

        nowWidth = dragDom.clientWidth

        nowMarginTop = dragDom.style.marginTop

        dragDom.style.left = 0

        dragDom.style.top = 0

        dragDom.style.height = '100VH'

        dragDom.style.width = '100VW'
        dragDom.style.marginTop = 0
        dragDom.getElementsByClassName('el-dialog__body')[0].style.maxHeight = '100VH'
        isFullScreen = true

        dialogHeaderEl.style.cursor = 'initial'

        dialogHeaderEl.onmousedown = null
      } else {
        dragDom.style.height = 'auto'

        dragDom.style.width = nowWidth + 'px'

        dragDom.style.marginTop = nowMarginTop

        isFullScreen = false
        dragDom.getElementsByClassName('el-dialog__body')[0].style.maxHeight = 'calc(100vh - 244px)'

        dialogHeaderEl.style.cursor = 'move'

        dialogHeaderEl.onmousedown = moveDown
      }
    }

    dragDom.onmousemove = function(e) {
      // const moveE = e

      if (e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 || dragDom.offsetLeft + 10 > e.clientX) {
        dragDom.style.cursor = 'w-resize'
      } else if (el.scrollTop + e.clientY > dragDom.offsetTop + dragDom.clientHeight - 10) {
        dragDom.style.cursor = 's-resize'
      } else {
        dragDom.style.cursor = 'default'

        dragDom.onmousedown = (e) => {
          e.returnValue = true
        }
      }

      dragDom.onmousedown = (e) => {
        const clientX = e.clientX

        const clientY = e.clientY

        const elW = dragDom.clientWidth

        const elH = dragDom.clientHeight

        const EloffsetLeft = dragDom.offsetLeft

        const EloffsetTop = dragDom.offsetTop

        dragDom.style.userSelect = 'auto'

        const ELscrollTop = el.scrollTop

        // 判断点击的位置是不是为头部

        if (clientX > EloffsetLeft && clientX < EloffsetLeft + elW && clientY > EloffsetTop && clientY < EloffsetTop + 100) {

          // 如果是头部在此就不做任何动作，以上有绑定dialogHeaderEl.onmousedown = moveDown;

        } else {
          document.onmousemove = function(e) {
            // e.preventDefault() // 移动时禁用默认事件
            e.stopPropagation() // 阻止冒泡

            // 左侧鼠标拖拽位置

            if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
              // 往左拖拽

              if (clientX > e.clientX) {
                dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px'
              }

              // 往右拖拽

              if (clientX < e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                  // console.log('')
                } else {
                  dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px'
                }
              }
            }

            // 右侧鼠标拖拽位置

            if (clientX > EloffsetLeft + elW - 10 && clientX < EloffsetLeft + elW) {
              // 往左拖拽

              if (clientX > e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                  // console.log('')
                } else {
                  dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px'
                }
              }

              // 往右拖拽

              if (clientX < e.clientX) {
                dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px'
              }
            }

            // 底部鼠标拖拽位置

            if (ELscrollTop + clientY > EloffsetTop + elH - 20 && ELscrollTop + clientY < EloffsetTop + elH) {
              // 往上拖拽

              if (clientY > e.clientY) {
                if (dragDom.clientHeight < minHeight) {
                  // console.log('')
                } else {
                  dragDom.style.height = elH - (clientY - e.clientY) * 2 + 'px'
                }
              }

              // 往下拖拽

              if (clientY < e.clientY) {
                dragDom.style.height = elH + (e.clientY - clientY) * 2 + 'px'
              }
            }
          }

          // 拉伸结束

          document.onmouseup = function(e) {
            document.onmousemove = null

            document.onmouseup = null
          }
        }
      }
    }
  }
}
