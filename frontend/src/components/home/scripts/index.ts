import { onMounted, ref, watchEffect, watch, defineComponent } from 'vue';
import CardContent from '../CardContent.vue';
import Button from '../../commons/CustomButton.vue';

const isDark = ref(false);
const elemetns = ref<{
  inicio: HTMLElement | null;
  cardContainer: HTMLElement | null;
  grettingsTitle: HTMLElement | null;
  grettingsSubtitle: HTMLElement | null;
  cardContentTitle: HTMLElement | null;
  cards: NodeListOf<HTMLDivElement> | undefined;
  buttons: NodeListOf<HTMLButtonElement> | undefined;
} | null>(null);



function toogleTheme(elemento: HTMLElement | HTMLButtonElement, themeAdicionar: string, themeRemover: string) {
  elemento.classList.remove(themeRemover);
  elemento.classList.add(themeAdicionar);
}

function setTheme(elemetns: any) {
  if (isDark.value || window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true; //Redundante mas aplicavel caso o window.matchMedia seja dark para o toogle ficar selecionado.
    toogleTheme(elemetns.inicio, 'inicio-dark', 'inicio');
    toogleTheme(elemetns.cardContainer, 'card-container-dark', 'card-container');
    toogleTheme(elemetns.grettingsTitle, 'grettings-title-dark', 'grettings-title');
    toogleTheme(elemetns.grettingsSubtitle, 'grettings-subtitle-dark', 'grettings-subtitle');
    toogleTheme(elemetns.cardContentTitle, 'card-content-title-dark', 'card-content-title');


    elemetns.cards?.forEach((card: HTMLDivElement) => {
      toogleTheme(card, 'card-dark', 'card');
    });

    elemetns.buttons?.forEach((button: HTMLButtonElement) => {
      toogleTheme(button, 'btn-dark', 'btn');
    });

  } else {
    toogleTheme(elemetns.inicio, 'inicio', 'inicio-dark');
    toogleTheme(elemetns.cardContainer, 'card-container', 'card-container-dark');
    toogleTheme(elemetns.grettingsTitle, 'grettings-title', 'grettings-title-dark');
    toogleTheme(elemetns.grettingsSubtitle, 'grettings-subtitle', 'grettings-subtitle-dark');
    toogleTheme(elemetns.cardContentTitle, 'card-content-title', 'card-content-title-dark');

    elemetns.cards.forEach((card: HTMLDivElement) => {
      toogleTheme(card, 'card', 'card-dark');
    });

    elemetns.buttons?.forEach((button: HTMLButtonElement) => {
      toogleTheme(button, 'btn', 'btn-dark');
    });
  }
}

function getUiElements() {
  const inicio = document.getElementById('inicio');
  const cardContainer = document.getElementById('card-container');
  const grettingsTitle = document.getElementById('grettings-title');
  const grettingsSubtitle = document.getElementById('grettings-subtitle');
  const cardContentTitle = document.getElementById('card-content-title');

  const cards = document.getElementById('activities')?.querySelectorAll('div');
  const buttons = document.getElementById('start-buttons')?.querySelectorAll('button');

  return {
    inicio,
    cardContainer,
    grettingsTitle,
    grettingsSubtitle,
    cardContentTitle,
    cards,
    buttons
  };
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
    CardContent,
    Button
  },
  setup() {
    onMounted(() => {
      elemetns.value = getUiElements();
      getLocalStorageIsDark();
      if (elemetns.value) {
        setTheme(elemetns.value);
      }
    });

    watch(() => isDark.value, (value) => {
      localStorage.setItem('isDark', value.toString());
    });

    watchEffect(() => {
      if (elemetns.value) {
        setTheme(elemetns.value);
      }
    });

    onload = (event) => {
      event.preventDefault();
      isDark.value = false;
      localStorage.clear();
    };

    return {
      isDark,
      elemetns
    };
  }
});