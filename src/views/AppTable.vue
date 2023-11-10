<script setup>
import { computed, provide, ref } from 'vue';
import MyTable from '@/components/MyTable'

const columns = ref([
  {
    id: 'col-1',
    label: 'id',
    isSorted: true
  },
  {
    id: 'col-2',
    label: 'name',
    isSorted: false
  },
  {
    id: 'col-3',
    label: 'surname',
    isSorted: true
  },
  {
    id: 'col-4',
    label: 'address',
    isSorted: false
  },
]);

const rows = ref([
  { id: 'id-5', name: "https://img.freepik.com/free-photo/a-picture-of-fireworks-with-a-road-in-the-background_1340-43363.jpg?w=360&t=st=1699564103~exp=1699564703~hmac=8fec01d0def2733ad7b15e4bd9076d88ca45c3916d128385a1237e7e9b778fe2", surname: 'ishe10', address: 'LoremLoremLoremLorem LoremLoremLor emvLoremLoremLorem LoremLoremLorem vLorem Lore mLoremLorem LoremLorem' },
  { id: 'id-6', name: 'max2', surname: 'ishe6', address: 'moscow2' },
  { id: 'id-1', name: 'max3', surname: 'ishe14', address: 'moscow3' },
  { id: 'id-2', name: 'max4', surname: 'ishe1', address: 'moscow4' }
])

const templateColumnsSizes = '100px 1fr 1fr 1fr'

const sortType = ref('asc');
const sortField = ref('id');

const sortedRows = computed(() => {
  if (sortType.value === 'asc') {
    return [...rows.value].sort((a, b) => compareStrWithNumber(a[sortField.value], b[sortField.value]))
  }
  return [...rows.value].sort((a, b) => compareStrWithNumber(b[sortField.value], a[sortField.value]))
})

function compareStrWithNumber (a, b) {
  return a.localeCompare(b, 'en', {
    numeric: true
  })
}

const changeSortField = (field) => {
  sortType.value = sortType.value === 'asc' ? 'desc' : 'asc';
  sortField.value = field
}

provide('thead', {
  sortType,
  sortField,
  changeSortField
});

</script>

<template>
  <h1 class='heading-1'>Tables</h1>
  <div class='heading-2'>sortField: {{ sortField }}</div>
  <div class='heading-2'>sortType: {{ sortType }}</div>
  <my-table :columns='columns' :rows='sortedRows' :sortType='sortType' :templateColumnsSizes='templateColumnsSizes' />
</template>

<style lang='scss'>
.red {
  color: red;
}
</style>
