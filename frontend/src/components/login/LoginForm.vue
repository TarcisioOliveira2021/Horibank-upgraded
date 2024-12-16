<script setup lang="ts">
import Button from '../commons/CustomButton.vue';
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
const API_KEY = `${import.meta.env.VITE_API_URL}/login`;

const schema = yup.object({
    usuario: yup.string().min(6).max(20).required('O campo usuário é obrigatório'),
    senha: yup.string().min(8).max(16).required('O campo senha é obrigatório')
}).required();

function submitForm(values: any) {
    console.log(values);
}

</script>

<template>
    <VeeForm v-slot="{ submitForm }" :validation-schema="schema">
        <form @submit="submitForm">
            <Field class="usuario-field" name="usuario" placeholder="Usuário" type="text" />
            <ErrorMessage name="usuario"></ErrorMessage>

            <Field class="password-field" name="senha" placeholder="Senha" type="password" />
            <ErrorMessage name="senha"></ErrorMessage>

            <div class="start-buttons">
                <Button botaoTexto="Logar"></Button>
                <Button botaoTexto="Voltar" route-botao="/"></Button>
            </div>
        </form>
    </VeeForm>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

span {
    align-self: center;
    color: red;
}


@media (max-width: 1920px) {
    :where(.usuario-field, .password-field) {
        width: 220px;
        height: 30px;
        padding: 0px !important;
        border-radius: 10px !important;
        margin: 1rem 1rem 0rem 1rem !important;
        border: none !important;
        transition: 0.5s;
        align-content: center;
        text-align: center;
        cursor: pointer;
        background-color: white !important;
    }

    :where(.usuario-field, .password-field):focus {
        outline: none;
        box-shadow: inset 0 1px 1px #42d392, 0 0 8px #42d392;
    }

    :where(.usuario-field, .password-field):hover {
        outline: none;
        border-color: #42d392;
        box-shadow: inset 0 0 4px #42d392, 0 0 5px #42d392;
    }

    .start-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        flex-direction: column;
        align-items: center;
        margin: 1rem 1rem 2rem 1rem;
    }
}

@media (max-width:1024px) {
    .start-buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 1rem 2rem 1rem;
    }
}
</style>
