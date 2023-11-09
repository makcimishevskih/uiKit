<script setup>
const { title, text, selectedTab, value } = defineProps({
  text: {
    type: String,
    required: true
  },
  selectedTab: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

</script>


<template>
  <div class='tab' v-show='value === selectedTab'>
    <header class='tab-title heading-2'>{{ title }}</header>
    <p class='tab-text'>{{ text }}</p>
  </div>
</template>

<style scoped lang='scss'>
.tab {
  min-height: 200px;

  border: 1px solid var(--success);
  border-radius: 8px;
  padding: 10px 20px;

  &-title {
    font-weight: 600;
  }

  &-text {
    text-indent: 20px;
    font-size: 20px;
  }
}
</style>
