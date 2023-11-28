<script setup>
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import { useField, useForm } from 'vee-validate'

import { ref, onMounted } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDeleteOutline, mdiFileEditOutline } from '@mdi/js';

import NavBar from "../components/NavBar.vue"
import { VDataTable } from "vuetify/labs/VDataTable";

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

const { handleSubmit } = useForm({
  validationSchema: {
    nombre(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    actividadEnseñanza(value) {
      if (value) return true
      return 'autocomplete an item.'
    },
    actividadAprendizaje(value) {
      if (value) return true
      return 'autocomplete an item.'
    },
    horasTeoria(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    horasPractica(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    competenciaGenerica(value) {
      if (value) return true
      return 'autocomplete an item.'
    },
    Portafolio(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    instrumentoEvaluacion(value) {
      if (value) return true
      return 'autocomplete an item.'
    },
  },
})

const nombre = useField('nombre')
const ActividadE = useField('actividadEnseñanza')
const ActividadA = useField('actividadAprendizaje')
const horasT = useField('horasTeoria')
const horasP = useField('horasPractica')
const competencia = useField('competenciaGenerica')
const portafolio = useField('Portafolio')
const instrumentoEvaluacion = useField('instrumentoEvaluacion')

const submit = handleSubmit(values => {
  console.log(values);
  fetch('http://127.0.0.1:8000/api/v1/Tema', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token")
    },
    body: JSON.stringify(values),
  })
    .then(response => response.json())
    .then(data => {
      if (data.detail == "Not found.") {
        toast.error("Error : \nEl usuario o la contraseña no son correctos", options);
        return;
      }
      toast.success("Se ha iniciado sesión de manera correcta.", options);
      getTema();
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error : \nHa ocurrido un error en el servidor.", options);
    });
})

const editarItem = ((param) => {
  console.log(param);
})

const itemTemas = ref([]);
const itemActividadE = ref([]);
const itemActividadA = ref([]);
const itemCompetenciaG = ref([]);
const itemInstrumentoE = ref([]);
const no_results_text = "No se encontraron resultados";
const search = ref('');
const headers = [
  {
    align: 'start',
    key: 'id',
    sortable: true,
    title: 'Id',
  },
  { key: 'nombre', title: 'Nombre' },
  { key: 'horasTeoria', title: 'Teoria' },
  { key: 'horasPractica', title: 'Practica' },
  { key: 'actividadEnseñanza', title: 'Enseñanza' },
  { key: 'actividadAprendizaje', title: 'Aprendizaje' },
  { key: 'competenciaGenerica', title: 'competenciaGenerica' },
  { key: 'instrumentoEvaluacion', title: 'Evaluacion' },
  { title: 'Editar', key: 'edit', sortable: false },
  { title: 'Elimianr', key: 'delete', sortable: false },
];

async function getActividadE() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/actividadEnseñanza', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemActividadE.value = data.map(item => item.id);
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
async function getActividadA() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/actividadAprendizaje', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemActividadA.value = data.map(item => item.id);
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
async function getCompetencias() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/competenciaGenerica', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemCompetenciaG.value = data.map(item => item.id);
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
async function getEvaluacion() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/instrumentoEvaluacion', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemInstrumentoE.value = data.map(item => item.id);
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
async function getTema() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/Tema', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemTemas.value = data;
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
onMounted(getTema);
onMounted(getActividadE);
onMounted(getActividadA);
onMounted(getCompetencias);
onMounted(getEvaluacion);
</script>

<template>
  <main>
    <v-app>
      <div class="flex min-h-screen">
        <div class="bg-slate-800 w-fit">
          <NavBar></NavBar>
        </div>
        <div class="flex flex-col w-full align-top">
          <div class="w-full">
            <div class="flex flex-col m-6 border-solid border-2 rounded-2xl pb-4 max-w-lg p-6">
              <form @submit.prevent="submit" class="flex flex-col justify-center items-center">
                <p class="text-3xl p-2 mb-4">Agregar Tema</p>
                <v-text-field v-model="nombre.value.value" :error-messages="nombre.errorMessage.value" label="Nombre"
                  variant="outlined" class="w-full mb-3"></v-text-field>
                <v-autocomplete v-model="ActividadE.value.value" :items="itemActividadE"
                  :error-messages="ActividadE.errorMessage.value" label="Actividad Enseñanza" variant="outlined"
                  class="w-full mb-3"></v-autocomplete>
                <v-autocomplete v-model="ActividadA.value.value" :items="itemActividadA"
                  :error-messages="ActividadA.errorMessage.value" label="Actividad Aprendizaje" variant="outlined"
                  class="w-full mb-3"></v-autocomplete>
                <v-text-field v-model="horasT.value.value" :error-messages="horasT.errorMessage.value"
                  label="Horas teoricas" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="horasP.value.value" :error-messages="horasP.errorMessage.value"
                  label="Horas practicas" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-autocomplete v-model="competencia.value.value" :items="itemCompetenciaG"
                  :error-messages="competencia.errorMessage.value" label="Competencia generica" variant="outlined"
                  class="w-full mb-3"></v-autocomplete>
                <v-text-field v-model="portafolio.value.value" :error-messages="portafolio.errorMessage.value"
                  label="Portafolio" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-autocomplete v-model="instrumentoEvaluacion.value.value" :items="itemInstrumentoE"
                  :error-messages="instrumentoEvaluacion.errorMessage.value" label="Instrumento de evaluacion" variant="outlined"
                  class="w-full mb-3"></v-autocomplete>
                <v-btn class="text-none w-full" color="#1abc9c" variant="flat" type="submit">
                  <p class=" font-bold">Agregar</p>
                </v-btn>
              </form>
            </div>
            <div class="flex flex-col m-6 border-solid border-2 rounded-2xl pb-4">
              <div class="flex mt-3 justify-between align-middle">
                <v-card-title>
                  <p class="text-3xl pt-2 pl-4">Tema</p>
                </v-card-title>
                <v-card-title>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details
                    variant="outlined" class="min-w-[400px]"></v-text-field>
                </v-card-title>
              </div>
              <v-data-table :headers="headers" :items="itemTemas" :search="search" class="px-6"
                :no-data-text="no_results_text">
                <template v-slot:item.edit="{ item }">
                  <v-btn variant="flat" color="#FFCC33" @click="editarItem(item)">
                    <svg-icon type="mdi" :path="mdiFileEditOutline" class="text-white"></svg-icon>
                  </v-btn>
                </template>
                <template v-slot:item.delete="{ item }">
                  <v-btn variant="flat" color="#CC3333">
                    <svg-icon type="mdi" :path="mdiDeleteOutline" class="text-white"></svg-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </div>
    </v-app>
  </main>
</template>