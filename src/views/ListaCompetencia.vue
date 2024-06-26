<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue'
import { mdiDeleteOutline, mdiFileEditOutline, mdiClipboardArrowRightOutline, mdiPlusCircle } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import toastification from '../composable/toastification'
import listaCompetenciaApi from '../Api/listaCompetenciaApi';
import listaCompetenciaValidate from '../validates/listaCompetenciaValidate'

const router = useRouter()
const { option, useToast } = toastification();
const { setListaCompetencia, getByMateria, editListaCompetencia, deleteListaCompetencia } = listaCompetenciaApi(router);
const { tipoCompetencia, materia, handleSubmit, reset } = listaCompetenciaValidate();
const isAdd = ref(false);
const isUp = ref(false);
const isDel = ref(false);
const carreaNombre = JSON.parse(localStorage.getItem("carrera")).cNombre + "(" + (JSON.parse(localStorage.getItem("carrera")).cSiglas) + ")"
const materiaNombre = JSON.parse(localStorage.getItem("materia")).mNombre + " (" + JSON.parse(localStorage.getItem("materia")).mClave + ")"

const postListaCompetencia = handleSubmit(values => {
  apiPost(values)
})
async function apiPost(values) {
  const data = await setListaCompetencia(values);
  if (data) {
    isAdd.value = false;
    reset();
    useToast.success("Se ha agregado una nueva competencia.", option);
    const updatedCompetencias = await getByMateria(JSON.parse(localStorage.getItem("materia")).mId);
    competencias.value = updatedCompetencias;
  }
}

const putListaCompetencia = handleSubmit(values => {
  apiPut(values)
})
async function apiPut(values) {
  let newValues = { tipoCompetencia: values.tipoCompetencia, materia: values.materia };
  const data = await editListaCompetencia(competenciaId.value, newValues);
  if (data) {
    isUp.value = false;
    reset();
    useToast.success("Se ha editado una competencia.", option);
    const updatedCompetencias = await getByMateria(JSON.parse(localStorage.getItem("materia")).mId);
    competencias.value = updatedCompetencias;
  }
}

async function apiDel() {
  const data = await deleteListaCompetencia(competenciaId.value);
  if (data) {
    isDel.value = false;
    reset();
    useToast.success("Se ha eliminado una competencia.", option);
    const updatedCompetencias = await getByMateria(JSON.parse(localStorage.getItem("materia")).mId);
    competencias.value = updatedCompetencias;
  }
}

function access(param) {
  localStorage.setItem("listCompetencia", JSON.stringify({
    lId: param.id,
  }));
  router.push('/competencia')
}

function pushMateria() {
  router.push('/materia')
}
function pushGrupo() {
  router.push('/grupo')
}
function pushListaC() {
  router.push('/listaCompetencia')
}

function addItem() {
  reset();
  isAdd.value = true;
}

function editeItem(param) {
  reset();
  isUp.value = true;
  competenciaId.value = param.id
  tipoCompetencia.value.value = param.tipoCompetencia
  materia.value.value = param.materia
}

function deleteItem(param) {
  isDel.value = true;
  competenciaId.value = param.id
  tipoCompetencia.value.value = param.tipoCompetencia
  materia.value.value = param.materia
}

//Table fill ------------------------------------------
const competencias = ref([]);
const search = ref('');
const competenciaId = ref('');
const headers = [
  {
    align: 'start',
    key: 'id',
    sortable: true,
    title: 'Id',
  },
  { key: 'tipoCompetencia', title: 'Tipo de Competencia' },
  { title: 'Acceder', key: 'acceder', sortable: false },
  { title: 'Editar', key: 'edit', sortable: false },
  { title: 'Eliminar', key: 'delete', sortable: false },
];
async function fillTable() {
  const data = await getByMateria(JSON.parse(localStorage.getItem("materia")).mId);
  competencias.value = data;
}
onBeforeMount(fillTable);
//-----------------------------------------------------
</script>


<template>
  <main>
    <v-app>
      <div class="flex flex-col justify-center items-center h-full bg-slate-200 text-slate-800 text-[16px] py-5">
        <div class="flex flex-row justify-center items-center">
          <v-btn class="text-none w-2/3 my-1 mx-1" variant="outlined" @click="pushMateria()">
            <p class=" font-bold">Atras</p>
          </v-btn>
          <v-btn class="text-none w-2/3 my-1 mx-1" variant="outlined" @click="pushGrupo()">
            <p class=" font-bold">Grupos</p>
          </v-btn>
          <v-btn class="text-none w-2/3 my-1 mx-1" variant="outlined" @click="pushListaC()">
            <p class=" font-bold">Lista Competencia</p>
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
                <h1 class="text-center text-2xl font-bold antialiased">Agregar Competencia</h1>
              </div>
              <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
              <div class="flex flex-col mt-6 mx-6 pb-2">
                <form @submit.prevent="postListaCompetencia" class="flex flex-col justify-center items-center">
                  <v-autocomplete v-model="tipoCompetencia.value.value"
                    :error-messages="tipoCompetencia.errorMessage.value" label="Tipo de Competencia" variant="outlined"
                    class="w-full mb-2" :items="['Ingreso', 'Egreso',]"></v-autocomplete>
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
              <p class="text-xl pt-3 pl-3">{{ carreaNombre }} / {{ materiaNombre }} / Lista Competencias</p>
            </v-card-title>
            <v-card-title>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                variant="outlined" class="min-w-[300px]"></v-text-field>
            </v-card-title>
          </div>
          <div class="h-[2px] bg-slate-800 mb-1"></div>
          <v-data-table :headers="headers" :items="competencias" :search="search"
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
                      <h1 class="text-center text-2xl font-bold antialiased">Editar Competencia</h1>
                    </div>
                    <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                    <div class="flex flex-col mt-6 mx-6 pb-2">
                      <form @submit.prevent="putListaCompetencia" class="flex flex-col justify-center items-center">
                        <v-autocomplete v-model="tipoCompetencia.value.value"
                          :error-messages="tipoCompetencia.errorMessage.value" label="Tipo de Competencia"
                          variant="outlined" class="w-full mb-2" :items="['Ingreso', 'Egreso',]"></v-autocomplete>
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
              </v-btn><v-dialog v-model="isDel" max-width="500" class="bg-black">
                <v-card>
                  <v-card-text class="bg-slate-200 text-slate-800">
                    <div>
                      <h1 class="text-center text-2xl font-bold antialiased">Eliminar Competencia</h1>
                    </div>
                    <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                    <div class="flex flex-col mt-6 mx-6 pb-2">
                      <form @submit.prevent="apiDel" class="flex flex-col justify-center items-center">
                        <h1>¿Seguro que desea eliminar "{{ competenciaId }}"?</h1>
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