<script setup lang="ts">    
    defineProps({
        botaoTexto: String
    })
</script>

<template>
      <div class="login-button">
        <button class="btn">{{botaoTexto}}</button>
      </div>
</template>

<style scoped>
@media (max-width: 1920px) {
  .login-button {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem 1rem 2rem 1rem;
  }
  
  .btn>a{
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
    transform: scale(1.2);
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
    transition: 0.2s;
    color: white;
    background: -webkit-linear-gradient(317deg, #42d392 2%, #061147);
    -webkit-text-fill-color: white;
  }
}

@media (max-width:1024px) {
  .login-button {
    margin: 1rem 1rem 2rem 1rem;
  }

  .btn{
    width: 200px;
    height: 40px;
  }

}
</style>