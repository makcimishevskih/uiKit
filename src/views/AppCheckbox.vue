<script setup>
import { reactive, ref } from 'vue';
import MyCheckbox from '@/components/MyCheckbox';
import MyCheckboxGroup from '@/components/MyCheckboxGroup';

const checked1 = ref(true);
const checked2 = ref(false);

const checked3 = ref(true);

const switch1 = ref(false);
const switch2 = ref(true);


const inputs = reactive([
  { name: 'c1', value: 'First', id: 'One', label: 'first input' },
  { name: 'c2', value: 'Second', id: 'Two', label: 'second input' },
  { name: 'c3', value: 'Third', id: 'Three', label: 'third input' }
]);

const values = ref(['One'])

</script>

<template>
  <h1 class='heading-1'>Checkbox</h1>
  <h2 class='heading-2'>Base</h2>
  <div class='block'>
    <my-checkbox v-model:checked='checked1' name='base' :disabled='false' label='Checkbox active' id='base-checked' />
  </div>
  <h2 class='heading-2'>Disabled</h2>
  <div class='block'>
    <my-checkbox name='disabled1' v-model:checked='checked2' :disabled='true' label='Checkbox 
    disabled' id='disabled-not-checked' />
    <my-checkbox v-model:checked='checked3' name='disabled2' :disabled='true' label='Checkbox 
    disabled active' id='disabled-checked' />
  </div>
  <h2 class='heading-2'>Checkbox Group</h2>
  <div class='heading-3'>Group: {{ values }}</div>
  <div>
    <my-checkbox-group v-model:valuesGroup='values' :options='inputs' />
  </div>
  <h2 class='heading-2'>Switcher</h2>
  <div>
    <my-checkbox v-model:checked='switch1' type='switch' name='switch' id='switch' label='Click to switch' />
  </div>
  <div>
    <my-checkbox v-model:checked='switch2' type='switch' name='switch' id='switch' :disabled='true' />
  </div>
</template>

<style scoped>
input {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.block {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
