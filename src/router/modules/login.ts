import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      hidden: true
    }
  }
]

export default routes
