<template>
    <h1 class="text-center my-16 text-brown font-bold text-2xl">
        Confirming email...
    </h1>
</template>
<script>
import {POST_CONFIRM_EMAIL} from '@store/auth/actions'

export default {
    mounted(){
        this.$store.dispatch(POST_CONFIRM_EMAIL, {
            token: this.$route.params.token
        }).then(response=>{
            this.setAuth(response.data)
        }).catch(()=>{
            // TODO: Flash a message to the user
            this.$router.push('/')
        })
    }
}
</script>