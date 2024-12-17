<script setup lang="ts">
import Button from '../commons/CustomButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form as VeeForm, Field, ErrorMessage, Form } from 'vee-validate';
import * as yup from 'yup';

const API_KEY = `${import.meta.env.VITE_API_URL}/login/logar`;
const showPassword = ref(false);
const router = useRouter();

const schema = yup.object({
    login: yup.string().min(5).max(20).required('O campo usuário é obrigatório'),
    senha: yup.string().min(8).max(20).required('O campo senha é obrigatório')
}).required();


const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

function onSubmit(values: any) {
    fetch(API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).then(response => {
        if (response.ok) {
            response.json().then(data => {
                router.push({ path: '/conta-dashboard', query: { id: data }});
            });
        } else {
            console.log('Erro ao realizar login');
        }
    });
}
</script>

<template>
        <Form @submit="onSubmit" :validation-schema="schema">
            <Field class="usuario-field" name="login" placeholder="Usuário" type="text" />
            <ErrorMessage name="login"></ErrorMessage>


            <div class="password-input">
                <Field class="password-field" name="senha" :type="showPassword ? 'text' : 'password'"
                    placeholder="Número do CPF" />
                <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                    <span v-if="showPassword">🙈</span>
                    <span v-else>👁️</span>
                </button>
            </div>
            <ErrorMessage name="senha"></ErrorMessage>

            <div class="start-buttons">
                <Button botaoTexto="Logar"></Button>
                <Button botaoTexto="Voltar" route-botao="/"></Button>
            </div>
        </Form>
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
        position: relative !important;
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

    .toggle-password {
        position: absolute;
        right: 20px;
        top: 20px;
    }
    
    .password-input{
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
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
