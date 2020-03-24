import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '个人申报情况',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '申报明细填写', icon: 'form' }
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    name: 'person',
    meta: { title: '人员管理', icon: 'renyuanguanli' },
    children: [
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/person/report/index'),
        meta: { title: '申报人员管理', icon: 'renyuan' }
      },
      {
        path: 'evaluation',
        name: 'evaluation',
        component: () => import('@/views/person/evaluation/index'),
        meta: { title: '打分人员管理', icon: 'pingjia' }
      }
    ]
  },
  {
    path: '/prize',
    component: Layout,
    name: 'prize',
    children: [
      {
        path: 'index',
        name: 'prizeIndex',
        component: () => import('@/views/prize/index'),
        meta: { title: '奖项管理', icon: 'jiangxiang' }
      }
    ]
  },
  {
    path: '/score',
    component: Layout,
    name: 'score',
    children: [
      {
        path: 'index',
        name: 'scoreIndex',
        component: () => import('@/views/score/index'),
        meta: { title: '评优评先', icon: 'pingjia' }
      }
    ]
  },
  {
    path: '/result',
    component: Layout,
    name: 'result',
    children: [
      {
        path: 'index',
        name: 'resultIndex',
        component: () => import('@/views/result/index'),
        meta: { title: '打分结果', icon: 'shujujieguotongji' }
      }
    ]
  },
  {
    path: '/delete',
    component: Layout,
    name: 'delete',
    children: [
      {
        path: 'index',
        name: 'deleteIndex',
        component: () => import('@/views/delete/index'),
        meta: { title: '修改评选资格', icon: 'delete' }
      }
    ]
  },
  {
    path: '/mine',
    component: Layout,
    name: 'mine',
    children: [
      {
        path: 'index',
        name: 'mine',
        component: () => import('@/views/mine/index'),
        meta: { title: '我的', icon: 'wode' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
