<script setup lang="ts">
import Swal from 'sweetalert2';
import Card from '../commons/Card.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { vMaska } from 'maska/vue';
import CurrencyInput from '../commons/CurrencyInput.vue';
import type { Conta } from '../interface/conta_inteface';
import type { ContaDestino } from '../interface/conta_destino_interface';
import type { HistoricoTransferencia } from '../interface/historico_transferencia_interface';
import type { Extrato } from '../interface/extrato_interface';
import confetti from 'canvas-confetti';
import { Field } from 'vee-validate';

const route = useRoute();
const modalConta = ref(false);
const modalDepositar = ref(false);
const modalSacar = ref(false);
const modalTransferir = ref(false);
const modalHistoricoTransferencias = ref(false);
const modalExtrato = ref(false);
const modalAreaPix = ref(false);
const modalAreaPix_depositar = ref(false);

const valorDeposito = ref(0);
const valorSaque = ref(0);
const valorTransferencia = ref(0);
const agencia = ref();
const conta_digito = ref();

const selectedConta = ref<Conta>();
const conta_destino = ref<ContaDestino>();
const historico_transferencia = ref<HistoricoTransferencia[]>([]);
const extrato = ref<Extrato[]>([]);

const CADASTRAR_CONTA_ROUTE = import.meta.env.VITE_CADASTRAR_CONTA_URL;
const DEPOSITAR_ROUTE = import.meta.env.VITE_DEPOSITAR_URL;
const SACAR_ROUTE = import.meta.env.VITE_SACAR_URL;
const ENCERRAR_CONTA_ROUTE = import.meta.env.VITE_ENCERRAR_CONTA_URL;
const TRANSFERIR_ROUTE = import.meta.env.VITE_TRANSFERIR_URL;
const CONTA_GET_ROUTE = import.meta.env.VITE_OBTER_INFORMACOES_CONTA_DESTINO_URL;
const HISTORICO_TRANSFERENCIA_ROUTE = import.meta.env.VITE_OBTER_HISTORICO_CONTA_URL;
const EXTRATO_ROUTE = import.meta.env.VITE_EXTRATO_CONTA_URL;

const props = defineProps<{
    contas: Conta[];
}>();

const headersTable = [
    { title: 'Titular', align: 'start', key: 'titularContaDestino' },
    { title: 'Agencia', align: 'start', key: 'agenciaContaDestino' },
    { title: 'Conta', align: 'start', key: 'numero_digitoContaDestino' },
    { title: 'Tipo Conta', align: 'start', key: 'tipoContaDestino' },
    { title: 'Valor', align: 'start', key: 'valor' },
    { title: 'Data', align: 'start', key: 'data' },
];

const headerExtrato = [
    { title: 'Destinatario', align: 'start', key: 'destinatario' },
    { title: 'Data', align: 'start', key: 'data' },
    { title: 'Valor', align: 'start', key: 'valor' },
    { title: 'Tipo', align: 'start', key: 'tipo' }
]

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
                response.json().then(() => {
                    confetti({
                        zIndex: 9999,
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
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
                response.json().then(resp => {
                    Swal.fire({
                        title: 'Falha no processamento',
                        text: `${resp.statusCode} - ${resp.message} 😭😭`,
                        icon: 'error',
                        iconColor: '#42d392',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#42d392',
                    }).then(() => {
                        if (resp.message.include('Você já possui')) {
                            window.location.reload();
                        }

                        window.location.href = '/login';
                    });
                });
            }
        });
    } else {
        Swal.fire({
            title: 'Falha no processamento',
            text: `Token de autenticação não encontrado, logue novamente 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        }).then(() => {
            window.location.href = '/acessar-conta';
        });
    }
}

function verificarSaldoZerado(saldo: string | undefined): boolean {
    return saldo?.toString() === '0.00';
}

function exibirInformacaoContas(conta: Conta) {
    selectedConta.value = conta;
    modalConta.value = true;
}

function exibirModaldepositar() {
    modalConta.value = false;
    modalDepositar.value = true;
}

function exibirModalSacar() {
    modalConta.value = false;
    modalSacar.value = true;
}

function exibirModalTransferir() {
    modalConta.value = false;
    modalTransferir.value = true;
}

async function exibirModaHistoricoTransferencias() {
    modalConta.value = false;
    modalHistoricoTransferencias.value = true;

    let token = getAuthenticationToken();
    await obterHistoricoTransferencias(token, selectedConta.value?.id);
}

async function obterHistoricoTransferencias(token: string | undefined, idConta: number | undefined) {
    const URL = `${HISTORICO_TRANSFERENCIA_ROUTE}/${idConta}`;

    if (token) {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const resp = await response.json();
            historico_transferencia.value = resp;
        } else {
            const resp = await response.json();

            if (resp.message === 'Nenhuma transferência encontrada para a conta informada') {
                Swal.fire({
                    title: 'Histórico de transferências',
                    text: 'Nenhuma transferência encontrada 😭😭',
                    icon: 'info',
                    iconColor: '#42d392',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#42d392',
                }).then(() => {
                    modalHistoricoTransferencias.value = false;
                });
            } else {
                Swal.fire({
                    title: 'Falha no processamento',
                    text: `${resp.message} 😭😭`,
                    icon: 'error',
                    iconColor: '#42d392',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#42d392',
                }).then(() => {
                    modalHistoricoTransferencias.value = false;
                });
            }
        }
    } else {
        Swal.fire({
            title: 'Falha no processamento',
            text: `Token de autenticação não encontrado, logue novamente 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        }).then(() => {
            window.location.href = '/acessar-conta';
        });
    }
}

