<script setup lang="ts">
import Button from '../commons/ButtonSingle.vue';
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
const API_KEY = `${import.meta.env.VITE_API_URL}/login`;

const schema  = yup.object({
    usuario: yup.string().min(6).max(20).required('O campo usuário é obrigatório'),
    senha: yup.string().min(8).max(16).required('O campo senha é obrigatório')
}).required();

</script>

<template>
    <VeeForm v-slot="{submitForm}" :validation-schema="schema" as="div">
        <form @submit="submitForm" method="post"> <!--:action=API_KEY-->
            <Field class="input-login" name="usuario" placeholder="Usuário" type="text"/>
            <ErrorMessage name="usuario"></ErrorMessage>

            <Field class="input-login" name="senha" placeholder="Senha" type="password"/>
            <ErrorMessage name="senha"></ErrorMessage>

            <Button botao-texto="Logar"></Button>
        </form>
    </VeeForm>
</template>

<style scoped>
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


@media (max-width: 1920px) {
    .input-login{
        width: auto;
        height: 30px;
        padding: 0px;
        margin: 1rem 1rem 0rem 1rem;
        border-radius: 10px;
        border: none;
        transition: 0.5s;
        align-content: center;
        text-align: center;
        cursor: pointer;
    }

    .input-login:focus{
        outline: none;
        box-shadow: inset 0 1px 1px #42d392, 0 0 8px #42d392;
    }

    .input-login:hover{
        outline: none;
        border-color: #42d392;
        box-shadow: inset 0 0 4px #42d392, 0 0 5px #42d392;
    }

}

@media (max-width:1024px) {}
</style>
