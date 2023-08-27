<script setup>
import { ref, onMounted } from "vue";
import data from "../assets/data.json";
import CountryCard from "./CountryCard.vue";

defineProps({
  msg: String,
});

const count = ref(0);

onMounted(() => {
  console.log("data: ", data[0]);
});
</script>

<template>
  <div class="country-list">
    <div class="grid-container">
      <div v-for="(item, index) in data" :key="index" class="grid-item">
        <CountryCard :parent-msg="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.country-list {
  padding: 10px;
  background-color: #f0f0f0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3.75rem;
  justify-content: center;
}
.grid-item {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
}

.read-the-docs {
  color: #888;
}
</style>
