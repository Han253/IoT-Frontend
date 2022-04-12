import { RouteRecordRaw } from 'vue-router'

const deviceRoutes: RouteRecordRaw[] = [
  {
    path: 'devices',
    name: 'devices.index',
    component: () => import('../../pages/devices/DeviceIndex.vue'),
  },
]

export default deviceRoutes
