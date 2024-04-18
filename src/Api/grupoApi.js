import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const grupoApi = () => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/Grupo';

    async function setGrupo(values) {
        values.materia = JSON.parse(localStorage.getItem("materia")).mId;
        if (values.semestre === "Enero - Mayo") {
            values.semestre = "1";
        } else if (values.semestre === "Verano") {
            values.semestre = "2";
        } else if (values.semestre === "Agosto - Diciembre") {
            values.semestre = "3";
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

    async function getGrupos() {
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
                useToast.error("El grupo ya existe", option);
                return;
            }
        }
    }

    async function getGrupo(pk) {
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
                useToast.error("El grupo no existe", option);
                return;
            }
        }
    }

    async function getGruposByMateria(materia_pk) {
        try {
            const response = await axios.get(APIURL + '/materia/' + materia_pk + '', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });
            const processedData = response.data.map(grupo => ({
                ...grupo,
                semestre: grupo.semestre === "1" ? "Enero - Mayo"
                    : grupo.semestre === "2" ? "Verano"
                        : "Agosto - Diciembre"
            }));
            response.data = processedData;
            return response.data;
        } catch (error) {
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return;
            }
            if (error.response.data.detail == "not found") {
                useToast.error("Los grupos para esta materia no existen", option);
                return;
            }
        }
    }

    async function editGrupo(id, values) {
        if (values.semestre === "Enero - Mayo") {
            values.semestre = "1";
        } else if (values.semestre === "Verano") {
            values.semestre = "2";
        } else if (values.semestre === "Agosto - Diciembre") {
            values.semestre = "3";
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

    async function deleteGrupo(id) {
        try {
            await axios.delete(APIURL + '/' + id, {
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
        setGrupo, getGrupos, getGrupo, getGruposByMateria, editGrupo, deleteGrupo
    }
}

export default grupoApi
