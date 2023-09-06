<template>
  <div class="all-view">
    <div class="search-select">
      <v-text-field
        v-model.trim="searchText"
        variant="outlined"
        dense
        filled
        clearable
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        class="pt-6 shrink expanding-search"
        :class="{ closed: searchBoxClosed && !searchText }"
        @focus="searchBoxClosed = false"
        @blur="searchBoxClosed = true"
        @click:clear="searchText = ''"
      />

      <div class="custom-width">
        <v-select
          label="Filter by Region"
          :items="[
            'Africa',
            'Americas',
            'Asia',
            'Europe',
            'Oceania',
            'Antarctica',
          ]"
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
import { ref, onMounted, watch } from "vue";
import { useCounterStore } from "@/store/app.js";

const counterStore = useCounterStore();
let searchBoxClosed = ref(true);
let searchText = ref("");

onMounted(() => {
  console.log(
    "counterStore.filteredCountryData: ",
    counterStore.filteredCountryData[0],
  );
});

function onSelectChange(value) {
  // 在這裡處理選擇更改的邏輯
  console.log("選擇已更改", value);
}

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
  width: 600px;
}

.search-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.v-input.expanding-search {
  transition: max-width 0.5s;
  max-width: 500px;
}
.v-input.closed {
  max-width: 130px;
}
</style>
