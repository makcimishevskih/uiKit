<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class='header'>
    <nav>
      <router-link to='/'>
        Home
      </router-link>
    </nav>
  </header>
</template>

<style scoped lang='scss'>
@import '@/styles/global.scss';

.header {
  position: relative;
  top: 0;
  width: 100%;
  z-index: 1;

  display: flex;
  align-items: center;

  height: 70px;
  padding: 0 20px;

  background-color: #fff;
  font-weight: 600;

  box-shadow: $box-shadow;
}
</style>
