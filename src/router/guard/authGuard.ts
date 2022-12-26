import tools from '@/plugins/tools'
import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'

function authGuard() {
  const whiteList = ['Login']

  return function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const token = tools.getStore('admin_token')

    if (whiteList.includes(String(to.name))) {
      next()
    } else {
      if (token) {
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`)
      }
    }
  }
}

export function createAuthGuard(router: Router) {
  router.beforeEach(authGuard())
}
