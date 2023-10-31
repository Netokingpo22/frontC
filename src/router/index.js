import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    { path: "/", redirect: '/home' },
    { path: '/:pathMatch(.*)', redirect: '/home' },
  ]
})

export default router
