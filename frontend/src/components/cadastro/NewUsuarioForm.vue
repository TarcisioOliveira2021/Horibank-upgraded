<script setup lang="ts">
import Button from '../commons/CustomButton.vue';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { ref, watch, onMounted} from 'vue';
import { vMaska } from 'maska/vue';
import { useRouter } from 'vue-router';

let dataNascimentoFormatada = '';
const nuCPF = ref('');
const dataNascimento = ref('');
const showPassword = ref(false);
const router = useRouter();
const CADASTRAR_ROUTE = import.meta.env.VITE_CADASTRAR_URL;

const schema = yup.object({
    nuCPF: yup.string().required('O campo obrigatório'),
    usuario: yup.string().min(6,'O campo deve ter no mínimo 6 caracteres').max(12,'O campo deve ter no máximo 12 caracteres').required('O campo obrigatório'),
    nome_completo: yup.string().required('O campo obrigatório'),
    email: yup.string().email().required('O campo obrigatório'),
    numero_celular: yup.string().required('O campo obrigatório').matches(/^\(\d{2}\) 9 \d{4}-\d{4}$/),
    senha: yup.string().min(8,'O campo deve ter no mínimo 8 caracteres').max(16,'O campo deve ter no máximo 16 caracteres').required('O campo obrigatório').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial')
});

const formatacaoDataNascimento = (dataNascimento: Date) => {
    const dia = dataNascimento.getDate();
    const mes = dataNascimento.getMonth() + 1;
    const ano = dataNascimento.getFullYear();

    dataNascimentoFormatada = `${mes}/${dia}/${ano}`;
    return `${dia}/${mes}/${ano}`;
}

watch(nuCPF, (valorAtual) => {
    nuCPF.value = valorAtual;
});

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

onMounted(() => {
    //Personalinzação do datepicker
    const wrapperInput = document.getElementsByClassName('dp__input_wrap')[0] as HTMLElement;
    const divMain = document.getElementsByClassName('dp__main')[0] as HTMLElement;
    wrapperInput.style.width = '220px';
    divMain.style.width = '220px';
    divMain.style.display = 'flex';
    divMain.style.flexDirection = 'column';
});

