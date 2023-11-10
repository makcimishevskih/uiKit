<script setup>
const emits = defineEmits(['update:checked', 'updateCheckedGroup'])

const { disabled, name, label, id, isGroup, checked, type } = defineProps({
  id: {
    type: String
  },
  name: {
    type: String
  },
  checked: {
    type: Boolean
  },
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isGroup: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'checkbox'
  }
})

const handleChange = (event) => {
  if (isGroup) {
    emits('updateCheckedGroup', { id, checked: event.target.checked })
  } else {
    emits("update:checked", event.target.checked)
  }
}
</script>

<!-- :value="value" -->
<template>
  <div class='input-block'>
    <input @change="handleChange" :checked="checked" :disabled="disabled" :name='name' :id="id" type="checkbox"
      :class='{ checkbox: type === "checkbox", switch: type === "switch" }' />
    <label class='label' :for="id">{{ label }}</label>
  </div>
</template>

<style scoped lang='scss'>
.input-block {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}

.checkbox {
  position: relative;
  width: 30px;
  height: 30px;

  margin-right: 10px;
  margin-bottom: 10px;

  -webkit-appearance: none;
  appearance: none;

  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 20%;
    width: 100%;
    height: 100%;

    border-radius: 4px;
    background-color: #e5e5e5;
  }

  &:checked {

    &::before {
      background-color: var(--primary);
    }

    &::after {
      content: '';

      position: absolute;
      top: 12px;
      left: 4px;
      transform: rotate(-45deg);
      height: 8px;
      width: 17px;

      border-bottom: 5px solid white;
      border-left: 5px solid white;
      border-radius: 2px;
    }

    &:disabled {

      pointer-events: none;
      opacity: 0.6;
    }
  }
}

.checkbox:disabled,
.checkbox:disabled+label {
  cursor: default;
  pointer-events: none;
  user-select: none;
}

.switch {
  position: relative;
  width: 80px;
  height: 40px;


  -webkit-appearance: none;
  appearance: none;

  background-color: #e5e5e5;
  border-radius: 30px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 10%;
    right: calc(95% - 30px);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--primary);
    transition: 0.2s ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    top: 30%;
    right: 10%;
    transform: rotate(-45deg);

    height: 8px;
    width: 17px;

    opacity: 0;
    transition: opacity 0.1s linear;

    border-bottom: 5px solid white;
    border-left: 5px solid white;
    border-radius: 2px;
  }

  &:checked {
    &::before {
      right: 5%;
    }

    &::after {
      opacity: 1;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.6;
    }
  }
}

.label {
  font-size: 20px;
  cursor: pointer;
  user-select: none;
}
</style>
