// Importando Vue
import Vue from 'vue';

// Importando los estilos
import './styles/main.css';

// Importando las rutas para el Router de Vue
import router from './routes';

// Importando el Router de Vue
import Router from 'vue-router';

// Importing the main component
import Main from './pages/Main.vue';

// Importing custom component
import TextInput from '@components/TextInput.vue'

// Registrando el Router en Vue
// Registra modulos como "router-link"
// y "raouter-vue" entro otros
Vue.use(Router);

// Registering custom components
Vue.component('text-input', TextInput);

// Creating a new vue instance
const app = new Vue({
    el: '#app',
    router,
    render: h=>h(Main)
});