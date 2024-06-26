<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue'
import { mdiDeleteOutline, mdiFileEditOutline, mdiClipboardArrowRightOutline, mdiPlusCircle } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import toastification from '../composable/toastification'
import temaApi from '../Api/temaApi';
import actEnseñanzaApi from '../Api/actEnseñanzaApi';
import actAprendizajeApi from '../Api/actAprendizajeApi';
import comGenericaApi from '../Api/comGenericaApi';
import insEvaluacionApi from '../Api/insEvaluacionApi';
import temaValidate from '../validates/temaValidate'

const router = useRouter()
const { option, useToast } = toastification();
const { setTema, getTemaByCompetencia, editTema, deleteTema } = temaApi(router);
const { getActEnseñanza } = actEnseñanzaApi(router);
const { getActAprendizaje } = actAprendizajeApi(router);
const { getComGenerica } = comGenericaApi(router);
const { getInsEvaluacion } = insEvaluacionApi(router);
const { nombre, actividadEnseñanza, actividadAprendizaje, horasTeoria, horasPractica, competenciaGenerica, portafolioEvidencia, instrumentoEvaluacion, competencia, handleSubmit, reset } = temaValidate();
const isAdd = ref(false);
const isUp = ref(false);
const isDel = ref(false);
const carreaNombre = JSON.parse(localStorage.getItem("carrera")).cNombre + "(" + (JSON.parse(localStorage.getItem("carrera")).cSiglas) + ")"
const materiaNombre = JSON.parse(localStorage.getItem("materia")).mNombre + " (" + JSON.parse(localStorage.getItem("materia")).mClave + ")"
const listCompetenciaNombre = JSON.parse(localStorage.getItem("listCompetencia")).lId
const competenciaNombre = JSON.parse(localStorage.getItem("competencia")).cNombre

const postTema = handleSubmit(values => {
  apiPost(values)
})
async function apiPost(values) {
  const data = await setTema(values);
  if (data) {
    isAdd.value = false;
    reset();
    useToast.success("Se ha agregado un nuevo tema.", option);
    const updatedTemas = await getTemaByCompetencia(JSON.parse(localStorage.getItem("competencia")).cId);
    temas.value = updatedTemas;
  }
}

const putTema = handleSubmit(values => {
  apiPut(values)
})
async function apiPut(values) {
  let newValues = {
    nombre: values.nombre,
    actividadEnseñanza: values.actividadEnseñanza,
    actividadAprendizaje: values.actividadAprendizaje,
    horasTeoria: values.horasTeoria,
    horasPractica: values.horasPractica,
    competenciaGenerica: values.competenciaGenerica,
    portafolioEvidencia: values.portafolioEvidencia,
    instrumentoEvaluacion: values.instrumentoEvaluacion,
    competencia: values.competencia
  };
  const data = await editTema(temaId.value, newValues);
  if (data) {
    isUp.value = false;
    reset();
    useToast.success("Se ha editado un tema.", option);
    const updatedTemas = await getTemaByCompetencia(JSON.parse(localStorage.getItem("competencia")).cId);
    temas.value = updatedTemas;
  }
}


