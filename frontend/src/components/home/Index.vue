<script lang="ts" src="./scripts/index.ts"></script>
<style scoped src="./styles/Index.css"></style>

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
