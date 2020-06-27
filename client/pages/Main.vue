<template>
    <div>
        <div class="h-2 w-full bg-gold-light"></div>
        <div class="w-full h-12 flex items-center justify-between px-6">
            <router-link  to="/" class="text-gold">MEVN</router-link>
            <div>
                <router-link class="text-brown" to="/auth/login">Sing in</router-link>
                <router-link class="text-brown border-2 px-3 py-2 hover:text-brown-darkest rounded-full border-brown ml-3 hover:border-brown-darkest" to="/auth/register">Register</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
