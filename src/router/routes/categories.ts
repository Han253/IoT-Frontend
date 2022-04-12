import { RouteRecordRaw } from 'vue-router'

const categoryRoutes: RouteRecordRaw[] = [
  {
    path: 'categories',
    name: 'categories.index',
    component: () => import('../../pages/categories/CategoryIndex.vue'),
  },
]

export default categoryRoutes
