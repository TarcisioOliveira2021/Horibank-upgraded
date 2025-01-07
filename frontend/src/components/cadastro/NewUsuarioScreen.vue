<script setup lang="ts">
import Form from './NewUsuarioForm.vue';
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isDark = ref(route.query.darkModeIsActive === 'true');
const elemetns = ref<
  {
    inicio: HTMLElement | null;
    cardContainer: HTMLElement | null;
    text: HTMLElement | null;
    subtext: HTMLElement | null;
    buttons: NodeListOf<HTMLButtonElement> | undefined;
    inputsForm: NodeListOf<HTMLDivElement> | undefined;
  } | null>(null);

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
  if(isDark.value) {
    elemetns.value?.inicio?.classList.remove('inicio');
    elemetns.value?.inicio?.classList.add('inicio-dark');
    elemetns.value?.cardContainer?.classList.remove('card-container');
    elemetns.value?.cardContainer?.classList.add('card-container-dark');
    elemetns.value?.text?.classList.remove('text');
    elemetns.value?.text?.classList.add('text-dark');
    elemetns.value?.subtext?.classList.remove('subtext');
    elemetns.value?.subtext?.classList.add('subtext-dark');
    elemetns.value?.buttons?.forEach(button => {
      button.classList.remove('btn');
      button.classList.add('btn-dark');
    });
    elemetns.value?.inputsForm?.forEach(divInput => {
      divInput.querySelectorAll('label').forEach(label => {
        label.classList.add('label-dark');
      })
    });
  } else {
    elemetns.value?.inicio?.classList.remove('inicio-dark');
    elemetns.value?.inicio?.classList.add('inicio');
    elemetns.value?.cardContainer?.classList.remove('card-container-dark');
    elemetns.value?.cardContainer?.classList.add('card-container');
    elemetns.value?.text?.classList.remove('text-dark');
    elemetns.value?.text?.classList.add('text');
    elemetns.value?.subtext?.classList.remove('subtext-dark');
    elemetns.value?.subtext?.classList.add('subtext');
    elemetns.value?.buttons?.forEach(button => {
      button.classList.remove('btn-dark');
      button.classList.add('btn');
    });
    elemetns.value?.inputsForm?.forEach(divInput => {
      divInput.querySelectorAll('label').forEach(label => {
        label.classList.remove('label-dark');
      })
    });
  }
});

</script>

<template>
  <div class="inicio" id="inicio">
    <div class="card-container" id="card-container">
      <div class="header" id="header">
        <v-switch class="toogle" v-model="isDark" inset color="#42d392"></v-switch>
      </div>
      <h2 class="text" id="text">Cadastro</h2>
      <p class="subtext" id="subtext">Faça parte de uma nova transformação digital</p>
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
    height: 80vh;
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
    margin-top: 80px;
  }

  .subtext {
    font-size: 18px;
    font-weight: lighter;
    letter-spacing: -1.5px;
    font-family: var(--font-code);
    text-align: center;
    margin-bottom: 60px;
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
    height: 80vh;
    border-radius: 15px;
    box-shadow: 20px 20px 50px rgba(65, 65, 65, 0.5);
    background-color: rgba(34, 29, 29, 0.6);
    border-radius: 15px;
    display: grid;
    flex-direction: column;
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
    margin: 2rem 2rem 0rem 2rem;
    margin-top: 80px;
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
    margin-bottom: 60px;
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
