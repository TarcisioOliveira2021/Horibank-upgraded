<script lang="ts" src="./scripts/loginScreen.ts"></script>
<style scoped src="./styles/LoginScreen.css"></style>

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

