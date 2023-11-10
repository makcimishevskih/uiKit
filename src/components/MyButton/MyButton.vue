<script setup>
import { computed } from 'vue'

const emit = defineEmits(['onClick']);

const { color, isRounded, isDisabled, isOutlined, icon, size } = defineProps({
  isRounded: {
    type: Boolean,
    default: false,
    required: false
  },
  isDisabled: {
    type: Boolean,
    default: false,
    required: false
  },
  isOutlined: {
    type: Boolean,
    default: false,
    required: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  icon: {
    type: String,
    required: false
  },
  size: {
    type: String,
    default: ""
  }
})

const btnClass = computed(() => ({
  btn: true,
  'btn_large': size,
  [`btn_${color}`]: true,
  'btn_rounded': isRounded,
  'btn_disabled': isDisabled,
  'btn_outlined': isOutlined,
  'btn_icon': icon,
}))
</script>

<template>
  <button @click='emit("onClick")' :class='btnClass' :disabled='isDisabled'>

    <span v-if='icon'>
      <font-awesome-icon :icon="`fa-regular fa-${icon}`" />
    </span>
    <span v-else>
      <slot>Click me</slot>
    </span>
  </button>
</template>

<style scoped lang='scss'>
.btn {
  height: 40px;

  margin: 0 10px 10px 0;
  padding: 0 20px;


  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  color: #fff;
  text-transform: uppercase;

  &_large {
    height: 50px;
    padding: 0 30px;

  }

  &_primary {
    background-color: var(--primary);
    border: 1px solid var(--primary);

    &:enabled:hover {
      background-color: var(--primary-hover);
    }
  }

  &_second {
    background-color: var(--second);
    border: 1px solid var(--second);

    &:enabled:hover {
      background-color: var(--second-hover);
    }
  }

  &_info {
    background-color: var(--info);
    border: 1px solid var(--info);

    &:enabled:hover {
      background-color: var(--info-hover);
    }
  }

  &_warning {
    background-color: var(--warning);
    border: 1px solid var(--warning);

    &:enabled:hover {
      background-color: var(--warning-hover);
    }
  }

  &_danger {
    background-color: var(--danger);
    border: 1px solid var(--danger);

    &:enabled:hover {
      background-color: var(--danger-hover);
    }
  }

  &_success {
    background-color: var(--success);
    border: 1px solid var(--success);

    &:enabled:hover {
      background-color: var(--success-hover);
    }
  }

  &_outlined {
    background-color: transparent;
    color: #000;

    &:hover {
      color: #fff
    }
  }

  &_rounded {
    border-radius: 20px;
  }

  &_disabled {
    opacity: 0.6;
    cursor: default;
  }

  &_icon {
    padding: 0;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }



}
</style>
