import Layout from '@/layout'

export default {
  path: '/document-services',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  meta: {
    title: '文件服务',
    icon: 'folder'
  },
  children: [
    // 文件管理
    {
      path: '/off-file-d',
      name: 'OffFileD',
      component: () => import('@/views/document-services/off-file-d/index'),
      meta: {
        title: '文件管理',
        icon: 'spot'
      }
    },
    // 文件管理
    {
      path: '/shared-files',
      name: 'SharedFiles',
      component: () => import('@/views/document-services/shared-files/index'),
      meta: {
        title: '被分享文件',
        icon: 'spot'
      }
    }
  ]
}
