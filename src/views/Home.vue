<template>
  <h1>Where in the world?</h1>
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
    @input="text_change($event)"
    @click:clear="searchText = ''"
  />

  <CountryList />
</template>

<script setup>
import CountryList from "@/components/CountryList.vue";
import { ref } from "vue";
import { useCounterStore } from "@/store/app.js";
const counterStore = useCounterStore();

let searchBoxClosed = ref(true);
let searchText = ref("");
function text_change(event) {
  console.log("event: ", event);
  console.log("event.target.value: ", event.target.value);
  console.log("searchText: ", searchText.value);
  counterStore.increment();
  console.log(counterStore.countryData);
}
</script>

<style lang="scss">
.v-input.expanding-search {
  transition: max-width 0.5s;
  max-width: 500px;
}
.v-input.closed {
  max-width: 130px;
}
</style>
