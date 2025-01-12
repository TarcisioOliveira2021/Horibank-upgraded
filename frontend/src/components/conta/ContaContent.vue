<script setup lang="ts">
import Swal from 'sweetalert2';
import Card from '../commons/Card.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import CurrencyInput from '../commons/CurrencyInput.vue';
import type { Conta } from '../interface/conta_inteface';

const route = useRoute();
const dialog = ref(false);
const modalDepositar = ref(false);
const valorDeposito = ref(0);
const selectedConta = ref<Conta>();
const CADASTRAR_CONTA_ROUTE = import.meta.env.VITE_CADASTRAR_CONTA_URL;
const DEPOSITAR_ROUTE = import.meta.env.VITE_DEPOSITAR_URL;



const props = defineProps<{
    contas: Conta[];
}>();

console.log(props.contas);

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

function exibirInformacaoContas(conta: Conta) {
    selectedConta.value = conta;
    dialog.value = true;
}

function exibirModaldepositar() {
    modalDepositar.value = true;
}

function depositar(valor: number, idConta: number | undefined) {
    modalDepositar.value = false;
    let token = getAuthenticationToken();

    if (token) {
        fetch(DEPOSITAR_ROUTE+'/'+idConta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                valor,
            }),
        }).then(response => {
            if (response.ok) {
                response.json().then(resp => {
                    Swal.fire({
                        title: 'Sucesso 🎉',
                        text: 'Depósito realizado com sucesso 😎😎',
                        icon: 'success',
                        iconColor: '#42d392',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#42d392',
                    }).then(() => {
                        window.location.reload();
                    });
                });
            } else {
                response.json().then(resp => {
                    Swal.fire({
                        title: 'Falha no processamento',
                        text: `${resp.message} 😭😭`,
                        icon: 'error',
                        iconColor: '#42d392',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#42d392',
                    })
                });
            }
        }).catch(error => {
            Swal.fire({
                title: 'Falha no processamento',
                text: `${error} 😭😭`,
                icon: 'error',
                iconColor: '#42d392',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#42d392',
            })
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
        <Card v-for="conta in props.contas" :need-icon="true" @click="exibirInformacaoContas(conta)" :description="'R$'+conta.saldo"/>
        <v-tooltip :text="props.contas.length > 0 ? 'Adicionar nova conta' : 'Criar nova conta'" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" rounded="xl" size="large" class="teste" @click="criarConta()">
                    <v-icon icon="mdi-plus" class="icone"></v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </div>

    <div class="contas-content" v-else>
        <Card v-for="conta in props.contas" :need-icon="true" />
    </div>

    <v-dialog v-model="dialog" max-width="500px" max-height="1200px">
        <v-card>
            <v-card-title class="headline">Informações da conta</v-card-title>
            <v-card-subtitle>Confira as informações da sua conta</v-card-subtitle>

            <v-card-text>
                <p><b>Agência:</b> {{ selectedConta?.agencia }}</p>
                <p><b>Número:</b> {{ selectedConta?.numero }}-{{ selectedConta?.digito }}</p>
                <p><b>Saldo atual:</b> R$ {{ selectedConta?.saldo }}</p>
                <p><b>Tipo da conta:</b> {{ selectedConta?.tipoConta }}</p>
            </v-card-text>


            <v-divider>
                <p class="texto-conta-modal">Operações disponiveis</p>
            </v-divider>

            <div class="modal-content">
                <Card class="card-operacoes-conta" title="Sacar" :need-icon="false"
                    :disabled="selectedConta?.saldo === 0"
                    :class="{ 'card-desabilitado': selectedConta?.saldo === 0 }" />
                <Card class="card-operacoes-conta" title="Depositar" :need-icon="false"
                    @click="dialog = false; exibirModaldepositar()" />
                <Card class="card-operacoes-conta" title="Transferir" :need-icon="false" />
            </div>

            <v-card-actions>
                <v-btn color="green darken-1" text @click="dialog = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="modalDepositar" max-width="500px">
    <v-card>
      <v-card-title class="headline">Depositar</v-card-title>
      <v-card-subtitle>Informe o valor que deseja depositar na conta 
        <p class="deposito-numero-conta"><b>Número:</b> {{ selectedConta?.numero }}-{{ selectedConta?.digito }}</p>
      </v-card-subtitle>
      
      
      <v-divider></v-divider>
      <v-card-text class="deposito-content">
        <CurrencyInput v-model="valorDeposito" :options="{ currency: 'BRL' }" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="green darken-1" text @click="modalDepositar = false; valorDeposito = 0">Fechar</v-btn>
        <v-btn color="green darken-1" text @click="depositar(valorDeposito, selectedConta?.id)">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


</template>

<style scoped>
@media (min-width: 1281px) and (max-width: 1920px) {
    .texto-conta-modal {
        size: 14px;
        text-align: center;
    }

    .deposito-numero-conta{
        margin-bottom: 1rem;
    }

    .deposito-content{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card-desabilitado {
        cursor: not-allowed !important;
        opacity: 0.5 !important;
    }

    .modal-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .card-operacoes-conta {
        width: 120px !important;
        height: 50px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }


    .card:hover {
        transform: scale(1.1);
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
        transition: 0.2s;
        background: -webkit-linear-gradient(317deg, #42d392 2%, #061147);
        color: white;
    }


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
        margin-left: 2rem;
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