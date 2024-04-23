import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const listaCompetenciaApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/listaCompetencia';

    async function setListaCompetencia(values) {
        values.materia = JSON.parse(localStorage.getItem("materia")).mId;
        if (values.tipoCompetencia === "Ingreso") {
            values.tipoCompetencia = "1";
        } else if (values.tipoCompetencia === "Egreso") {
            values.tipoCompetencia = "2";
        }
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

    async function getListaCompetencia() {
        try {
            const response = await axios.get(APIURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(lCompetenciae => ({
                ...lCompetenciae,
                tipoCompetencia: lCompetenciae.tipoCompetencia === "1" ? "Ingreso" : "Egreso"
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
    async function getByMateria(materiaId) {
        try {
            const response = await axios.get(`${APIURL}/Materia/${materiaId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(lCompetenciae => ({
                ...lCompetenciae,
                tipoCompetencia: lCompetenciae.tipoCompetencia === "1" ? "Ingreso" : "Egreso"
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
    
    async function editListaCompetencia(id, values) {
        values.materia = JSON.parse(localStorage.getItem("materia")).mId;
        if (values.tipoCompetencia === "Ingreso") {
            values.tipoCompetencia = "1";
        } else if (values.tipoCompetencia === "Egreso") {
            values.tipoCompetencia = "2";
        }
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

    async function deleteListaCompetencia(id) {
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
        setListaCompetencia, getListaCompetencia, getByMateria, editListaCompetencia, deleteListaCompetencia
    }
}

export default listaCompetenciaApi
