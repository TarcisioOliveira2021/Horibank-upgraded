<script setup lang="ts">
import Form from './NewUsuarioForm.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isDark = ref(route.query.darkModeIsActive === 'true');
</script>

<template>
  <div class="inicio">
    <div class="card-container">

      <div class="header" id="header">
        <v-switch class="toogle" v-model="isDark" inset color="#42d392"></v-switch>
      </div>


      <h2 class="text">Cadastro</h2>
      <p class="subtext">Faça parte de uma nova transformação digital</p>
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
    margin: 0 5px 0 5px;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    display: grid;
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
    margin: 3rem 2rem 0rem 2rem;
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