async function exibirModalExtrato() {
    modalConta.value = false;
    modalExtrato.value = true;

    let token = getAuthenticationToken();
    await obterExtrato(token, selectedConta.value?.id);
}

function exibirModalAreaPix() {
    modalConta.value = false;
    modalAreaPix.value = true;
}

function exibirModalAreaPix_depositar(){
    modalAreaPix.value = false;
    modalAreaPix_depositar.value = true;
}

async function obterExtrato(token: string | undefined, idConta: number | undefined) {
    const URL = `${EXTRATO_ROUTE}/${idConta}`;

    if (token) {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const resp = await response.json();
            extrato.value = resp;
        } else {
            const resp = await response.json();

            if (resp.message === 'Nenhuma transferência encontrada para a conta informada') {
                Swal.fire({
                    title: 'Histórico de transferências',
                    text: 'Nenhuma transferência encontrada 😭😭',
                    icon: 'info',
                    iconColor: '#42d392',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#42d392',
                }).then(() => {
                    modalExtrato.value = false;
                });
            } else {
                Swal.fire({
                    title: 'Falha no processamento',
                    text: `${resp.message} 😭😭`,
                    icon: 'error',
                    iconColor: '#42d392',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#42d392',
                }).then(() => {
                    modalExtrato.value = false;
                });
            }
        }
    } else {
        Swal.fire({
            title: 'Falha no processamento',
            text: `Token de autenticação não encontrado, logue novamente 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        }).then(() => {
            window.location.href = '/acessar-conta';
        });
    }

}

function depositar(valor: number, idConta: number | undefined) {
    modalDepositar.value = false;
    let token = getAuthenticationToken();

    if (token) {
        fetch(DEPOSITAR_ROUTE + '/' + idConta, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                valor,
            }),
        }).then(response => {
            if (response.ok) {
                response.json().then((resp) => {
                    confetti({
                        zIndex: 9999,
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                    Swal.fire({
                        title: 'Sucesso 🎉',
                        text: 'Depósito realizado com sucesso 😎😎',
                        icon: 'success',
                        iconColor: '#42d392',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#42d392',
                    }).then(() => {
                        if (selectedConta.value) {
                            selectedConta.value.saldo = resp.saldoAtual;
                        }
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
            text: `Token de autenticação não encontrado, logue novamente 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        }).then(() => {
            window.location.href = '/acessar-conta';
        });
    }
}

