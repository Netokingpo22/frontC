import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const alumnoClaseApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/AlumnoClase';

    async function setAlumnoClase(values) {
        values.alumno = values.alumno.match(/^\d+/)[0];
        values.clase = JSON.parse(localStorage.getItem("clase")).cId
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

    async function getAlumnoClase() {
        try {
            const response = await axios.get(APIURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(alumnos => ({
                ...alumnos,
                alumno: alumnos.alumno.id + " - " + alumnos.alumno.matricula + " - " + alumnos.alumno.nombre + " " + alumnos.alumno.apellido,
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

    async function getAlumnoClaseByClase(clase_pk) {
        try {
            const response = await axios.get(APIURL + '/Clase/' + clase_pk, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(alumnos => ({
                ...alumnos,
                alumno: alumnos.alumno.id + " - " + alumnos.alumno.matricula + " - " + alumnos.alumno.nombre + " " + alumnos.alumno.apellido,
            }));
            response.data = processedData;
            return response.data;
        } catch (error) {
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return;
            }
            if (error.response.data.detail == "not found") {
                useToast.error("Las materias para esta carrera no existen", option);
                return;
            }
        }
    }

    async function editAlumnoClase(id, values) {
        values.alumno = values.alumno.match(/^\d+/)[0];
        values.clase = JSON.parse(localStorage.getItem("clase")).cId
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

    async function deleteAlumnoClase(id) {
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
        setAlumnoClase, getAlumnoClase, getAlumnoClaseByClase, editAlumnoClase, deleteAlumnoClase
    }
}

export default alumnoClaseApi