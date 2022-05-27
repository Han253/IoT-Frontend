import { RouteRecordRaw } from 'vue-router'

const environmentRoutes: RouteRecordRaw[] = [
  {
    path: 'environments',
    name: 'environments.index',
    component: () => import('../../pages/environments/EnvironmentIndex.vue'),
  },
  {
    path: 'environments/:id',
    name: 'environments.details',
    component: () => import('../../pages/environments/EnvironmentDetails.vue'),
  },
]

export default environmentRoutes
