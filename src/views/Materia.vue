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
    carerra(value) {
      if (value) return true
      return 'autocomplete an item.'
    },
    nombre(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    clave(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    creditosTeoricos(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    creditosPracticos(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    maestro(value) {
      if (value)

        return true
      return 'autocomplete an item.'
    },
    competenciaGeneral(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    intencionDidactica(value) {
      if (value) return true
      return 'autocomplete an item.'
    },
    caracterizacion(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    tipoMateria(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    semestre(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
  },
})
const carerra = useField('carerra')
const nombre = useField('nombre')
const clave = useField('clave')
const creditosTeoricos = useField('creditosTeoricos')
const creditosPracticos = useField('creditosPracticos')
const maestro = useField('maestro')
const competenciaGeneral = useField('competenciaGeneral')
const intencionDidactica = useField('intencionDidactica')
const caracterizacion = useField('caracterizacion')
const tipoMateria = useField('tipoMateria')
const semestre = useField('semestre')
const submit = handleSubmit(values => {
  values.maestro = maestrosMap.get(values.maestro);
  console.log(values);
  fetch('http://127.0.0.1:8000/api/v1/Materia', {
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
      hetMaterias();
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error : \nHa ocurrido un error en el servidor.", options);
    });
})

const editarItem = ((param) => {
  console.log(param);
})

const no_results_text = "No se encontraron resultados";
const materia = ref([]);
const itemMaestro = ref([]);
const maestrosMap = new Map();
const itemCarreras = ref([]);
const itemDidactica = ref([]);
const search = ref('');
const headers = [
  {
    align: 'start',
    key: 'id',
    sortable: true,
    title: 'Id',
  },
  { key: 'carerra', title: 'Carerra' },
  { key: 'nombre', title: 'Nombre' },
  { key: 'clave', title: 'Clave' },
  { key: 'maestro', title: 'Maestro' },
  { key: 'tipoMateria', title: 'Tipo materia' },
  { key: 'semestre', title: 'Semestre' },
  { title: 'Editar', key: 'edit', sortable: false },
  { title: 'Elimianr', key: 'delete', sortable: false },
];

async function hetMaterias() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/Materia', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    for (let index = 0; index < data.length; index++) {
      console.log(maestrosMap.get(data[index].maestro));
      data[index].maestro = maestrosMap.get(data[index].maestro);
    }
    materia.value = data;
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
async function getCarreras() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/Carrera', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemCarreras.value = data.map(item => item.id);
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
async function getMaestros() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/Maestro', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemMaestro.value = data.map(item => (item.nombre + " " + item.apellido));
    for (const item of data) {
      maestrosMap.set((item.nombre + " " + item.apellido), item.id);
      maestrosMap.set(item.id, (item.nombre + " " + item.apellido));
    }
    hetMaterias();
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
async function getIDidactica() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/intencion_Didactica', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemDidactica.value = data.map(item => item.id);
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
onMounted(getIDidactica);
onMounted(getMaestros);
onMounted(getCarreras);
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
                <p class="text-3xl p-2 mb-4">Agregar Materia</p>
                <v-autocomplete v-model="carerra.value.value" :items="itemCarreras"
                  :error-messages="carerra.errorMessage.value" label="Carrera" variant="outlined"
                  class="w-full mb-3"></v-autocomplete>
                <v-text-field v-model="nombre.value.value" :error-messages="nombre.errorMessage.value" label="Nombre"
                  variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="clave.value.value" :error-messages="clave.errorMessage.value" label="Clave"
                  variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="creditosTeoricos.value.value" :error-messages="creditosTeoricos.errorMessage.value"
                  label="Creditos Teoricos" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="creditosPracticos.value.value"
                  :error-messages="creditosPracticos.errorMessage.value" label="creditos Practicos" variant="outlined"
                  class="w-full mb-3"></v-text-field>
                <v-autocomplete v-model="maestro.value.value" :items="itemMaestro"
                  :error-messages="maestro.errorMessage.value" label="Maestro" variant="outlined"
                  class="w-full mb-3"></v-autocomplete>
                <v-text-field v-model="competenciaGeneral.value.value"
                  :error-messages="competenciaGeneral.errorMessage.value" label="Competencia General" variant="outlined"
                  class="w-full mb-3"></v-text-field>
                <v-autocomplete v-model="intencionDidactica.value.value" :items="itemDidactica"
                  :error-messages="intencionDidactica.errorMessage.value" label="Didactica" variant="outlined"
                  class="w-full mb-3"></v-autocomplete>
                <v-text-field v-model="caracterizacion.value.value" :error-messages="caracterizacion.errorMessage.value"
                  label="Caracterizacion" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="tipoMateria.value.value" :error-messages="tipoMateria.errorMessage.value"
                  label="tipo de materia" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="semestre.value.value" :error-messages="semestre.errorMessage.value"
                  label="Semestre" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-btn class="text-none w-full" color="#1abc9c" variant="flat" type="submit">
                  <p class=" font-bold">Agregar</p>
                </v-btn>
              </form>
            </div>
            <div class="flex flex-col m-6 border-solid border-2 rounded-2xl pb-4">
              <div class="flex mt-3 justify-between align-middle">
                <v-card-title>
                  <p class="text-3xl pt-2 pl-4">Materias</p>
                </v-card-title>
                <v-card-title>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details
                    variant="outlined" class="min-w-[400px]"></v-text-field>
                </v-card-title>
              </div>
              <v-data-table :headers="headers" :items="materia" :search="search" class="px-6"
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