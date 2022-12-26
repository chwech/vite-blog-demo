import tools from '@/plugins/tools'
import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'

export function createLoginGuard(router: Router) {
  function loginGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if (String(to.name).toLowerCase() === 'login') {
      tools.removeStore('admin_token')
    }
    next()
  }
  router.beforeEach(loginGuard)
}
