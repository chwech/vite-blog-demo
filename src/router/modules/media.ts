import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/media',
    component: Layout,
    meta: {
    },
    children: [
      {
        path: '',
        component: () => import('@/views/media/index.vue'),
        meta: {
          title: '媒体库'
        }
      }
    ]
  }
]

export default routes
