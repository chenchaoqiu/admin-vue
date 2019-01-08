import { role, roles } from '@/utils/role'
import Layout from '@/views/layout/Layout'

const RouterOne = {
  constantRouterMap: [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
    { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
    { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true }
  ],
  asyncRouterMap: [
    {
      path: '/error-log',
      component: Layout,
      redirect: 'noredirect',
      children: [{ path: 'log', component: () => import('@/views/errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
}

export default RouterOne;
