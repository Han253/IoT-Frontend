import { RouteRecordRaw } from 'vue-router'

const topicRoutes: RouteRecordRaw[] = [
  {
    path: 'topics',
    name: 'topics.index',
    component: () => import('../../pages/topics/TopicIndex.vue'),
  },
]

export default topicRoutes
