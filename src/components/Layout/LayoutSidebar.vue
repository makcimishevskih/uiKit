<script setup>
import { reactive } from 'vue';

const emits = defineEmits(['toggleSidebar'])
const { isOpen } = defineProps({ isOpen: Boolean })

const routesToComponent = reactive([
  {
    path: '/typography',
    name: 'Typography',
  },
  {
    path: '/button',
    name: 'Button',
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
  },
  {
    path: '/radio',
    name: 'Radio',
  },
  {
    path: '/progress',
    name: 'Progress',
  },
  {
    path: '/input',
    name: 'Input',
  },
  {
    path: '/tabs',
    name: 'Tabs',
  },
])

</script>
<template>
  <div @click='emits("toggleSidebar")' class='sidebar-toggler'>
    <span class='sidebar-btn' :class='{ collapsed: isOpen }'>
      &#5130;
    </span>
  </div>
  <div class='sidebar' :class='{ collapsed: isOpen }'>
    <ul class='sidebar-list'>
      <li class='sidebar-item heading-2' v-for='route in routesToComponent' :key='route.name'>
        <router-link class='sidebar-link' :to='route.path'>
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>
@import '@/styles/global.scss';

.sidebar {
  position: fixed;
  left: 0;
  top: 70px;

  height: 100%;
  width: 250px;

  padding: 0px 20px;

  background-color: #fff;
  box-shadow: $box-shadow;

  transition: all 0.2s;
  transform: translateX(0px);

  &-link {
    display: block;
    border-radius: 12px;
    border: 2px solid #fff;
    transition: 0.2s;
    font-weight: bold;
    margin-bottom: 10px;

    &:hover {
      color: var(--primary);
      color: black;
    }
  }

  &.collapsed {
    transform: translateX(-250px);
  }

  &-btn {
    transition: all 0.2s;
    user-select: none;

    &.collapsed {
      transform: rotate(180deg);
    }
  }


  &-toggler {
    position: fixed;
    left: 0;
    top: 70px;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 15px;
    height: 100%;

    background-color: var(--primary);
    color: #fff;
    cursor: pointer;
  }
}
</style>
