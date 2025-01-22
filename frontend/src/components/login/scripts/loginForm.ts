import Button from '../../commons/CustomButton.vue';
import { Field, ErrorMessage, Form } from './vee-validate-componentes';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import Swal from 'sweetalert2'

const LOGIN_ROUTE = import.meta.env.VITE_LOGIN_URL;
const showPassword = ref(false);
const router = useRouter();

const schema = yup.object({
    login: yup.string().required('O campo obrigatório'),
    password: yup.string().required('O campo obrigatório')
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
                document.cookie = `token=${resp.token};`;
                router.push({ path: '/conta-dashboard', query: { id: resp.id } });
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
    }).catch(error => {
        Swal.fire({
            title: 'Falha no processamento',
            text: `${error} 😭😭`,
            icon: 'error',
            iconColor: '#42d392',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#42d392',
        })
    });
}


export default defineComponent({
    components: {
        Button,
        Field,
        Form,
        ErrorMessage
    },
    setup() {
        return {
            showPassword,
            schema,
            togglePasswordVisibility,
            onSubmit
        };
    }
});