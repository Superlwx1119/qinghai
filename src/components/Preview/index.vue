<!-- 图片预览 -->

<!--
  viewerVisible： 显示与隐藏

  imgDataList： 图片数据, [{title: '***', url: '***', id: '***'}],

  imgIndex： 当前预览的图片索引， 默认为0

  isShowTitle: 是否展示标题， 默认显示

-->

<template>
  <div>
    <transition name="main">
      <div
        v-show="viewerVisible"
        id="ImgPreview"
        ref="ImgPreview"
        @mousewheel="stopEvent"
      >
        <!-- 预览窗的title-->
        <div
          ref="titleBar"
          class="title-bar"
        >
          <div class="imgName">{{ isShowTitle ? imgName : '' }}</div>
          <div><svg-icon class="close-btn" icon-class="close" @click="visible" /></div>
        </div>
        <!--左右按钮-->
        <div ref="preCover" class="pre direction-btn" @click="prevImg">
          <svg-icon icon-class="left-btn" />
        </div>
        <div ref="nextCover" class="next direction-btn" @click="nextImg">
          <svg-icon icon-class="right-btn" />
        </div>
        <!-- 预览的图片区域-->
        <div id="imgPreview">
          <!--加载动画-->
          <div
            v-if="loading"
            class="loading"
          >
            <svg
              id="loader-1"
              version="1.1"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 50 50"
              style="enable-background:new 0 0 50 50;"
              xml:space="preserve"
            >
              <path
                fill="#000"
                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                fill:grey
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
          <div
            id="previewImagePrinter"
            ref="imgContainer"
            class="imgContainer"
          >
            <img
              ref="img"
              class="img"
              :src="imgSrc"
              :style="{width:imgWidth+'px',height:imgHeight+'px'}"
              @mousedown.capture.self="mousedown"
              @mouseup="mouseup"
              @mousewheel="mousewheel"
            >
          </div>
        </div>
        <!--预览窗的功能区-->
        <div ref="toolBar" class="tool-bar">
          <div class="menu-group">
            <div><svg-icon icon-class="rotate-right" @click="rotateRight" /></div>
            <div><svg-icon icon-class="rotate-left" @click="rotateLeft" /></div>
            <div><svg-icon icon-class="refresh-btn" @click="reset" /></div>
            <div><svg-icon v-print="'#previewImagePrinter'" icon-class="printer" /></div>
            <div><svg-icon icon-class="download-btn" @click="download" /></div>
          </div>
        </div>
        <!--end-->
      </div>
    </transition>
  </div>
