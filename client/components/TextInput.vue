<template>
    <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
    <div class="mb-3">
        <input 
        :type="type"
        :name="name"
        class="w-full focus:outline-none bg-brown-lightest p-3 text-brown" :placeholder="placeholder"
        :value="value"
        @input="$emit('input',$event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('input',$event.target.value)"
        >
        <span v-if="errors[0]" class="text-xs text-red-500">{{ errors[0] }}</span>
    </div>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
    props:{
        placeholder:{
            type: String,
            required: true
        },
        type:{
            type: String,
            required: false,
            default: 'text'
        },
        value: {
            type: String,
            required: false,
            default: ''
        },
        name: {
            type: String,
            required: true,
            default: ''
        },
        rules: {
            type: String,
            required: false,
        }
    },
    components: {
    ValidationProvider
  }
}
</script>