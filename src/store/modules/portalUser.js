// import {
//   getMenuList
// } from '@/api/portal-user'
// import permissionMenu from '@/utils/config-menu'
import publicCode from '@/data/code.js'
const state = {
  menulist: [],
  sysIndex: 0,
  sliderBarList: [],
  publicCode: publicCode
}
// const mutations = {
//   SET_MENU_LIST: (state, menulist) => {
//     const arr = [...menulist]
//     arr.push(permissionMenu)
//     state.menulist = arr
//   },
//   CHANGE_SYS: (state, sysIndex) => {
//     state.sysIndex = sysIndex
//     state.menulist.forEach(item => {
//       if (item.id === sysIndex) {
//         state.sliderBarList = item
//       }
//     })
//   }
// }
// const actions = {
//   getMenuList({
//     commit
//   }) {
//     const params = {}
//     return new Promise((resolve, reject) => {
//       getMenuList(params).then(response => {
//         if (response.code === 0) {
//           if (response.data.length !== 0) {
//             commit('SET_MENU_LIST', response.data)
//             commit('CHANGE_SYS', response.data[0].id)
//           }
//         }
//         resolve(response)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   }
// }
export default {
  state
//   mutations,
//   actions
}
