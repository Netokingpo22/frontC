<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue'
import { mdiDeleteOutline, mdiFileEditOutline, mdiClipboardArrowRightOutline, mdiPlusCircle } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import toastification from '../composable/toastification'
import carreraApi from '../Api/carreraApi';
import carreraValidate from '../validates/carreraValidate'

const router = useRouter()
const { option, useToast } = toastification();
const { setCarrera, getCarreras, editCarrera, deleteCarrera } = carreraApi(router);
const { nombre, siglas, handleSubmit, reset } = carreraValidate();
const isAdd = ref(false);
const isUp = ref(false);
const isDel = ref(false);

const postCarrera = handleSubmit(values => {
  apiPost(values)
})
async function apiPost(values) {
  const data = await setCarrera(values);
  if (data) {
    isAdd.value = false;
    reset();
    useToast.success("Se ha agregado una nueva carrera.", option);
    const updatedCarreras = await getCarreras();
    carreras.value = updatedCarreras;
  }
}

const putCarrera = handleSubmit(values => {
  apiPut(values)
})
async function apiPut(values) {
  let newValues = { nombre: values.nombre, siglas: values.siglas };
  const data = await editCarrera(carreraId.value, newValues);
  if (data) {
    isUp.value = false;
    reset();
    useToast.success("Se ha editado una carrera.", option);
    const updatedCarreras = await getCarreras();
    carreras.value = updatedCarreras;
  }
}

async function apiDel() {
  const data = await deleteCarrera(carreraId.value);
  if (data) {
    isDel.value = false;
    reset();
    useToast.success("Se ha elimnado una carrera.", option);
    const updatedCarreras = await getCarreras();
    carreras.value = updatedCarreras;
  }
}

function pushMaestros(){
  router.push('/maestro')
}

function pushCarreras(){
  router.push('/carrera')
}

function addItem() {
  reset();
  isAdd.value = true;
}

function editeItem(param) {
  reset();
  isUp.value = true;
  carreraId.value = param.id
  nombre.value.value = param.nombre
  siglas.value.value = param.siglas
}

function access(param) {
  localStorage.setItem("carrera", JSON.stringify({
    cId: param.id,
    cNombre: param.nombre,
    cSiglas: param.siglas,
  }));
  carreraId.value = param.id
  nombre.value.value = param.nombre
  siglas.value.value = param.siglas
  router.push('/materia')
}

function deleteItem(param) {
  isDel.value = true;
  carreraId.value = param.id
  nombre.value.value = param.nombre
}
//Table fill ------------------------------------------
const carreras = ref([]);
const search = ref('');
const carreraId = ref('');
const headers = [
  {
    align: 'start',
    key: 'id',
    sortable: true,
    title: 'Id',
  },
  { key: 'nombre', title: 'Nombre' },
  { key: 'siglas', title: 'Siglas' },
  { title: 'Acceder', key: 'acceder', sortable: false },
  { title: 'Editar', key: 'edit', sortable: false },
  { title: 'Elimianr', key: 'delete', sortable: false },
];
async function fillTable() {
  const data = await getCarreras();
  carreras.value = data;
}
onBeforeMount(fillTable);
//-----------------------------------------------------
</script>

