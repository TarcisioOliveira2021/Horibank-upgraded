import Form from '../LoginForm.vue';
import { defineComponent, onMounted, ref, watchEffect } from 'vue';

const isDark = ref(false);
const elements = ref<
    {
        inicio: HTMLElement | null;
        cardContainer: HTMLElement | null;
        text: HTMLElement | null;
        subtext: HTMLElement | null;
        usuarioInput: HTMLElement | null;
        passwordInput: HTMLElement | null;
        buttons: NodeListOf<HTMLButtonElement> | undefined;
    } | null>(null);



function getUiElements() {
    const inicio = document.getElementById('inicio');
    const cardContainer = document.getElementById('card-container');
    const text = document.getElementById('text');
    const subtext = document.getElementById('subtext');
    const usuarioInput = document.getElementById('usuario-field');
    const passwordInput = document.getElementById('password-field');
    const buttons = document.getElementById('start-buttons')?.querySelectorAll('button');

    return {
        inicio,
        cardContainer,
        text,
        subtext,
        usuarioInput,
        passwordInput,
        buttons
    };
}

function toogleTheme(elemento: HTMLElement | HTMLButtonElement, themeAdicionar: string, themeRemover: string) {
    elemento.classList.remove(themeRemover);
    elemento.classList.add(themeAdicionar);
}

function setTheme(elements: any) {
    if (isDark.value || window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem('isDark', 'true');

        toogleTheme(elements.inicio, 'inicio-dark', 'inicio');
        toogleTheme(elements.cardContainer, 'card-container-dark', 'card-container');
        toogleTheme(elements.text, 'text-dark', 'text');
        toogleTheme(elements.subtext, 'subtext-dark', 'subtext');
        elements.buttons?.forEach((button: HTMLButtonElement) => {
            toogleTheme(button, 'btn-dark', 'btn');
        });

    } else {
        toogleTheme(elements.inicio, 'inicio', 'inicio-dark');
        toogleTheme(elements.cardContainer, 'card-container', 'card-container-dark');
        toogleTheme(elements.text, 'text', 'text-dark');
        toogleTheme(elements.subtext, 'subtext', 'subtext-dark');
        elements.buttons?.forEach((button: HTMLButtonElement) => {
            toogleTheme(button, 'btn', 'btn-dark');
        });

    }
}

function getLocalStorageIsDark() {
    if (localStorage.getItem('isDark') === 'true') {
        isDark.value = true;
    } else {
        isDark.value = false;
    }
}

export default defineComponent({
    components: {
        Form
    },
    setup() {
        onMounted(() => {
            elements.value = getUiElements();
            getLocalStorageIsDark();

            if (elements.value) {
                setTheme(elements.value);
            }
        });

        watchEffect(() => {
            if (elements.value) {
                setTheme(elements.value);
            }
        });

        onload = (event) => {
            event.preventDefault();
            localStorage.clear();
        };

        return {
            isDark,
            elements
        };
    }
});