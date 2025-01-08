<script setup lang="ts">
import CardContent from './CardContent.vue';
import Button from '../commons/CustomButton.vue';
import { onMounted, ref, watchEffect, watch } from 'vue';

const isDark = ref(false);
const elemetns = ref<{
  inicio: HTMLElement | null;
  cardContainer: HTMLElement | null;
  grettingsTitle: HTMLElement | null;
  grettingsSubtitle: HTMLElement | null;
  cardContentTitle: HTMLElement | null;
  cards: NodeListOf<HTMLDivElement> | undefined;
  buttons: NodeListOf<HTMLButtonElement> | undefined;
  } | null>(null);
  
watch(() => isDark.value, (value) => {
    localStorage.setItem('isDark', value.toString());
  });
  
watchEffect(() => {
  if(elemetns.value){
    setTheme(elemetns.value);
  }
});

onMounted(() => {
  elemetns.value = getUiElements();
  getLocalStorageIsDark();
  if(elemetns.value){ 
    setTheme(elemetns.value);
  }
});

onload = (event) => {
  event.preventDefault();
  isDark.value = false;
  localStorage.clear();
};

function toogleTheme(elemento: HTMLElement | HTMLButtonElement, themeAdicionar: string, themeRemover: string) {
  elemento.classList.remove(themeRemover);
  elemento.classList.add(themeAdicionar);
}

function setTheme(elemetns: any) {
  if (isDark.value || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true; //Redundante mas aplicavel caso o window.matchMedia seja dark para o toogle ficar selecionado.
      toogleTheme(elemetns.inicio, 'inicio-dark', 'inicio');
      toogleTheme(elemetns.cardContainer, 'card-container-dark', 'card-container');
      toogleTheme(elemetns.grettingsTitle, 'grettings-title-dark', 'grettings-title');
      toogleTheme(elemetns.grettingsSubtitle, 'grettings-subtitle-dark', 'grettings-subtitle');
      toogleTheme(elemetns.cardContentTitle, 'card-content-title-dark', 'card-content-title');

      
      elemetns.cards?.forEach((card: HTMLDivElement) => {
        toogleTheme(card, 'card-dark', 'card');
      });

      elemetns.buttons?.forEach((button: HTMLButtonElement) => {
        toogleTheme(button, 'btn-dark', 'btn');
      });

    } else {
      toogleTheme(elemetns.inicio, 'inicio', 'inicio-dark');
      toogleTheme(elemetns.cardContainer, 'card-container', 'card-container-dark');
      toogleTheme(elemetns.grettingsTitle, 'grettings-title', 'grettings-title-dark');
      toogleTheme(elemetns.grettingsSubtitle, 'grettings-subtitle', 'grettings-subtitle-dark');
      toogleTheme(elemetns.cardContentTitle, 'card-content-title', 'card-content-title-dark');
      
      elemetns.cards.forEach((card: HTMLDivElement) => {
        toogleTheme(card, 'card', 'card-dark');
      });

      elemetns.buttons?.forEach((button: HTMLButtonElement) => {
        toogleTheme(button, 'btn', 'btn-dark');
      });
    }
}

function getUiElements() {
  const inicio = document.getElementById('inicio');
  const cardContainer = document.getElementById('card-container');
  const grettingsTitle = document.getElementById('grettings-title');
  const grettingsSubtitle = document.getElementById('grettings-subtitle');
  const cardContentTitle = document.getElementById('card-content-title');

  const cards = document.getElementById('activities')?.querySelectorAll('div');
  const buttons = document.getElementById('start-buttons')?.querySelectorAll('button');

  return {
    inicio,
    cardContainer,
    grettingsTitle,
    grettingsSubtitle,
    cardContentTitle,
    cards,
    buttons
  };
}

function getLocalStorageIsDark() {
  if (localStorage.getItem('isDark') === 'true') {
    isDark.value = true;
  } else {
    isDark.value = false;
  }
}
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


      <CardContent ref="cardContainer" />

      
      <div class="start-buttons" id="start-buttons">
        <Button botao-texto="Registrar-se" route-botao="/cadastrar-pessoa"></Button>
        <Button botao-texto="Acessar Conta" route-botao="/acessar-conta"></Button>
      </div>

    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1281px) and (max-width: 1920px) {
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

  .grettings-title-dark {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 2rem 2rem 0rem 2rem;
    color: white;
  }

  .grettings-subtitle-dark {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 0rem 2rem 2rem 2rem;
    background: -webkit-linear-gradient(317deg, rgba(212, 212, 212, 0.6) 1%, rgba(146, 145, 145, 0.6));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

}

@media (min-width: 100px) and (max-width: 1280px) {
  .toogle{
    display: none;
  }

  .inicio{
    background-color: #42d392;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 100vh;
    width: 100%;
  }

  .card-container {
    height: 100vh;
    width: 100vh;
    overflow-y: scroll;
    display: block;
    background-color: #42d392;
    transition: 0.5s;
    box-shadow: none;
  }

  .grettings-title {
    color: white;
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 2rem 2rem 0rem 2rem;
  }

  .grettings-subtitle {
    background: -webkit-linear-gradient(317deg, #08864d 2%, #061147);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 0rem 2rem 2rem 2rem;
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
