import { RouteRecordRaw } from 'vue-router'

const resourceRoutes: RouteRecordRaw[] = [
  {
    path: 'resources/register',
    name: 'resources.form',
    component: () => import('../../pages/resources/RegisterResource.vue'),
  },
  {
    path: 'resources/:id/edit',
    name: 'resources.edit',
    component: () => import('../../pages/resources/RegisterResource.vue'),
  },
  {
    path: 'resources/:id',
    name: 'resources.details',
    component: () => import('../../pages/resources/ResourceDetails.vue'),
  },
]

export default resourceRoutes
