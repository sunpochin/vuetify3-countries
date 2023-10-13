<script setup>
import { onMounted } from "vue";
import data from "../assets/data.json";
import CountryCard from "./CountryCard.vue";
import { useCounterStore } from "@/store/counter.js";
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
  <div>
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
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  justify-content: space-between;
  align-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-around;
    align-content: center;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    justify-content: space-around;
    align-content: center;
  }
}
.grid-item {
  border-radius: 20px;
}

</style>
