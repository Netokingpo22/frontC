<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue'
import { mdiDeleteOutline, mdiFileEditOutline, mdiClipboardArrowRightOutline, mdiPlusCircle } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import toastification from '../composable/toastification'
import materiaApi from '../Api/materiaApi';
import maestroApi from '../Api/maestroApi';
import intencionDidacticaApi from '../Api/intDidacticaApi';
import materiaValidate from '../validates/materiaValidate'

const router = useRouter()
const { option, useToast } = toastification();
const { setMateria, getMateria, getMaterias, getMateriasByCarrera, editMateria, deleteMateria } = materiaApi(router);
const { getMaestros } = maestroApi(router);
const { getIntencionDidactica } = intencionDidacticaApi(router);
const { carerra, nombre, clave, creditosTeoricos, creditosPracticos, maestro, competenciaGeneral, intencionDidactica, caracterizacion, tipoMateria, semestre, handleSubmit, reset } = materiaValidate();
const isAdd = ref(false);
const isUp = ref(false);
const isDel = ref(false);
const carreaNombre = JSON.parse(localStorage.getItem("carrera")).cNombre + " (" + JSON.parse(localStorage.getItem("carrera")).cSiglas + ")"

const postMateria = handleSubmit(values => {
  apiPost(values)
})
async function apiPost(values) {
  const data = await setMateria(values);
  if (data) {
    isAdd.value = false;
    reset();
    useToast.success("Se ha agregado una nueva materia.", option);
    const updatedMaterias = await getMateriasByCarrera(JSON.parse(localStorage.getItem("carrera")).cId);
    materias.value = updatedMaterias;
  }
}

const putMateria = handleSubmit(values => {
  apiPut(values)
})
async function apiPut(values) {
  let newValues = { carerra: values.carerra, nombre: values.nombre, clave: values.clave, creditosTeoricos: values.creditosTeoricos, creditosPracticos: values.creditosPracticos, maestro: values.maestro, competenciaGeneral: values.competenciaGeneral, intencionDidactica: values.intencionDidactica, caracterizacion: values.caracterizacion, tipoMateria: values.tipoMateria, semestre: values.semestre };
  const data = await editMateria(materiaId.value, newValues);
  if (data) {
    isUp.value = false;
    reset();
    useToast.success("Se ha editado una materia.", option);
    const updatedMaterias = await getMateriasByCarrera(JSON.parse(localStorage.getItem("carrera")).cId);
    materias.value = updatedMaterias;
  }
}

async function apiDel() {
  const data = await deleteMateria(materiaId.value);
  if (data) {
    isDel.value = false;
    reset();
    useToast.success("Se ha eliminado una materia.", option);
    const updatedMaterias = await getMateriasByCarrera(JSON.parse(localStorage.getItem("carrera")).cId);
    materias.value = updatedMaterias;
  }
}

function access(param) {
  localStorage.setItem("materia", JSON.stringify({
    mId: param.id,
    mNombre: param.nombre,
    mClave: param.clave,
  }));
  router.push('/grupo')
}

function pushMaterias() {
  router.push('/materia')
}

function pushIntDiactica() {
  router.push('/intDidactica')
}

function pushCarreras() {
  router.push('/carrera')
}

function addItem() {
  reset();
  isAdd.value = true;
}

function editeItem(param) {
  reset();
  isUp.value = true;
  materiaId.value = param.id
  nombre.value.value = param.nombre
  clave.value.value = param.clave
  creditosTeoricos.value.value = param.creditosTeoricos
  creditosPracticos.value.value = param.creditosPracticos
  maestro.value.value = param.idMaestro + " - " + param.maestro
  competenciaGeneral.value.value = param.competenciaGeneral
  intencionDidactica.value.value = param.idIntecion + " - " + param.intencionDidactica
  caracterizacion.value.value = param.caracterizacion
  tipoMateria.value.value = param.tipoMateria
  semestre.value.value = param.semestre
}

function deleteItem(param) {
  isDel.value = true;
  materiaId.value = param.id
  nombre.value.value = param.nombre
}
//Table fill ------------------------------------------
const materias = ref([]);
const maestros = ref([]);
const intenciones = ref([]);
const search = ref('');
const materiaId = ref('');
const headers = [
  {
    align: 'start',
    key: 'id',
    sortable: true,
    title: 'Id',
  },
  { key: 'nombre', title: 'Nombre' },
  { key: 'clave', title: 'Clave' },
  { key: 'maestro', title: 'Maestro' },
  { key: 'competenciaGeneral', title: 'Competencia General' },
  { key: 'intencionDidactica', title: 'Intencion Didactica' },
  { key: 'tipoMateria', title: 'Tipo de Materia' },
  { key: 'semestre', title: 'Semestre' },
  { title: 'Acceder', key: 'acceder', sortable: false },
  { title: 'Editar', key: 'edit', sortable: false },
  { title: 'Eliminar', key: 'delete', sortable: false },
];
async function fillTable() {
  const data = await getMateriasByCarrera(JSON.parse(localStorage.getItem("carrera")).cId);
  materias.value = data;
  carerra.value.value = JSON.parse(localStorage.getItem("carrera")).cId
    ;
}
async function fillAutocompletes() {
  const maes = await getMaestros();
  const processedMaes = maes.map(maestro => maestro.id + " - " + maestro.nombre + " " + maestro.apellido);
  maestros.value = processedMaes;
  const inte = await getIntencionDidactica();
  const processedInte = inte.map(intecion => intecion.idIntecion + " - " + intecion.nombre);
  intenciones.value = processedInte;
}
onBeforeMount(fillTable);
onBeforeMount(fillAutocompletes);
//-----------------------------------------------------
</script>

