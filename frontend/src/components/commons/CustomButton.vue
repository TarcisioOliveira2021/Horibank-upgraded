<script setup lang="ts">
interface Props {
  botaoTexto: string
  routeBotao?: string
}

defineProps<Props>()
</script>

<template>
  <template v-if="routeBotao">
    <button class="btn">
      <RouterLink :to="routeBotao">{{ botaoTexto }}</RouterLink>
    </button>
  </template>
  <template  v-else>
    <button class="btn">{{ botaoTexto }}</button>
  </template>
</template>

<style scoped>
@media (max-width: 1920px) {
  .btn>a {
    text-decoration: none;
    color: white;
  }

  .btn {
    width: 200px;
    height: 50px;
    margin: 1rem 1rem 0rem 1rem;
    border-radius: 15px;
    border: none;
    transition: 0.5s;
    align-content: center;
    text-align: center;
    cursor: pointer;
    background: -webkit-linear-gradient(317deg, #42d392 2%, #061147);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .btn:hover {
    transform: scale(1.4);
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
    transition: 0.2s;
    color: white;
    background: -webkit-linear-gradient(317deg, #42d392 2%, #061147);
    -webkit-text-fill-color: white;
  }
}

@media (max-width:1024px) {

  .btn {
    width: 200px;
    height: 40px;
  }

}
</style>