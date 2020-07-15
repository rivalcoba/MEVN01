// Importando el Router
import Router from 'vue-router';

// Importando la pagina de vue
import Login from '@pages/Login.vue';
import Register from '@pages/Register.vue';
import Home from '@pages/Home.vue';
import ForgotPassword from '@pages/ForgotPassword.vue'
import ResetPassword from '@pages/ResetPassword.vue'

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/auth/login',
            component: Login,
        },
        {
            path: '/auth/register',
            component: Register,
        },
        {
            path: '/',
            component: Home,
        },
        {
            path: '/auth/passwords/email',
            component: ForgotPassword
        },
        {
            path: '/auth/passwords/reset/:token',
            component: ResetPassword
        }
    ],
});
