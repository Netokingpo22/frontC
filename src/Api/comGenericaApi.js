
import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const comGenericaApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/competenciaGenerica';

    async function setComGenerica(values) {
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

    async function getComGenerica() {
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
            if (error.detail == "found") {
                useToast.error("El usuario ya existe", option);
                return;
            }
        }
    }

    async function editComGenerica(id, values) {
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

    async function deleteComGenerica(id) {
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
        setComGenerica, getComGenerica, editComGenerica, deleteComGenerica
    }
}

export default comGenericaApi
