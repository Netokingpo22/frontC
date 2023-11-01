<script setup>
import { useField, useForm } from 'vee-validate'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router'

const router = useRouter()
const { handleSubmit } = useForm({
  validationSchema: {
    username(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    password(value) {
      if (value?.length >= 1) return true
      return 'La contrseña no puede estar vacío. '
    },
  },
})
const toast = useToast();
const options = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};
const username = useField('username')
const password = useField('password')
const logIn = handleSubmit(values => {
  fetch('http://127.0.0.1:8000/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(response => response.json())
    .then(data => {
      if (data.detail == "Not found.") {
        toast.error("Error : \nEl usuario o la contraseña no son correctos", options);
        return;
      }
      localStorage.setItem("id", data.id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", "token "+data.token);
      toast.success("Se ha iniciado sesión de manera correcta.", options);
      router.push('/carrera')
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error : \nHa ocurrido un error en el servidor.", options);
    });
})
</script>

<template>
  <main>
    <div class="flex justify-center items-center h-screen bg-slate-800 text-slate-800">
      <form @submit.prevent="logIn"
        class="min-w-[400px] border-2 bg-slate-200 rounded-lg p-10 drop-shadow-[25px_25px_1px_rgba(0,0,0,0.1)]">
        <h1 class="flex justify-center items-center text-4xl mb-10 font-bold antialiased ">Inicio de sesión</h1>
        <v-text-field v-model="username.value.value" :error-messages="username.errorMessage.value" label="Usuario"
          variant="outlined" class="mb-2" placeholder="Introduzca su usuario"></v-text-field>

        <v-text-field v-model="password.value.value" :error-messages="password.errorMessage.value" label="Contraseña"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          variant="outlined" @click:append-inner.prevent="onClickAppendIcon" ref="pwTxt" class="mb-2"
          placeholder="Introduzca su contraseña"></v-text-field>

        <div class="center mb-2 flex justify-center items-center">
          <v-btn class="text-none w-full" color="#1abc9c" variant="flat" type="submit">
            <p class=" font-bold">Iniciar sesión</p>
          </v-btn>
        </div>
        <a class=" text-slate-600 flex justify-center items-center pt-4 mb-4 text-xs" href="" @click.prevent="">
          ¿Olvidaste tu contraseña? <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
        <v-divider class="border-opacity-100 border-4 bg-slate-800 rounded"></v-divider>
        <a class=" text-slate-600 flex justify-center items-center pt-4 text-xs" href="" @click.prevent="">
          Registrarse <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data: () => ({
    visible: false,
  }), methods: {
    onClickAppendIcon() {
      this.visible = !this.visible;
      this.$refs.pwTxt.blur();
    }
  }
}
</script>