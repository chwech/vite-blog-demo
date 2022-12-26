import { useUserStore } from '@/store/modules/user'
import { RouteLocationNormalized, Router } from 'vue-router'

export function createIsKeepLoginGuard(router: Router) {
  function isKeepLoginGuard(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const rememberMe = useUserStore().user.remember_me
    if (!rememberMe) {
      const inSession = sessionStorage.getItem('research_admin_session')
      if (!inSession) {
        if (String(to.name).toLowerCase() !== 'login') {
          return { name: 'Login', query: { redirect: to.fullPath } }
        }
      }
    }
  }
  router.beforeEach(isKeepLoginGuard)
}
