import request, { fileService } from '@/utils/request'
import ApiUrl from './api'
// 查询用户列表
export function page(params) {
  return request({
    url: ApiUrl.userManagement.page,
    method: 'get',
    params: params
  })
}
// 导出数据
export function excel(params) {
  return fileService({
    url: ApiUrl.userManagement.excel + '/' + params.resuName,
    responseType: 'blob',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      withCredentials: true
    },
    method: 'post',
    data: params.params
  })
}
export function adminRoleId() {
  return request({
    url: ApiUrl.userManagement.adminRoleId,
    method: 'get'
  })
}
export function beforeFact(params) {
  return request({
    url: ApiUrl.userManagement.beforeFact,
    method: 'get',
    params: params
  })
}
// uactStat启用禁用
export function uactStat(data) {
  return request({
    url: ApiUrl.userManagement.uactStat,
    method: 'post',
    data
  })
}
// 新增用户
export function user(data) {
  return request({
    url: ApiUrl.userManagement.user,
    method: 'post',
    data
  })
}
// 修改用户
export function updateUser(data) {
  return request({
    url: ApiUrl.userManagement.updateUser,
    method: 'post',
    data
  })
}
// 查询子系统
export function sysSubsysD(params) {
  return request({
    url: ApiUrl.subsystemManagement.sysSubsysD,
    method: 'get',
    params: params
  })
}
// delSubsys删除子系统
export function delSubsys(data) {
  return request({
    url: ApiUrl.subsystemManagement.delSubsys + '/' + data,
    method: 'get'
  })
}
// addSysSubsysD新增子系统
export function addSysSubsysD(data) {
  return request({
    url: ApiUrl.subsystemManagement.addSysSubsysD,
    method: 'post',
    data
  })
}
// updateSubsys修改子系统
export function updateSubsys(data) {
  return request({
    url: ApiUrl.subsystemManagement.updateSubsys,
    method: 'post',
    data
  })
}
// 查询资源树
export function menuElet(params) {
  return request({
    url: ApiUrl.resourceManagement.menuElet,
    method: 'get',
    params: params
  })
}
// 查询菜单详情
export function sysResuD(params) {
  return request({
    url: ApiUrl.resourceManagement.sysResuD + '/' + params,
    method: 'get'
  })
}
// 新增菜单
export function addSysResuD(data) {
  return request({
    url: ApiUrl.resourceManagement.sysResuD,
    method: 'post',
    data
  })
}
// 修改菜单
export function updateResu(data) {
  return request({
    url: ApiUrl.resourceManagement.updateResu,
    method: 'post',
    data
  })
}
// 删除菜单
export function delResource(data) {
  return request({
    url: ApiUrl.resourceManagement.del + '/' + data,
    method: 'get'
  })
}
// 修改菜单
export function moveNode(data) {
  return request({
    url: ApiUrl.resourceManagement.moveNode,
    method: 'post',
    data
  })
}
// 获取所有子系统
export function sysAll() {
  return request({
    url: ApiUrl.resourceManagement.sysAll,
    method: 'get'
  })
}
// 查询功能列表
export function sysr(params) {
  return request({
    url: ApiUrl.resourceManagement.sysr + '/' + params,
    method: 'get'
  })
}
// 安全角色根角色
export function currentUser() {
  return request({
    url: ApiUrl.securityRoleManagement.currentUser,
    method: 'get'
  })
}
// 安全角色
export function adminRoles(params) {
  return request({
    url: ApiUrl.securityRoleManagement.adminRoles,
    method: 'get',
    params: params
  })
}
// 安全角色信息
export function secRole(params) {
  return request({
    url: ApiUrl.securityRoleManagement.secRole + '/' + params,
    method: 'get'
  })
}
// 删除安全角色

export function delSecRole(params) {
  return request({
    url: ApiUrl.securityRoleManagement.saveSecRole + params,
    method: 'post'
  })
}
// 保存安全角色
export function saveSecRole(data) {
  return request({
    url: ApiUrl.securityRoleManagement.saveSecRole,
    method: 'post',
    data
  })
}
// 修改安全角色
export function updateSecRole(data) {
  return request({
    url: ApiUrl.securityRoleManagement.updateSecRole,
    method: 'post',
    data
  })
}
// 安全角色信息
export function secRoleBusirole(params, data) {
  return request({
    url: ApiUrl.securityRoleManagement.secRole + '/' + params + '/busiRoles',
    method: 'get',
    params: data
  })
}
// 获取角色菜单信息
export function resourceTree(params) {
  return request({
    url: ApiUrl.securityRoleManagement.shareResources,
    method: 'get',
    params: params
  })
}
// 查询未关联角色账户
export function securityRoleUsers(params) {
  return request({
    url: ApiUrl.securityRoleManagement.securityRoleUsers,
    method: 'get',
    params: params
  })
}
// 保存未关联角色账户
export function securityRoleUsersSave(data) {
  return request({
    url: ApiUrl.securityRoleManagement.securityRoleUsers,
    method: 'post',
    data
  })
}

