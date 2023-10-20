import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LogIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: HomeView
    },
  ]
})

export default router
