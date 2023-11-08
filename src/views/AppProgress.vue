<script setup>
import { onUnmounted, onUpdated, ref } from 'vue';
import MyProgress from '../components/MyProgress.vue';
import MyCircle from '../components/MyCircle.vue';
import MyButton from '../components/MyButton.vue';

const progressPercent = ref(60)
const circlePercent = ref(60)

let progressId = ref(null);
let circleId = ref(null);

const handleAddPercent = (type) => {
  if (type === 'progressbar') {
    if (progressId.value) {
      clearInterval(progressId.value)
      progressId.value = null
    } else {
      progressId.value = setInterval(() => {
        progressPercent.value += 5
      }, 1000)
    }
  } else {
    if (circleId.value) {
      clearInterval(circleId.value)
      circleId.value = null
    } else {
      circleId.value = setInterval(() => {
        circlePercent.value += 5
      }, 1000)
    }
  }
}
const handleResetPercent = (type) => {
  if (type === 'progressbar') {
    progressPercent.value = 0
  } else {
    circlePercent.value = 0

  }
}

onUpdated(() => {
  if (progressId.value && progressPercent.value === 100) {
    clearInterval(progressId.value)
    progressId.value = null
  }
  if (circleId.value && circlePercent.value === 100) {
    clearInterval(circleId.value)
    circleId.value = null
  }
})

onUnmounted(() => {
  clearInterval(progressId.value)
  clearInterval(circleId.value)
  progressId.value = null
  circleId.value = null
})

</script>

<template>
  <h1 class='heading-1'>
    Progress
  </h1>


  <h2 class='heading-2'>Progress Bar</h2>
  <div class='block'>
    <my-progress :progressPercent='progressPercent' width='400px' color='primary' />
    <my-progress :progressPercent='progressPercent' width='400px' color='second' />
    <my-progress :progressPercent='progressPercent' width='400px' color='success' />
    <my-progress :progressPercent='progressPercent' width='400px' color='info' />
    <my-progress :progressPercent='progressPercent' width='400px' color='warning' />
    <my-progress :progressPercent='progressPercent' width='400px' color='danger' />
    <my-button @click='handleAddPercent("progressbar")'>CLICK ME</my-button>
    <my-button @click='handleResetPercent("progressbar")'>RESET PERCENTAGE</my-button>
  </div>
  <h2 class='heading-2'>Circle Progress Bar</h2>
  <div class='block'>
    <div class='circles'>
      <my-circle :progressPercent='circlePercent' color='primary' />
      <my-circle :progressPercent='circlePercent' color='second' />
      <my-circle :progressPercent='circlePercent' color='success' />
      <my-circle :progressPercent='circlePercent' color='info' />
      <my-circle :progressPercent='circlePercent' color='warning' />
      <my-circle :progressPercent='circlePercent' color='danger' />
    </div>
    <my-button @click='handleAddPercent'>CLICK ME</my-button>
    <my-button @click='handleResetPercent'>RESET PERCENTAGE</my-button>
  </div>
</template>

<style lang='scss'>
.block {
  margin-bottom: 50px;
}

.circles {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
