<script setup>
import { RouterView } from 'vue-router'

import LayoutHeader from '@/components/Layout/LayoutHeader.vue';
import LayoutSidebar from '@/components/Layout/LayoutSidebar.vue';

import { ref } from 'vue';

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = isOpen.value ? false : true
}
</script>

<template>
  <div class='container'>
    <layout-header />
    <layout-sidebar :isOpen='isOpen' @toggleSidebar='toggleSidebar' />
    <main class='content' :class="{ 'content_full': isOpen }">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang='scss'>
.app {
  font-family: Helvetiva, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content {
  max-width: 1400px;
  margin-left: 250px;
  padding: 30px;

  transition: all 0.2s;

  &_full {
    margin-left: 0;
  }
}

@media screen and (max-width: 1023px) {
  .content {
    margin-left: 0;
  }
}
</style>
