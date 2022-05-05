import { RouteRecordRaw } from 'vue-router'

const propertyRoutes: RouteRecordRaw[] = [
  {
    path: 'properties/register',
    name: 'properties.form',
    component: () => import('../../pages/properties/RegisterProperty.vue'),
  },
  {
    path: 'properties/:id/edit',
    name: 'properties.edit',
    component: () => import('../../pages/properties/RegisterProperty.vue'),
  },
]

export default propertyRoutes
