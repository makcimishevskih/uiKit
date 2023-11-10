<script setup>
const emits = defineEmits(['update:radioValue'])

const { disabled, name, label, id, radioValue } = defineProps({
  id: {
    type: String
  },
  radioValue: {
    type: String
  },
  name: {
    type: String
  },
  value: {
    type: String,
  },
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'checkbox'
  }
})

const handleChange = (event) => {
  emits("update:radioValue", event.target.value)
}
</script>

<template>
  <div class='line'>
    <input type='radio' :id='id' :name='name' @change='handleChange' :disabled='disabled' :checked='radioValue === id'
      :value='value' class='radio' />
    <label :for="id" class='heading-2 label'>{{ label }}</label>
  </div>
</template>

<style scoped lang='scss'>
.line {
  display: flex;
  align-items: center;
  gap: 10px;
}

.radio {
  position: relative;
  width: 50px;
  height: 50px;

  -webkit-appearance: none;
  appearance: none;

  border-radius: 50%;
  cursor: pointer;
  background-color: #e5e5e5;

  &:disabled {
    opacity: 0.6;
  }

  &::before {
    content: '';
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: 10px solid var(--primary);
    height: 20px;
    width: 20px;
    opacity: 0;
    transition: opacity 0.1s linear;
  }

  &:checked {
    &::before {
      opacity: 1;
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.6;
    }
  }
}

.radio:disabled,
.radio:disabled+label {
  cursor: default;
  pointer-events: none;
  user-select: none;
}


.label {
  cursor: pointer;
  user-select: none;
}
</style>
