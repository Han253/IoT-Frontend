import { RouteRecordRaw } from 'vue-router'

const topicRoutes: RouteRecordRaw[] = [
  {
    path: 'selfrepresentation',
    name: 'selfrepresentation.index',
    component: () => import('../../pages/selfrepresentation/SelfIndex.vue'),
  },
]

export default topicRoutes
