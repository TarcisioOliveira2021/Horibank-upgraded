<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ContaContent from './ContaContent.vue';
import { useRoute } from 'vue-router';
import Button from '../commons/CustomButton.vue';
import Swal from 'sweetalert2'

const route = useRoute();
const API_KEY = `${import.meta.env.VITE_API_URL}/pessoa/${route.query.id}`;
const pessoaName = ref('');
const contas = ref({});

function getUsuario(token: string) {
  fetch(API_KEY, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(response => {
    if (response.ok) {
      response.json().then(resp => {
        Swal.fire({
          title: 'Sucesso 🎉',
          text: 'Usuário autenticado com sucesso 😎😎',
          icon: 'success',
          iconColor: '#42d392',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#42d392',
        });
        pessoaName.value = resp.nome_completo;
        contas.value = resp.contas;
      });
    } else {
      Swal.fire({
        title: 'Falha no processamento',
        text: `${response.status} - ${response.statusText} 😭😭`,
        icon: 'error',
        iconColor: '#42d392',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#42d392',
      }).then(() => {
        window.location.href = '/';
      });
    }
  });
}

function getAuthenticationToken() {
  return document.cookie.split(';').find(cookie => cookie.trim().startsWith("token"))?.split('=')[1];
}

onMounted(() => {
  let token = getAuthenticationToken();

  if (token) {
    getUsuario(token);
  } else {
    Swal.fire({
      title: 'Falha no processamento',
      text: `Token de autenticação não encontrado 😭😭`,
      icon: 'error',
      iconColor: '#42d392',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#42d392',
    })
  }
});
</script>

<template>
  <div class="inicio">
    <div class="card-container">

      <div class="header">
        <div class="header-content">
          <v-avatar size="100px">
            <v-img alt="Avatar" src="https://picsum.photos/200/200?grayscale"></v-img>
          </v-avatar>
          <div class="header-text">
            <h1 class="grettings-text-h1">Bem vindo,</h1>
            <h1 class="grettings-text">{{ pessoaName }}</h1>
          </div>
        </div>
        <Button botao-texto="Logout" route-botao="/"></Button>
      </div>

      <div class="content">
        <ContaContent :contas="contas"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1281px) and (max-width: 1920px) {
  .inicio {
    align-items: center;
    justify-content: center;
    display: flex;
    height: 100vh;
    width: 100%;
  }

  .v-avatar {
    margin: 2rem 0rem 1rem 1rem;
  }

  Button {
    margin: 2rem 1rem 0rem 0rem !important;
  }

  Button:hover {
    transform: scale(1.1) !important;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .header-content {
    display: flex;
    flex-direction: row;
  }

  .header-text {
    display: flex;
    flex-direction: column;
  }

  .card-container {
    width: 1400px;
    height: 700px;
    margin: 0 5px 0 5px;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    display: block;
    transition: 0.5s;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    background-color: rgba(212, 212, 212, 0.6);
  }

  .grettings-text-h1 {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 2rem 0rem 0rem 1rem;
  }

  .grettings-text {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 0rem 0rem 1rem 1rem;
    background: -webkit-linear-gradient(317deg, #42d392 2%, #061147);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-activities-h2 {
    font-size: 30px;
    font-weight: lighter;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: center;
    margin: 8rem 2rem 1rem 2rem;
  }
}

@media (max-width:1024px) {
  .card-container {
    height: 100vh;
    overflow-y: scroll;
    display: block;
    background-color: #42d392;
    transition: 0.5s;
    box-shadow: none;
  }

  .grettings-text-h1 {
    color: white;
  }

  .grettings-text {
    background: -webkit-linear-gradient(317deg, #08864d 2%, #061147);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }



}
</style>
