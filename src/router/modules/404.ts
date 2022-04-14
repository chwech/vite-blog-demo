import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      hidden: true
    }
  }
]
export default routes