async function apiDel() {
  const data = await deleteTema(temaId.value);
  if (data) {
    isDel.value = false;
    reset();
    useToast.success("Se ha eliminado un tema.", option);
    const updatedTemas = await getTemaByCompetencia(JSON.parse(localStorage.getItem("competencia")).cId);
    temas.value = updatedTemas;
  }
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
function pushCompetencia() {
  router.push('/competencia')
}
function pushTema() {
  router.push('/Tema')
}
function pushActividadAprendizaje() {
  router.push('/ActividadAprendizaje')
}
function pushActividadEnseñanza() {
  router.push('/ActividadEnseñanza')
}
function pushCompetenciaGenerica() {
  router.push('/CompetenciaGenerica')
}
function pushInstrumentoEvaluacion() {
  router.push('/InstrumentoEvaluacion')
}

function addItem() {
  reset();
  isAdd.value = true;
}
function editeItem(param) {
  reset();
  isUp.value = true;
  temaId.value = param.id
  nombre.value.value = param.nombre
  actividadEnseñanza.value.value = param.actividadEnseñanza
  actividadAprendizaje.value.value = param.actividadAprendizaje
  horasTeoria.value.value = param.horasTeoria
  horasPractica.value.value = param.horasPractica
  competenciaGenerica.value.value = param.competenciaGenerica
  portafolioEvidencia.value.value = param.portafolioEvidencia
  instrumentoEvaluacion.value.value = param.instrumentoEvaluacion
}

function deleteItem(param) {
  isDel.value = true;
  temaId.value = param.id
  nombre.value.value = param.nombre
}

//Table fill ------------------------------------------
const temas = ref([]);
const actEnseñanza = ref([]);
const actAprendizaje = ref([]);
const compGenerica = ref([]);
const insEvaluacion = ref([]);
const search = ref('');
const temaId = ref('');
const headers = [
  {
    align: 'start',
    key: 'id',
    sortable: true,
    title: 'Id',
  },
  { key: 'nombre', title: 'Nombre' },
  { title: 'Editar', key: 'edit', sortable: false },
  { title: 'Eliminar', key: 'delete', sortable: false },
];
async function fillTable() {
  const data = await getTemaByCompetencia(JSON.parse(localStorage.getItem("competencia")).cId);
  temas.value = data;
}
async function fillAutocompletes() {
  const actE = await getActEnseñanza();
  const processedActE = actE.map(actividadE => actividadE.id + " - " + actividadE.nombre);
  actEnseñanza.value = processedActE;
  const actA = await getActAprendizaje();
  const processedActA = actA.map(actividadA => actividadA.id + " - " + actividadA.nombre);
  actAprendizaje.value = processedActA;
  const compG = await getComGenerica();
  const processedCompG = compG.map(competenciaG => competenciaG.id + " - " + competenciaG.nombre);
  compGenerica.value = processedCompG;
  const instE = await getInsEvaluacion();
  const processedInstE = instE.map(instrumentoE => instrumentoE.id + " - " + instrumentoE.nombre);
  insEvaluacion.value = processedInstE;
}
onBeforeMount(fillTable);
onBeforeMount(fillAutocompletes);
//-----------------------------------
//-----------------------------------------------------
</script>

<template>
  <main>
    <v-app>
      <div class="flex flex-col justify-center items-center h-full bg-slate-200 text-slate-800 text-[16px] py-5">
        <div class="flex flex-row justify-center items-center">
          <v-btn class="text-none w-fit mx-1" variant="outlined" @click="pushCompetencia()">
            <p class=" font-bold">Atras</p>
          </v-btn>
          <v-btn class="text-none w-fit mx-1" variant="outlined" @click="pushActividadAprendizaje()">
            <p class=" font-bold">Act. de Aprendizaje</p>
          </v-btn>
          <v-btn class="text-none w-fit mx-1" variant="outlined" @click="pushActividadEnseñanza()">
            <p class=" font-bold">Act. de Enseñanza</p>
          </v-btn>
          <v-btn class="text-none w-fit mx-1" variant="outlined" @click="pushCompetenciaGenerica()">
            <p class=" font-bold">Com. Generica</p>
          </v-btn>
          <v-btn class="text-none w-fit mx-1" variant="outlined" @click="pushInstrumentoEvaluacion()">
            <p class=" font-bold">Int. de Evaluacion</p>
          </v-btn>
        </div>
        <div class="pt-5"></div>
        <v-btn variant="outlined" @click="addItem()" class="max-h-[35px]" style="text-transform: none;">
          <p class="font-bold">Agregar</p>
        </v-btn><v-dialog v-model="isAdd" max-width="500" class="bg-black"><v-card>
            <v-card-text class="bg-slate-200 text-slate-800">
              <div>
                <h1 class="text-center text-2xl font-bold antialiased">Agregar tema</h1>
              </div>
              <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
              <div class="flex flex-col mt-6 mx-6 pb-2">
                <form @submit.prevent="postTema" class="flex flex-col justify-center items-center">
                  <v-text-field v-model="nombre.value.value" :error-messages="nombre.errorMessage.value" label="Nombre"
                    variant="outlined" class="w-full mb-2"></v-text-field>
                  <v-autocomplete v-model="actividadEnseñanza.value.value"
                    :error-messages="actividadEnseñanza.errorMessage.value" label="Actividad de Enseñanza"
                    variant="outlined" class="w-full mb-2" :items="actEnseñanza"></v-autocomplete>
                  <v-autocomplete v-model="actividadAprendizaje.value.value"
                    :error-messages="actividadAprendizaje.errorMessage.value" label="Actividad de Aprendizaje"
                    variant="outlined" class="w-full mb-2" :items="actAprendizaje"></v-autocomplete>
                  <v-text-field v-model="horasTeoria.value.value" :error-messages="horasTeoria.errorMessage.value"
                    label="Horas de Teoría" variant="outlined" class="w-full mb-2"></v-text-field>
                  <v-text-field v-model="horasPractica.value.value" :error-messages="horasPractica.errorMessage.value"
                    label="Horas de Práctica" variant="outlined" class="w-full mb-2"></v-text-field>
                  <v-autocomplete v-model="competenciaGenerica.value.value"
                    :error-messages="competenciaGenerica.errorMessage.value" label="Competencia Genérica"
                    variant="outlined" class="w-full mb-2" :items="compGenerica"></v-autocomplete>
                  <v-autocomplete v-model="portafolioEvidencia.value.value"
                    :error-messages="portafolioEvidencia.errorMessage.value" label="Portafolio de Evidencia"
                    variant="outlined" class="w-full mb-2" :items="['true', 'false']"></v-autocomplete>
                  <v-autocomplete v-model="instrumentoEvaluacion.value.value"
                    :error-messages="instrumentoEvaluacion.errorMessage.value" label="Instrumento de Evaluación"
                    variant="outlined" class="w-full mb-2" :items="insEvaluacion"></v-autocomplete>
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
              <p class="text-xl pt-3 pl-3">{{ carreaNombre }} / {{ materiaNombre }} / Lista : {{ listCompetenciaNombre
                }} / {{ competenciaNombre }} / Temas</p>
            </v-card-title>
            <v-card-title>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                variant="outlined" class="min-w-[300px]"></v-text-field>
            </v-card-title>
          </div>
          <div class="h-[2px] bg-slate-800 mb-1"></div>
          <v-data-table :headers="headers" :items="temas" :search="search"
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
                      <h1 class="text-center text-2xl font-bold antialiased">Editar intención didáctica</h1>
                    </div>
                    <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                    <div class="flex flex-col mt-6 mx-6 pb-2">
                      <form @submit.prevent="putTema" class="flex flex-col justify-center items-center">
                        <v-text-field v-model="nombre.value.value" :error-messages="nombre.errorMessage.value"
                          label="Nombre" variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-autocomplete v-model="actividadEnseñanza.value.value"
                          :error-messages="actividadEnseñanza.errorMessage.value" label="Actividad de Enseñanza"
                          variant="outlined" class="w-full mb-2" :items="actEnseñanza"></v-autocomplete>
                        <v-autocomplete v-model="actividadAprendizaje.value.value"
                          :error-messages="actividadAprendizaje.errorMessage.value" label="Actividad de Aprendizaje"
                          variant="outlined" class="w-full mb-2" :items="actAprendizaje"></v-autocomplete>
                        <v-text-field v-model="horasTeoria.value.value" :error-messages="horasTeoria.errorMessage.value"
                          label="Horas de Teoría" variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-text-field v-model="horasPractica.value.value"
                          :error-messages="horasPractica.errorMessage.value" label="Horas de Práctica"
                          variant="outlined" class="w-full mb-2"></v-text-field>
                        <v-autocomplete v-model="competenciaGenerica.value.value"
                          :error-messages="competenciaGenerica.errorMessage.value" label="Competencia Genérica"
                          variant="outlined" class="w-full mb-2" :items="compGenerica"></v-autocomplete>
                        <v-autocomplete v-model="portafolioEvidencia.value.value"
                          :error-messages="portafolioEvidencia.errorMessage.value" label="Portafolio de Evidencia"
                          variant="outlined" class="w-full mb-2" :items="['true', 'false']"></v-autocomplete>
                        <v-autocomplete v-model="instrumentoEvaluacion.value.value"
                          :error-messages="instrumentoEvaluacion.errorMessage.value" label="Instrumento de Evaluación"
                          variant="outlined" class="w-full mb-2" :items="insEvaluacion"></v-autocomplete>
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
                      <h1 class="text-center text-2xl font-bold antialiased">Eliminar aula</h1>
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