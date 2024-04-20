import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const actEnseñanzaApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/actividadEnseñanza';

    async function setActEnseñanza(values) {
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

    async function getActEnseñanza() {
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

    async function editActEnseñanza(id, values) {
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

    async function deleteActEnseñanza(id) {
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
        setActEnseñanza, getActEnseñanza, editActEnseñanza, deleteActEnseñanza
    }
}

export default actEnseñanzaApi
