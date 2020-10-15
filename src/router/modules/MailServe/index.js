import Layout from '@/layout'

export default {
  path: '/mail-serve',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  meta: {
    title: '邮件服务',
    icon: 'folder'
  },
  children: [
    // 邮件服务
    {
      path: '/mail-serve-child',
      name: 'MailServeChild',
      component: () => import('@/views/mail-serve/mail-serve-child/index'),
      meta: {
        title: '邮件服务',
        icon: 'spot'
      }
    }
  ]
}
