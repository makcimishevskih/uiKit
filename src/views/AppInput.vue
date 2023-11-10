<script setup>
import { computed, ref } from 'vue';
import { helpers, minLength, email, sameAs, numeric, required, minValue, maxValue } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import MyInput from '@/components/MyInput';
import MyButton from '@/components/MyButton';

const nameField = ref('')
const emailField = ref('')
const luckyNumberField = ref('')
const passwordField = ref('')
const confirmPasswordField = ref('')
const textareaField = ref('')

const rules = computed(() => ({
  nameField: {
    minLength: minLength(3),
  },
  emailField: {
    email
  },
  luckyNumberField: {
    numeric,
    minValue: minValue(0),
    maxValue: maxValue(100),
  },
  passwordField: {
    required,
    minLength: minLength(6),
    valid: helpers.withMessage('Dont have something', passwordValidate)
  },
  confirmPasswordField: {
    required,
    sameAsPassword: sameAs(passwordField)
  },
  textareaField: {
    mustBeFrontEnd: helpers.withMessage('Dont have frontent string', mustBeFrontEnd)
  }
}))

const mustBeFrontEnd = (value) => value.toLowerCase().includes('FrontEnd'.toLowerCase())

const passwordValidate = (value) => {
  const containsUppercase = /[A-Z]/.test(value)
  const containsLowercase = /[a-z]/.test(value)
  const containsNumber = /[0-9]/.test(value)
  const containsSpecial = /[#?!@$%^&*-]/.test(value)
  return value && containsUppercase && containsLowercase && containsNumber && containsSpecial
}

const handleSubmit = () => {
  v.value.$touch() // тронуть все поля формы если пустая то выведет ошибки
  const isErrors = !!v.value.$error
  if (isErrors) {
    console.log('NOT OK')
    throw new Error(`${v.value.$error}`)
  }
  console.log('ALL IS OK')
}

const v = useVuelidate(rules, { nameField, emailField, passwordField, confirmPasswordField, luckyNumberField, textareaField })
</script>

<template>
  <h1 class='heading-1'>Inputs</h1>

  <h2 class='heading-2'>Validation</h2>
  <p class='validation'>Text: {{ emailField }}</p>

  <form @submit.prevent='handleSubmit'>
    <my-input v-model:textValue='v.nameField.$model' placeholder='Type your name' label='Type name' name='name'
      :errors='v.nameField.$errors' />

    <my-input v-model:textValue='v.emailField.$model' type='email' placeholder='Type your email' label='Type email'
      name='email' :errors='v.emailField.$errors' />

    <my-input v-model:textValue='v.passwordField.$model' type='password' placeholder='Type your password'
      label='Type password' name='password' :errors='v.passwordField.$errors' />

    <my-input v-model:textValue='v.confirmPasswordField.$model' type='password' placeholder='Confirm your password'
      label='Confirm password' name='confirmPassword' :errors='v.confirmPasswordField.$errors' />

    <my-input v-model:textValue='v.luckyNumberField.$model' type='number' placeholder='Type your lucky number'
      label='Type number' name='number' :errors='v.luckyNumberField.$errors' />

    <my-input v-model:textValue='v.textareaField.$model' type='textarea' placeholder='Type some Frontend string'
      label='Type Frontend string' name='frontend string' :errors='v.textareaField.$errors' />

    <my-button>Send Form</my-button>
  </form>
</template>

<style lang='scss'>
.validation {
  margin-bottom: 20px;
}
</style>
