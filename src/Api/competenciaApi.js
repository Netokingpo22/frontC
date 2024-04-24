import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const competenciaApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/Competencia';

    async function setCompetencia(values) {
        values.listaCompetencia = JSON.parse(localStorage.getItem("listCompetencia")).lId
        if (values.nivel === "Introductorio") {
            values.nivel = "I";
        } else if (values.nivel === "Medio") {
            values.nivel = "M";
        } else if (values.nivel === "Avanazado") {
            values.nivel = "A";
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

    async function getCompetencia() {
        try {
            const response = await axios.get(APIURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(competencia => ({
                ...competencia,
                nivel: competencia.nivel === "I" ? "Introductorio"
                    : competencia.nivel === "M" ? "Medio"
                        : "Avanazado"
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
    async function getByListaCompetencia(listaCompetenciaId) {
        try {
            const response = await axios.get(`${APIURL}/listaCompetencia/${listaCompetenciaId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(competencia => ({
                ...competencia,
                nivel: competencia.nivel === "I" ? "Introductorio"
                    : competencia.nivel === "M" ? "Medio"
                        : "Avanzado"
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

    async function editCompetencia(id, values) {
        values.listaCompetencia = JSON.parse(localStorage.getItem("listCompetencia")).lId
        if (values.nivel === "Introductorio") {
            values.nivel = "I";
        } else if (values.nivel === "Medio") {
            values.nivel = "M";
        } else if (values.nivel === "Avanazado") {
            values.nivel = "A";
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

    async function deleteCompetencia(id) {
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
        setCompetencia, getCompetencia, getByListaCompetencia, editCompetencia, deleteCompetencia
    }
}

export default competenciaApi
