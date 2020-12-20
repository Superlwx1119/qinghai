import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  // 用户列表
  userManagement: {
    page: ips + '/admin/web/user/page', // 查询用户列表
    excel: ips + '/admin/export/excel', // 导出数据
    adminRoleId: ips + '/admin/web/secRole/units/adminRoleId', // 查询角色id
    beforeFact: ips + '/admin/web/beforeFact', // 请求接口之前的请求
    user: ips + '/admin/web/user/', // 新增用户名
    updateUser: ips + '/admin/web/user/updateUser', // 修改用户
    uactStat: ips + '/admin/web/user/uactStat' // 启用禁用
  },
  // 子系统
  subsystemManagement: {
    sysSubsysD: ips + '/admin/web/subsys/sysSubsysD/page', // 查询子系统
    addSysSubsysD: ips + '/admin/web/subsys/sysSubsysD', // 保存子系统
    updateSubsys: ips + '/admin/web/subsys/sysSubsysD/updateSubsys', // 修改子系统
    delSubsys: ips + '/admin/web/subsys/sysSubsysD/delSubsys' // 删除
  },
  // 资源管理
  resourceManagement: {
    menuElet: ips + '/admin/web/sysResuD/tree/menuElet', // 资源管理资源树
    sysResuD: ips + '/admin/web/sysResuD', // 菜单详情查询
    sysr: ips + '/admin/web/sysResuD/sysr', // 查询功能列表，功能详情
    updateResu: ips + '/admin/web/sysResuD/updateResu', // 修改菜单
    del: ips + '/admin/web/sysResuD/del', // 删除菜单
    sysAll: ips + '/admin/web/subsys/sysSubsysD/sysAll', // 查询所有子系统
    moveNode: ips + '/admin/web/sysResuD/moveNode' // 移动菜单
  },
  // 安全角色管理
  securityRoleManagement: {
    currentUser: ips + '/admin/web/secRole/tree/currentUser', // 查询根角色（用户的角色信息）
    adminRoles: ips + '/admin/web/secRole/tree/adminRoles', // 查询角色
    secRole: ips + '/admin/web/secRole', // 查询角色信息
    saveSecRole: ips + '/admin/web/secRole/', // 保存角色信息
    updateSecRole: ips + '/admin/web/secRole/updateSecRole',
    units: ips + '/admin/web/secRole/units', // 查询机构
    resource: ips + '/admin/web/secRole/tree/resource', // 查询菜单
    shareResources: ips + '/admin/web/secRole/resources', // 可分配菜单
    conditionBusiRoles: ips + '/admin/web/secRole', // 新增业务角色查询
    delBusiRoles: ips + '/admin/web/secRole/delBusiRoles', // 删除业务角色
    addBusiRoles: ips + '/admin/web/secRole/busiRoles', // 新增业务角色
    securityRoleUsers: ips + '/admin/web/secRole/users', // 查询未关联角色用户
    securityRoleUsersDel: ips + '/admin/web/secRole/delUsers' // 删除关联用户
  },
  systemPassword: {
    password: ips + '/admin/web/user/password' // 修改密码
  },
  // 业务角色管理
  busiroleManagement: {
    busiroleResource: ips + '/admin/web/secRole/tree/resource', // 获取业务角色可选资源
    busiRole: ips + '/admin/web/busiRole',
    busiRolePage: ips + '/admin/web/busiRole/page', // 查询业务角色列表
    busiRoleUser: ips + '/admin/web/busiRole/users', // 查询关联用户get,新增关联用户post
    busiroleResources: ips + '/admin/web/secRole/resources', // 查询业务角色资源
    busiroleUpdate: ips + '/admin/web/busiRole/update', // 保存业务角色信息
    unrelation: ips + '/admin/web/busiRole/users', // 关联用户
    delUsers: ips + '/admin/web/busiRole/delUsers' // 删除用户
  },
  // 组织机构管理
  organizManage: {
    organizManage: ips + '/admin/web/organizManage', // 机构维护
    organizManageUct: ips + '/admin/web/organizManage/uct', // 用户信息
    userpage: ips + '/admin/web/user/userpage', // 用户查询
    orgusers: ips + '/admin/web/organizManage/orgusers', // 添加用户
    uct: ips + '/admin/web/organizManage/uct', // 判断该机构下是否有用户
    orgTree: ips + '/admin/web/organizManage/orgTree', // 删除该树
    orgMage: ips + '/admin/web/organizManage/orgMage' // 修改组织机构信息
  },
  // 菜单收藏
  sysMenuFavD: {
    menu: ips + '/admin/web/menufav/sysMenuFavD/menu', // 已添加菜单查询
    resource: ips + '/admin/web/menufav/sysMenuFavD/tree/resource', // 查询可添加菜单
    saveList: ips + '/admin/web/menufav/sysMenuFavD/saveList', // 保存菜单
    delMenu: ips + '/admin/web/menufav/sysMenuFavD/delMenu', // 删除菜单
    moveUpMenu: ips + '/admin/web/menufav/sysMenuFavD/moveMenu', // 上移数据
    moveDownMenu: ips + '/admin/web/menufav/sysMenuFavD/moveMenu' // 下移数据
  },
  // 重置密码
  resetPassword: {
    reset: ips + '/admin/web/user/password/reset' // 重置密码
  },
  // 解锁账号
  userLock: {
    lock: ips + '/admin/web/user/lock', // 查询锁定账户
    unlock: ips + '/admin/web/user/unlock' // 解锁账户
  },
  // 用户授权日志
  rolePermChgEvt: {
    rolePermChgPage: ips + '/admin/web/rolePermChg/page', // 角色权限变更查询
    orgChgPage: ips + '/admin/web/rolePermChg/orgChgPage', // 组织机构变更查询
    bizrolChgPage: ips + '/admin/web/rolePermChg/bizrolChgPage', // 业务角色变更查询
    admrolChgPage: ips + '/admin/web/rolePermChg/admrolChgPage', // 管理角色变更查询
    roleAcctChgPage: ips + '/admin/web/rolePermChg/roleAcctChgPage', // 角色账号变更日志查询
    resuChgPage: ips + '/admin/web/rolePermChg/resuChgPage' // 资源变更
  },
  // 系统安全日志
  securityLog: {
    uactLckPage: ips + '/admin/web/securityLog/sysLginLog/uactLckPage', // 账号锁定日志
    pwdChgPage: ips + '/admin/web/securityLog/sysLginLog/pwdChgPage', // 密码变更日志
    loginPage: ips + '/admin/web/securityLog/sysLginLog/page', // 账号登录日志
    uactChgPage: ips + '/admin/web/securityLog/sysLginLog/uactChgPage' // 账号变更日志
  },
  // 用户权限管理
  userPrivilege: {
    sub: ips + '/admin/web/secRole/units/-1/sub', // 获取组织机构,
    one: ips + '/admin/web/busiRole/list/user', // 查询外面的表格数据
    anotherOne: ips + '/admin/web/secRole/uactId', // 查询外面的表格数据
    rolePermissions: ips + '/admin/web/secRole/tree/resource' // 查询角色权限信息
  }
}
