import Vue from 'vue'
import Router from 'vue-router'
import { synthesize } from '@/router/synthesize'
import RouterOne from '@/router/modules/index'
import RouterTow from '@/router/modules/index1'

/**
 * hidden: true                   是否显示在侧边栏，true：不显示；false或者不填为显示
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
   role: ['admin','editor']     will control the page role (you can set multiple roles)
   title: 'title'               the name show in submenu and breadcrumb (recommend set)
   icon: 'svg-name'             the icon show in the sidebar,
   noCache: true                if fasle ,the page will no be cached(default is false)
 }
 **/

Vue.use(Router)
/* Layout */
const RouterMap = synthesize([RouterOne, RouterTow], 'constant');

export const constantRouterMap = RouterMap.constant;

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = RouterMap.async;