function onSubmitForm(inputValues: any) {
    if (validarDataNascimento(dataNascimentoFormatada) && validarSenha(inputValues.senha, inputValues.usuario)) {
        inputValues.dataNascimento = dataNascimentoFormatada;
            
        fetch(CADASTRAR_ROUTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValues)
        }).then(response => {
            if (response.ok) {
                response.json().then(resp => {
                    Swal.fire({
                        title: `${resp.message}`,
                        text: 'Você será redirecionado para tela de login ao clickar no botão abaixo 😊',
                        icon: 'success',
                        iconColor: '#42d392',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#42d392',
                    }).then(() => {
                        router.push('/acessar-conta'); 
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
        });
    }
}

function validarDataNascimento(dataNascimento: string) {
    const dataAtual = new Date();
    const dataNascimentoInformadaFormatada = new Date(dataNascimento);
    const diferencaAnos = dataAtual.getFullYear() - dataNascimentoInformadaFormatada.getFullYear();

    if (diferencaAnos < 18) {
        Swal.fire({
            title: 'Data de nascimento inválida',
            text: 'Você deve ter mais de 18 anos para se cadastrar 😭😭',
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        });

        return false;
    }

    return true;
}

function validarCPF(nuCPF: string) {
    const cpf = nuCPF.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
        return false;

    const cpfDigits = cpf.split("").map((el) => +el);
    const rest = (count: number): number => {
        return (((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10);
    };

    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
}

function validarSenha(senha: string, usuario:string) {
    if(senha.match(usuario)) {
        Swal.fire({
            title: 'Senha inválida',
            text: 'A senha não pode ser igual ao nome de usuário 😭😭',
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        });

        return false;
    }

    return true;
}
</script>

<template>
    <Form @submit="onSubmitForm" :validation-schema="schema" id="form-cadastro">
        <div class="usuario-field">
            <div class="usuario-elements">
                <label for="usuario">Nome de usuário:</label>
                <Field class="input-login" name="usuario" placeholder="Digite o nome de usuario" />
            </div>
            <ErrorMessage name="usuario"></ErrorMessage>
        </div>

        <div class="cpf-field">
            <div class="cpf-elements">
                <label for="nuCPF">Número do CPF:</label>
                <Field class="input-login" v-maska="'###.###.###-##'" name="nuCPF"
                    placeholder="Digite o número do CPF" />
            </div>
            <ErrorMessage name="nuCPF"></ErrorMessage>
        </div>

        <div class="nome-completo-field">
            <div class="nome-completo-elements">
                <label for="nome_completo">Nome completo:</label>
                <Field class="input-login" name="nome_completo" placeholder="Digite o nome completo" />
            </div>
            <ErrorMessage name="nome_completo"></ErrorMessage>
        </div>

        <div class="email-field">
            <div class="email-elements">
                <label for="email">Email:</label>
                <Field class="input-login" name="email" placeholder="Digite o e-mail" type="email" />
            </div>
            <ErrorMessage name="email"></ErrorMessage>
        </div>

        <div class="celular-field">
            <div class="celular-elements">
                <label for="numero_celular">Número do celular:</label>
                <Field class="input-login" v-maska="'(##) # ####-####'" name="numero_celular"
                    placeholder="Digite o número do celular" />
            </div>
            <ErrorMessage name="numero_celular"></ErrorMessage>
        </div>

        <div class="password-field">
            <div class="password-elements">
                <label for="senha">Senha:</label>
                <Field class="input-login" name="senha" :type="showPassword ? 'text' : 'password'"
                    placeholder="Digite a sua senha" id="password-field" />
                <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                    <span v-if="showPassword">🙈</span>
                    <span v-else>👁️</span>
                </button>
            </div>
            <ErrorMessage name="senha"></ErrorMessage>
        </div>

        <div class="born-field">
            <label for="born-field">Data de nascimento:</label>
            <VueDatePicker v-model="dataNascimento" auto-apply :format="formatacaoDataNascimento"
                :enable-time-picker="false">
                <template #dp-input="{ value }">
                    <input type="text" class="input-date" :value="value" placeholder="dd/mm/aa" required
                        readonly />
                </template>
            </VueDatePicker>
        </div>

        <div class="start-buttons" id="start-buttons">
            <Button botaoTexto="Cadastrar"></Button>
            <Button botaoTexto="Voltar" route-botao="/"></Button>
        </div>

    </Form>
</template>

<style scoped>
@media (max-width: 1920px) {
    form {
        display: grid;
        justify-items: center;
        grid-template-columns: repeat(2, 1fr);
        margin: 1rem 1rem 7rem 1rem;
    }

    .toggle-password {
        position: absolute;
        right: 20px;
        top: 42px;
    }

    .usuario-field,
    .usuario-elements,
    .cpf-field,
    .cpf-elements,
    .nome-completo-field,
    .nome-completo-elements,
    .born-field,
    .email-field,
    .email-elements,
    .celular-field,
    .celular-elements,
    .password-elements,
    .password-field,
    .dp__main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .password-elements {
        position: relative;
    }

    span {
        align-self: center;
        color: red;
        width: 220px;
        font-size: 14px;
    }

    .usuario-elements,
    .cpf-elements,
    .born-field,
    .nome-completo-elements,
    .email-elements,
    .celular-elements,
    .password-elements {
        align-items: baseline;
        height: 70px;
    }

    label {
        margin-top: 1rem;
        width: 200px;
        color: #2c3e50;
    }

    .input-login {
        width: 220px;
        height: 30px;
        padding: 0px;
        margin: 0rem 1rem 0rem 1rem !important;
        border-radius: 10px !important;
        border: none !important;
        transition: 0.5s;
        text-align: center;
        cursor: pointer;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative !important;
    }

    .input-date {
        width: 220px;
        height: 30px;
        padding: 0px;
        border-radius: 10px;
        border: none;
        transition: 0.5s;
        align-content: center;
        text-align: center;
        cursor: pointer;
        background-color: white;
    }

    .start-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 1rem 4rem 1rem;
        grid-column: span 2;
        justify-content: center;
        gap: 1rem;
    }

    .input-login:focus,
    .input-date:focus {
        outline: none;
        box-shadow: inset 0 1px 1px #42d392, 0 0 8px #42d392;
    }

    .input-login:hover,
    .input-date:hover {
        outline: none;
        border-color: #42d392;
        box-shadow: inset 0 0 4px #42d392, 0 0 5px #42d392;
    }


    /* dark mode */
    .label-dark {
        margin-top: 1rem;
        width: 200px;
        color: white;
    }
}

@media (max-width:1024px) {
    form {
        grid-template-columns: 1fr;
    }

    .start-buttons {
        grid-column: span 1;
    }
}
</style>
