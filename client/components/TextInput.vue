<template>
    <div class="mb-3">
        <input 
        type="text"
        :name="name"
        class="w-full focus:outline-none bg-brown-lightest p-3 text-brown px-2" :placeholder="placeholder"
        :value="value"
        @input="$emit('input',$event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('input',$event.target.value)"
        >
        <span v-if="error" class="text-red-500">{{error}}</span>
    </div>
</template>

<script>
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
        error: {
            type: String,
            required: false,
        }
    }
}
</script>