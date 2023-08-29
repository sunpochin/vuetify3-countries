<script setup>
import { onMounted } from "vue";
import data from "../assets/data.json";
import CountryCard from "./CountryCard.vue";
import { useCounterStore } from "@/store/app.js";

const counterStore = useCounterStore();

defineProps({
  msg: String,
});

onMounted(() => {
  counterStore.countryData = data;
  console.log("counterStore.countryData: ", counterStore.countryData[0]);
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
  padding: 100px;
  /* margin: 100px; */
  background-color: #f0f0f0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 265px));

  grid-gap: 3.75rem;
  justify-content: center;
}
.grid-item {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
}
</style>
