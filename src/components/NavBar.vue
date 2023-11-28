<script setup>
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast();
const options = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
};

const changeCarrera = (() => {
    router.push('carrera')
})
const changeMateria = (() => {
    router.push('materia')
})
const changeMaestro = (() => {
    router.push('maestro')
})
const changeAlumno = (() => {
    router.push('alumno')
})
const changeAula = (() => {
    router.push('aula')
})
const changeIDidactica = (() => {
    router.push('intDidactica')
})
const changeCompetencia = (() => {
    router.push('Competencia')
})
const changeGrupo = (() => {
    router.push('Grupo')
})
const changeClase = (() => {
    router.push('Clase')
})
const changeAlunmnoClase = (() => {
    router.push('AlumnoClase')
})
const changeActividadEnseñanza = (() => {
    router.push('ActividadEnseñanza')
})
const changeActividadAprendizaje = (() => {
    router.push('ActividadAprendizaje')
})
const changeCompetenciaGenerica = (() => {
    router.push('CompetenciaGenerica')
})
const InstrumentoEvaluacion = (() => {
    router.push('InstrumentoEvaluacion')
})
const Tema = (() => {
    router.push('Tema')
})
const ListaCompetencia = (() => {
    router.push('ListaCompetencia')
})
const Indicador = (() => {
    router.push('Indicador')
})
const CriterioDesempeño = (() => {
    router.push('CriterioDesempeño')
})
const Atributo = (() => {
    router.push('Atributo')
})
const AlumnoTemaClase = (() => {
    router.push('AlumnoTemaClase')
})

</script>

<template>
    <div class="flex justify-items-start justify-start my-5 mr-10 mx-4 text-none w-full text-slate-200">
        <svg-icon type="mdi" :path="mdiCertificateOutline" class="mr-1 "></svg-icon>
        <h1 class="font-bold">Certificación</h1>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeCarrera()">
            <svg-icon type="mdi" :path="mdiSchoolOutline" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold ">Carreras</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeMateria()">
            <svg-icon type="mdi" :path="mdiNotebookOutline" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Materias</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeMaestro()">
            <svg-icon type="mdi" :path="mdiHumanMaleBoard" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Maestros</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeAlumno()">
            <svg-icon type="mdi" :path="mdiAccountSchoolOutline" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Alumnos</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeAula()">
            <svg-icon type="mdi" :path="mdiChairSchool" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Aula</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeIDidactica()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Int. Didactica</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeCompetencia()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Competencia</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="ListaCompetencia()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Lista de competencia</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeGrupo()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Grupo</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeClase()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Clase</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeAlunmnoClase()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">AlumnoClase</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="AlumnoTemaClase()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">AlumnoTemaClase</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeActividadEnseñanza()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Actividad Enseñanza</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeActividadAprendizaje()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Actividad Aprendizaje</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeCompetenciaGenerica()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Competencia Generica</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="InstrumentoEvaluacion()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Intrumento Evaluacion</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="Tema()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Tema</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="CriterioDesempeño()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Criterio Desempeño</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="Indicador()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Indicador</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="Atributo()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Atributo de egreso</p>
        </v-btn>
    </div>
    <div class="my-3">
        <v-btn class="text-none w-full flex justify-items-start justify-start" color="rgb(226 232 240)" variant="text"
            @click="changeIDidactica()">
            <svg-icon type="mdi" :path="mdiFaceManShimmer" class="mr-3 max-h-5"></svg-icon>
            <p class="font-bold">Reporte</p>
        </v-btn>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import {
    mdiNotebookOutline,
    mdiAccountOutline,
    mdiAccountSchoolOutline,
    mdiHumanMaleBoard,
    mdiCertificateOutline,
    mdiSchoolOutline,
    mdiChairSchool, mdiFaceManShimmer
} from '@mdi/js';

export default {
    components: {
        SvgIcon
    }
}
</script>