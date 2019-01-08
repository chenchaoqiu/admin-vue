import { role, roles } from '@/utils/role'
import Layout from '@/views/layout/Layout'

const RouterTow = {
  constantRouterMap: [
    {
      path: '/',
      component: Layout,
      redirect: 'index',
      meta: {
        title: '首页',
        icon: 'dashboard'
      },
      children: [
        { path: 'index', component: () => import('@/views/salePackage/index'), name: '首页',
          meta: { title: '首页', icon: 'gk', noCache: true, role: (role[0]) }}
      ],
      hidden: roles(role[0])
    }
  ],
  asyncRouterMap: [
    {
      path: '/error',
      component: Layout,
      redirect: 'noredirect',
      name: 'errorPages',
      meta: {
        title: '错误页面',
        icon: '404'
      },
      children: [
        { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: '401', noCache: true }},
        { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: '404', noCache: true }}
      ]
    }
  ]
}

export default RouterTow;
