// Importando Vue
import Vue from 'vue';

// Importando los estilos
import './styles/main.css';

// Importando las rutas para el Router de Vue
import router from './routes';

// Importando el Router de Vue
import Router from 'vue-router';

// Importing the main componen
import Main from './pages/Main.vue';

// Registrando el Router en Vue
// Registra modulos como "router-link"
// y "raouter-vue" entro otros
Vue.use(Router);

// Creating a new vue instance
const app = new Vue({
    el: '#app',
    router,
    render: h=>h(Main)
});