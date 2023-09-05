<template>
  <div class="all-view">
    <v-text-field
      v-model.trim="searchText"
      variant="outlined"
      dense
      filled
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      class="pt-6 shrink expanding-search"
      :class="{ closed: searchBoxClosed && !searchText }"
      @focus="searchBoxClosed = false"
      @blur="searchBoxClosed = true"
      @input="text_change($event)"
      clearable
      @click:clear="searchText = ''"
    />
    <CountryList />
  </div>
</template>

<script setup>
import CountryList from "@/components/CountryList.vue";
import { ref, onMounted } from "vue";
import { useCounterStore } from "@/store/app.js";
const counterStore = useCounterStore();

let searchBoxClosed = ref(true);
let searchText = ref("");

onMounted(() => {
  counterStore.filteredCountryData = counterStore.allCountryData.filter(
    (country) =>
      country.name.toLowerCase().includes(searchText.value.toLowerCase()),
  );
  console.log(
    "counterStore.allCountryData: ",
    counterStore.filteredCountryData[0],
  );
});

function text_change(event) {
  // console.log("event.target.value: ", event.target.value);
  console.log("searchText: ", searchText.value);

  counterStore.filteredCountryData = counterStore.allCountryData.filter(
    (country) =>
      country.name.toLowerCase().includes(searchText.value.toLowerCase()),
  );
  console.log("all", counterStore.allCountryData.length);
  console.log("filtered", counterStore.filteredCountryData.length);
}
</script>

<style lang="scss">
.all-view {
  background-color: #f0f0f0;
  padding: 1rem;
}

.v-input.expanding-search {
  transition: max-width 0.5s;
  max-width: 500px;
}
.v-input.closed {
  max-width: 130px;
}
</style>
