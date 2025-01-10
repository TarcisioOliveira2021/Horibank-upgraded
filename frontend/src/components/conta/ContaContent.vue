<script setup lang="ts">
import Card from '../commons/Card.vue';
import { watch, ref } from 'vue';

const props = defineProps<{
    contas: {}[];
}>();
</script>

<template>
    <h2 class="title" id="title">Suas contas</h2>

    <p class="subtitle" v-if="contas.length = 0">Você não possui conta(s) cadastrada(s) comnosco 😭 </p>
    <p class="subtitle" v-else> Você possui {{contas.length}} conta(s) cadastrada(s) comnosco 🥰 </p>

    <div class="contas-content" v-if="props.contas.length > 0">
        <Card :needIcon="false" v-for="conta in props.contas"/>
    </div>
    
    <!-- <div class="contas-content" v-else>
        <button class="teste"> 
            <v-icon icon="mdi-plus" color="white"></v-icon>
        </button>
        <Card></Card>
    </div> -->

</template>

<style scoped>
@media (min-width: 1281px) and (max-width: 1920px) {
    .teste{
        background-color: #2c3e50;
        border-radius: 40%;
    }
    .teste:hover{
        background-color: #3c5670;
        transform: scale(1.1);
        border-radius: 40%;
    }

    .contas-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 30px;
        font-weight: lighter;
        letter-spacing: -1.5px;
        font-family: var(--font-code);
        text-align: center;
        color: #2c3e50;
        margin: 4rem 2rem 0rem 2rem;
    }

    .subtitle {
        font-size: 18px;
        font-weight: lighter;
        letter-spacing: -1.5px;
        font-family: var(--font-code);
        text-align: center;
        color: #2c3e50;
        margin: 0rem 0rem 2rem 0rem;
    }

    .title-dark {
        font-size: 30px;
        font-weight: lighter;
        letter-spacing: -1.5px;
        font-family: var(--font-code);
        text-align: center;
        color: white;
        margin: 4rem 2rem 1rem 2rem;
    }
}

@media (min-width: 100px) and (max-width: 1280px) {
    .title {
        color: white;
        font-size: 30px;
        font-weight: lighter;
        letter-spacing: -1.5px;
        font-family: var(--font-code);
        text-align: center;
        margin: 4rem 2rem 1rem 2rem;
    }
}
</style>