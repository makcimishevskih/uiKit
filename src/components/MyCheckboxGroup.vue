<script setup>
import MyCheckbox from "./MyCheckbox.vue";

const props = defineProps(["options", "valuesGroup"]);
const emit = defineEmits(["update:valuesGroup"]);

const updateCheckedGroup = ({ checked, id }) => {
  const updated = [...props.valuesGroup];

  if (checked) {
    updated.push(id);
  } else {
    updated.splice(updated.indexOf(id), 1);
  }
  emit("update:valuesGroup", updated);
};
</script>

<template>
  <my-checkbox v-for="o in options" :key="o.id" :checked="valuesGroup.includes(o.id)"
    @updateCheckedGroup="updateCheckedGroup" :id="o.id" :name="o.name" :isGroup='true' :label='o.id' />
</template>

<style scoped>
input {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
</style>