</template>
<script>
import { throttle } from '@/utils/index'
export default {
  props: {
    viewerVisible: {
      type: Boolean,
      default: false
    },
    imgDataList: {
      type: Array,
      default: () => []
    },
    imgIndex: {
      type: Number,
      default: 0
    },
    isShowTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      locationData: {
        isMove: '', // 是否移动
        startX: '', // 鼠标按下时距离窗口的X轴距离
        startY: '', // 鼠标按下时距离窗口的Y轴距离
        endX: '', // move停下时距离窗口的X轴距离
        endY: '', // move停下时距离窗口的Y轴距离
        imgLeft: '', // 鼠标点距离窗口的left
        imgTop: '', // 鼠标点距离窗口的top
        distanceX: 0, // 鼠标点距离窗口的X距离
        distanceY: 0 // 鼠标点距离窗口的Y距离
      },
      rotateDeg: 0, // 旋转角度
      preImgData: [], // 预加载后图片的数组
      imgSrc: '', // 预览图片的src
      scaleSize: 0, // 缩放系数
      imgName: 'loading error', // 图片名
      imgWidth: 0, // 图片的宽度
      imgHeight: 0, // 图片的高度
      imgw: 0, // 图片的clientWidth
      imgh: 0, // 图片的clientHeight
      imgContainerWidth: 0, // 图片容器的clientHeight
      imgContainerHeight: 0, // 图片容器的clientHeight
      imgDataListLength: 1, // 数组的长度
      loading: false, // 加载动画
      error: false, // 错误图片的加载状态
      snapImgIndex: 0, // 在调用Retry的临时数据
      preloadImgData: [], // 预加载后图片的数据

      imgContainer: null, // imgContainer节点
      imgElement: null, // imgElement的节点
      imgStyle: null, // imgElement的样式
      imgI: 0, // img的索引
      imgData: [] // img的url数据
    }
  },
  watch: {
    viewerVisible: {
      handler(val) {
        if (val) {
          this.imgData = this.imgDataList
          this.init(this.imgI)
        }
      }
    }
  },
  mounted() {
    this.imgContainer = this.$refs.imgContainer
    this.imgElement = this.$refs.img
    this.imgStyle = this.imgElement.style
    this.imgI = this.imgIndex
  },
  methods: {
    printer() {

    },
    // 初始化
    init(index) {
      this.changeBtn(index)
      this.changeLoading(true)
      this.setPreviewImg(index)
    },
    // 预览窗viewer的显示
    visible() {
      this.cleanData()
      this.$emit('update:viewerVisible', false)
    },
    // 清除数据
    cleanData() {
      const arr = this.$data
      for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
          if (typeof (arr[key]) !== 'object') {
            if (typeof (arr[key]) === 'string' && key !== 'imgName') {
              this.changeData(key, 'string', this)
            }
            if (key === 'imgName') {
              this.changeData(key, 'imgName', this)
            }
            if (typeof (arr[key]) === 'number') {
              this.changeData(key, 'number', this)
            }
          }
        }
      }
    },
    // 修改值
    changeData(key, type, that) {
      if (type === 'string') {
        that[key] = ''
      }
      if (type === 'number') {
        that[key] = 0
      }
      if (type === 'imgName') {
        that[key] = 'loading error'
      }
    },
    // 得到元素的offsetTop/offsetLeft
    getOffset(e) {
      var left = 0
      var top = 0
      while (e != null && e !== document.body) {
        top += e.offsetTop
        left += e.offsetLeft
        e = e.offsetParent
      }
      return {
        left: left,
        top: top
      }
    },
    // 处理鼠标移出异常
    moveupError() {
      this.visible()
    },
    // 鼠标按下事件
    mousedown(e) {
      if (e.which === 1 && e.target && e.target === this.imgElement) {
        this.locationData.isMove = true
        this.imgStyle.cursor = 'move'
        this.locationData.startX = e.clientX
        this.locationData.startY = e.clientY
        e.preventDefault()
        this.$refs.titleBar.addEventListener('mouseup', this.moveupError)
        this.$refs.toolBar.addEventListener('mouseup', this.moveupError)
        window.addEventListener('mousemove', throttle(this.mousemove, 10))
        window.addEventListener('mouseup', this.mouseup)
      }
    },
    // 移除事件
    removeEvent() {
      this.$refs.titleBar.removeEventListener('mouseup', this.moveupError)
      this.$refs.toolBar.removeEventListener('mouseup', this.moveupError)
    },
    // 鼠标松开事件
    mouseup(e) {
      if (e.which !== 1) {
        return
      }
      this.imgStyle.cursor = 'default'
      this.locationData.isMove = false
      if (typeof this.locationData.imgLeft !== 'undefined') {
        this.locationData.distanceX = this.locationData.imgLeft
        this.locationData.distanceY = this.locationData.imgTop
      }
      this.removeEvent()
      e.preventDefault()
    },
    // 鼠标移动事件
    mousemove(e) {
      if (e.which !== 1) {
        return
      }
      if (this.locationData.isMove && !this.error) {
        e.preventDefault()
        this.imgStyle.cursor = 'move'
        this.locationData.endX = e.clientX
        this.locationData.endY = e.clientY
        this.locationData.imgLeft = this.locationData.distanceX + this.locationData.endX - this.locationData.startX
        this.locationData.imgTop = this.locationData.distanceY + this.locationData.endY - this.locationData.startY
        this.imgStyle.left = this.locationData.imgLeft + 'px'
        this.imgStyle.top = this.locationData.imgTop + 'px'
      }
    },
    // 鼠标滚动事件
    mousewheel(e) {
    // 以鼠标为中心缩放，同时进行位置调整
      // eslint-disable-next-line no-unused-vars
      var deltaY = 0
      var x = e.clientX
      var y = e.clientY
      e.preventDefault()
      if (e.target && this.error === false && e.target === this.imgElement) {
        var l = this.getOffset(this.imgContainer)
        x = x - l.left
        y = y - l.top
        var scaleNum = e.wheelDelta / 1200
        var snapScaleSize = this.scaleSize // 暂存缩放系数
        snapScaleSize += scaleNum
        snapScaleSize =
        snapScaleSize < 0.2
          ? 0.2
          : snapScaleSize > 5
            ? 5
            : snapScaleSize // 可以缩小到0.2,放大到5倍
        // 计算位置，以鼠标所在位置为中心
        // 以每个点的x、y位置，计算其相对于图片的位置，再计算其相对放大后的图片的位置
        this.locationData.distanceX =
        this.locationData.distanceX -
        ((x - this.locationData.distanceX) * (snapScaleSize - this.scaleSize)) / this.scaleSize
        this.locationData.distanceY =
        this.locationData.distanceY -
        ((y - this.locationData.distanceY) * (snapScaleSize - this.scaleSize)) / this.scaleSize
        this.scaleSize = snapScaleSize // 更新倍率
        // 改变位置和大小
        // this.imgStyle.transition='all 0.2s ease'
        this.imgStyle.width = this.imgw * snapScaleSize + 'px'
        this.imgStyle.height = this.imgh * snapScaleSize + 'px'
        this.imgStyle.top = this.locationData.distanceY + 'px'
        this.imgStyle.left = this.locationData.distanceX + 'px'
      }
    },
    // 处理滚动阴影区时，背景一起滚动
    stopEvent(e) {
    // 等会处理节流
      e.preventDefault()
    },
    // 顺时针旋转90
    rotateRight() {
      if (this.error === false) {
        this.rotateDeg = this.rotateDeg >= 360 ? 90 : this.rotateDeg + 90
        this.imgStyle.transform = 'rotate(' + this.rotateDeg + 'deg)'
        // this.imgStyle.transition = 'all 0.5s ease'
      } else {
        return false
      }
    },
    // 逆时针旋转90
    rotateLeft() {
      if (this.error === false) {
        this.rotateDeg = this.rotateDeg <= 0 ? 270 : this.rotateDeg - 90
        this.imgStyle.transform = 'rotate(' + this.rotateDeg + 'deg)'
        // this.imgStyle.transition = 'all 0.5s ease'
      } else {
        return false
      }
    },
    // 重置图片位置
    reset() {
      var pW, pH// imgContainer的宽高暂存值
      // 以完全显示图片为基准,如果改为>，则为以铺满屏幕为基准
      // 我设置的默认为<即img宽度填充imgContainer
      if (this.imgContainerWidth / this.imgContainerHeight < this.imgw / this.imgh) {
        pW = this.imgContainerWidth
        pH = (this.imgh * this.imgContainerWidth) / this.imgw
        this.locationData.distanceX = 0
        this.locationData.distanceY = -(pH - this.imgContainerHeight) / 2
        this.scaleSize = this.imgContainerWidth / this.imgw // 初始比率
      } else {
        pW = (this.imgw * this.imgContainerHeight) / this.imgh
        pH = this.imgContainerHeight
        this.locationData.distanceX = -(pW - this.imgContainerWidth) / 2
        this.locationData.distanceY = 0
        this.scaleSize = this.imgContainerHeight / this.imgh
      }
      // 重置图片的大小，位置
      this.imgStyle.width = pW + 'px'
      this.imgStyle.height = pH + 'px'
      this.imgStyle.left = this.locationData.distanceX + 'px'
      this.imgStyle.top = this.locationData.distanceY + 'px'
      // 重置角度
      if (this.rotateDeg === 0) {
        this.rotateDeg = 0
      } else if (this.rotateDeg === 90) {
        this.rotateDeg = 360
      } else if (this.rotateDeg === 180) {
        this.rotateDeg = 360
      } else if (this.rotateDeg === 270) {
        this.rotateDeg = 360
      } else {
        this.rotateDeg = 0
      }
      this.imgStyle.transform = 'rotate(' + this.rotateDeg + 'deg)'
    },
    //  上一张图
    prevImg() {
      if (this.imgI === 0) {
        this.reset()
        return
      } else {
        // this.cleanData()
        this.changeLoading(true)
        setTimeout(() => {
          this.imgDataListLength = this.imgData.length
          this.imgI = this.imgI === 0 ? this.imgDataList.length - 1 : this.imgI - 1
          this.init(this.imgI)
        }, 0)
      }
    },
    // 下一张图
    nextImg() {
      const imgDataLength = this.imgData.length
      if (this.imgI === imgDataLength - 1) {
        this.reset()
        return
      } else {
        // this.cleanData()
        this.changeLoading(true)
        setTimeout(() => {
          this.imgDataListLength = this.imgData.length
          this.imgI = this.imgI === this.imgDataList.length - 1 ? 0 : this.imgI + 1
          this.init(this.imgI)
        }, 0)
      }
    },
    // 改变左右切换按钮的样式
    changeBtn(index) {
      this.$refs.preCover.style.display = 'block'
      this.$refs.nextCover.style.display = 'block'
      const imgDataLength = this.imgData.length
      if (index === 0) {
        this.$refs.preCover.style.display = 'none'
      }
      if (index === imgDataLength - 1) {
        this.$refs.nextCover.style.display = 'none'
      }
    },
    // 初始化img和imgContainer的信息
    initImgMsg(index) {
      if (this.preloadImgData[index].error === true) {
        this.error = true
        // 处理图片加载错误，点击重试
        this.retry()
      } else {
        this.error = false
        // 清除图片重试点击事件
        this.cleanRetry()
      }
      // 初始化装载容器的宽高,为了测试，我默认设置的图片的1/4,可以自己改
      this.imgContainerWidth = this.preloadImgData[index].width
      this.imgContainerHeight = this.preloadImgData[index].height
      const ctop = this.imgContainerHeight / 2
      const cleft = this.imgContainerWidth / 2
      this.imgContainer.style.cssText = 'top:calc(50% - ' + ctop + 'px);left:calc(50% - ' + cleft + 'px)'
      // 初始化图片的宽高
      this.imgWidth = this.preloadImgData[index].width
      this.imgHeight = this.preloadImgData[index].height
      // 初始化图片的src和name
      this.imgSrc = this.preloadImgData[index].url
      this.imgName = this.preloadImgData[index].title
      // 初始化imgw和imgh，方便后面计算
      this.imgw = this.imgWidth
      this.imgh = this.imgHeight
      // 初始化图片加载的错误状态
      this.snapImgIndex = index
    },
    // 下载图片
    download() {
      this.getBase64(this.imgI).then((s) => {
        const aLink = document.createElement('a')
        aLink.download = s.name
        aLink.href = s.base64
        aLink.click()
      }).catch((f) => {
        console.log(`下载失败`)
      })
    },
    // 改变loading状态
    changeLoading(status) {
      this.loading = status
    },
    // 设置预览图片
    setPreviewImg(index) {
      this.preloadImg(index).then((s) => {
        this.initImgMsg(index)
        this.reset()
        this.changeLoading(false)
      }).catch((f) => {
        this.initImgMsg(index)
        this.reset()
        this.changeLoading(false)
      })
    },
    // 预加载
    preloadImg(index) {
      const imgData = this.imgData
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      let snapData
      const img = new Image()
      img.src = imgData[index].url
      return new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          snapData = { title: imgData[index].title, url: imgData[index].url, id: imgData[index].id, width: img.width, height: img.height, error: false }
          this.preloadImgData[index] = snapData
          resolve(true)
        }
        img.onerror = () => {
          snapData = { title: 'loading error', url: require('@/assets/img/error.png'), id: imgData[index].id, width: 128, height: 128, error: true }
          this.preloadImgData[index] = snapData
          reject(false)
        }
      })
    },
    // 改变图片加载状态
    changeImgStatus(index) {
      const imgData = this.imgData
      const snapData = { title: 'loading error', url: require('@/assets/img/error.png'), id: imgData[index].id, width: 128, height: 128, error: false }
      this.preloadImgData[index] = snapData
      this.cleanData()
      this.initImgMsg(index)
    },
    // 调用retry
    handleRetry() {
      this.init(this.snapImgIndex)
    },
    // 清除图片重试点击事件
    cleanRetry() {
      this.imgStyle.cursor = 'default'
      this.imgElement.removeEventListener('click', this.handleRetry)
    },
    // 加载重试
    retry() {
      this.cleanData()
      this.imgStyle.cursor = 'pointer'
      this.imgElement.addEventListener('click', this.handleRetry)
    },
    // imgUrl转canvas，生成base64
    getBase64(index) {
      const img = new Image()
      let base64
      let name
      let base64Arry = {}
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      img.src = this.preloadImgData[index].url
      return new Promise((resolve, reject) => {
        if (this.preloadImgData[index].error !== true) {
          img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            base64 = canvas.toDataURL('image/jpeg')
            name = this.preloadImgData[index].title
            base64Arry = {
              base64: base64,
              name: name
            }
            resolve(base64Arry)
          }
          img.onerror = () => {
            reject(false)
          }
        } else { reject(false) }
      })
    }
    // 得到图片blob
    // getBlob(index) {
    //   let base64
    //   this.getBase64(this.imgI).then((s) => {
    //     base64 = s.base64
    //     console.log(base64)
    //     dataURLtoBlob(base64)
    //   }).catch((f) => {
    //     base64 = f
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
.main-enter,
.main-leave-to {
  opacity: 0;
}
.main-enter-active,
.main-leave-active {
  transition: all 0.4s ease;
}
#ImgPreview {
  user-select: none;
  position: fixed;
  z-index: 2015;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.65);

  .title-bar {
    z-index: 2016;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 41px;
    background: rgba(0, 0, 0, 0.65);
    color: #fff;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    .imgName {
      font-size: 12px;
      line-height: 1.5;
      margin: 0 auto;
      padding-left: 56px;
    }
    .close-btn {
      cursor: pointer;
      margin-right: 40px;
      color: #fff;
    }
  }
  .direction-btn {
    position: absolute;
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: #fff;
    top: calc(50% - 16px);
    cursor: pointer;
    z-index: 2019;
    svg {
      display: block;
    }
  }
  .pre {
    left: 20px;
  }
  .next {
    right: 20px;
  }
  #imgPreview {
    width: 100%;
    height: 100%;

    .loading {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      svg path,
      svg rect {
        fill: grey;
      }
    }

    .imgContainer {
      position: absolute;
      // border: 1px solid red;
      img {
        position: absolute;
      }
    }
  }

  .tool-bar {
    z-index: 2016;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;

    .menu-group {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      background: rgba(0, 0, 0, 0.65);
      height: 50px;
      margin: 0 auto;
      border-radius: 7px 7px 0 0;
      color: #fff;
      font-size: 34px;
      div {
        cursor: pointer;
        margin: 0 10px;
      }
    }
  }
}

</style>
