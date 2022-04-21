import { RouteRecordRaw } from 'vue-router'

const deviceRoutes: RouteRecordRaw[] = [
  {
    path: 'devices',
    name: 'devices.index',
    component: () => import('../../pages/devices/DeviceIndex.vue'),
  },
  {
    path: 'devices/register',
    name: 'devices.form',
    component: () => import('../../pages/devices/RegisterDevice.vue'),
  },
  {
    path: 'devices/:id',
    name: 'devices.details',
    component: () => import('../../pages/devices/DeviceDetails.vue'),
  },
]

export default deviceRoutes
