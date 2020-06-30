<template>
    <div class="container my-16 w-full h-12 mx-auto">
        <div class="max-w-xs mx-auto h-12">
            <h1 class="text-lg text-center text-gold">Register</h1>
            <div class="w-full bg-white shadow mt-5 rounded-sm p-8">
                <ValidationObserver ref="form">
                    <ValidationProvider name="Name" rules="required" v-slot="{errors}">
                        <text-input
                        name="name"
                        :value="model.name"
                        v-model="model.name"
                        placeholder="Enter Your Names"></text-input>
                        <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                    
                    <validation-provider  name="Email" rules="required|email" v-slot="{errors}">
                        <text-input
                        name="email"
                        :value="model.email"
                        v-model="model.email"
                        placeholder="Enter Your Email"></text-input>
                        <span>{{ errors[0] }}</span>
                    </validation-provider>

                    <validation-provider  name="Password" rules="required|min:6" v-slot="{errors}">
                        <text-input
                        name="password"
                        :value="model.password"
                        v-model="model.password"
                        placeholder="Enter Your Password"></text-input>
                        <span>{{ errors[0] }}</span>
                    </validation-provider>
                    
                    <button @click="register" class="w-full mt-3 py-3 bg-emerald text-white rounded-sm focus:outline-none hover:bg-emerald-light">Sing Up</button>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import {ValidationProvider, ValidationObserver, validate} from 'vee-validate';

export default {
    data: ()=>({
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
    register() {
      this.$refs.form.validate().then(isValid=>{
          if(!isValid){
              return;
          }
          alert("Valid!")
      });
    }
  }
}
</script>