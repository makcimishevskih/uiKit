<script setup>
const { columns, templateColumnsSizes, rows } = defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  templateColumnsSizes: {
    type: String,
    default: 'repeat(auto-fit, minmax(100px, auto))'
  }
})
</script>

<template>
  <div class='tbody'>
    <div v-for='row in rows' :key='row.id' :style='{ "grid-template-columns": templateColumnsSizes }' class='tbody-row'>
      <div v-for='({ label }, idx) in columns' :key='idx' class='tbody-cell'>
        <div class='tbody-img-wrapper' v-if='/http/ig.test(row[label])'>
          <img class='img' :src="row[label]" alt="url">
        </div>
        <div v-else>
          {{ row[label] }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.tbody {
  display: grid;
  gap: 2px;

  .tbody-img-wrapper {
    max-width: 70%;
    max-height: 50%;
    margin: 0 auto;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }


  .tbody-row {
    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(100px, auto));
    gap: 2px;

    &:nth-child(odd) {
      background: #f3f3f3;
    }

    .tbody-cell {
      padding: 10px 15px;
    }
  }
}
</style>
