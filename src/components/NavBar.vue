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
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiNotebookOutline, mdiAccountOutline, mdiAccountSchoolOutline, mdiHumanMaleBoard, mdiCertificateOutline, mdiSchoolOutline } from '@mdi/js';

export default {
    components: {
        SvgIcon
    },
    data() {
        return {
            mdiNotebookOutline: mdiNotebookOutline,
            mdiAccountOutline: mdiAccountOutline,
            mdiAccountSchoolOutline: mdiAccountSchoolOutline,
            mdiHumanMaleBoard: mdiHumanMaleBoard,
            mdiCertificateOutline: mdiCertificateOutline,
            mdiSchoolOutline: mdiSchoolOutline,
        }
    }
}
</script>