<script setup lang="ts">
import Button from '../commons/CustomButton.vue';
import { Form as VeeForm, Field, ErrorMessage, useSubmitForm } from 'vee-validate';
import { ref, watch, onMounted } from 'vue';
import { vMaska } from 'maska/vue';
import * as yup from 'yup';

const cpf = ref('');
const dataNascimento = ref('');
const LOGIN_API_URL = `${import.meta.env.VITE_API_URL}/login`;

const schema = yup.object({
    usuario: yup.string().min(6).max(20).required('O campo usuário é obrigatório'),
    cpf: yup.string().required('O campo cpf é obrigatório'),
    email: yup.string().email().required('O campo email é obrigatório'),
    celular: yup.string().required('O campo celular é obrigatório').matches(/^\(\d{2}\) 9 \d{4}-\d{4}$/)
}).required();

const formatacaoDataNascimento = (dataNascimento: Date) => {
    const dia = dataNascimento.getDate();
    const mes = dataNascimento.getMonth() + 1;
    const ano = dataNascimento.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

watch(cpf, (valorAtual) => {
    cpf.value = valorAtual;
});

onMounted(() => {
    const wrapperInput = document.getElementsByClassName('dp__input_wrap')[0] as HTMLElement;
    const divMain = document.getElementsByClassName('dp__main')[0] as HTMLElement;

    wrapperInput.style.width = '220px';
    divMain.style.width = '220px';
    divMain.style.display = 'flex';
    divMain.style.flexDirection = 'column';
});

useSubmitForm(async (values) => {
    console.log(values);
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
                <Field class="input-login" v-maska="'###.###.###-##'" name="cpf" placeholder="Digite o número do CPF" />
                <ErrorMessage name="cpf"></ErrorMessage>
            </div>

            <div class="full-name-field">
                <label for="full-name">Nome completo:</label>
                <Field class="input-login" name="full-name" placeholder="Digite o nome completo" />
                <ErrorMessage name="full-name"></ErrorMessage>
            </div>

            <div class="email-field">
                <label for="email">Email:</label>
                <Field class="input-login" name="email" placeholder="Digite o e-mail" type="email" />
                <ErrorMessage name="email"></ErrorMessage>
            </div>

            <div class="celular-field">
                <label for="celular">Número do celular:</label>
                <Field class="input-login" v-maska="'(##) #####-####'" name="celular"
                    placeholder="Digite o número do celular" />
                <ErrorMessage name="celular"></ErrorMessage>
            </div>

            <div class="born-field">
                <label for="born-field">Data de nascimento:</label>
                <VueDatePicker v-model="dataNascimento" auto-apply  
                :format="formatacaoDataNascimento" 
                :enable-time-picker="false">
                    <template
                        #dp-input="{ value, onInput, onEnter, onTab, onClear, onBlur, onKeypress, onPaste, isMenuOpen }">
                        <input type="text" class="input-date" :value="value" placeholder="Informe a data" required/>
                    </template>
                    
                </VueDatePicker>

            </div>
        </form>

        <div class="start-buttons">
            <Button botaoTexto="Logar"></Button>
            <Button botaoTexto="Mais tarde" route-botao="/"></Button>
        </div>
    </VeeForm>
</template>

<style scoped>
form :where(.usuario-field, .cpf-field, .full-name-field, .born-field, .email-field),
.celular-field, .dp__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

span {
    align-self: center;
    color: red;
}

:where(.usuario-field, .cpf-field, .born-field, .full-name-field, .email-field, .celular-field) {
    align-items: baseline;
}

@media (max-width: 1920px) {
    label {
        margin-top: 1rem;
        width: 200px;
    }

    .input-login{
        width: 220px;
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

    .input-date{
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
        flex-wrap: wrap;
        justify-content: space-evenly;
        flex-direction: column;
        align-items: center;
        margin: 1rem 1rem 2rem 1rem;
    }

    .input-login:focus, .input-date:focus {
        outline: none;
        box-shadow: inset 0 1px 1px #42d392, 0 0 8px #42d392;
    }

    .input-login:hover, .input-date:hover {
        outline: none;
        border-color: #42d392;
        box-shadow: inset 0 0 4px #42d392, 0 0 5px #42d392;
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
