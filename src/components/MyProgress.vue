<script setup>

const { progressPercent, width, height, color } = defineProps({
  progressPercent: {
    type: Number,
    required: true
  },
  width: {
    type: String
  },
  height: {
    type: String,
    default: '40px'
  },
  color: {
    type: String,
    default: 'primary'
  }
})

</script>

<template>
  <div class='progress-container' :style='{ width, height }'>
    <span class='progress-text' :style='{
      color: `var(--${color})`
    }'>{{ progressPercent }}%</span>

    <div class=' progress-wrapper' :style='{
      backgroundColor: `var(--${color}-hover)`
    }'>
      <div class=' progress' :style='{ backgroundColor: `var(--${color})`, width: `${progressPercent}%` }'></div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.progress-container {
  width: 600px;
  text-align: center;
  margin-bottom: 20px;

  .progress-text {
    text-align: center;
    margin-bottom: 10px;
    display: inline-block;
  }

  .progress-wrapper {
    height: 20px;

    background-color: #e5e5e5;
    border-radius: 20px;
    overflow: hidden;

    .progress {
      height: 100%;
      // background-color: red;

      &.primary {
        background-color: var(--primary)
      }

      &.second {
        background-color: var(--second)
      }

      &.success {
        background-color: var(--success)
      }

      &.info {
        background-color: var(--info)
      }

      &.warning {
        background-color: var(--warning)
      }

      &.danger {
        background-color: var(--danger)
      }
    }
  }
}

// .progress .label {
//   cursor: pointer;
//   user-select: none;
// }
</style>
