<template>
    <input 
    type="text"
    class="w-full focus:outline-none bg-brown-lightest p-3 text-brown px-2 mb-3" :placeholder="placeholder"
    @input="$emit('input',$event.target.value)"
    :value="value"
    >
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
        }
    }
}
</script>