import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const maestroApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/Maestro/';

    async function setMaestro(values) {
        if (values.tipoEstudios === "Licenciatura") {
            values.tipoEstudios = "L";
        } else if (values.tipoEstudios === "Maestria") {
            values.tipoEstudios = "M";
        } else if (values.tipoEstudios === "Doctorado") {
            values.tipoEstudios = "D";
        } else if (values.tipoEstudios === "Post Doctorado") {
            values.tipoEstudios = "P";
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

    async function getMaestros() {
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

    async function editMaestro(id, values) {
        if (values.tipoEstudios === "Licenciatura") {
            values.tipoEstudios = "L";
        } else if (values.tipoEstudios === "Maestria") {
            values.tipoEstudios = "M";
        } else if (values.tipoEstudios === "Doctorado") {
            values.tipoEstudios = "D";
        } else if (values.tipoEstudios === "Post Doctorado") {
            values.tipoEstudios = "P";
        }
        try {
            await axios.put(APIURL + id + '/', values, {
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

    async function deleteMaestro(id) {
        try {
            await axios.delete(APIURL + id + '/', {
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
        setMaestro, getMaestros, editMaestro, deleteMaestro
    }
}

export default maestroApi
