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
    apellido(value) {
      if (value?.length >= 1) return true
      return 'El apellido no puede estar vacío. '
    },
    estudios(value) {
      if (value?.length >= 1) return true
      return 'El estudio no puede estar vacío. '
    },
    tipoEstudios(value) {
      if (value?.length >= 1) return true
      return 'El estudio no puede estar vacío. '
    },
    fechaIngrso(value) {
      if (value?.length >= 1) return true
      return 'La fecha no puede estar vacío. '
    },
    puesto(value) {
      if (value?.length >= 1) return true
      return 'El puesto no puede estar vacío. '
    },
  },
})
const nombre = useField('nombre')
const apellido = useField('apellido')
const estudios = useField('estudios')
const tipoEstudios = useField('tipoEstudios')
const fechaIngrso = useField('fechaIngrso')
const puesto = useField('puesto')
const submit = handleSubmit(values => {
  console.log(values);
  fetch('http://127.0.0.1:8000/api/v1/Maestro', {
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
      getMaestros();
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error : \nHa ocurrido un error en el servidor.", options);
    });
})

const editarItem = ((param) => {
  console.log(param);
})

const itemCarreras = ref([]);
const no_results_text = "No se encontraron resultados";
const maestros = ref([]);
const search = ref('');
const headers = [
  {
    align: 'start',
    key: 'id',
    sortable: true,
    title: 'Id',
  },
  { key: 'nombre', title: 'Nombre' },
  { key: 'apellido', title: 'Apellido' },
  { key: 'estudios', title: 'Estudio' },
  { key: 'tipoEstudios', title: 'Tipo de estudio' },
  { key: 'fechaIngrso', title: 'Fecha de ingreso' },
  { key: 'puesto', title: 'Puesto' },
  { title: 'Editar', key: 'edit', sortable: false },
  { title: 'Elimianr', key: 'delete', sortable: false },
];

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
    itemCarreras.value = data.map(item => item.nombre);
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
    maestros.value = data;
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
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
                <p class="text-3xl p-2 mb-4">Agregar Maestro</p>
                <v-text-field v-model="nombre.value.value" :error-messages="nombre.errorMessage.value" label="Nombre"
                  variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="apellido.value.value" :error-messages="apellido.errorMessage.value"
                  label="Apellido" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="estudios.value.value" :error-messages="estudios.errorMessage.value"
                  label="Estudio" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="tipoEstudios.value.value" :error-messages="tipoEstudios.errorMessage.value" label="Tipo de estudio"
                  variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="fechaIngrso.value.value" :error-messages="fechaIngrso.errorMessage.value"
                  label="Fecha de ingeso" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-text-field v-model="puesto.value.value" :error-messages="puesto.errorMessage.value" label="Puesto"
                  variant="outlined" class="w-full mb-3"></v-text-field>
                <v-btn class="text-none w-full" color="#1abc9c" variant="flat" type="submit">
                  <p class=" font-bold">Agregar</p>
                </v-btn>
              </form>
            </div>
            <div class="flex flex-col m-6 border-solid border-2 rounded-2xl pb-4">
              <div class="flex mt-3 justify-between align-middle">
                <v-card-title>
                  <p class="text-3xl pt-2 pl-4">Maestro</p>
                </v-card-title>
                <v-card-title>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details
                    variant="outlined" class="min-w-[400px]"></v-text-field>
                </v-card-title>
              </div>
              <v-data-table :headers="headers" :items="maestros" :search="search" class="px-6"
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