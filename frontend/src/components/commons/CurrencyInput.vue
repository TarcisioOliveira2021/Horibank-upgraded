<template>
    <input
      ref="inputRef"
      type="text"
      class="field"
    />
  </template>
  
  <script>
  import { useCurrencyInput } from 'vue-currency-input'
  
  export default {
    name: 'CurrencyInput',
    props: {
      modelValue: Number, // Vue 2: value
      options: Object
    },
    setup(props) {
      const { inputRef } = useCurrencyInput(props.options)
  
      return { inputRef }
    }
  }
  </script>

<style scoped>
    .field{
        width: auto;
        height: 30px;
        padding: 10px !important;
        border-radius: 10px !important;
        margin: 0rem 0rem 0rem 0rem !important;
        border: 1px solid #42d392; 
        transition: 0.5s;
        cursor: pointer;
        background-color: white !important;
    }

    .field:focus{
        outline: none;
        box-shadow: inset 0 1px 1px #42d392, 0 0 8px #42d392;
    }

    .field:hover{
        outline: none;
        border-color: #42d392;
        box-shadow: inset 0 0 4px #42d392, 0 0 5px #42d392;
    }
</style>