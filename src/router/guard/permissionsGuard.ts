import { RouteLocationNormalized, Router, RouteRecordRaw } from 'vue-router'
import { useRoutesStoreHook } from '@/store/modules/routes'
import { asyncRoutes } from '..'
import { filterAsyncRoutes } from '@/hooks/permission/usePermission'
import tools from '@/plugins/tools'
import usePermissionStore from '@/store/modules/permissions'

function asyncRoutesGuard(asyncRoutes: RouteRecordRaw[], router: Router) {
  let isMounted: boolean,
    accessRoutes: RouteRecordRaw[] = []

  function removeRoutes(routes: RouteRecordRaw[]) {
    routes.forEach((route) => {
      if (route.name) {
        router.removeRoute(route.name)
        return
      }
      if (route.children) {
        removeRoutes(route.children)
      }
    })
  }

  /**
   * 给路由meta属性添加一个默认值为false的affix属性
   * @date 2022-11-03
   * @param {*} routes
   * @returns routes
   */
  function addAffix(routes: any) {
    routes.forEach((route: any) => {
      if (typeof route.meta?.affix === 'undefined') {
        route.meta = {
          ...route.meta,
          affix: false,
        }
      }
      if (route.children) {
        route.children = addAffix(route.children)
      }
    })

    return routes
  }

  return async function routesGuard(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const token = tools.getStore('admin_token')
    const routesStore = useRoutesStoreHook()
    if (token) {
      if (!isMounted) {
        await usePermissionStore().getPermissions()
        accessRoutes = filterAsyncRoutes(asyncRoutes)
        addAffix(accessRoutes)
        // 挂载异步路由
        accessRoutes.forEach((route) => {
          router.addRoute(route)
        })

        routesStore.setRoutes(accessRoutes)

        let hasHomeRoute = routesStore.routes.some(
          (route) => route.path === '/' || (route.name as string)?.toLowerCase() === 'home'
        )

        if (!hasHomeRoute) {
          // 添加首页
          router.addRoute({ name: 'home', path: '/', redirect: routesStore.routes[0].path })
          // 首页路由添加固钉
          router.addRoute({ ...routesStore.routes[0], meta: { ...routesStore.routes[0].meta, affix: true } })

          hasHomeRoute = true
        }

        isMounted = true

        // 404跳回首页
        if (to.path === '/404' && hasHomeRoute) {
          return { name: 'home' }
        }

        // 可能要去的页面没有权限，发生在账号切换的时候
        if (to.name) {
          if (!router.hasRoute(to.name) && hasHomeRoute) {
            return { name: 'home' }
          }
        }

        return { path: to.fullPath }
      }
    } else {
      removeRoutes(accessRoutes)
      isMounted = false
    }
  }
}

export async function createPermissionGuard(router: Router) {
  router.beforeEach(asyncRoutesGuard(asyncRoutes, router))
}
