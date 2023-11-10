<script setup>
import { inject } from 'vue';

const { changeSortField, sortType, sortField } = inject('thead');


const { columns, headerColor, templateColumnsSizes } = defineProps({
  columns: {
    type: Array,
    required: true
  },
  headerColor: {
    type: String,
    default: 'success'
  },
  templateColumnsSizes: {
    type: String,
    default: 'repeat(auto-fit, minmax(100px, auto))'
  }
})
</script>

<template>
  <div class='thead' :style='{ "grid-template-columns": templateColumnsSizes }'>
    <div v-for='col in columns' :key='col.id' class='thead-col' @click='changeSortField(col.label)'
      :style='{ backgroundColor: `var(--${headerColor})` }' :class='{ isSorted: col.isSorted }'>
      <span class='label'>{{ col.label }}</span>

      <svg v-if='col.isSorted' class='sort-img' fill="#000000"
        :transform="sortType === 'desc' && sortField === col.label ? 'rotate(180)' : undefined" height="20px" width="20px"
        version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 330 330" xml:space="preserve">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path id="XMLID_224_"
            d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z">
          </path>
        </g>
      </svg>


    </div>
  </div>
</template>

<style scoped lang='scss'>
.thead {
  display: grid;
  gap: 2px;

  .thead-col {
    position: relative;

    padding: 10px 15px;
    margin-bottom: 8px;

    font-size: 18px;
    font-weight: bold;
    background: #d8d8d8;
    user-select: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    &.isSorted {
      cursor: pointer;

      .sort-img {
        position: absolute;
        top: 25%;
        right: 20px;
        width: 20px;
        height: 20px;
      }
    }

    &:first-child {
      border-top-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
    }
  }

}
</style>
