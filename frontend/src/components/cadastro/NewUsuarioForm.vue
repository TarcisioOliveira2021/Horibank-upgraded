<script setup lang="ts">
import Button from '../commons/ButtonSingle.vue';
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import { ref, watch } from 'vue';

import * as yup from 'yup';
const LOGIN_API_URL = `${import.meta.env.VITE_API_URL}/login`;

const dataNascimento = ref('');

const schema = yup.object({
    usuario: yup.string().min(6).max(20).required('O campo usuário é obrigatório'),
    cpf: yup.string().required('O campo cpf é obrigatório'),
}).required();

const formatacaoDataNascimento = (dataNascimento: Date) => {
    const dia = dataNascimento.getDate();
    const mes = dataNascimento.getMonth() + 1;
    const ano = dataNascimento.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

const cpf = ref('');
watch(cpf, (valorAtual) => {
    cpf.value = valorAtual;
});

</script>

<template>
    <VeeForm v-slot="{ submitForm }" :validation-schema="schema">
        <form @submit="submitForm" method="post" :action="LOGIN_API_URL">

            <div class="usuario-field">
                <label for="usuario">Nome de usuário:</label>
                <Field class="input-login" name="usuario" placeholder="Digite o nome de usuario" />
                <ErrorMessage name="usuario"></ErrorMessage>
            </div>

            <div class="cpf-field">
                <label for="cpf">Número do CPF:</label>
                <MaskInput class="input-login" name="cpf" v-model="cpf" mask="###.###.###-##" placeholder="Digite o cpf" />
                <ErrorMessage name="cpf"></ErrorMessage>
            </div>

            <div class="full-name-field">
                <label for="full-name">Nome completo:</label>
                <Field class="input-login" name="full-name" placeholder="Digite o nome completo" />
                <ErrorMessage name="full-name"></ErrorMessage>
            </div>

            <div class="born-field">
                <label for="born-field">Data de nascimento:</label>
                <VueDatePicker v-model="dataNascimento" :format="formatacaoDataNascimento" :enable-time-picker="false" auto-apply placeholder="Informe a data" required/>
                <ErrorMessage name="born-field"></ErrorMessage>
            </div>



            <Button botaoTexto="Logar"></Button>
        </form>
    </VeeForm>
</template>

<style scoped>
form :where(.usuario-field, .cpf-field, .full-name-field, .born-field) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

span {
    align-self: center;
    color: red;
}

:where(.usuario-field, .cpf-field, .born-field, .full-name-field) {
    align-items: baseline;
}

@media (max-width: 1920px) {

    label {
        margin-top: 1rem;
        width: 200px;
    }

    .input-login,
    .dp__main {
        width: 200px;
        height: 30px;
        padding: 0px;
        margin: 0rem 1rem 0rem 1rem;
        border-radius: 10px;
        border: none;
        transition: 0.5s;
        align-content: center;
        text-align: center;
        cursor: pointer;
        background-color: white;
    }

    .input-login:focus {
        outline: none;
        box-shadow: inset 0 1px 1px #42d392, 0 0 8px #42d392;
    }

    .input-login:hover {
        outline: none;
        border-color: #42d392;
        box-shadow: inset 0 0 4px #42d392, 0 0 5px #42d392;
    }

}

@media (max-width:1024px) {}
</style>
