<script setup>
import { useField, useForm } from 'vee-validate'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

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
      localStorage.setItem("id", data.id)
      localStorage.setItem("username", data.username)
      this.$router.push('home')
    })
    .catch((error) => {
      toast.error("Error : \nHa ocurrido un error en el servidor.", options);
    });
})
</script>

<template>
  <main>
    <v-app>
      <div class="grid grid-cols-2 grid-rows-1 gap-1 h-screen">
        <div class="bg-slate-800 max-w-fit">
          <NavBar></NavBar>
        </div>
        <div>02</div>
      </div>
    </v-app>
  </main>
</template>

<script>
import NavBar from "../components/NavBar.vue"

export default {
  components: {
    NavBar: NavBar
  }
}
</script>