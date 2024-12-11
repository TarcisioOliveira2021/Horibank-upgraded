<script setup lang="ts"></script>

<template>
    <section class="activities">
        <div class="card">
            <h2>Criação de contas</h2>
            <p>Abra sua conta corrente ou poupança e tenha acesso a diversos benefícios</p>
        </div>

        <div class="card">
            <h2>Tranferencias</h2>
            <p>Realize transferencias entre múltiplas contas da sua ou outras titularidades</p>
        </div>

        <div class="card">
            <h2>Acesso simples</h2>
            <p>Acesse de forma online os serviços e informações da sua conta</p>
        </div>

        <div class="card">
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

}

@media (max-width:600px) {
    .card {
        color: white;
    }

    .card:hover {
        transform: scale(1.1);
        transition: 0.2s;
        background: -webkit-linear-gradient(317deg, rgba(212, 212, 212, 0.308) 2%, #061147);
        color: white;
    }
}
</style>