// 保存可分配菜单
export function shareResources(data) {
  return request({
    url: ApiUrl.securityRoleManagement.shareResources,
    method: 'post',
    data: data
  })
}
// 组织机构查询
export function units(params) {
  return request({
    url: ApiUrl.securityRoleManagement.units + '/' + params,
    method: 'get'
  })
}
// 安全角色组织机构保存
export function saveUnits(data) {
  return request({
    url: ApiUrl.securityRoleManagement.units,
    method: 'post',
    data
  })
}
// 安全角色业务角色查询
export function conditionBusiRoles(data) {
  return request({
    url: ApiUrl.securityRoleManagement.conditionBusiRoles + '/' + data.roleId + '/condition/busiRoles',
    method: 'get',
    params: data.params
  })
}
// 删除安全角色用户
export function securityRoleUsersDel(data) {
  return request({
    url: ApiUrl.securityRoleManagement.securityRoleUsersDel,
    method: 'POST',
    data
  })
}
// 安全角色业务角色SHANC
export function delBusiRoles(data) {
  return request({
    url: ApiUrl.securityRoleManagement.delBusiRoles,
    method: 'post',
    data
  })
}

// 安全角色新增业务角色
export function addBusiRoles(data) {
  return request({
    url: ApiUrl.securityRoleManagement.addBusiRoles,
    method: 'post',
    data
  })
}

// 修改密码
export function password(data) {
  return request({
    url: ApiUrl.systemPassword.password,
    method: 'post',
    data
  })
}
// 业务角色列表
export function busiRolePage(params) {
  return request({
    url: ApiUrl.busiroleManagement.busiRolePage,
    method: 'get',
    params: params
  })
}
// 业务角色关联账户
export function busiRoleUser(params, data) {
  return request({
    url: ApiUrl.busiroleManagement.busiRoleUser + '/' + params + '/relation',
    method: 'get',
    params: data
  })
}
// 新增业务角色关联用户
export function busiRoleUserSave(data) {
  return request({
    url: ApiUrl.busiroleManagement.busiRoleUser,
    method: 'post',
    data
  })
}
// 业务角色详细信息
export function busiRole(params) {
  return request({
    url: ApiUrl.busiroleManagement.busiRole + '/' + params,
    method: 'get'
  })
}
// 删除业务角色
export function busiRoleDelete(params) {
  return request({
    url: ApiUrl.busiroleManagement.busiRole + '/' + params,
    method: 'post'
  })
}
// 新增业务角色
export function busiRoleAdd(data) {
  return request({
    url: ApiUrl.busiroleManagement.busiRole + '/',
    method: 'post',
    data
  })
}
// 查询业务角色可选资源
export function busiroleResource(params) {
  return request({
    url: ApiUrl.busiroleManagement.busiroleResource,
    method: 'get',
    params: params
  })
}
// 查询业务角色关联列表
export function busiroleResources(params) {
  return request({
    url: ApiUrl.busiroleManagement.busiroleResources,
    method: 'get',
    params: params
  })
}
// 保存业务角色信息

export function busiroleUpdate(data) {
  return request({
    url: ApiUrl.busiroleManagement.busiroleUpdate,
    method: 'post',
    data
  })
}
// 新增查询未关联用户
export function unrelation(id, params) {
  return request({
    url: ApiUrl.busiroleManagement.unrelation + '/' + id + '/unrelation',
    method: 'get',
    params: params
  })
}
// 删除用户
export function delBusiroleUsers(data) {
  return request({
    url: ApiUrl.busiroleManagement.delUsers,
    method: 'post',
    data
  })
}

// 机构维护信息
export function organizManage(params) {
  return request({
    url: ApiUrl.organizManage.organizManage + '/' + params,
    method: 'get'
  })
}
// 保存机构
export function organizManageSave(data) {
  return request({
    url: ApiUrl.organizManage.organizManage,
    method: 'post',
    data
  })
}

