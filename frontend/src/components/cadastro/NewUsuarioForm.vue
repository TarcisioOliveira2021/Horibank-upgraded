<script setup lang="ts">
import Button from '../commons/ButtonSingle.vue';
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import { ref, watch, watchEffect } from 'vue';

import * as yup from 'yup';
const LOGIN_API_URL = `${import.meta.env.VITE_API_URL}/login`;
const cpf = ref('');
const schema = yup.object({
    usuario: yup.string().min(6).max(20).required('O campo usuário é obrigatório')
}).required();

</script>

<template>
    <VeeForm v-slot="{ submitForm }" :validation-schema="schema" as="div">
        <form @submit="submitForm" method="post" :action="LOGIN_API_URL">

            <div class="usuario-field">
                <label for="usuario">Usuario</label>
                <Field class="input-login" name="usuario" placeholder="Digite o nome de usuario" />
                <ErrorMessage name="usuario"></ErrorMessage>
            </div>

            <div class="cpf-field">
                <label for="cpf">CPF</label>
                <MaskInput class="input-login" name="cpf" v-model="cpf" mask="###.###.###-##"
                    placeholder="Digite o cpf" />
                <ErrorMessage name="cpf"></ErrorMessage>
            </div>

            <Button botaoTexto="Logar"></Button>
        </form>
    </VeeForm>
</template>

<style scoped>
form, div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

span{
    align-self: center;
    color: red;
}

div{
    align-items: baseline;
}

@media (max-width: 1920px) {

    label {
        margin-top: 1rem;
        width: 232px;
    }

    .input-login {
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
