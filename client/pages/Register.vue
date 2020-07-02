<template>
    <div class="container my-16 w-full h-12 mx-auto">
        <div class="max-w-xs mx-auto h-12">
            <h1 class="text-lg text-center text-gold">Register</h1>
            <div class="w-full bg-white shadow mt-5 rounded-sm p-8">
                <ValidationObserver ref="form">
                    <text-input
                    name="Name"
                    rules="required"
                    :value="model.name"
                    v-model="model.name"
                    placeholder="Enter Your Names"></text-input>

                    <text-input
                    name="E-mail"
                    rules="required|email"
                    :value="model.email"
                    v-model="model.email"
                    placeholder="Enter Your Email"></text-input>

                    <text-input
                    name="Password"
                    rules="required|min:6"
                    :value="model.password"
                    v-model="model.password"
                    placeholder="Enter Your Password"></text-input>

                    <btn
                    label="Sign Up"
                    :disabled="loading"
                    :loading="loading"
                    @click="register"
                    />

                    <!-- <button @click="register" class="w-full mt-3 py-3 bg-emerald text-white rounded-sm focus:outline-none hover:bg-emerald-light">Sing Up</button> -->
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
// Importing form Validators
import {ValidationProvider, ValidationObserver, validate} from 'vee-validate';
// Importing client requests or client actions
import {POST_REGISTER} from '@client/store/auth/actions'

export default {
    data: ()=>({
        loading: false,
        model: {
            name:'',
            email:'',
            password:''
        }
    }),
    components: {
        ValidationProvider,
        ValidationObserver
    },
    methods: {
    register(){
      this.$refs.form.validate().then(isValid=>{
          if(!isValid){
              return;
          }
          // Change loading state
          this.toggleLoading();
          // An action returns a promise
        //   this.$store.dispatch(POST_REGISTER, this.model)
        //   .then(()=>{
        //       //alert("Finished!!!");
        //       this.toggleLoading();
        //       // Redirecting user to the home page
        //       this.$router.push('/');
        //   });
      });
    },
    toggleLoading(){
        this.loading = !this.loading;
    }
  }
}
</script>