function sacar(valor: number, idConta: number | undefined) {
    modalSacar.value = false;
    let token = getAuthenticationToken();

    if (token) {
        fetch(SACAR_ROUTE + '/' + idConta, {
            method: 'PATCH',
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
                    confetti({
                        zIndex: 9999,
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                    Swal.fire({
                        title: 'Sucesso 🎉',
                        text: 'Saque realizado com sucesso 😎😎',
                        icon: 'success',
                        iconColor: '#42d392',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#42d392',
                    }).then(() => {
                        if (selectedConta.value) {
                            selectedConta.value.saldo = resp.saldoAtual;
                        }
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
            text: `Token de autenticação não encontrado, logue novamente 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        }).then(() => {
            window.location.href = '/acessar-conta';
        });
    }

}

function exibirModalEncerrarConta(conta: Conta | undefined) {
    modalConta.value = false;

    Swal.fire({
        title: 'Encerrar conta',
        text: 'Deseja encerrar a conta?',
        icon: 'question',
        iconColor: '#42d392',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        confirmButtonColor: '#42d392',
        cancelButtonText: 'Não',
        cancelButtonColor: '#42d392',
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Encerrar conta',
                html: 'Você tem certeza que deseja encerrar a conta?<br><b>Essa ação é irreversível<b/>',
                icon: 'warning',
                iconColor: '#42d392',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                confirmButtonColor: '#42d392',
                cancelButtonText: 'Não',
                cancelButtonColor: '#42d392',
            }).then((result) => {

                if (result.isDismissed) {
                    return;
                }

                encerrarConta(conta);
            });
        }
    });
}

function encerrarConta(conta: Conta | undefined) {
    let token = getAuthenticationToken();

    if (token) {
        fetch(ENCERRAR_CONTA_ROUTE + '/' + conta?.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(() => {
                    Swal.fire({
                        title: 'Sucesso',
                        text: 'A sua conta foi encerrada com sucesso 🙂',
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
            text: `Token de autenticação não encontrado, logue novamente 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        }).then(() => {
            window.location.href = '/acessar-conta';
        });
    }
}

async function transferir(valor: number, idConta: number | undefined, agencia: number, conta_digito: number) {
    modalTransferir.value = false;
    let token = getAuthenticationToken();

    if (idConta)
        await obterInformacoesContaDestino(token, agencia, conta_digito, idConta);

    if (conta_destino.value) {
        Swal.fire({
            title: 'Tranferir',
            text: 'Confirmar dados da transferência?',
            html: `Você deseja transferir <b>R$ ${valor.toFixed(2)}</b> para a conta: <br>
                <p><b>Titular:</b> ${conta_destino.value?.nomeContaDestino}</p>
                <p><b>Agência:</b> ${conta_destino.value?.agenciaDestino}</p>
                <p><b>Número:</b> ${conta_destino.value?.numeroContaDestino}-${conta_destino.value?.digitoContaDestino}</p>
                <p><b>Tipo da conta:</b> ${conta_destino.value?.tipoContaDestino}</p>`,
            icon: 'question',
            iconColor: '#42d392',
            confirmButtonText: 'Sim',
            confirmButtonColor: '#42d392',
            showCancelButton: true,
            cancelButtonText: 'Não',
            cancelButtonColor: '#42d392',
        }).then((result) => {
            if (result.isConfirmed) {
                transferirValor(token, valor, idConta, conta_destino.value?.idContaDestino);
            }
        });
    }
}

function transferirValor(token: string | undefined, valor: number, idContaOrigem: number | undefined, idContaDestino: number | undefined) {
    if (token) {
        fetch(TRANSFERIR_ROUTE + '/' + idContaOrigem, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                idContaDestino: conta_destino.value?.idContaDestino,
                valor: valor
            }),
        }).then(response => {
            if (response.ok) {
                response.json().then(() => {
                    confetti({
                        zIndex: 9999,
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                    Swal.fire({
                        title: 'Sucesso 🎉',
                        text: 'Transferência realizada com sucesso 😎😎',
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
            text: `Token de autenticação não encontrado, logue novamente 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        }).then(() => {
            window.location.href = '/acessar-conta';
        });
    }
}

async function obterInformacoesContaDestino(token: string | undefined, agenciaDestino: number, contaDestino: number, idContaOrigem: number) {
    const URL = `${CONTA_GET_ROUTE}/${agenciaDestino}/${contaDestino}/${idContaOrigem}`;

    if (token) {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const resp = await response.json();
            conta_destino.value = resp.data;
        } else {
            const resp = await response.json();
            Swal.fire({
                title: 'Falha no processamento',
                text: `${resp.message} 😭😭`,
                icon: 'error',
                iconColor: '#42d392',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#42d392',
            }).then(() => {
                modalTransferir.value = true;
            });
        }
    } else {
        Swal.fire({
            title: 'Falha no processamento',
            text: `Token de autenticação não encontrado, logue novamente 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        }).then(() => {
            window.location.href = '/acessar-conta';
        });
    }
}

function colorrirCelula(tipo: string) {
    if(tipo === 'DEPOSITO') {
        return 'green';
    } else if(tipo === 'SAQUE') {
        return 'red';
    } else {
        return 'blue';
    }
}

</script>

<template>
    <h2 class="title" id="title">Suas contas</h2>
    <p class="subtitle" v-if="props.contas.length === 0">Você não possui conta(s) cadastrada(s) connosco 😭 </p>
    <p class="subtitle" v-else> Você possui {{ props.contas.length }} conta(s) cadastrada(s) connosco 🥰 </p>

    <div class="contas-content" v-if="props.contas.length !== 2">
        <Card v-for="conta in props.contas" :need-icon="true" @click="exibirInformacaoContas(conta)"
            :description="'R$' + conta.saldo" />
        <v-tooltip :text="props.contas.length > 0 ? 'Adicionar nova conta' : 'Criar nova conta'" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" rounded="xl" size="large" class="icone-btn" @click="criarConta()">
                    <v-icon icon="mdi-plus" class="icone"></v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </div>

    <div class="contas-content" v-else>
        <Card v-for="conta in props.contas" :need-icon="true" :description="'R$' + conta.saldo" :title="conta.tipoConta"
            @click="exibirInformacaoContas(conta)" />
    </div>

    <v-dialog v-model="modalConta" max-width="500px" max-height="1200px">
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
                    :disabled="verificarSaldoZerado(selectedConta?.saldo.toString())"
                    :class="{ 'card-desabilitado': verificarSaldoZerado(selectedConta?.saldo.toString()) }" @click="() => {
                        if (!verificarSaldoZerado(selectedConta?.saldo.toString()))
                            exibirModalSacar()
                    }" />
                <Card class="card-operacoes-conta" title="Depositar" :need-icon="false"
                    @click="exibirModaldepositar()" />
                <Card class="card-operacoes-conta" title="Transferir" :need-icon="false"
                    @click="exibirModalTransferir()" />
                <Card class="card-operacoes-conta" title="Historico transferencias" :need-icon="false"
                    @click="exibirModaHistoricoTransferencias()" />
                <Card class="card-operacoes-conta" title="Área PIX" :need-icon="false" 
                    @click="exibirModalAreaPix()"/>
                <Card class="card-operacoes-conta" title="Extrato" :need-icon="false" 
                    @click="exibirModalExtrato()"/>
            </div>

            <v-card-actions>
                <v-btn color="green darken-1" text @click="exibirModalEncerrarConta(selectedConta)">Encerrar
                    conta</v-btn>
                <v-btn color="green darken-1" text @click="modalConta = false">Voltar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="modalDepositar" max-width="500px">
        <v-card>
            <v-card-title class="headline">Depositar</v-card-title>
            <v-card-subtitle>Informe o valor que deseja depositar na conta
                <p class="deposito-numero-conta"><b>Número:</b> {{ selectedConta?.numero }}-{{ selectedConta?.digito }}
                </p>
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text class="deposito-content">
                <CurrencyInput v-model="valorDeposito" :options="{ currency: 'BRL' }" />
            </v-card-text>
            <v-card-actions>
                <v-btn color="green darken-1" text @click="modalDepositar = false; valorDeposito = 0">Fechar</v-btn>
                <v-btn color="green darken-1" text
                    @click="depositar(valorDeposito, selectedConta?.id)">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="modalSacar" max-width="500px">
        <v-card>
            <v-card-title class="headline">Sacar</v-card-title>
            <v-card-subtitle>Informe o valor que deseja sacar da conta</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text class="deposito-content">
                <CurrencyInput v-model="valorSaque" :options="{ currency: 'BRL' }" />
            </v-card-text>
            <v-card-actions>
                <v-btn color="green darken-1" text @click="modalSacar = false; valorSaque = 0">Fechar</v-btn>
                <v-btn color="green darken-1" text @click="sacar(valorSaque, selectedConta?.id)">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="modalTransferir" max-width="500px">
        <v-card>
            <v-card-title class="headline">Tranferir</v-card-title>
            <v-card-subtitle>Informe o valor que deseja transferir e os dados da conta de destino
                <br><b>Suportada apenas entre contas do horibank</b>
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text class="transferencia-content">
                <Field v-model="agencia" class="input-transferencia" v-maska="'####'" name="agencia"
                    placeholder="Agencia" />
                <Field v-model="conta_digito" class="input-transferencia" v-maska="'######-#'" name="conta_digito"
                    placeholder="Conta e digito" />
                <CurrencyInput v-model="valorTransferencia" :options="{ currency: 'BRL' }"
                    placeholder="Digite o valor a transferir" />
            </v-card-text>
            <v-card-actions>
                <v-btn color="green darken-1" text @click="modalTransferir = false; valorSaque = 0">Fechar</v-btn>
                <v-btn color="green darken-1" text
                    @click="transferir(valorTransferencia, selectedConta?.id, agencia, conta_digito)">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="modalHistoricoTransferencias" max-width="1000px" max-height="900px">
        <v-card>
            <v-card-title class="headline">Transferencias da conta</v-card-title>
            <v-card-subtitle class="subtitle-transferencia">Consulte o histórico de transferências
                realizadas</v-card-subtitle>
            <v-divider></v-divider>

            <v-card-text v-if="historico_transferencia.length > 0">
                <v-data-table :headers="headersTable" :items="historico_transferencia"></v-data-table>
            </v-card-text>
            <v-card-text v-else>
                <p>Nenhuma transferência encontrada para essa conta 😊</p>
            </v-card-text>

            <v-card-actions>
                <v-btn color="green darken-1" text @click="modalHistoricoTransferencias = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="modalExtrato" max-width="800px" max-height="900px">
        <v-card>
            <v-card-title class="headline">Extrato</v-card-title>
            <v-card-subtitle class="subtitle-extrato">Essas são as informações referentes as transaçoes efetuadas na sua
                conta 🤑</v-card-subtitle>
            <v-divider></v-divider>

            <v-card-text v-if="extrato.length > 0">
                <v-data-table :headers="headerExtrato" :items="extrato">
                    <template v-slot:item.tipo="{ value }">
                        <v-chip :color="colorrirCelula(value)">
                            {{ value }}
                        </v-chip>
                    </template>
                </v-data-table>
            </v-card-text>
            
            <v-card-text v-else>
                <p>Nada a mostrar por aqui 😊</p>
            </v-card-text>

            <v-card-actions>
                <v-btn color="green darken-1" text @click="modalExtrato = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="modalAreaPix" max-width="500px" max-height="1200px">
        <v-card>
            <v-card-title class="headline">Área PIX</v-card-title>
            <v-card-subtitle class="subtitle-area-pix">Aqui você faz operações envolvendo o pix</v-card-subtitle>
            <v-divider></v-divider>

            <div class="modal-content">
                <Card class="card-desabilitado" title="Depositar" :need-icon="false"
                @click="exibirModalAreaPix_depositar()"/>
                <Card class="card-desabilitado" title="Minhas chaves" :need-icon="false"/>
                <Card class="card-desabilitado" title="Transferir" :need-icon="false"/>
            </div>
        
            <v-card-actions>
                <v-btn color="green darken-1" text @click="modalAreaPix = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="modalAreaPix_depositar" max-width="500px" max-height="1200px">
        <v-card>
            <v-card-title class="headline">Depositar PIX</v-card-title>
            <v-card-subtitle class="subtitle-area-pix">Aqui você faz operações envolvendo o pix</v-card-subtitle>
            <v-divider></v-divider>

            <div class="modal-content">
                <Card class="card-operacoes-conta" title="Depositar" :need-icon="false"/>
                <Card class="card-operacoes-conta" title="Minhas chaves" :need-icon="false"/>
                <Card class="card-desabilitado" title="Transferir" :need-icon="false"/>
            </div>
        
            <v-card-actions>
                <v-btn color="green darken-1" text @click="modalAreaPix_depositar = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


</template>

<style scoped>
@media (min-width: 1281px) and (max-width: 1920px) {
    .input-transferencia {
        width: auto;
        height: 30px;
        padding: 10px !important;
        border-radius: 10px !important;
        margin: 0rem 0rem 1rem 0rem !important;
        border: 1px solid #42d392;
        transition: 0.5s;
        cursor: pointer;
        background-color: white !important;
    }

    .input-transferencia:focus {
        outline: none;
        box-shadow: inset 0 1px 1px #42d392, 0 0 8px #42d392;
    }

    .input-transferencia:hover {
        outline: none;
        border-color: #42d392;
        box-shadow: inset 0 0 4px #42d392, 0 0 5px #42d392;
    }


    .texto-conta-modal {
        size: 14px;
        text-align: center;
    }

    .deposito-numero-conta,
    .subtitle-transferencia,
    .subtitle-extrato,
    .subtitle-area-pix {
        margin-bottom: 1rem;
    }

    .deposito-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .transferencia-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .card-desabilitado {
        width: 120px !important;
        height: 50px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
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

    .icone-btn {
        background-color: rgba(212, 212, 212, 0.308);
        transition: 0.5s;
        color: #2c3e50;
        border-radius: 30%;
        width: 50px;
        height: 50px;
        margin-top: 2rem;
        margin-left: 2rem;
    }

    .icone-btn:hover {
        transform: scale(1.1);
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
        transition: 0.2s;
        background: -webkit-linear-gradient(317deg, #42d392 2%, #061147);
    }

    .icone-btn:hover .icone {
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