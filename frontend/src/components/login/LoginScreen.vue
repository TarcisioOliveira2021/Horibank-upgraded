<script setup lang="ts">
import Form from './LoginForm.vue';
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isDark = ref(route.query.darkModeIsActive === 'true');

const elemetns = ref<
{ inicio: HTMLElement | null; 
  cardContainer: HTMLElement | null;
  text: HTMLElement | null; 
  subtext: HTMLElement | null;  
} | null>(null);

function getUiElements() {
  const inicio = document.getElementById('inicio');
  const cardContainer = document.getElementById('card-container');
  const text = document.getElementById('text');
  const subtext = document.getElementById('subtext');

  return {
    inicio,
    cardContainer,
    text,
    subtext
  };
}

onMounted(() => {
  elemetns.value = getUiElements();

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    elemetns.value.inicio?.classList.remove('inicio');
    elemetns.value.inicio?.classList.add('inicio-dark');
  } else {
    elemetns.value.inicio?.classList.remove('inicio-dark');
    elemetns.value.inicio?.classList.add('inicio');
  }
});

watchEffect(() => {
  if (elemetns.value && 
      elemetns.value.inicio && 
      elemetns.value.cardContainer &&
      elemetns.value.text &&
      elemetns.value.subtext
    ) {
    if (isDark.value) {
      elemetns.value.inicio.classList.remove('inicio');
      elemetns.value.inicio.classList.add('inicio-dark');
      elemetns.value.cardContainer.classList.remove('card-container');
      elemetns.value.cardContainer.classList.add('card-container-dark');
      elemetns.value.text.classList.remove('text');
      elemetns.value.text.classList.add('text-dark');
    } else {
      elemetns.value.inicio.classList.remove('inicio-dark');
      elemetns.value.inicio.classList.add('inicio');
      elemetns.value.cardContainer.classList.remove('card-container-dark');
      elemetns.value.cardContainer.classList.add('card-container');
      elemetns.value.text.classList.remove('text-dark');
      elemetns.value.text.classList.add('text');
    }
  }
});
</script>

<template>
  <div class="inicio" id="inicio">
    <div class="card-container" id="card-container">
      <h2 class="text" id="text">Login</h2>
      <p class="subtext" id="subtext">Entre com suas credênciais 😊</p>

      <div class="header" id="header">
        <v-switch class="toogle" v-model="isDark" inset color="#42d392"></v-switch>
      </div>

      <Form></Form>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1920px) {
  .inicio {
    align-items: center;
    justify-content: center;
    background-color: white;
    display: flex;
    height: 100vh;
    width: 100%;
  }

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

  .card-container {
    place-items: center;
    width: 500px;
    height: 500px;
    margin: 0 5px 0 5px;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    transition: 0.5s;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    background-color: rgba(212, 212, 212, 0.6);
  }

  .text {
    width: auto;
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 2rem 2rem 0rem 2rem;
    background: -webkit-linear-gradient(317deg, #42d392 2%, #061147);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtext {
    font-size: 18px;
    font-weight: lighter;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: center;
  }

  /* DarkMode */
  .inicio-dark {
    align-items: center;
    justify-content: center;
    display: flex;
    height: 100vh;
    width: 100%;
    background: -webkit-linear-gradient(317deg, #42d392 1%, #020b36);
  }

  .card-container-dark {
    place-items: center;
    width: 500px;
    height: 500px;
    margin: 0 5px 0 5px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    transition: 0.5s;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    box-shadow: 20px 20px 50px rgba(65, 65, 65, 0.5);
    background-color: rgba(34, 29, 29, 0.6);
  }

  .text-dark{
    width: auto;
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 2rem 2rem 0rem 2rem;
    background: -webkit-linear-gradient(317deg, rgba(212, 212, 212, 0.6) 1%,  rgba(146, 145, 145, 0.6));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

@media (max-width: 1024px) {
  .card-container {
    height: 100vh;
    overflow-y: scroll;
    display: block;
    background-color: #42d392;
    transition: 0.5s;
    box-shadow: none;
  }

  .text {
    background: -webkit-linear-gradient(317deg, #08864d 2%, #061147);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtext {
    color: white;
  }
}
</style>
