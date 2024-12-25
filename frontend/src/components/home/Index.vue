<script setup lang="ts">
import CardContent from './CardContent.vue';
import Button from '../commons/CustomButton.vue';
import { onMounted, ref, watchEffect } from 'vue';
const isDark = ref(false);

watchEffect(() => {
  const elemetns = getUiElements();

  if (isDark.value) {
    elemetns.inicio?.classList.remove('inicio');
    elemetns.inicio?.classList.add('inicio-dark');

    elemetns.cardContainer?.classList.remove('card-container');
    elemetns.cardContainer?.classList.add('card-container-dark');

    elemetns.grettingsTitle?.classList.remove('grettings-title');
    elemetns.grettingsTitle?.classList.add('grettings-title-dark');
    elemetns.grettingsSubtitle?.classList.remove('grettings-subtitle');
    elemetns.grettingsSubtitle?.classList.add('grettings-subtitle-dark');

    elemetns.cardContentTitle?.classList.remove('card-content-title');
    elemetns.cardContentTitle?.classList.add('card-content-title-dark');

    elemetns.card1?.classList.remove('card');
    elemetns.card1?.classList.add('card-dark');
    elemetns.card2?.classList.remove('card');
    elemetns.card2?.classList.add('card-dark');
    elemetns.card3?.classList.remove('card');
    elemetns.card3?.classList.add('card-dark');
    elemetns.card4?.classList.remove('card');
    elemetns.card4?.classList.add('card-dark');

    elemetns.btnRegistro?.classList.remove('btn');
    elemetns.btnRegistro?.classList.add('btn-dark');
    elemetns.btnAcessar?.classList.remove('btn');
    elemetns.btnAcessar?.classList.add('btn-dark');


  } else {
    elemetns.inicio?.classList.remove('inicio-dark');
    elemetns.inicio?.classList.add('inicio');

    elemetns.cardContainer?.classList.remove('card-container-dark');
    elemetns.cardContainer?.classList.add('card-container');

    elemetns.grettingsTitle?.classList.remove('grettings-title-dark');
    elemetns.grettingsTitle?.classList.add('grettings-title');
    elemetns.grettingsSubtitle?.classList.remove('grettings-subtitle-dark');
    elemetns.grettingsSubtitle?.classList.add('grettings-subtitle');

    elemetns.cardContentTitle?.classList.remove('card-content-title-dark');
    elemetns.cardContentTitle?.classList.add('card-content-title');

    elemetns.card1?.classList.remove('card-dark');
    elemetns.card1?.classList.add('card');
    elemetns.card2?.classList.remove('card-dark');
    elemetns.card2?.classList.add('card');
    elemetns.card3?.classList.remove('card-dark');
    elemetns.card3?.classList.add('card');
    elemetns.card4?.classList.remove('card-dark');
    elemetns.card4?.classList.add('card');

    elemetns.btnRegistro?.classList.remove('btn-dark');
    elemetns.btnRegistro?.classList.add('btn');
    elemetns.btnAcessar?.classList.remove('btn-dark');
    elemetns.btnAcessar?.classList.add('btn');

  }
});


function getUiElements() {
  const inicio = document.getElementById('inicio');
  const cardContainer = document.getElementById('card-container');
  const grettingsTitle = document.getElementById('grettings-title');
  const grettingsSubtitle= document.getElementById('grettings-subtitle');
  const cardContentTitle = document.getElementById('card-content-title');

  const card1 = document.getElementById('card-1');
  const card2 = document.getElementById('card-2');
  const card3 = document.getElementById('card-3');
  const card4 = document.getElementById('card-4');

  const btnRegistro = document.getElementById('registro-button');
  const btnAcessar = document.getElementById('acessar-button');

  return { 
    inicio, 
    cardContainer, 
    grettingsTitle, 
    grettingsSubtitle, 
    cardContentTitle, 
    card1, 
    card2, 
    card3, 
    card4,
    btnRegistro,
    btnAcessar
  };
}

onMounted(() => {
  const elemetns = getUiElements();

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    elemetns.inicio?.classList.remove('inicio');
    elemetns.inicio?.classList.add('inicio-dark');
  } else {
    elemetns.inicio?.classList.remove('inicio-dark');
    elemetns.inicio?.classList.add('inicio');
  }

});

</script>

<template>
  <div class="inicio" id="inicio">
    <div class="card-container" id="card-container">

      <div class="header" id="header">
        <v-switch class="toogle" v-model="isDark" inset color="#42d392"></v-switch>
      </div>

      <div class="grettings">
        <h1 class="grettings-title" id="grettings-title">Bem vindo</h1>
        <h1 class="grettings-subtitle" id="grettings-subtitle">Ao Horibank 2.0</h1>
      </div>


      <CardContent ref="cardContainer"/>


      <div class="start-buttons">
        <Button id="registro-button" botao-texto="Registrar-se" :route-botao="{path: '/cadastrar-pessoa', query: {darkModeIsActive: isDark}}"></Button>
        <Button id="acessar-button" botao-texto="Acessar Conta" :route-botao="{path: '/acessar-conta', query: {darkModeIsActive: isDark}}"></Button>
      </div>

    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1920px) {
  .toogle {
    margin: 1rem 1rem 0rem 1rem;
    display: inline-flex !important;
    align-self: flex-end;
  }

  .header {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
  }

  .inicio {
    align-items: center;
    justify-content: center;
    background-color: white;
    display: flex;
    height: 100vh;
    width: 100%;
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


  .start-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    margin: 1rem 1rem 2rem 1rem;
  }


  .grettings-title {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    color: #2c3e50;
    margin: 2rem 2rem 0rem 2rem;
  }

  .grettings-subtitle {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 0rem 2rem 2rem 2rem;
    background: -webkit-linear-gradient(317deg, #42d392 1%, #020b36);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* DarkMode */
  .inicio-dark {
    align-items: center;
    justify-content: center;
    background: -webkit-linear-gradient(317deg, #42d392 1%, #020b36);
    display: flex;
    height: 100vh;
    width: 100%;
  }

  .card-container-dark {
    width: 1400px;
    height: 700px;
    margin: 0 5px 0 5px;
    box-shadow: 20px 20px 50px rgba(65, 65, 65, 0.5);
    border-radius: 15px;
    display: block;
    transition: 0.5s;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    background-color: rgba(34, 29, 29, 0.6);
  }

  .grettings-title-dark{
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 2rem 2rem 0rem 2rem;
    color: white;
  }

  .grettings-subtitle-dark{
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 0rem 2rem 2rem 2rem;
    background: -webkit-linear-gradient(317deg, rgba(212, 212, 212, 0.6) 1%,  rgba(146, 145, 145, 0.6));
    background-clip: text;
    -webkit-text-fill-color: transparent;
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

  .grettings-title {
    color: white;
  }

  .grettings-subtitle {
    background: -webkit-linear-gradient(317deg, #08864d 2%, #061147);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .start-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 1rem 2rem 1rem;
  }
}
</style>
