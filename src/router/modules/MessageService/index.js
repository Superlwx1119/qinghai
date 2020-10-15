import Layout from '@/layout'

export default {
  path: '/message-service',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  meta: {
    title: '消息服务',
    icon: 'folder'
  },
  children: [
    // 站内消息服务
    {
      path: '/station-message-service',
      name: 'StationMessageService',
      component: () => import('@/views/message-service/station-message-service/index'),
      meta: {
        title: '站内消息服务',
        icon: 'spot'
      }
    },
    // 短信消息服务
    {
      path: '/sms-service',
      name: 'SmsService',
      component: () => import('@/views/message-service/sms-service/index'),
      meta: {
        title: '短信消息服务',
        icon: 'spot'
      }
    },
    // 短信消息审批
    {
      path: '/sms-message-approval',
      name: 'SmsMessageApproval',
      component: () => import('@/views/message-service/sms-message-approval/index'),
      meta: {
        title: '短信消息审批',
        icon: 'spot'
      }
    }
  ]
}
