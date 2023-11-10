<script setup>
import { ref, reactive } from 'vue'
import MyRadio from '@/components/MyRadio'

const radioModel = ref('');
const radio1 = ref('');
const radioDisabled2 = ref('five');

const radioBtns = reactive([
  { name: 'one', value: 'one', id: 'one', label: 'one' },
  { name: 'two', value: 'two', id: 'two', label: 'two' },
  { name: 'three', value: 'three', id: 'three', label: 'three' },
])

</script>

<template>
  <h1 class='heading-1'>Radio Button</h1>

  <h2 class='heading-2'>
    Radio group: {{ radioModel ? radioModel : 'not picked' }}
  </h2>
  <div class='block'>

    <my-radio v-for='radio in radioBtns' v-model:radioValue='radioModel' :key='radio.id' :name='radio.name'
      :value='radio.value' :id='radio.id' :label='radio.label' />
  </div>

  <h2 class='heading-2'>Radio Disabled</h2>
  <my-radio name='two' v-model:radioValue='radio1' value='four' id='four' label='four' :disabled='true' />
  <my-radio name='three' v-model:radioValue='radioDisabled2' value='five' id='five' label='five' :disabled='true' />
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
