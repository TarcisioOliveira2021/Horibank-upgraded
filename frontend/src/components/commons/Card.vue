<script setup lang="ts">
interface Props{
    title?: string;
    description?: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
    </div>
</template>

<style>
@media (min-width: 1281px) and (max-width: 1920px)  {
    .card {
        width: 250px;
        height: 200px;
        margin: 12px;
        padding: 20px;
        border-radius: 15px;
        background-color: rgba(212, 212, 212, 0.308);
        transition: 0.5s;
        color: #2c3e50;
        align-content: center;
        text-align: center;
        cursor: not-allowed;
    }

    .card:hover {
        transform: scale(1.1);
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
        transition: 0.2s;
        background: -webkit-linear-gradient(317deg, #42d392 2%, #061147);
        color: white;
    }

    .card-dark{
        width: 300px;
        height: 200px;
        margin: 12px;
        padding: 20px;
        border-radius: 15px;
        color: white !important;
        background-color: rgba(31, 30, 30, 0.6);
        transition: 0.5s;
        align-content: center;
        text-align: center;
        cursor: not-allowed;
    }

    .card-dark:hover{
        transform: scale(1.1);
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
        transition: 0.2s;
        background: -webkit-linear-gradient(317deg, rgba(212, 212, 212, 0.6) 2%, #ffffff);
        color: #2c3e50;
        -webkit-text-fill-color: #2c3e50;
    }
}
@media (min-width: 100px) and (max-width: 1280px) {
    .card {
        color: white;
        margin: 12px;
        padding: 20px;
        border-radius: 15px;
        background-color: rgba(212, 212, 212, 0.308);
        transition: 0.5s;
        align-content: center;
        text-align: center;
        cursor: not-allowed;
    }

    .card:hover {
        transform: scale(1.1);
        transition: 0.2s;
        background: -webkit-linear-gradient(317deg, rgba(212, 212, 212, 0.308) 2%, #061147);
        color: white;
    }
}
</style>