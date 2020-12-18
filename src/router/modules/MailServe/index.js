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
      path: '/off-email-send-c',
      name: 'OffEmailSendC',
      component: () => import('@/views/mail-serve/off-email-send-c/index'),
      meta: {
        title: '邮件服务',
        icon: 'spot'
      }
    }
  ]
}
