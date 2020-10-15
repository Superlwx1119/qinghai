// 资源管理 安全角色 菜单收藏
const state = {
  resourceInfo: {},
  securityRoleId: '', // 安全角色
  subsysList: [] // 子系统菜单
}
const mutations = {
  CHANGE_RESOURCEINFO: (state, data) => {
    state.resourceInfo = data
  },
  // 修改secrutyRoleId
  CHANGE_SECURITYROLEID: (state, data) => {
    console.log(data, 'dayingggg')
    state.securityRoleId = data
  },
  // 删除secriutyRoleId
  REMOVE_SECURITYROLEID: (state) => {
    state.securityRoleId = ''
  },
  CHANGE_SUBSYSLIST: (state, data) => {
    state.subsysList = data
  }
}
export default {
  state,
  mutations
}
