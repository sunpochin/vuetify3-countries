<template>
  <div class="all-view">
    <div class="pt-6 search-select">
      <v-text-field
        v-model.trim="searchText"
        variant="outlined"
        dense
        filled
        clearable
        placeholder="搜尋國家名稱"
        prepend-inner-icon="mdi-magnify"
        class="searchText"
        @focus="searchBoxClosed = false"
        @blur="searchBoxClosed = true"
        @click:clear="searchText = ''"
      />

      <div class="custom-width">
        <v-select
          label="依照區域分類"
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
import { useCounterStore } from "@/store/counter.js";

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
@import "@/assets/variables.scss";

.all-view {
  background-color: $bg-color;
  color: $text-color;
  padding: 1rem;
}

// https://sunpochin.hashnode.dev/vuetify-v-select-width-css-div
.custom-width {
  width: 300px;
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
  .searchText {
    width: 300px;
    max-width: 300px;
  }
}

// .v-input.expanding-search {
//   transition: max-width 0.5s;
//   max-width: 500px;
// }
// .v-input.closed {
//   width: 500px;
// }
</style>
