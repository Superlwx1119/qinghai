import Unit from './unit'

const install = function(Vue) {
  Vue.directive('Unit', Unit)
}

if (window.Vue) {
  window.unit = Unit
  Vue.use(install); // eslint-disable-line
}

Unit.install = install
export default Unit
