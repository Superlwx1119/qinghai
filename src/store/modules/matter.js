const state = {
  matter: {},
  flag: false
}
const mutations = {
  ADD_MATTER: (state, matter) => {
    state.matter = matter
  },
  CLOSE_RIGHTPANEL: (state, flag) => {
    state.flag = flag
  }
}

const actions = {
  addMatter({ commit }, matter) {
    commit('ADD_MATTER', matter)
  },
  closeRightpanel({ commit }, flag) {
    commit('CLOSE_RIGHTPANEL', flag)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
