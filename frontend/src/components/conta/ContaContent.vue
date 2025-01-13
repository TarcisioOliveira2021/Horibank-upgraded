<script setup lang="ts">
import Swal from 'sweetalert2';
import Card from '../commons/Card.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { vMaska } from 'maska/vue';
import CurrencyInput from '../commons/CurrencyInput.vue';
import type { Conta } from '../interface/conta_inteface';
import type { ContaDestino } from '../interface/conta_destino_interface';
import confetti from 'canvas-confetti';
import { Field } from 'vee-validate';

const route = useRoute();
const modalConta = ref(false);
const modalDepositar = ref(false);
const modalSacar = ref(false);
const modalTransferir = ref(false);

const valorDeposito = ref(0);
const valorSaque = ref(0);
const valorTransferencia = ref(0);
const agencia = ref();
const conta_digito = ref();

const selectedConta = ref<Conta>();
const conta_destino = ref<ContaDestino>();

const CADASTRAR_CONTA_ROUTE = import.meta.env.VITE_CADASTRAR_CONTA_URL;
const DEPOSITAR_ROUTE = import.meta.env.VITE_DEPOSITAR_URL;
const SACAR_ROUTE = import.meta.env.VITE_SACAR_URL;
const ENCERRAR_CONTA_ROUTE = import.meta.env.VITE_ENCERRAR_CONTA_URL;
const TRANSFERIR_ROUTE = import.meta.env.VITE_TRANSFERIR_URL;
const CONTA_GET_ROUTE = import.meta.env.VITE_OBTER_INFORMACOES_CONTA_DESTINO_URL;

const props = defineProps<{
    contas: Conta[];
}>();

// watch(conta_destino, (newValue) => {
//     if (newValue) {
//         conta_destino.value = newValue;
//     }
// });

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
            text: `Token de autenticação não encontrado 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        })
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
            text: `Token de autenticação não encontrado 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        })
    }

}

function sacar(valor: number, idConta: number | undefined) {
    modalSacar.value = false;
    let token = getAuthenticationToken();

    if (token) {
        fetch(SACAR_ROUTE + '/' + idConta, {
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
            text: `Token de autenticação não encontrado 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        })
    }
}

async function transferir(valor: number, idConta: number | undefined, agencia: number, conta_digito: number) {
    modalTransferir.value = false;
    let token = getAuthenticationToken();

    if (idConta)
        await obterInformacoesContaDestino(token, agencia, conta_digito, idConta);

    console.log("Valores:", conta_destino.value);

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
            method: 'POST',
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
            text: `Token de autenticação não encontrado 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        })
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
            conta_destino.value = resp;
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
            text: `Token de autenticação não encontrado 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        });
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
                <Card class="card-desabilitado" title="Historico transferencias" :need-icon="false" disabled/>
                <Card class="card-desabilitado" title="PIX" :need-icon="false" disabled />

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

    .deposito-numero-conta {
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