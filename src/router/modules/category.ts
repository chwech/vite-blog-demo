import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/category',
    component: Layout,
    meta: {
    },
    children: [
      {
        path: '',
        component: () => import('@/views/category/index.vue'),
        meta: {
          title: '文章分类'
        }
      }
    ]
  }
]

export default routes
