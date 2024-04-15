import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const materiaApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/Materia';

    async function setMateria(values) {
        values.maestro = values.maestro.match(/^\d+/)[0];
        values.intencionDidactica = values.intencionDidactica.match(/^\d+/)[0];
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

    async function getMateria(pk) {
        try {
            const response = await axios.get(APIURL + pk + '/', {
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
            if (error.response.data.detail == "not found") {
                useToast.error("La materia no existe", option);
                return;
            }
        }
    }

    async function getMaterias() {
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
            if (error.response.data.detail == "not found") {
                useToast.error("Las materias no existen", option);
                return;
            }
        }
    }

    async function getMateriasByCarrera(carrera_pk) {
        try {
            const response = await axios.get(APIURL + '/carrera/' + carrera_pk + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(materia => ({
              ...materia,
              maestro: materia.maestro.nombre_completo,
              intencionDidactica: materia.intencionDidactica.nombre
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

    async function editMateria(id, values) {
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

    async function deleteMateria(id) {
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
        setMateria, getMateria, getMaterias, getMateriasByCarrera, editMateria, deleteMateria
    }
}

export default materiaApi