<script setup>
import MyTHead from './MyTHead.vue'
import MyTBody from './MyTBody.vue'


const { columns, rows, headerColor, templateColumnsSizes } = defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
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
  <div class='table'>
    <my-t-head :columns='columns' :headerColor='headerColor' :templateColumnsSizes='templateColumnsSizes' />
    <my-t-body :rows='rows' :columns='columns' :templateColumnsSizes='templateColumnsSizes' />
  </div>
</template>

<style scoped lang='scss'>
.table {
  margin-bottom: 20px;
}
</style>
