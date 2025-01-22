<script lang="ts" src="./script/NewUsuarioScreen.ts"></script>
<style scoped src="./style/NewUsuarioScreen.css"></style>


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

