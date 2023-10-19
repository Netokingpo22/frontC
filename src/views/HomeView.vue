<script setup>
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true
      return 'Name needs to be at least 2 characters.'
    }
  },
})
const name = useField('name')
const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <main>
    <div class="flex justify-center items-center h-screen bg-slate-800 text-slate-800">
      <form @submit.prevent="submit"
        class="min-w-[500px] border-2 bg-slate-200 rounded-lg p-24 drop-shadow-[25px_25px_1px_rgba(0,0,0,0.1)]">
        <h1 class="flex justify-center items-center text-4xl mb-10 font-bold antialiased ">Inicio de sesión</h1>
        <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value" label="Usuario"
          variant="outlined" class="mb-2"></v-text-field>
        <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value" label="Password"
          variant="outlined" class="mb-2 "></v-text-field>
        <div class="center mb-6 flex justify-center items-center">
          <v-btn class="text-none w-full" color="#1abc9c" variant="flat" type="submit">Iniciar sesión</v-btn>
        </div>
        <v-divider class="border-opacity-100 border-2 bg-slate-500 rounded"></v-divider>
        <div class="center pt-5 flex justify-center items-center">
          <p class="font-bold	">¿Olvidaste tu contraseña?</p>
        </div>
        <div class="center pt-2 flex justify-center items-center">
          <p class="font-bold	">Registrarse</p>
        </div>
      </form>
    </div>
  </main>
</template>