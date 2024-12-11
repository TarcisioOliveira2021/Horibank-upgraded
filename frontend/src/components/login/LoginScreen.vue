<script setup lang="ts">
import Button from '../commons/ButtonSingle.vue';
import Form from './LoginForm.vue';

</script>

<template>
  <div class="inicio">
    <div class="card-container">
      <h2 class="text">Login</h2>
      <p class="subtext">Entre com suas credênciais 😊</p>
      <Form></Form>
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
