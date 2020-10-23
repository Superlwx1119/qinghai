import nomoreClick from './nomoreClick'

const install = function(Vue) {
  Vue.directive('v-nomoreClick', nomoreClick)
}

if (window.Vue) {
  window['nomoreClick'] = nomoreClick
  Vue.use(install); // eslint-disable-line
}

nomoreClick.install = install
export default nomoreClick