// orgMage修改机构
export function orgMage(data) {
  return request({
    url: ApiUrl.organizManage.orgMage,
    method: 'post',
    data
  })
}
// 机构用户信息
export function organizManageUct(params) {
  return request({
    url: ApiUrl.organizManage.organizManageUct + '/' + params,
    method: 'get'
  })
}
// 机构用户信息查询可选列表
export function userpage(params) {
  return request({
    url: ApiUrl.organizManage.userpage,
    method: 'get',
    params: params
  })
}
// 机构用户信息选择添加用户
export function orgusers(data) {
  return request({
    url: ApiUrl.organizManage.orgusers,
    method: 'post',
    data
  })
}
// 删除组织机构查询该机构下是否有用户
export function uct(params) {
  return request({
    url: ApiUrl.organizManage.uct + '/' + params,
    method: 'get'
  })
}
// 删除组织机构删除机构
export function orgTree(params) {
  return request({
    url: ApiUrl.organizManage.orgTree + '/' + params,
    method: 'get'
  })
}
// 菜单收藏
export function sysMenuFavD(params) {
  return request({
    url: ApiUrl.sysMenuFavD.menu,
    method: 'get',
    params: params
  })
}
// 可选菜单收藏
export function resource(params) {
  return request({
    url: ApiUrl.sysMenuFavD.resource,
    method: 'get',
    params: params
  })
}
// 保存菜单收藏
export function saveList(data) {
  return request({
    url: ApiUrl.sysMenuFavD.saveList,
    method: 'post',
    data
  })
}
// shanchu菜单收藏
export function delMenu(data) {
  return request({
    url: ApiUrl.sysMenuFavD.delMenu + `/${data}`,
    method: 'get'
  })
}
// 上移数据
export function moveUpMenu(data) {
  return request({
    url: ApiUrl.sysMenuFavD.moveUpMenu,
    method: 'post',
    data
  })
}
// 下移数据
export function moveDownMenu(data) {
  return request({
    url: ApiUrl.sysMenuFavD.moveDownMenu,
    method: 'post',
    data
  })
}
// 重置密码
export function resetPassword(data) {
  return request({
    url: ApiUrl.resetPassword.reset,
    method: 'post',
    data
  })
}
// 查询锁定账号
export function userLock(params) {
  return request({
    url: ApiUrl.userLock.lock,
    method: 'get',
    params: params
  })
}
// 解锁账号
export function userUnlock(params) {
  return request({
    url: ApiUrl.userLock.unlock + '/' + params,
    method: 'post'
  })
}
// 角色权限变更查询
export function rolePermChgPage(params) {
  return request({
    url: ApiUrl.rolePermChgEvt.rolePermChgPage,
    method: 'get',
    params: params
  })
}
// 角色账号变更查询
export function roleAcctChgPage(params) {
  return request({
    url: ApiUrl.rolePermChgEvt.roleAcctChgPage,
    method: 'get',
    params: params
  })
}
// 组织机构变更查询
export function orgChgPage(params) {
  return request({
    url: ApiUrl.rolePermChgEvt.orgChgPage,
    method: 'get',
    params: params
  })
}
// 业务角色变更查询
export function bizrolChgPage(params) {
  return request({
    url: ApiUrl.rolePermChgEvt.bizrolChgPage,
    method: 'get',
    params: params
  })
}
// 管理角色变更查询
export function admrolChgPage(params) {
  return request({
    url: ApiUrl.rolePermChgEvt.admrolChgPage,
    method: 'get',
    params: params
  })
}
// 管理角色变更查询
export function resuChgPage(params) {
  return request({
    url: ApiUrl.rolePermChgEvt.resuChgPage,
    method: 'get',
    params: params
  })
}

// 账号变更日志
export function uactChgPage(params) {
  return request({
    url: ApiUrl.securityLog.uactChgPage,
    method: 'get',
    params: params
  })
}
// 账号锁定日志
export function uactLckPage(params) {
  return request({
    url: ApiUrl.securityLog.uactLckPage,
    method: 'get',
    params: params
  })
}
// 密码变更日志
export function pwdChgPage(params) {
  return request({
    url: ApiUrl.securityLog.pwdChgPage,
    method: 'get',
    params: params
  })
}
// 账号登录日志
export function loginPage(params) {
  return request({
    url: ApiUrl.securityLog.loginPage,
    method: 'get',
    params: params
  })
}
export default {
  resuChgPage,
  delMenu,
  uactChgPage,
  uactLckPage,
  pwdChgPage,
  loginPage,
  bizrolChgPage,
  admrolChgPage,
  orgChgPage,
  roleAcctChgPage,
  rolePermChgPage,
  updateResu,
  securityRoleUsersDel,
  securityRoleUsersSave,
  securityRoleUsers,
  delBusiroleUsers,
  busiRoleUserSave,
  unrelation,
  busiroleUpdate,
  busiroleResource,
  saveSecRole,
  updateSecRole,
  delSecRole,
  busiRoleAdd,
  currentUser,
  addBusiRoles,
  delBusiRoles,
  conditionBusiRoles,
  saveUnits,
  shareResources,
  userLock,
  userUnlock,
  resetPassword,
  busiroleResources,
  busiRoleUser,
  busiRole,
  busiRolePage,
  secRoleBusirole,
  resourceTree,
  moveNode,
  delResource,
  sysAll,
  addSysResuD,
  updateSubsys,
  delSubsys,
  addSysSubsysD,
  uactStat,
  orgMage,
  uct,
  orgTree,
  orgusers,
  userpage,
  resource,
  page,
  adminRoleId,
  excel,
  beforeFact,
  user,
  updateUser,
  sysSubsysD,
  menuElet,
  sysResuD,
  adminRoles,
  secRole,
  units,
  organizManage,
  sysMenuFavD,
  saveList,
  busiRoleDelete
}
