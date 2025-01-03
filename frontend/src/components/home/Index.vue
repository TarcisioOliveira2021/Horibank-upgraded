<script setup lang="ts">
import CardContent from './CardContent.vue';
import Button from '../commons/CustomButton.vue';
import { onMounted, ref, watchEffect } from 'vue';
const isDark = ref(false);

const elemetns = ref<{
  inicio: HTMLElement | null;
  cardContainer: HTMLElement | null;
  grettingsTitle: HTMLElement | null;
  grettingsSubtitle: HTMLElement | null;
  cardContentTitle: HTMLElement | null;
  activities: NodeListOf<HTMLDivElement> | undefined;
  btnRegistro: HTMLElement | null;
  btnAcessar: HTMLElement | null;
} | null>(null);



watchEffect(() => {
  if (elemetns.value &&
    elemetns.value.inicio &&
    elemetns.value.cardContainer &&
    elemetns.value.grettingsTitle &&
    elemetns.value.grettingsSubtitle &&
    elemetns.value.cardContentTitle &&
    elemetns.value.activities &&
    elemetns.value.btnAcessar &&
    elemetns.value.btnRegistro
  ) {
    if (isDark.value) {
      elemetns.value.inicio.classList.remove('inicio');
      elemetns.value.inicio.classList.add('inicio-dark');

      elemetns.value.cardContainer.classList.remove('card-container');
      elemetns.value.cardContainer.classList.add('card-container-dark');

      elemetns.value.grettingsTitle.classList.remove('grettings-title');
      elemetns.value.grettingsTitle.classList.add('grettings-title-dark');
      elemetns.value.grettingsSubtitle.classList.remove('grettings-subtitle');
      elemetns.value.grettingsSubtitle.classList.add('grettings-subtitle-dark');

      elemetns.value.cardContentTitle.classList.remove('card-content-title');
      elemetns.value.cardContentTitle.classList.add('card-content-title-dark');

      elemetns.value.activities.forEach(activity => {
        activity.classList.remove('card');
        activity.classList.add('card-dark');
      });

      elemetns.value.btnRegistro.classList.remove('btn');
      elemetns.value.btnRegistro.classList.add('btn-dark');
      elemetns.value.btnAcessar.classList.remove('btn');
      elemetns.value.btnAcessar.classList.add('btn-dark');


    } else {
      elemetns.value.inicio.classList.remove('inicio-dark');
      elemetns.value.inicio.classList.add('inicio');

      elemetns.value.cardContainer.classList.remove('card-container-dark');
      elemetns.value.cardContainer?.classList.add('card-container');

      elemetns.value.grettingsTitle.classList.remove('grettings-title-dark');
      elemetns.value.grettingsTitle.classList.add('grettings-title');
      elemetns.value.grettingsSubtitle.classList.remove('grettings-subtitle-dark');
      elemetns.value.grettingsSubtitle.classList.add('grettings-subtitle');

      elemetns.value.cardContentTitle.classList.remove('card-content-title-dark');
      elemetns.value.cardContentTitle.classList.add('card-content-title');

      elemetns.value.activities.forEach(activity => {
        activity.classList.remove('card-dark');
        activity.classList.add('card');
      });

      elemetns.value.btnRegistro.classList.remove('btn-dark');
      elemetns.value.btnRegistro.classList.add('btn');
      elemetns.value.btnAcessar.classList.remove('btn-dark');
      elemetns.value.btnAcessar.classList.add('btn');
    }
  }
});


function getUiElements() {
  const inicio = document.getElementById('inicio');
  const cardContainer = document.getElementById('card-container');
  const grettingsTitle = document.getElementById('grettings-title');
  const grettingsSubtitle = document.getElementById('grettings-subtitle');
  const cardContentTitle = document.getElementById('card-content-title');

  const activities = document.getElementById('activities')?.querySelectorAll('div');
  const btnRegistro = document.getElementById('registro-button');
  const btnAcessar = document.getElementById('acessar-button');

  return {
    inicio,
    cardContainer,
    grettingsTitle,
    grettingsSubtitle,
    cardContentTitle,
    activities,
    btnRegistro,
    btnAcessar
  };
}

onMounted(() => {
  elemetns.value = getUiElements();

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    elemetns.value.inicio?.classList.remove('inicio');
    elemetns.value.inicio?.classList.add('inicio-dark');
    elemetns.value.cardContainer?.classList.remove('card-container');
    elemetns.value.cardContainer?.classList.add('card-container-dark');

    elemetns.value.grettingsTitle?.classList.remove('grettings-title');
    elemetns.value.grettingsTitle?.classList.add('grettings-title-dark');
    elemetns.value.grettingsSubtitle?.classList.remove('grettings-subtitle');
    elemetns.value.grettingsSubtitle?.classList.add('grettings-subtitle-dark');

    elemetns.value.cardContentTitle?.classList.remove('card-content-title');
    elemetns.value.cardContentTitle?.classList.add('card-content-title-dark');

    elemetns.value.activities?.forEach(activity => {
      activity.classList.remove('card');
      activity.classList.add('card-dark');
    });

    elemetns.value.btnRegistro?.classList.remove('btn');
    elemetns.value.btnRegistro?.classList.add('btn-dark');
    elemetns.value.btnAcessar?.classList.remove('btn');
    elemetns.value.btnAcessar?.classList.add('btn-dark');

  } else {
    elemetns.value.inicio?.classList.remove('inicio-dark');
    elemetns.value.inicio?.classList.add('inicio');
    elemetns.value.inicio?.classList.remove('inicio-dark');
    elemetns.value.inicio?.classList.add('inicio');

    elemetns.value.cardContainer?.classList.remove('card-container-dark');
    elemetns.value.cardContainer?.classList.add('card-container');

    elemetns.value.grettingsTitle?.classList.remove('grettings-title-dark');
    elemetns.value.grettingsTitle?.classList.add('grettings-title');
    elemetns.value.grettingsSubtitle?.classList.remove('grettings-subtitle-dark');
    elemetns.value.grettingsSubtitle?.classList.add('grettings-subtitle');

    elemetns.value.cardContentTitle?.classList.remove('card-content-title-dark');
    elemetns.value.cardContentTitle?.classList.add('card-content-title');

    elemetns.value.activities?.forEach(activity => {
      activity.classList.remove('card-dark');
      activity.classList.add('card');
    });

    elemetns.value.btnRegistro?.classList.remove('btn-dark');
    elemetns.value.btnRegistro?.classList.add('btn');
    elemetns.value.btnAcessar?.classList.remove('btn-dark');
    elemetns.value.btnAcessar?.classList.add('btn');
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


      <CardContent ref="cardContainer" />


      <div class="start-buttons">
        <Button id="registro-button" botao-texto="Registrar-se"
          :route-botao="{ path: '/cadastrar-pessoa', query: { darkModeIsActive: isDark } }"></Button>
        <Button id="acessar-button" botao-texto="Acessar Conta"
          :route-botao="{ path: '/acessar-conta', query: { darkModeIsActive: isDark } }"></Button>
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
