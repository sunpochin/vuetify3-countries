<script setup>
import { onMounted } from "vue";
import data from "../assets/data.json";
import CountryCard from "./CountryCard.vue";
import { useCounterStore } from "@/store/app.js";
const counterStore = useCounterStore();

onMounted(() => {
  counterStore.allCountryData = data;
  counterStore.filteredCountryData = data;
  console.log(
    "counterStore.filteredCountryData: ",
    counterStore.filteredCountryData[0],
  );
});
</script>

<template>
  <div class="country-list">
    <div class="grid-container">
      <div
        v-for="(item, index) in counterStore.filteredCountryData"
        :key="index"
        class="grid-item"
      >
        <CountryCard :parent-msg="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.country-list {
  background-color: #f0f0f0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 3.75rem;
  justify-content: space-between;
}
.grid-item {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
}
</style>
