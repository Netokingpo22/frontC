import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import Carrera from '../views/Carrera.vue'
import Materia from '../views/Materia.vue'
import Maestro from '../views/Maestro.vue'
import Alumno from '../views/Alumno.vue'
import Aula from '../views/Aula.vue'
import IntDidactica from '../views/IntDidactica.vue'
import Competencia from '../views/Competencia.vue'
import Grupo from '../views/Grupo.vue'
import Clase from '../views/Clase.vue'
import AlumnoClase from '../views/AlumnoClase.vue'
import ActividadEnseñanza from '../views/ActividadEnseñanza.vue'
import ActividadAprendizaje from '../views/ActividadAprendizaje.vue'
import CompetenciaGenerica from '../views/CompetenciaGenerica.vue'
import InstrumentoEvaluacion from '../views/InstrumentoEvaluacion.vue'
import Tema from '../views/Tema.vue'
import ListaCompetencia from '../views/ListaCompetencia.vue'
import Indicador from '../views/Indicador.vue'
import CriterioDesempeño from '../views/CriterioDesempeño.vue'
import Atributo from '../views/Atributo.vue'
import AlumnoTemaClase from '../views/AlumnoTemaClase.vue'

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
    {
      path: '/aula',
      name: 'aula',
      component: Aula
    },
    {
      path: '/clase',
      name: 'clase',
      component: Clase
    },
    {
      path: '/intDidactica',
      name: 'intDidactica',
      component: IntDidactica
    },
    {
      path: '/Competencia',
      name: 'Competencia',
      component: Competencia
    },
    {
      path: '/Grupo',
      name: 'Grupo',
      component: Grupo
    },
    {
      path: '/AlumnoClase',
      name: 'AlumnoClase',
      component: AlumnoClase
    },
    {
      path: '/ActividadEnseñanza',
      name: 'ActividadEnseñanza',
      component: ActividadEnseñanza
    },
    {
      path: '/ActividadAprendizaje',
      name: 'ActividadAprendizaje',
      component: ActividadAprendizaje
    },
    {
      path: '/CompetenciaGenerica',
      name: 'CompetenciaGenerica',
      component: CompetenciaGenerica
    },
    {
      path: '/InstrumentoEvaluacion',
      name: 'InstrumentoEvaluacion',
      component: InstrumentoEvaluacion
    },
    {
      path: '/Tema',
      name: 'Tema',
      component: Tema
    },
    {
      path: '/ListaCompetencia',
      name: 'ListaCompetencia',
      component: ListaCompetencia
    },
    {
      path: '/Indicador',
      name: 'Indicador',
      component: Indicador
    },
    {
      path: '/CriterioDesempeño',
      name: 'CriterioDesempeño',
      component: CriterioDesempeño
    },
    {
      path: '/Atributo',
      name: 'Atributo',
      component: Atributo
    },
    {
      path: '/AlumnoTemaClase',
      name: 'AlumnoTemaClase',
      component: AlumnoTemaClase
    },
    { path: "/", redirect: '/carrera' },
    { path: '/:pathMatch(.*)', redirect: '/carrera' },
  ]
})

export default router
