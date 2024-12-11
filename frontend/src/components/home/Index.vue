<script setup lang="ts">
  import Activies from './Activities.vue';
  import Buttons from '../commons/ButtonMultiples.vue';
  console.log(import.meta.env.VITE_API_URL);
</script>

<template>
  <div class="inicio">
    <div class="card-container">

      <h1 class="grettings-text-h1">Bem vindo</h1>
      <h1 class="grettings-text">Ao Horibank 2.0</h1>
      <h2 class="section-activities-h2">Nossas vantagens</h2>
      
      <Activies>
      </Activies>

      <Buttons 
        botao1-texto="Registrar-se" 
        botao2-texto="Acessar Conta"
        route-botao1="/cadastrar-pessoa"
        route-botao2="/acessar-conta"
      ></Buttons>

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
    margin: 2rem 2rem 0rem 2rem;
  }

  .grettings-text {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 0rem 2rem 2rem 2rem;
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

  .section-activities-h2 {
    color: white;
  }
}
</style>

