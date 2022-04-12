import { RouteRecordRaw } from 'vue-router'

const environmentRoutes: RouteRecordRaw[] = [
  {
    path: 'environments',
    name: 'environments.index',
    component: () => import('../../pages/environments/EnvironmentIndex.vue'),
  },
]

export default environmentRoutes
