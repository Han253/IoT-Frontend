import { RouteRecordRaw } from 'vue-router'
import categoryRoutes from './routes/categories'
import deviceRoutes from './routes/devices'
import environmentRoutes from './routes/environments'
import propertyRoutes from './routes/properties'
import resourceRoutes from './routes/resources'
import representationRoutes from './routes/selfrepresentation'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('pages/IndexPage.vue'),
      },
      ...categoryRoutes,
      ...deviceRoutes,
      ...representationRoutes,
      ...environmentRoutes,
      ...propertyRoutes,
      ...resourceRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