<template>
  <main>
    <v-app>
      <div class="flex flex-col justify-center items-center h-full bg-slate-200 text-slate-800 text-[16px] py-5">
        <div class="flex flex-row justify-center items-center">
          <v-btn class="text-none w-2/3 my-1 mx-1" variant="outlined" @click="pushCarreras()">
            <p class=" font-bold">Atras</p>
          </v-btn>
          <v-btn class="text-none w-2/3 my-1 mx-1" variant="outlined" @click="pushMaterias()">
            <p class=" font-bold">Materias</p>
          </v-btn>
          <v-btn class="text-none w-2/3 my-1 mx-1" variant="outlined" @click="pushIntDiactica()">
            <p class=" font-bold">int. Didactica</p>
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
                <h1 class="text-center text-2xl font-bold antialiased">Agregar materia</h1>
              </div>
              <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
              <div class="flex flex-col mt-6 mx-6 pb-2">
                <form @submit.prevent="postMateria" class="flex flex-col justify-center items-center">
                  <v-text-field v-model="nombre.value.value" :error-messages="nombre.errorMessage.value" label="Nombre"
                    variant="outlined" class="w-full mb-2"></v-text-field>
                  <v-text-field v-model="clave.value.value" :error-messages="clave.errorMessage.value" label="Clave"
                    variant="outlined" class="w-full mb-2"></v-text-field>
                  <v-text-field v-model="creditosTeoricos.value.value"
                    :error-messages="creditosTeoricos.errorMessage.value" label="Creditos Teoricos" variant="outlined"
                    class="w-full mb-2"></v-text-field>
                  <v-text-field v-model="creditosPracticos.value.value"
                    :error-messages="creditosPracticos.errorMessage.value" label="Creditos Practicos" variant="outlined"
                    class="w-full mb-2"></v-text-field>
                  <v-autocomplete v-model="maestro.value.value" :error-messages="maestro.errorMessage.value"
                    label="Maestro" variant="outlined" class="w-full mb-2" :items="maestros"></v-autocomplete>
                  <v-text-field v-model="competenciaGeneral.value.value"
                    :error-messages="competenciaGeneral.errorMessage.value" label="Competencia General"
                    variant="outlined" class="w-full mb-2"></v-text-field>
                  <v-autocomplete v-model="intencionDidactica.value.value"
                    :error-messages="intencionDidactica.errorMessage.value" label="Intencion Didactica"
                    variant="outlined" class="w-full mb-2" :items="intenciones"></v-autocomplete>
                  <v-text-field v-model="caracterizacion.value.value"
                    :error-messages="caracterizacion.errorMessage.value" label="Caracterizacion" variant="outlined"
                    class="w-full mb-2"></v-text-field>
                  <v-autocomplete v-model="tipoMateria.value.value" :error-messages="tipoMateria.errorMessage.value"
                    label="Tipo de Materia" variant="outlined" class="w-full mb-2"
                    :items="['Común', 'Especialidad']"></v-autocomplete>
                  <v-text-field v-model="semestre.value.value" :error-messages="semestre.errorMessage.value"
                    label="Semestre" variant="outlined" class="w-full mb-2"></v-text-field>
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
              <p class="text-xl pt-3 pl-3">{{ carreaNombre }} / Materias</p>
            </v-card-title>
            <v-card-title>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                variant="outlined" class="min-w-[300px]"></v-text-field>
            </v-card-title>
          </div>
          <div class="h-[2px] bg-slate-800 mb-1"></div>
          <v-data-table :headers="headers" :items="materias" :search="search"
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
                      <form @submit.prevent="putMateria" class="flex flex-col justify-center items-center">
                        <v-text-field v-model="nombre.value.value" :error-messages="nombre.errorMessage.value"
                          label="Nombre" variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-text-field v-model="clave.value.value" :error-messages="clave.errorMessage.value"
                          label="Clave" variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-text-field v-model="creditosTeoricos.value.value"
                          :error-messages="creditosTeoricos.errorMessage.value" label="Creditos Teoricos"
                          variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-text-field v-model="creditosPracticos.value.value"
                          :error-messages="creditosPracticos.errorMessage.value" label="Creditos Practicos"
                          variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-autocomplete v-model="maestro.value.value" :error-messages="maestro.errorMessage.value"
                          label="Maestro" variant="outlined" class="w-full mb-2" :items="maestros"></v-autocomplete>
                        <v-text-field v-model="competenciaGeneral.value.value"
                          :error-messages="competenciaGeneral.errorMessage.value" label="Competencia General"
                          variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-autocomplete v-model="intencionDidactica.value.value"
                          :error-messages="intencionDidactica.errorMessage.value" label="Intencion Didactica"
                          variant="outlined" class="w-full mb-2" :items="intenciones"></v-autocomplete>
                        <v-text-field v-model="caracterizacion.value.value"
                          :error-messages="caracterizacion.errorMessage.value" label="Caracterizacion"
                          variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-autocomplete v-model="tipoMateria.value.value"
                          :error-messages="tipoMateria.errorMessage.value" label="Tipo de Materia" variant="outlined"
                          class="w-full mb-2" :items="['Común', 'Especialidad']"></v-autocomplete>
                        <v-text-field v-model="semestre.value.value" :error-messages="semestre.errorMessage.value"
                          label="Semestre" variant="outlined" class="w-full mb-2"></v-text-field>
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
                      <h1 class="text-center text-2xl font-bold antialiased">Eliminar maestro</h1>
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