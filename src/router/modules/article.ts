import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/article',
    component: Layout,
    meta: {
    },
    children: [
      {
        path: '',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '文章管理'
        }
      }
    ]
  }
]

export default routes
