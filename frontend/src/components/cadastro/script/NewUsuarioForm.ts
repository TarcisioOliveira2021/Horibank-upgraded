import Button from '../../commons/CustomButton.vue';
import * as yup from 'yup';
import Swal, { type SweetAlertIcon, type SweetAlertOptions, type SweetAlertPosition } from 'sweetalert2';
import { Form, Field, ErrorMessage } from '../../login/scripts/vee-validate-componentes';
import { ref, watch, onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

let dataNascimentoFormatada = '';

const CADASTRAR_ROUTE = import.meta.env.VITE_CADASTRAR_URL;

const schema = yup.object({
    nuCPF: yup.string().required('O campo obrigatório'),
    usuario: yup.string().min(6, 'O campo deve ter no mínimo 6 caracteres').max(12, 'O campo deve ter no máximo 12 caracteres').required('O campo obrigatório'),
    nome_completo: yup.string().required('O campo obrigatório'),
    email: yup.string().email().required('O campo obrigatório'),
    numero_celular: yup.string().required('O campo obrigatório').matches(/^\(\d{2}\) 9 \d{4}-\d{4}$/),
    senha: yup.string().min(8, 'O campo deve ter no mínimo 8 caracteres').max(16, 'O campo deve ter no máximo 16 caracteres').required('O campo obrigatório').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial')
});

const formatacaoDataNascimento = (dataNascimento: Date) => {
    const dia = dataNascimento.getDate();
    const mes = dataNascimento.getMonth() + 1;
    const ano = dataNascimento.getFullYear();

    dataNascimentoFormatada = `${mes}/${dia}/${ano}`;
    return `${dia}/${mes}/${ano}`;
}

function mostrarSweetAlert(title:string, text:string, icon:SweetAlertIcon, confirmButtonText:string, cancelButtonText?:string, width?:string){
    if(!cancelButtonText){
        Swal.fire({
            title: `${title}`,
            text: `${text}`,
            icon: `${icon}`,
            iconColor: '#42d392',
            showConfirmButton: true,
            confirmButtonText: `${confirmButtonText}`,
            confirmButtonColor: '#42d392',
            width: `${width}`,
            position: 'center',
        });    
    }else{
        Swal.fire({
            title: `${title}`,
            text: `${text}`,
            icon: `${icon}`,
            iconColor: '#42d392',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: `${confirmButtonText}`,
            confirmButtonColor: '#42d392',
            cancelButtonText: `${cancelButtonText}`,
            cancelButtonColor: '#42d392',
        });
    }
}

function validarDataNascimento(dataNascimento: string) {
    const dataAtual = new Date();
    const dataNascimentoInformadaFormatada = new Date(dataNascimento);
    const diferencaAnos = dataAtual.getFullYear() - dataNascimentoInformadaFormatada.getFullYear();

    if (diferencaAnos < 18) {
        mostrarSweetAlert('Data de nascimento inválida', 'Você deve ter mais de 18 anos para se cadastrar 😭😭', 'error', 'Ok');
        return false;
    }

    return true;
}

function validarCPF(nuCPF: string) {
    const cpf = nuCPF.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
        return false;

    const cpfDigits = cpf.split("").map((el) => +el);
    const rest = (count: number): number => {
        return (((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10);
    };

    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
}

function validarSenha(senha: string, usuario: string) {
    if (senha.match(usuario)) {
        mostrarSweetAlert('Senha inválida', 'A senha não pode ser igual ao nome de usuário 😭😭', 'error', 'Ok');
        return false;
    }

    return true;
}

export default defineComponent({
    components: {
        Button,
        Form,
        Field,
        ErrorMessage
    },
    setup() {
        const nuCPF = ref('');
        const dataNascimento = ref('');
        const showPassword = ref(false);
        const router = useRouter();


        watch(nuCPF, (valorAtual) => {
            nuCPF.value = valorAtual;
        });

        onMounted(() => {
            //Personalinzação do datepicker
            const wrapperInput = document.getElementsByClassName('dp__input_wrap')[0] as HTMLElement;
            const divMain = document.getElementsByClassName('dp__main')[0] as HTMLElement;
            wrapperInput.style.width = '220px';
            divMain.style.width = '220px';
            divMain.style.display = 'flex';
            divMain.style.flexDirection = 'column';
        });

        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        function onSubmitForm(inputValues: any) {
            if (validarDataNascimento(dataNascimentoFormatada) && validarSenha(inputValues.senha, inputValues.usuario)) {
                inputValues.dataNascimento = dataNascimentoFormatada;

                fetch(CADASTRAR_ROUTE, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inputValues)
                }).then(response => {
                    if (response.ok) {
                        response.json().then(resp => {
                            Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.onmouseenter = Swal.stopTimer;
                                    toast.onmouseleave = Swal.resumeTimer;
                                }
                            }).fire({
                                title: `${resp.message}`,
                                text: 'Logado com sucesso, redirecionando...',
                                icon: 'success',
                                iconColor: '#42d392',
                            }).then(() => {
                                router.push('/acessar-conta');
                            });
                        });
                    } else {
                        response.json().then(resp => {
                            mostrarSweetAlert('Falha no processamento', `${resp.message} 😭😭`, 'error', 'Ok');
                        });
                    }
                }).catch((error) => {
                    const screenWidth = window.innerWidth;

                    if (screenWidth <= 375) {
                        mostrarSweetAlert('Falha no processamento da solicitação', `${error.message} 😭😭`, 'error', 'Ok', undefined,'300px');
                    }
                });
            }
        }
        return {
            nuCPF,
            dataNascimento,
            showPassword,
            togglePasswordVisibility,
            formatacaoDataNascimento,
            onSubmitForm,
            schema
        }
    }
});


