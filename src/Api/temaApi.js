import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const temaApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/Tema';

    async function setTema(values) {
        values.actividadEnseñanza = values.actividadEnseñanza.match(/^\d+/)[0];
        values.actividadAprendizaje = values.actividadAprendizaje.match(/^\d+/)[0];
        values.competenciaGenerica = values.competenciaGenerica.match(/^\d+/)[0];
        values.instrumentoEvaluacion = values.instrumentoEvaluacion.match(/^\d+/)[0];
        values.competencia = JSON.parse(localStorage.getItem("competencia")).cId
        try {
            await axios.post(APIURL, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            return true;
        } catch (error) {
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return false;
            }
            useToast.error("Algo salio mal", option);
            return false;
        }
    }

    async function getTema() {
        try {
            const response = await axios.get(APIURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(tema => ({
                ...tema,
                actividadEnseñanza: tema.actividadEnseñanza.id + " - " + tema.actividadEnseñanza.nombre,
                actividadAprendizaje: tema.actividadAprendizaje.id + " - " + tema.actividadAprendizaje.nombre,
                competenciaGenerica: tema.competenciaGenerica.id + " - " + tema.competenciaGenerica.nombre,
                instrumentoEvaluacion: tema.instrumentoEvaluacion.id + " - " + tema.instrumentoEvaluacion.nombre,
                portafolioEvidencia: tema.portafolioEvidencia == true ? "true" : "false"
            }));
            response.data = processedData;
            return response.data;
        } catch (error) {
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return;
            }
            if (error.response.data.detail == "found") {
                useToast.error("El usuario ya existe", option);
                return;
            }
        }
    }

    async function getTemaByCompetencia(competencia_id) {
        console.log(APIURL + '/competencia/' + competencia_id+"/");
        try {
            const response = await axios.get(APIURL + '/competencia/' + competencia_id+"/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(tema => ({
                ...tema,
                actividadEnseñanza: tema.actividadEnseñanza.id + " - " + tema.actividadEnseñanza.nombre,
                actividadAprendizaje: tema.actividadAprendizaje.id + " - " + tema.actividadAprendizaje.nombre,
                competenciaGenerica: tema.competenciaGenerica.id + " - " + tema.competenciaGenerica.nombre,
                instrumentoEvaluacion: tema.instrumentoEvaluacion.id + " - " + tema.instrumentoEvaluacion.nombre,
                portafolioEvidencia: tema.portafolioEvidencia == true ? "true" : "false"
            }));
            response.data = processedData;
            return response.data;
        } catch (error) {
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return;
            }
            if (error.response.data.detail == "found") {
                useToast.error("El usuario ya existe", option);
                return;
            }
        }
    }

    async function editTema(id, values) {
        values.actividadEnseñanza = values.actividadEnseñanza.match(/^\d+/)[0];
        values.actividadAprendizaje = values.actividadAprendizaje.match(/^\d+/)[0];
        values.competenciaGenerica = values.competenciaGenerica.match(/^\d+/)[0];
        values.instrumentoEvaluacion = values.instrumentoEvaluacion.match(/^\d+/)[0];
        values.competencia = JSON.parse(localStorage.getItem("competencia")).cId
        console.log(APIURL + '/' + id, values);
        try {
            await axios.put(APIURL + '/' + id, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            return true;
        } catch (error) {
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return false;
            }
            useToast.error("Algo salio mal", option);
            return false;
        }
    }

    async function deleteTema(id) {
        try {
            await axios.delete(APIURL + "/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            return true;
        } catch (error) {
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return false;
            }
            useToast.error("Algo salio mal", option);
            return false;
        }
    }
    return {
        setTema, getTema, getTemaByCompetencia, editTema, deleteTema
    }
}

export default temaApi
