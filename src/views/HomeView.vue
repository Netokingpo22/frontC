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
    <div class="center">
      <form @submit.prevent="submit" class="minW400">
        <h1 class="center title"><strong>Inicio de sesión</strong></h1>
        <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value" label="Usuario" class="marB10"
          variant="outlined"></v-text-field>
        <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value" label="Password" class="marB10"
          variant="outlined"></v-text-field>
        <div class="center marB10">
          <v-btn class="me-4 text-none minW200" type="submit" variant="outlined">Iniciar sesión</v-btn>
          <v-btn class="text-none minW200" @click="handleReset" variant="outlined">Borrar</v-btn>
        </div>
        <v-divider class="marB10 marT20"></v-divider>
        <div class="center marT20">
          <p><strong>¿Olvidaste tu contraseña?</strong></p>
        </div>
        <div class="center marT10">
          <p><strong>Registrarse</strong></p>
        </div>
      </form>
    </div>
  </main>
</template>
<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  margin-bottom: 25px;
  font-size: 40px;
}

.minW400 {
  min-width: 400px;
}

.minW200 {
  min-width: 200px;
}

.marB10 {
  margin-bottom: 10px;
}

.marT20 {
  margin-top: 20px;
}

.marT10 {
  margin-top: 10px;
}
</style>
