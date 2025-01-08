<script setup lang="ts">
import Form from './LoginForm.vue';
import { onMounted, ref, watchEffect } from 'vue';

const isDark = ref(false);
const elements = ref<
  {
    inicio: HTMLElement | null;
    cardContainer: HTMLElement | null;
    text: HTMLElement | null;
    subtext: HTMLElement | null;
    usuarioInput: HTMLElement | null;
    passwordInput: HTMLElement | null;
    buttons: NodeListOf<HTMLButtonElement> | undefined;
  } | null>(null);

onMounted(() => {
  elements.value = getUiElements();
  getLocalStorageIsDark();

  if(elements.value) {
    setTheme(elements.value);
  }
});

watchEffect(() => {
  if (elements.value) {
    setTheme(elements.value);
  }
});

onload = (event) => {
  event.preventDefault();
  localStorage.clear();
};

function getUiElements() {
  const inicio = document.getElementById('inicio');
  const cardContainer = document.getElementById('card-container');
  const text = document.getElementById('text');
  const subtext = document.getElementById('subtext');
  const usuarioInput = document.getElementById('usuario-field');
  const passwordInput = document.getElementById('password-field');
  const buttons = document.getElementById('start-buttons')?.querySelectorAll('button');

  return {
    inicio,
    cardContainer,
    text,
    subtext,
    usuarioInput,
    passwordInput,
    buttons
  };
}

function toogleTheme(elemento: HTMLElement | HTMLButtonElement, themeAdicionar: string, themeRemover: string) {
  elemento.classList.remove(themeRemover);
  elemento.classList.add(themeAdicionar);
}

function setTheme(elements: any) {
  if (isDark.value || window.matchMedia('(prefers-color-scheme: dark)').matches) {
    localStorage.setItem('isDark', 'true');

    toogleTheme(elements.inicio, 'inicio-dark', 'inicio');
    toogleTheme(elements.cardContainer, 'card-container-dark', 'card-container');
    toogleTheme(elements.text, 'text-dark', 'text');
    toogleTheme(elements.subtext, 'subtext-dark', 'subtext');
    elements.buttons?.forEach((button: HTMLButtonElement) => {
      toogleTheme(button, 'btn-dark', 'btn');
    });

  } else {
    toogleTheme(elements.inicio, 'inicio', 'inicio-dark');
    toogleTheme(elements.cardContainer, 'card-container', 'card-container-dark');
    toogleTheme(elements.text, 'text', 'text-dark');
    toogleTheme(elements.subtext, 'subtext', 'subtext-dark');
    elements.buttons?.forEach((button: HTMLButtonElement) => {
      toogleTheme(button, 'btn', 'btn-dark');
    });

  }
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
      <h2 class="text" id="text">Login</h2>
      <p class="subtext" id="subtext">Entre com suas credênciais 😊</p>
      <Form></Form>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1281px) and (max-width: 1920px) {
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
    color: #2c3e50;
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

  .text-dark {
    width: auto;
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 2rem 2rem 0rem 2rem;
    background: -webkit-linear-gradient(317deg, rgba(212, 212, 212, 0.6) 1%, rgba(146, 145, 145, 0.6));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtext-dark {
    font-size: 18px;
    font-weight: lighter;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: center;
    color: white !important;
  }
}

@media (min-width: 100px) and (max-width: 1280px) {
  .toogle {
    display: none;
  }

  .inicio {
    background-color: #42d392;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 100vh;
    width: 100%;
  }

  .card-container {
    place-items: center;
    width: 90vh;
    margin: 0 5px 0 5px;
    border-radius: 15px;
    backdrop-filter: blur(5px);
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #42d392;
    transition: 0.5s;
    box-shadow: none;
  }

  .text {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
    margin: 2rem 2rem 0rem 2rem;
    background: -webkit-linear-gradient(317deg, #08864d 2%, #061147);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtext {
    color: white;
  }
}
</style>
