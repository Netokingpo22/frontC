<script setup>
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 1) return true
      return 'El nombré no puede estar vacío. '
    },
    password(value) {
      if (value?.length >= 2) return true
      return 'La contrseña no puede estar vacío. '
    },
  },
})
const name = useField('name')
const password = useField('password')
const checkbox = useField('checkbox')
const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <main>
    <div class="flex justify-center items-center h-screen bg-slate-800 text-slate-800">
      <form @submit.prevent="submit"
        class="min-w-[400px] border-2 bg-slate-200 rounded-lg p-10 drop-shadow-[25px_25px_1px_rgba(0,0,0,0.1)]">
        <h1 class="flex justify-center items-center text-4xl mb-10 font-bold antialiased ">Inicio de sesión</h1>
        <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value" label="Usuario"
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