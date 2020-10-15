import Vue from 'vue'

import components from '@/utils/components.js'
Vue.use(components)

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition' // elementUi内置折叠组件
Vue.component(CollapseTransition.name, CollapseTransition)
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import './routerBefore'
import App from './App'
import store from './store'
import router from './router'
import locale from '@/assets/locale/cn.js'
import './icons' // icon
// import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import {
  handleConfirm,
  msgSuccess,
  msgError,
  msgWarning,
  getSessionstorage,
  setSessionstorage
} from './utils/message'
// import vueSticky from './directive/sticky'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
// 全局方法挂载
Vue.prototype.$msgSuccess = msgSuccess

Vue.prototype.$msgError = msgError

Vue.prototype.$msgConfirm = handleConfirm
Vue.prototype.$msgWarning = msgWarning
Vue.prototype.$msgInfo = function(msg) {
  this.$message.info(msg)
}
Vue.prototype.$getSessionStorage = getSessionstorage
Vue.prototype.$setSessionStorage = setSessionstorage
Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  locale: locale
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

export const myVue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
