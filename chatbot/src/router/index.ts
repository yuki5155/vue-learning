import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/ChatPage.vue')
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import('../views/MyPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 