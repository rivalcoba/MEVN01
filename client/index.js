// Importando Vue
import Vue from 'vue';

// Importando los estilos
import './styles/main.css';

// Importintg vuex store
import store from './store'

// Importando las rutas para el Router de Vue
import router from './routes';

// Importando el Router de Vue
import Router from 'vue-router';

// Importing the main component
import Main from './pages/Main.vue';

// Importing validator for extend rules
import validations from './validations'

// Importing custom component
import TextInput from '@components/TextInput.vue';
import Loader from '@components/Loader.vue';
import Button from '@components/Button.vue';

// Registrando el Router en Vue
// Registra modulos como "router-link"
// y "raouter-vue" entro otros
Vue.use(Router);

// Apply validations
validations.apply();

// Registering custom components
Vue.component('btn', Button);
Vue.component('loader', Loader);
Vue.component('text-input', TextInput);

// Creating a new vue instance
const app = new Vue({
    el: '#app',
    router,
    store,
    render: h=>h(Main)
});