<script setup lang="ts">
import Card from '../commons/Card.vue';


const props = defineProps<{
    contas: Array<any>;
}>();

</script>

<template>
    <h2 class="title" id="title">Suas contas</h2>
    <p class="subtitle">Você não possui contas cadastradas </p>
    <div class="contas-content" v-if="contas.length > 0">
        <Card :needIcon="false" v-for="conta in contas" />
    </div>
    <div class="contas-content" v-else>
        <Card :needIcon="true" />
    </div>

</template>

<style scoped>
@media (min-width: 1281px) and (max-width: 1920px) {
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