<template>
  <main>
    <v-app>
      <div class="flex flex-col justify-center items-center h-full bg-slate-200 text-slate-800 text-[16px] py-5">
        <div class="flex flex-row justify-center items-center">
          <v-btn class="text-none w-2/3 my-1 mx-1" variant="outlined" @click="pushCarreras()">
            <p class=" font-bold">Carreras</p>
          </v-btn>
          <v-btn class="text-none w-2/3 my-1 mx-1" variant="outlined" @click="pushMaestros()">
            <p class=" font-bold">Maestros</p>
          </v-btn>
        </div>
        <div class="pt-5"></div>
        <v-btn variant="outlined" @click="addItem()" class="max-h-[35px]" style="text-transform: none;">
          <p class="font-bold">Agregar</p>
        </v-btn>
        <v-dialog v-model="isAdd" max-width="500" class="bg-black">
          <v-card>
            <v-card-text class="bg-slate-200 text-slate-800">
              <div>
                <h1 class="text-center text-2xl font-bold antialiased">Agregar carrera</h1>
              </div>
              <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
              <div class="flex flex-col mt-6 mx-6 pb-2">
                <form @submit.prevent="postCarrera" class="flex flex-col justify-center items-center">
                  <v-text-field v-model="nombre.value.value" :error-messages="nombre.errorMessage.value" label="Nombre"
                    variant="outlined" class="w-full mb-2"></v-text-field>
                  <v-text-field v-model="siglas.value.value" :error-messages="siglas.errorMessage.value" label="Siglas"
                    variant="outlined" class="w-full mb-2"></v-text-field>
                  <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                  <v-btn class="text-none w-full my-1" variant="outlined" type="submit">
                    <p class=" font-bold">Agregar</p>
                  </v-btn>
                  <v-btn class="text-none w-full my-1" variant="outlined" @click="isAdd = false">
                    <p class=" font-bold">Cancelar</p>
                  </v-btn>
                </form>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- Tabla---------------------------------------- -->
        <div class="flex flex-col border-solid border-2 border-slate-800 px-5 py-1 mt-3 w-3/5 h-fit">
          <div class="flex mt-1 justify-between align-middle">
            <v-card-title>
              <p class="text-xl pt-3 pl-3">Carreras</p>
            </v-card-title>
            <v-card-title>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                variant="outlined" class="min-w-[300px]"></v-text-field>
            </v-card-title>
          </div>
          <div class="h-[2px] bg-slate-800 mb-1"></div>
          <v-data-table :headers="headers" :items="carreras" :search="search"
            :no-data-text="'No se encontraron resultados'" :items-per-page-text="'Items por pagina'"
            class="max-h-[650px] min-h-[650px]" :items-per-page="10">

            <template v-slot:item.acceder="{ item }">
              <v-btn variant="outlined" color="#29cc6d" @click="access(item)" class="max-h-[25px]">
                <svg-icon type="mdi" :path="mdiClipboardArrowRightOutline"
                  class="text-[#29cc6d]  max-w-[20px]"></svg-icon>
              </v-btn>
            </template>

            <template v-slot:item.edit="{ item }">
              <v-btn variant="outlined" color="#cca329" @click="editeItem(item)" class="max-h-[25px]">
                <svg-icon type="mdi" :path="mdiFileEditOutline" class="text-[#cca329]  max-w-[20px]"></svg-icon>
              </v-btn>
              <v-dialog v-model="isUp" max-width="500" class="bg-black">
                <v-card>
                  <v-card-text class="bg-slate-200 text-slate-800">
                    <div>
                      <h1 class="text-center text-2xl font-bold antialiased">Editar carrera</h1>
                    </div>
                    <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                    <div class="flex flex-col mt-6 mx-6 pb-2">
                      <form @submit.prevent="putCarrera" class="flex flex-col justify-center items-center">
                        <v-text-field v-model="nombre.value.value" :error-messages="nombre.errorMessage.value"
                          label="Nombre" variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-text-field v-model="siglas.value.value" :error-messages="siglas.errorMessage.value"
                          label="Siglas" variant="outlined" class="w-full mb-2"></v-text-field>
                        <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                        <v-btn color="#cca329" class="text-none w-full my-1 mt-4" variant="outlined" type="submit">
                          <p class=" font-bold">Editar</p>
                        </v-btn>
                        <v-btn class="text-none w-full my-1" variant="outlined" @click="isUp = false">
                          <p class=" font-bold">Cancelar</p>
                        </v-btn>
                      </form>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>

            <template v-slot:item.delete="{ item }">
              <v-btn variant="outlined" color="#cc2929" @click="deleteItem(item)" class="max-h-[25px]">
                <svg-icon type="mdi" :path="mdiDeleteOutline" class="text-[#cc2929]  max-w-[20px]"></svg-icon>
              </v-btn>
              <v-dialog v-model="isDel" max-width="500" class="bg-black">
                <v-card>
                  <v-card-text class="bg-slate-200 text-slate-800">
                    <div>
                      <h1 class="text-center text-2xl font-bold antialiased">Eliminar carrera</h1>
                    </div>
                    <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                    <div class="flex flex-col mt-6 mx-6 pb-2">
                      <form @submit.prevent="apiDel" class="flex flex-col justify-center items-center">
                        <h1>¿Seguro que desea eliminar "{{ nombre.value.value }}"?</h1>
                        <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                        <v-btn color="#cc2929" class="text-none w-full my-1 mt-4" variant="outlined" type="submit">
                          <p class=" font-bold">Eliminar</p>
                        </v-btn>
                        <v-btn class="text-none w-full my-1" variant="outlined" @click="isDel = false">
                          <p class=" font-bold">Cancelar</p>
                        </v-btn>
                      </form>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>

            <template v-slot:footer>
              <v-pagination v-model="page" :length="pages"></v-pagination>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-app>
  </main>
</template>
