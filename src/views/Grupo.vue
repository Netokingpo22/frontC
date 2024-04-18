<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue'
import { mdiDeleteOutline, mdiFileEditOutline, mdiClipboardArrowRightOutline, mdiPlusCircle } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import toastification from '../composable/toastification'
import grupoApi from '../Api/grupoApi';
import grupoValidate from '../validates/grupoValidate';

const router = useRouter()
const { option, useToast } = toastification();
const { setGrupo, getGruposByMateria, editGrupo, deleteGrupo } = grupoApi(router);
const { materia, numero, año, semestre, handleSubmit, reset } = grupoValidate();
const isAdd = ref(false);
const isUp = ref(false);
const isDel = ref(false);


const carreaNombre = JSON.parse(localStorage.getItem("carrera")).cNombre + "(" + (JSON.parse(localStorage.getItem("carrera")).cSiglas) + ")"
const materiaNombre = JSON.parse(localStorage.getItem("materia")).mNombre + " (" + JSON.parse(localStorage.getItem("materia")).mClave + ")"
const postGrupo = handleSubmit(values => {
  apiPost(values)
})
async function apiPost(values) {
  const data = await setGrupo(values);
  if (data) {
    isAdd.value = false;
    reset();
    useToast.success("Se ha agregado un nuevo grupo.", option);
    const updatedGrupos = await getGruposByMateria(JSON.parse(localStorage.getItem("materia")).mId);
    grupos.value = updatedGrupos;
  }
}

const putGrupo = handleSubmit(values => {
  apiPut(values)
})
async function apiPut(values) {
  values.materia = JSON.parse(localStorage.getItem("materia")).mId;
  const data = await editGrupo(grupoId.value, values);
  if (data) {
    isUp.value = false;
    reset();
    useToast.success("Se ha editado un grupo.", option);
    const updatedGrupos = await getGruposByMateria(JSON.parse(localStorage.getItem("materia")).mId);
    grupos.value = updatedGrupos;
  }
}

async function apiDel() {
  const data = await deleteGrupo(grupoId.value);
  if (data) {
    isDel.value = false;
    reset();
    useToast.success("Se ha eliminado un grupo.", option);
    const updatedGrupos = await getGruposByMateria(JSON.parse(localStorage.getItem("materia")).mId);
    grupos.value = updatedGrupos;
  }
}

function access(param) {
  localStorage.setItem("grupo", JSON.stringify({
    gid: param.id,
    gNumero: param.numero,
    gAño : param.año,
    gSemestre: param.semestre,
  })); 
  router.push('/clase')
}

function pushMateria() {
  router.push('/materia')
}

function pushGrupo() {
  router.push('/grupo')
}

function pushComopetencia() {
  router.push('/Competencia')
}

function addItem() {
  reset();
  isAdd.value = true;
}

function editeItem(param) {
  reset();
  isUp.value = true;
  grupoId.value = param.id
  numero.value.value = param.numero
  año.value.value = param.año
  semestre.value.value = param.semestre
}

function deleteItem(param) {
  isDel.value = true;
  grupoId.value = param.id
}
//Table fill ------------------------------------------
const grupos = ref([]);
const search = ref('');
const grupoId = ref('');
const headers = [
  {
    align: 'start',
    key: 'id',
    sortable: true,
    title: 'Id',
  },
  { key: 'numero', title: 'Número' },
  { key: 'año', title: 'Año' },
  { key: 'semestre', title: 'Semestre' },
  { title: 'Acceder', key: 'acceder', sortable: false },
  { title: 'Editar', key: 'edit', sortable: false },
  { title: 'Eliminar', key: 'delete', sortable: false },
];
async function fillTable() {
  const data = await getGruposByMateria(JSON.parse(localStorage.getItem("materia")).mId);
  grupos.value = data;
  materia.value = JSON.parse(localStorage.getItem("materia")).mId;
}
onBeforeMount(fillTable);
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
            <p class=" font-bold">Grupo</p>
          </v-btn>
          <v-btn class="text-none w-2/3 my-1 mx-1" variant="outlined" @click="pushComopetencia()">
            <p class=" font-bold">Competencias</p>
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
                <h1 class="text-center text-2xl font-bold antialiased">Agregar Grupo</h1>
              </div>
              <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
              <div class="flex flex-col mt-6 mx-6 pb-2">
                <form @submit.prevent="postGrupo" class="flex flex-col justify-center items-center">
                  <v-text-field v-model="numero.value.value" :error-messages="numero.errorMessage.value" label="Número"
                    variant="outlined" class="w-full mb-2"></v-text-field>
                  <v-text-field v-model="año.value.value" :error-messages="año.errorMessage.value" label="Año"
                    variant="outlined" class="w-full mb-2"></v-text-field>
                  <v-autocomplete v-model="semestre.value.value" :error-messages="semestre.errorMessage.value"
                    label="Semestre" variant="outlined" class="w-full mb-2"
                    :items="['Enero - Mayo', 'Verano', 'Agosto - Diciembre']"></v-autocomplete>
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
        <div class="flex flex-col border-solid border-2 border-slate-800 px-5 py-1 mt-3 w-11/12 h-fit">
          <div class="flex mt-1 justify-between align-middle">
            <v-card-title>
              <p class="text-xl pt-3 pl-3">{{ carreaNombre }} / {{ materiaNombre }} / Grupos</p>
            </v-card-title>
            <v-card-title>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                variant="outlined" class="min-w-[300px]"></v-text-field>
            </v-card-title>
          </div>
          <div class="h-[2px] bg-slate-800 mb-1"></div>
          <v-data-table :headers="headers" :items="grupos" :search="search"
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
                      <h1 class="text-center text-2xl font-bold antialiased">Editar materia</h1>
                    </div>
                    <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                    <div class="flex flex-col mt-6 mx-6 pb-2">
                      <form @submit.prevent="putGrupo" class="flex flex-col justify-center items-center">
                        <v-text-field v-model="numero.value.value" :error-messages="numero.errorMessage.value"
                          label="Número" variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-text-field v-model="año.value.value" :error-messages="año.errorMessage.value" label="Año"
                          variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-autocomplete v-model="semestre.value.value" :error-messages="semestre.errorMessage.value"
                          label="Semestre" variant="outlined" class="w-full mb-2"
                          :items="['Enero - Mayo', 'Verano', 'Agosto - Diciembre']"></v-autocomplete>
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
                      <h1 class="text-center text-2xl font-bold antialiased">Eliminar grupo</h1>
                    </div>
                    <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                    <div class="flex flex-col mt-6 mx-6 pb-2">
                      <form @submit.prevent="apiDel" class="flex flex-col justify-center items-center">
                        <h1>¿Seguro que desea eliminar "{{ materia.value.value }}"?</h1>
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