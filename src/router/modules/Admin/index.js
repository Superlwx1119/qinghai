import Layout from '@/layout'
// import SystemManage from './SystemManage/index' // 单位托管

export default {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'folder'
  },
  children: [
    {
      path: '/organiz/sys-orgunt-d',
      name: 'OrganizSysOrguntD',
      component: () => import('@/views/admin/sys-orgunt-d/index'),
      meta: {
        title: '组织机构管理',
        icon: 'spot'
      }
    },
    // 用户管理
    {
      path: '/user-management',
      name: 'UserManagemenet',
      component: () => import('@/views/admin/user-management/index'),
      meta: {
        title: '用户管理',
        icon: 'spot'
      }
    },
    // 资源管理
    {
      path: '/moulds-mangement/sys-resu-d',
      name: 'MouldsManagementSysResuD',
      component: () => import('@/views/admin/resource-management/index'),
      meta: {
        title: '资源管理',
        icon: 'spot'
      }
    },
    // 子系统管理
    {
      path: '/subsys/sys-subsys-d',
      name: 'SubsysSysSubsysD',
      component: () => import('@/views/admin/subsystem-management/index'),
      meta: {
        title: '子系统管理',
        icon: 'spot'
      }
    },
    // 业务角色管理
    {
      path: '/busirole-management',
      name: 'BusiroleManagement',
      component: () => import('@/views/admin/busirole-management/index'),
      meta: {
        title: '业务角色管理',
        icon: 'spot'
      }
    },
    // 安全角色管理
    {
      path: '/security-role-management',
      name: 'SecurityRoleManagement',
      component: () => import('@/views/admin/security-role-management/index'),
      meta: {
        title: '安全角色管理',
        icon: 'spot'
      }
    },
    // 菜单收藏夹
    {
      path: '/sys-menu-fav-d',
      name: 'sysMenuFavD',
      component: () => import('@/views/admin/sys-menu-fav-d/index'),
      meta: {
        title: '菜单收藏夹',
        icon: 'spot'
      }
    },
    // 密码修改
    {
      path: '/password-change',
      name: 'PasswordChange',
      component: () => import('@/views/admin/password-change/index'),
      meta: {
        title: '密码修改',
        icon: 'spot'
      }
    },
    // 个人信息修改
    {
      path: '/user-information-change',
      name: 'UserInformationChange',
      component: () => import('@/views/admin/user-information-change/index'),
      meta: {
        title: '个人信息修改',
        icon: 'spot'
      }
    },
    // 密码重置
    {
      path: '/password-reset',
      name: 'PasswordReset',
      component: () => import('@/views/admin/password-reset/index'),
      meta: {
        title: '密码重置',
        icon: 'spot'
      }
    },
    //  系统安全日志
    {
      path: '/securityLog-mngr',
      name: 'SecurityLogMngr',
      component: () => import('@/views/admin/securityLog-mngr/index'),
      meta: {
        title: '系统安全日志',
        icon: 'spot'
      }
    },
    // 用户授权日志
    {
      path: '/role-perm-chg-evt',
      name: 'RolePermChgEvt',
      component: () => import('@/views/admin/role-perm-chg-evt/index'),
      meta: {
        title: '用户授权日志',
        icon: 'spot'
      }
    },
    // 用户状态管理
    {
      path: '/user-lock-mngr',
      name: 'userLockMngr',
      component: () => import('@/views/admin/user-lock-mngr/index'),
      meta: {
        title: '用户状态管理',
        icon: 'spot'
      }
    },
    //  用户权限管理
    {
      path: '/user-perm-query-mngr',
      name: 'UserPermQueryMngr',
      component: () => import('@/views/admin/user-perm-query-mngr/index'),
      meta: {
        title: '用户权限管理',
        icon: 'spot'
      }
    },
    //  资源权限管理
    {
      path: '/resu-perm-query-mngr',
      name: 'ResuPermQueryMngr',
      component: () => import('@/views/admin/resu-perm-query-mngr/index'),
      meta: {
        title: '资源权限管理',
        icon: 'spot'
      }
    }
  ]
}
