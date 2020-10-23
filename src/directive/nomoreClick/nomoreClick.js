// 点击三秒禁用
export default {
  bind(el, binding, vnode) {
    el.addEventListener('click', e => {
      el.classList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.classList.remove('is-disabled')
      }, 1000)
    })
  }
}
