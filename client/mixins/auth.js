// Importing client requests or client actions
import {SET_AUTH, UNSET_AUTH} from '@client/store/auth/actions'

export default{
    computed:{
        // check authentication
        auth(){
            return !!this.$store.state.auth.user
        },
        // Getting authenticated user
        user(){
            return this.$store.state.auth.user
        }
    },
    methods: {
        setAuth(payload){
            // Persist on local storage
            localStorage.setItem('auth', JSON.stringify(payload))
            // Commit auth succesfull
            this.$store.commit(SET_AUTH, payload)
            // Redirecting user to the home page
            this.$router.push('/');
            document.location.reload(true)
        },
        unsetAuth(){
            // Remove auth from browser
            localStorage.removeItem('auth')
            // Remove auth from store
            this.$store.commit(UNSET_AUTH)
            // Navigate to
            this.$router.push('/').catch(err=>{})
        }
    }
}