<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  gap: {
    type: String,
    default: "10px"
  },
  isRounded: {
    type: Boolean,
    default: true
  },
  selectedTab: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['updateSelectedTab'])

const handleTabs = (value) => {
  emit('updateSelectedTab', value)
}

const tabsBorderColor = (tabValue) => ({
  borderColor: tabValue === props.selectedTab ? `var(--${props.color})` : `var(--${props.color}-hover)`,
})
</script>

<template>
  <div class='tabs'>
    <ul class='tabs-list' :style='{ gap }'>
      <li v-for='tab in tabs' :key='tab.value' class='tabs-item' :style='tabsBorderColor(tab.value)'
        @click='handleTabs(tab.value)' @mouseover="isHover = true" @mouseleave="isHover = false" :class='{
          rounded: isRounded
        }'>
        {{ tab.value }}
      </li>
    </ul>

    <div class=' tabs-content'>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.tabs {
  &-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;

    border: 4px solid transparent;
    min-width: 80px;
    height: 40px;

    cursor: pointer;
    user-select: none;

    &.rounded {
      border-radius: 8px;
    }

    &:hover {
      color: #fff;
      background-color: var(--success-hover);
    }
  }

  &-content {
    margin-top: 20px;
  }
}
</style>
