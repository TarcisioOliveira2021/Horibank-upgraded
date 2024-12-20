<template>
  <div class="inicio">
    <div class="card-container">

      <div class="top-container">
        <img src="https://picsum.photos/200/300?grayscale" alt="">
        <div class="top-container-text">
          <h1 class="grettings-text-h1">Bem vindo</h1>
          <h1 class="grettings-text">{{ pessoaName }}</h1>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.inicio {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100vh;
  width: 100%;
}

@media (max-width: 1920px) {
  .top-container {
    display: flex;
    flex-direction: row;
  }

  .top-container > img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 1rem 0rem 1rem 1rem;
  }

  .top-container-text{
    display: flex;
    flex-direction: column;
  }

  .card-container {
    width: 1400px;
    height: 800px;
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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const API_KEY = `${import.meta.env.VITE_API_URL}/pessoa/${route.query.id}`;
const pessoaName = ref('');

function getUsuario() {
  fetch(API_KEY, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${route.query.token}`,
    },
  }).then(response => {
    if (response.ok) {
      response.json().then(resp => {
        pessoaName.value = resp.nome_completo;
      });
    } else {
      alert('Aconteceu um erro inesperado 😢👌');
      console.log("Codigo:", response.status, 'Erro lançado:', response.statusText,);
    }
  });
}

onMounted(() => {
  getUsuario();

});

</script>