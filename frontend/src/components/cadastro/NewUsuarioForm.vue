<script lang="ts" src="./script/NewUsuarioForm.ts"></script>
<style scoped src="./style/NewUsuarioForm.css"></style>

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
                <Field class="input-login" v-maska="'(##) 9 ####-####'" name="numero_celular"
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

