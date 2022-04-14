import { createRouter, createWebHistory, RouteRecordRaw, Router, RouterMatcher } from 'vue-router'

type RouterInstance = Router & {
  matcher?: RouterMatcher[]
}

const files = require.context('./modules/', false, /\.ts$/),
  modules = files.keys().map(key => {
    return files(key).default[0]
  })
modules.push({ path: '/:pathMatch(.*)', redirect: '/404', hidden: true })
// TODO: 修改为实际的首页
modules.push({ path: '/', redirect: '/nested' })
export const constantRoutes: Array<RouteRecordRaw> = modules

const createRouterHandler = () => createRouter({
    routes: constantRoutes,
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior () {
      return {
        top: 0
      }
    }
  }),

  router:RouterInstance = createRouterHandler()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter:RouterInstance = createRouterHandler()
  router.matcher = newRouter.matcher // reset router
}

export default router
