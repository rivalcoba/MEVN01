<template>
    <div class="container my-16 w-full h-12 mx-auto">
        <div class="max-w-xs mx-auto h-12">
            <h1 class="text-lg text-center text-gold">Reset Your Password</h1>
            
            <div class="w-full bg-white shadow mt-5 rounded-sm p-8">
                <ValidationObserver ref="form">

                    <text-input
                    type="password"
                    name="password"
                    rules="required|min:6"
                    :value="model.password"
                    v-model="model.password"
                    placeholder="Enter Your new Password"></text-input>

                    <btn
                    label="Reset Password!"
                    :disabled="loading"
                    :loading="loading"
                    @click="resetPassword"
                    />

                    <!-- <button @click="register" class="w-full mt-3 py-3 bg-emerald text-white rounded-sm focus:outline-none hover:bg-emerald-light">Sing Up</button> -->
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
// Importing mixins
import formMixin from '@client/mixins/form'
// Importing form Validators
import {ValidationProvider, ValidationObserver, validate} from 'vee-validate';
// Importing client requests or client actions
import {POST_RESET_PASSWORD} from '@client/store/auth/actions'

export default {
    mixins: [formMixin],
    data: ()=>({
        model: {
            password:''
        }
    }),
    components: {
        ValidationProvider,
        ValidationObserver
    },
    methods: {
    resetPassword(){
      this.$refs.form.validate().then(isValid=>{
          if(!isValid){
              return;
          }
          // Change loading state
          this.toggleLoading();
          // An action returns a promise
          this.$store.dispatch(POST_RESET_PASSWORD, {
              ...this.model,
              token: this.$route.params.token
          })
          .then(response=>{
              //alert("Finished!!!");
              this.toggleLoading();
              
              // Using mixin to set Auth
              this.$route.push('/')         
          })
          .catch(error => {
              this.toggleLoading()
              let backendErrors = {};
              //console.log(">" + Object.keys(error.response.data))
              Object.keys(error.response.data).forEach(field => {
                  // Adding errors from the backend to the observer
                  backendErrors[field] = [error.response.data[field]]
              })
              //console.log("> " + Object.keys(backendErrors))
              this.$refs.form.setErrors(backendErrors)
          });
      });
    }
  }
}
</script>