<script setup lang="ts">
import Swal from 'sweetalert2';
import Card from '../commons/Card.vue';
import { useRoute } from 'vue-router';
import type { Conta } from '../interface/conta_inteface';

const CADASTRAR_CONTA_ROUTE = import.meta.env.VITE_CADASTRAR_CONTA_URL;
const route = useRoute();

const props = defineProps<{
    contas: Conta[];
}>();

props.contas.forEach(conta => {
    console.log("CONTA:",conta);
});

function criarConta() {
    Swal.fire({
        title: 'Criar conta',
        text: 'Deseja criar uma nova conta?',
        icon: 'question',
        iconColor: '#42d392',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        confirmButtonColor: '#42d392',
        cancelButtonText: 'Não',
        cancelButtonColor: '#42d392',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { value: tipoConta } = await Swal.fire({
                title: 'Quase lá',
                text: 'Qual tipo de conta deseja criar?',
                icon: 'question',
                iconColor: '#42d392',
                input: "select",
                confirmButtonText: 'Confirmar',
                confirmButtonColor: '#42d392',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#42d392',
                inputOptions: {
                    Tipo: {
                        corrente: 'Conta corrente',
                        poupanca: 'Conta poupança',
                    },
                },
                inputPlaceholder: "Selecione o tipo da conta",
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value === 'corrente' || value === 'poupanca') {
                            resolve();
                        } else {
                            resolve('Campo obrigatório');
                        }
                    });
                }
            });

            if (tipoConta) {
                cadastrarConta(route.query.id?.toString(), tipoConta);
            }
        }
    });
}

function getAuthenticationToken() {
    return document.cookie.split(';').find(cookie => cookie.trim().startsWith("token"))?.split('=')[1];
}

function cadastrarConta(idPessoa: string | undefined, tipoConta: string) {
    let token = getAuthenticationToken();

    if (token) {
        fetch(CADASTRAR_CONTA_ROUTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                idPessoa,
                tipoConta,
            }),
        }).then(response => {
            if (response.ok) {
                response.json().then(resp => {
                    Swal.fire({
                        title: 'Sucesso 🎉',
                        text: 'Conta cadastrada com sucesso 😎😎',
                        icon: 'success',
                        iconColor: '#42d392',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#42d392',
                    }).then(() => {
                        window.location.reload();
                    });
                });
            } else {
                Swal.fire({
                    title: 'Falha no processamento',
                    text: `${response.status} - ${response.statusText} 😭😭`,
                    icon: 'error',
                    iconColor: '#42d392',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#42d392',
                });
            }
        });
    } else {
        Swal.fire({
            title: 'Falha no processamento',
            text: `Token de autenticação não encontrado 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        })
    }
}

</script>

<template>
    <h2 class="title" id="title">Suas contas</h2>

    <p class="subtitle" v-if="props.contas.length === 0">Você não possui conta(s) cadastrada(s) connosco 😭 </p>
    <p class="subtitle" v-else> Você possui {{ props.contas.length }} conta(s) cadastrada(s) connosco 🥰 </p>

    <div class="contas-content" v-if="props.contas.length !== 2">
        <Card v-for="conta in props.contas" />
        <v-tooltip text="Criar conta" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" rounded="xl" size="large" class="teste" @click="criarConta()">
                    <v-icon icon="mdi-plus" class="icone"></v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </div>
    <div class="contas-content" v-else>
        <Card v-for="conta in props.contas" />
    </div>

</template>

<style scoped>
@media (min-width: 1281px) and (max-width: 1920px) {
    .icone {
        color: #42d392;
        transition: color 0.2s;
    }

    .teste {
        background-color: rgba(212, 212, 212, 0.308);
        transition: 0.5s;
        color: #2c3e50;
        border-radius: 30%;
        width: 50px;
        height: 50px;
        margin-top: 2rem;
    }

    .teste:hover {
        transform: scale(1.1);
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
        transition: 0.2s;
        background: -webkit-linear-gradient(317deg, #42d392 2%, #061147);
    }

    .teste:hover .icone {
        color: white;
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