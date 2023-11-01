import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import Carrera from '../views/Carrera.vue'
import Materia from '../views/Materia.vue'
import Maestro from '../views/Maestro.vue'
import Alumno from '../views/Alumno.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/carrera',
      name: 'carrera',
      component: Carrera
    },
    {
      path: '/materia',
      name: 'materia',
      component: Materia
    },
    {
      path: '/maestro',
      name: 'maestro',
      component: Maestro
    },
    {
      path: '/alumno',
      name: 'alumno',
      component: Alumno
    },
    { path: "/", redirect: '/carrera' },
    { path: '/:pathMatch(.*)', redirect: '/carrera' },
  ]
})

export default router
