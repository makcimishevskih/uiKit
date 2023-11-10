<script setup>
import MyTabs from '@/components/MyTabs'
import MyTab from '@/components/MyTab'
import { ref } from 'vue';

const tabBtns = ref([
  { value: 'first tab', },
  { value: 'second tab', },
  { value: 'third tab', },
  { value: 'fourth tab', }
])

const tabsContent = ref([
  { value: 'first tab', title: 'First tab title', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsum, eum hic, numquam ut enim incidunt, minima consequuntur maxime veritatis culpa expedita quaerat vero porro a aperiam quisquam est aut?' },
  { value: 'second tab', title: 'Second tab title', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsum, eum hic, numquam ut enim incidunt, minima consequuntur maxime veri' },
  { value: 'third tab', title: 'Third tab title', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsu' },
  { value: 'fourth tab', title: 'Fourth tab title', text: 'Numquam ut enim incidunt, minima consequuntur maxime veritatis culpa expedita quaerat vero porro a aperiam quisquam est aut?' },
])

const selectedTab = ref(tabBtns.value[1].value);

const changeTab = (value) => {
  if (value === selectedTab.value) return
  selectedTab.value = value
}

</script>

<template>
  <h1 class='heading-1'>Tabs</h1>
  <h2 class='heading-2'>Active tabs</h2>
  <my-tabs :selectedTab='selectedTab' @updateSelectedTab='changeTab' :tabs='tabBtns' color='success'>
    <my-tab v-for='( tab, idx ) in  tabsContent ' :key='idx' :selectedTab='selectedTab' :value='tab.value'
      :title='tab.title' :text='tab.text'>
    </my-tab>
  </my-tabs>
</template>

<style lang='scss'>
.red {
  color: red;
}
</style>
