import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const carreraApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/Carrera';

    function setCarrera(values) {
        return axios.post(APIURL, values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }).then(() => {
            return true;
        }).catch((error) => {
            console.log(error);
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return false;
            }
            useToast.error("Algo salio mal", option);
            return false;
        });
    }

    function getCarreras() {
        return axios.get(APIURL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }).then(response => {
            return response.data;
        }).catch((error) => {
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return;
            }
            if (error.response.data.detail == "found") {
                useToast.error("El usuario ya existe", option);
                return;
            }
        });
    }

    function editCarrera(id, values) {
        return axios.put(`${APIURL}/${id}`, values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }).then(() => {
            return true;
        }).catch((error) => {
            console.log(error);
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return false;
            }
            useToast.error("Algo salio mal", option);
            return false;
        });
    }

    function deleteCarrera(id) {
        return axios.delete(`${APIURL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }).then(() => {
            return true;
        }).catch((error) => {
            console.log(error);
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return false;
            }
            useToast.error("Algo salio mal", option);
            return false;
        });
    }

    return {
        setCarrera, getCarreras, editCarrera, deleteCarrera
    }
}
export default carreraApi