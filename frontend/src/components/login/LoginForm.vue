<script setup lang="ts">
import Button from '../commons/CustomButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Field, ErrorMessage, Form } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2'

const LOGIN_ROUTE = import.meta.env.VITE_LOGIN_URL;
const showPassword = ref(false);
const router = useRouter();

const schema = yup.object({
    login: yup.string().min(5).max(20).required('O campo obrigatório'),
    password: yup.string().min(8).max(20).required('O campo obrigatório').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
}).required();

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

function onSubmit(values: any) {
    fetch(LOGIN_ROUTE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).then(response => {
        if (response.ok) {
            response.json().then(resp => {
                router.push({ path: '/conta-dashboard', query: { id: resp.id, token: resp.token } });
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

</script>

<template>
    <Form @submit="onSubmit" :validation-schema="schema">

        <Field class="usuario-field" name="login" placeholder="login" type="text" id="usuario-field"/>
        <ErrorMessage name="login"></ErrorMessage>

        <div class="password-input">
            <Field class="password-field" name="password" :type="showPassword ? 'text' : 'password'"
                placeholder="password" id="password-field"/>
            <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                <span v-if="showPassword">🙈</span>
                <span v-else>👁️</span>
            </button>
        </div>
        <ErrorMessage name="password"></ErrorMessage>

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
    .usuario-field, 
    .password-field{
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

    .usuario-field:focus, 
    .password-field:focus {
        outline: none;
        box-shadow: inset 0 1px 1px #42d392, 0 0 8px #42d392;
    }

    .usuario-field:hover 
    .password-field:hover {
        outline: none;
        border-color: #42d392;
        box-shadow: inset 0 0 4px #42d392, 0 0 5px #42d392;
    }

    .toggle-password {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .password-input {
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

    /* Dark mode */
    .start-buttons-dark {
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
