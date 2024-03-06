<script setup>
import logInValidate from '../validates/logInValidate'
import logInApi from '../Api/logInApi'
import { useRouter } from 'vue-router'

const router = useRouter()
const { username, password, handleSubmit } = logInValidate();
const { login, singup } = logInApi(router);

const service = handleSubmit(values => {
  login(values);
})
const handleSignin = () => {
  router.push('/registro')
}
</script>

<template>
  <main>
    <div class="flex justify-center items-center h-screen w-screen bg-slate-200 text-slate-800 font-mono">
      <form @submit.prevent="service" class=" border-2 border-slate-800 p-10 flex flex-col min-w-[450px]">
        <div>
          <h1 class="text-center text-4xl font-bold antialiased pb-2">Inicio de sesión</h1>
        </div>
        <div class="w-full h-[2px] bg-slate-800 mb-3"></div>
        <v-text-field v-model="username.value.value" :error-messages="username.errorMessage.value" label="Usuario"
          variant="outlined" class="mb-1" placeholder="Introduzca su usuario" />
        <div class="pb-2"></div>
        <v-text-field v-model="password.value.value" :error-messages="password.errorMessage.value" label="Contraseña"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          variant="outlined" @click:append-inner.prevent="onClickAppendIcon" ref="pwTxt" class="mb-1"
          placeholder="Introduzca su contraseña" />
        <div class="pb-2"></div>
        <div class="center mb-1 flex justify-center items-center">
          <v-btn class="text-none w-full" variant="outlined" type="submit">
            <p class="font-bold">Iniciar sesión</p>
          </v-btn>
        </div>
        <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
        <a class=" text-slate-800 flex justify-center items-center pt-2 text-xs" href="" @click.prevent="handleSignin()">
          Registrarse <v-icon icon="mdi-chevron-right" />
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