import axios from 'axios';
import toastification from '../composable/toastification'

const { option, useToast } = toastification();

const logInApi = (router) => {
    const APIURL = 'http://127.0.0.1:8000/api/v1/';

    const login = ((values) => {
        axios.post(APIURL + 'login', values, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            const data = response.data;
            localStorage.setItem("id", data.id);
            localStorage.setItem("username", data.username);
            localStorage.setItem("token", "token " + data.token);
            useToast.success("Se ha iniciado sesión de manera correcta.", option);
            router.push('/carrera')
        }).catch((error) => {
            console.log(error);
            if (error.code == "ERR_NETWORK") {
                useToast.error("Error en el servidor", option);
                return;
            }
            if (error.response.data.detail == "Not found.") {
                useToast.error("El usuario o la contraseña no son correctos", option);
                return;
            }
        });
    })

    const singup = (values => {
        axios.post(APIURL + 'singup', values, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            const data = response.data;
            localStorage.setItem("id", data.id);
            localStorage.setItem("username", data.username);
            localStorage.setItem("token", "token " + data.token);
            useToast.success("Se ha registrado de manera correcta.", option);
            router.push('/carrera')
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
    })

    return {
        login, singup
    }
}
export default logInApi