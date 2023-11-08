<script setup>

const { progressPercent, size, color } = defineProps({
  progressPercent: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    default: '60'
  },
  color: {
    type: String,
    default: 'primary'
  },
})


</script>

<template>
  <div class='progress-circle'>
    <span class='progress-circle-percent' :style='{ color: `var(--${color})` }'>
      {{ progressPercent }}
    </span>

    <svg width='120' height='120' viewBox='0 0 120 120' class='progress-circle-svg'>

      <circle :cx='size' :cy='size' r='54' fill='none' stroke-width='12' :stroke='`var(--${color}-hover)`' />

      <circle class='progress-circle-line' :style='{ "stroke-dashoffset": `calc(100 - ${progressPercent})` }' :cx='size'
        :cy='size' r='54' fill='none' stroke-width='12' pathLength='100' :stroke='`var(--${color})`' />

    </svg>
  </div>
</template>

<style scoped lang='scss'>
.progress-circle {
  position: relative;
  margin-bottom: 30px;
  width: 120px;
  height: 120px;
}

.progress-circle-svg {
  transform: rotate(-90deg);
}

.progress-circle-percent {
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-size: 18px;
  font-weight: 600;
}

.progress-circle-line {
  stroke-dasharray: 100;
  transition: 0.5s;
}
</style>
