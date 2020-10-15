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
      path: '/inquiry',
      name: 'Inquiry',
      component: () => import('@/views/address-book-management/inquiry/index'),
      meta: {
        title: '通讯录查询',
        icon: 'spot'
      }
    },
    // 通讯录组维护
    {
      path: '/maintenance',
      name: 'Maintenance',
      component: () => import('@/views/address-book-management/maintenance/index'),
      meta: {
        title: '通讯录组维护',
        icon: 'spot'
      }
    }
  ]
}
