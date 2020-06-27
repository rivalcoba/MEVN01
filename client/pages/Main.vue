<template>
    <div>
        <div class="h-2 w-full bg-gold-light"></div>
        <div class="w-full h-12 flex items-center justify-between px-6">
            <div class="text-gold">MEVN</div>
            <div>
                <router-link class="text-brown" to="/auth/login">Sing in</router-link>
                <router-link class="text-brown border-2 p-1 rounded-full border-brown ml-3" to="/auth/register">Register</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
