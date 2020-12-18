import Layout from '@/layout'

export default {
  path: '/address-book-management',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  meta: {
    title: '通讯录管理',
    icon: 'folder'
  },
  children: [
    // 通讯录查询
    {
      path: '/off-addrbook-b',
      name: 'OffAddrbookB',
      component: () => import('@/views/address-book-management/off-addrbook-b/index'),
      meta: {
        title: '通讯录查询',
        icon: 'spot'
      }
    },
    // 通讯录组维护
    {
      path: '/off-addrbook-grp-d',
      name: 'OffAddrbookGrpB',
      component: () => import('@/views/address-book-management/off-addrbook-grp-d/index'),
      meta: {
        title: '通讯录组维护',
        icon: 'spot'
      }
    }
  ]
}
