<script lang="ts" src="./scripts/loginForm.ts"></script>
<style scoped src="./styles/LoginForm.css"></style>

<template>
    <Form @submit="onSubmit" :validation-schema="schema">

        <Field class="usuario-field" name="login" placeholder="login" type="text" id="usuario-field" autocomplete="username"/>
        <ErrorMessage name="login"></ErrorMessage>

        <div class="password-input">
            <Field class="password-field" name="password" :type="showPassword ? 'text' : 'password'"
                placeholder="password" id="password-field" autocomplete="current-password"/>
            <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                <span v-if="showPassword">🙈</span>
                <span v-else>👁️</span>
            </button>
        </div>
        <ErrorMessage name="password"></ErrorMessage>

        <div class="start-buttons" id="start-buttons">
            <Button botaoTexto="Logar"></Button>
            <Button botaoTexto="Voltar" route-botao="/"></Button>
        </div>
    </Form>
</template>


