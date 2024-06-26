import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const AlumnoApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/Alumno';

    async function setAlumno(values) {
        if (values.genero === "Masculino") {
            values.genero = "M";
        } else if (values.genero === "Femenino") {
            values.genero = "F";
        } else if (values.genero === "No binario") {
            values.genero = "N";
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

    async function getAlumno() {
        try {
            const response = await axios.get(APIURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(alumno => ({
                ...alumno,
                genero: alumno.genero === "M" ? "Masculino" :
                    alumno.genero === "F" ? "Femenino" :
                        "No binario"
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

    async function editAlumno(id, values) {
        if (values.genero === "Masculino") {
            values.genero = "M";
        } else if (values.genero === "Femenino") {
            values.genero = "F";
        } else if (values.genero === "No binario") {
            values.genero = "N";
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

    async function deleteAlumno(id) {
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
        setAlumno, getAlumno, editAlumno, deleteAlumno
    }
}

export default AlumnoApi
