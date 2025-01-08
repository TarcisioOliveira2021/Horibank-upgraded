<script setup lang="ts">
import Form from './NewUsuarioForm.vue';
import { onMounted, ref, watchEffect, watch } from 'vue';

const isDark = ref(false);
const elements = ref<
  {
    inicio: HTMLElement | null;
    cardContainer: HTMLElement | null;
    text: HTMLElement | null;
    subtext: HTMLElement | null;
    buttons: NodeListOf<HTMLButtonElement> | undefined;
    inputsForm: NodeListOf<HTMLDivElement> | undefined;
  } | null>(null);

watch(() => isDark.value, (value) => {
    localStorage.setItem('isDark', value.toString());
});

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
  const buttons = document.getElementById('start-buttons')?.querySelectorAll('button');
  const inputsForm = document.getElementById('form-cadastro')?.querySelectorAll('div');

  return {
    inicio,
    cardContainer,
    text,
    subtext,
    buttons,
    inputsForm
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
    elements.inputsForm?.forEach((divInput: HTMLDivElement) => {
      divInput.querySelectorAll('label').forEach((label: HTMLLabelElement) => {
        label.classList.add('label-dark');
      })
    });
  } else {
    toogleTheme(elements.inicio, 'inicio', 'inicio-dark');
    toogleTheme(elements.cardContainer, 'card-container', 'card-container-dark');
    toogleTheme(elements.text, 'text', 'text-dark');
    toogleTheme(elements.subtext, 'subtext', 'subtext-dark');


    elements.buttons?.forEach((button: HTMLButtonElement) => {
      toogleTheme(button, 'btn', 'btn-dark');
    });
    elements.inputsForm?.forEach((divInput: HTMLDivElement) => {
      divInput.querySelectorAll('label').forEach((label: HTMLLabelElement) => {
        label.classList.remove('label-dark');
      })
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
      <div class="text-subtext-container" id="text-subtext-container">
        <h2 class="text" id="text">Cadastro</h2>
        <p class="subtext" id="subtext">Faça parte de uma nova transformação digital 😎</p>
      </div>
      <Form></Form>
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
    place-items: center;
    height: auto;
    width: 95vh;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    display: grid;
    flex-direction: column;
    transition: 0.5s;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    background-color: rgba(212, 212, 212, 0.6);
    margin: 1rem 2rem 1rem 2rem;
  }

  .text-subtext-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem 1rem 3rem 1rem;
  }

  .text {
    width: auto;
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
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
    height: auto;
    width: 95vh;
    border-radius: 15px;
    box-shadow: 20px 20px 50px rgba(65, 65, 65, 0.5);
    background-color: rgba(34, 29, 29, 0.6);
    display: grid;
    transition: 0.5s;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    margin: 1rem 2rem 1rem 2rem;
  }

  .text-dark {
    width: auto;
    font-size: 40px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: left;
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

@media (max-width:1024px) {
  .inicio {
    background-color: #42d392;
  }

  .header {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
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

  .text {
    margin-top: 80px;
    background: -webkit-linear-gradient(317deg, #08864d 2%, #061147);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtext {
    color: white;
    font-size: 14px;
  }

}
</style>
