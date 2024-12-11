import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from './components/login/LoginScreen.vue';
import ContaDash from './components/conta/ContaDash.vue';
import NewUsuario from './components/cadastro/NewUsuarioScreen.vue';
import Index from './components/home/Index.vue';
const routes = [
  { path: '/cadastrar-pessoa', component: NewUsuario},
  { path: '/acessar-conta', component: LoginScreen },
  { path: '/', component: Index }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };