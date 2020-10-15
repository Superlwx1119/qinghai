const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  matter: state => state.matter.matter,
  publicCode: state => state.portalUser.publicCode,
  resourceInfo: state => state.resource.resourceInfo,
  subsysList: state => state.resource.subsysList,
  securityRoleId: state => state.resource.securityRoleId
}
export default getters
