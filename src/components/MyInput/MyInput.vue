<script setup>
import { ref } from 'vue'
const emit = defineEmits(['update:textValue'])

const { placeholder, type, id, errors, textValue, label, name } = defineProps({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text',
  },
  errors: {
    type: Array,
    required: false
  },
  width: {
    type: String,
    default: '300px'
  },
  label: {
    type: String,
    required: true
  },
  textValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String
  },
  borderColor: {
    type: String,
    default: 'primary',
  },
})

const isFocus = ref(false)

const handleInput = (event) => {
  emit('update:textValue', event.target.value)
}
const handleFocus = () => {
  isFocus.value = true
}
const handleBlur = () => {
  isFocus.value = false
}
</script>

<template>
  <div class='form-input' :style='{ width }'>
    <input class='input-text' :value:textValue='textValue' :style='{ border: `1px solid var(--${borderColor}-hover)` }'
      :class='{ "input-focus": isFocus }' @input='handleInput' @blur='handleBlur' @focus='handleFocus' :name='name'
      :type='type' :placeholder='placeholder' :id='id' />
    <span :class='{ "label-focus": isFocus }' class='label'>{{ label }}</span>
    <TransitionGroup name='error'>
      <div v-for='err in errors' :key='err.$uid' class='error' :class='{ "error-visible": errors.length }'>
        {{ err.$message }}</div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang='scss'>
.form-input {
  position: relative;
  margin-bottom: 24px;

  .input-text {
    width: 100%;
    height: 100%;
    height: 40px;

    padding: 0 12px;

    border-radius: 8px;
    background-color: transparent;

    &:focus {
      outline: 2px solid var(--primary) !important;
      border: none !important;

      &+.label {
        top: -22px;
        left: 4px;
        transform: scale(1);
        transition: all 0.2s ease-in-out;
      }
    }
  }

  .label {
    position: absolute;
    left: -10px;
    top: 50%;

    transform: scale(0);
    transition: all 0.1s ease-in-out;

    color: var(--primary);
    font-weight: 600;
    pointer-events: none;
  }
}

.error {
  margin-top: 5px;
  color: var(--danger);
  font-weight: 600;
  //   transform: scale(0) translateY(-30px);
  //   transition: all 1s ease-in-out;
}

//   &.error-visible {
//     transition: all 1s ease-in-out;
//   }
// }

.error-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.error-enter-to {
  transform: translateY(0px);
  opacity: 1;
}

.error-enter-active {
  transition: all 0.3s ease-in-out;
}
</style>
