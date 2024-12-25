<script setup lang="ts"></script>

<template>
    <h2 class="card-content-title" id="card-content-title">Nossas vantagens</h2>

    <section class="activities">
        <div class="card" id="card-1">
            <h2>Criação de contas</h2>
            <p>Abra sua conta corrente ou poupança e tenha acesso a diversos benefícios</p>
        </div>

        <div class="card" id="card-2">
            <h2>Tranferencias</h2>
            <p>Realize transferencias entre múltiplas contas da sua ou outras titularidades</p>
        </div>

        <div class="card" id="card-3">
            <h2>Acesso simples</h2>
            <p>Acesse de forma online os serviços e informações da sua conta</p>
        </div>

        <div class="card" id="card-4">
            <h2>Empréstimos</h2>
            <p>Simule e contrate empréstimos com as melhores taxas do mercado</p>
        </div>
    </section>
</template>

<style scoped>
@media (max-width: 1920px) {

    .activities {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .card {
        width: 300px;
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

    .card-content-title {
        font-size: 30px;
        font-weight: lighter;
        letter-spacing: -1.5px;
        font-family: var(--font-code);
        text-align: center;
        color: #2c3e50;
        margin: 4rem 2rem 1rem 2rem;
    }

    .card-content-title-dark{
        font-size: 30px;
        font-weight: lighter;
        letter-spacing: -1.5px;
        font-family: var(--font-code);
        text-align: center;
        color: white;
        margin: 4rem 2rem 1rem 2rem;
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
    }
}

@media (max-width:1024px) {
    .card {
        color: white;
    }

    .card:hover {
        transform: scale(1.1);
        transition: 0.2s;
        background: -webkit-linear-gradient(317deg, rgba(212, 212, 212, 0.308) 2%, #061147);
        color: white;
    }


    .card-content-title {
        color: white;
    }
}
</style>