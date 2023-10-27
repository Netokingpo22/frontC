<script setup>
import { useField, useForm } from 'vee-validate'

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
        dialog = true;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
})
</script>

<template>
  <main>
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    dialog: false,
  }), methods: {
    onClickAppendIcon() {
      this.visible = !this.visible;
      this.$refs.pwTxt.blur();
    }
  }
}
</script>