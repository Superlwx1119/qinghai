import Layout from '@/layout'
// import SystemManage from './SystemManage/index' // 单位托管

export default {
  path: '/cms',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  meta: {
    title: 'CMS管理',
    icon: 'folder'
  },
  children: [ // cms系统页面
    // CMS模板编辑
    {
      path: '/cms-tmpl',
      name: 'CmsTmpl',
      component: () => import('@/views/cms-management/cms-tmpl/index'),
      meta: {
        title: 'CMS模板编辑',
        icon: 'spot'
      }
    },
    // CMS模板审批
    {
      path: '/cms-tmpl-appl',
      name: 'CmsTmplAppl',
      component: () => import('@/views/cms-management/cms-tmpl-appl/index'),
      meta: {
        title: 'CMS模板审批',
        icon: 'spot'
      }
    },
    // CMS栏目编辑
    {
      path: '/cms-col',
      name: 'CmsCol',
      component: () => import('@/views/cms-management/cms-col/index'),
      meta: {
        title: 'CMS栏目编辑',
        icon: 'spot'
      }
    },
    // CMS栏目审批
    {
      path: '/cms-col-appl',
      name: 'CmsColAppl',
      component: () => import('@/views/cms-management/cms-col-appl/index'),
      meta: {
        title: 'CMS栏目审批',
        icon: 'spot'
      }
    },
    // CMS栏目内容编辑
    {
      path: '/cms-col-cont',
      name: 'CmsColCont',
      component: () => import('@/views/cms-management/cms-col-cont/index'),
      meta: {
        title: 'CMS栏目内容编辑',
        icon: 'spot'
      }
    },
    // CMS栏目内容审批
    {
      path: '/cms-col-cont-appl',
      name: 'CmsColContAppl',
      component: () => import('@/views/cms-management/cms-col-cont-appl/index'),
      meta: {
        title: 'CMS栏目内容审批',
        icon: 'spot'
      }
    }
  ]
}
