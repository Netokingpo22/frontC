import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const claseApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/Clase';

    async function setClase(values) {
        values.maestro = JSON.parse(localStorage.getItem("maestro")).mId
        values.grupo = JSON.parse(localStorage.getItem("grupo")).gid
        values.aula = values.aula.match(/^\d+/)[0];
        console.log(values);
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

    async function getClase() {
        try {
            const response = await axios.get(APIURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
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

    async function getClaseByGrupo(grupoId) {
        try {
            const response = await axios.get(`${APIURL}/Grupo/${grupoId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(clase => ({
                ...clase,
                aulaNombre: clase.aula.nombre,
                aulaId: clase.aula.id,
            }));
            response.data = processedData;
            return response.data;
        } catch (error) {
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return;
            }
            useToast.error("Algo salio mal", option);
            return;
        }
    }

    async function editClase(id, values) {
        values.maestro = JSON.parse(localStorage.getItem("maestro")).mId
        values.grupo = JSON.parse(localStorage.getItem("grupo")).gid
        values.aula = values.aula.match(/^\d+/)[0];
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

    async function deleteClase(id) {
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
        setClase, getClase, editClase, deleteClase, getClaseByGrupo
    }
}

export default claseApi
