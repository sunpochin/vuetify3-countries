<template>
  <div class="all-view">
    <div class="pt-6 search-select">
      <v-text-field
        v-model.trim="searchText"
        variant="outlined"
        dense
        filled
        clearable
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        class="shrink expanding-search"
        :class="{ closed: searchBoxClosed && !searchText }"
        @focus="searchBoxClosed = false"
        @blur="searchBoxClosed = true"
        @click:clear="searchText = ''"
      />

      <div class="custom-width">
        <v-select
          label="Filter by Region"
          :items="['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']"
          variant="outlined"
          @update:modelValue="onSelectChange"
        />
      </div>
    </div>
    <CountryList />
  </div>
</template>

<script setup>
import CountryList from "@/components/CountryList.vue";
import { ref, watch } from "vue";
import { useCounterStore } from "@/store/app.js";

const counterStore = useCounterStore();
let searchBoxClosed = ref(true);
let searchText = ref("");
let regionValue = ref("");

function onSelectChange(newValue) {
  console.log("選擇已更改", newValue);
  regionValue.value = newValue;
}

watch(
  () => regionValue.value,
  (newCode, oldCode) => {
    console.log("newCode: ", newCode, "oldCode: ", oldCode);
    if (newCode !== oldCode) {
      counterStore.filteredCountryData = counterStore.allCountryData.filter(
        (country) =>
          country.region
            .toLowerCase()
            .includes(regionValue.value.toLowerCase()),
      );
    }
  },
);

watch(
  () => searchText.value,
  (newCode, oldCode) => {
    console.log("newCode: ", newCode, "oldCode: ", oldCode);
    if (newCode !== oldCode) {
      counterStore.filteredCountryData = counterStore.allCountryData.filter(
        (country) =>
          country.name.toLowerCase().includes(searchText.value.toLowerCase()),
      );
    }
  },
);
</script>

<style lang="scss" scoped>
.all-view {
  background-color: #f0f0f0;
  padding: 1rem;
}

// https://sunpochin.hashnode.dev/vuetify-v-select-width-css-div
.custom-width {
  width: 200px;
}

.search-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.v-input.expanding-search {
  transition: max-width 0.5s;
  max-width: 500px;
}
.v-input.closed {
  max-width: 130px;
}
</style>
