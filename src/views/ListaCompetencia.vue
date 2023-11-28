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
    competencia(value) {
      if (value) return true
      return 'autocomplete an item.'
    },
    materia(value) {
      if (value) return true
      return 'autocomplete an item.'
    },
    tipoCompetencia(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
  },
})

const competencia = useField('competencia')
const materia = useField('materia')
const tipoCompetencia = useField('tipoCompetencia')

const submit = handleSubmit(values => {
  console.log(values);
  fetch('http://127.0.0.1:8000/api/v1/listaCompetencia', {
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
      getClases();
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error : \nHa ocurrido un error en el servidor.", options);
    });
})

const editarItem = ((param) => {
  console.log(param);
})

const itemCompetencia = ref([]);
const itemMaterias = ref([]);
const itemLista = ref([]);
const no_results_text = "No se encontraron resultados";
const search = ref('');
const headers = [
  {
    align: 'start',
    key: 'id',
    sortable: true,
    title: 'Id',
  },
  { key: 'competencia', title: 'Competencia' },
  { key: 'materia', title: 'Materia' },
  { key: 'tipoCompetencia', title: 'tipo Competencia' },
  { title: 'Editar', key: 'edit', sortable: false },
  { title: 'Elimianr', key: 'delete', sortable: false },
];

async function getClases() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/listaCompetencia', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemLista.value = data;
    console.log(itemLista.value);
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}

async function getCompetencias() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/Competencia', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemCompetencia.value = data.map(item => item.id);
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
async function getMaterias() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/Materia', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
    const data = await response.json();
    itemMaterias.value = data.map(item => item.id);
  } catch (error) {
    console.log(error);
    toast.error("Error : \nHa ocurrido un error en el servidor.", options);
  }
}
onMounted(getClases);
onMounted(getCompetencias);
onMounted(getMaterias);
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
                <p class="text-3xl p-2 mb-4">Agregar Lista Conmpetencia</p>
                <v-autocomplete v-model="competencia.value.value" :items="itemCompetencia"
                  :error-messages="competencia.errorMessage.value" label="Competencia" variant="outlined"
                  class="w-full mb-3"></v-autocomplete>
                <v-autocomplete v-model="materia.value.value" :items="itemMaterias"
                  :error-messages="materia.errorMessage.value" label="Materia" variant="outlined"
                  class="w-full mb-3"></v-autocomplete>
                <v-text-field v-model="tipoCompetencia.value.value" :error-messages="tipoCompetencia.errorMessage.value"
                  label="Tipo competencia" variant="outlined" class="w-full mb-3"></v-text-field>
                <v-btn class="text-none w-full" color="#1abc9c" variant="flat" type="submit">
                  <p class=" font-bold">Agregar</p>
                </v-btn>
              </form>
            </div>
            <div class="flex flex-col m-6 border-solid border-2 rounded-2xl pb-4">
              <div class="flex mt-3 justify-between align-middle">
                <v-card-title>
                  <p class="text-3xl pt-2 pl-4">Lista Conmpetencia</p>
                </v-card-title>
                <v-card-title>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details
                    variant="outlined" class="min-w-[400px]"></v-text-field>
                </v-card-title>
              </div>
              <v-data-table :headers="headers" :items="itemLista" :search="search" class="px-6"
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