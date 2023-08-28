<template>
  <h1>Where in the world?</h1>
  <v-text-field
    v-model.trim="searchText"
    variant="outlined"
    dense
    filled
    rounded
    clearable
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
    class="pt-6 shrink expanding-search"
    :class="{ closed: searchBoxClosed && !searchText }"
    @focus="searchBoxClosed = false"
    @blur="searchBoxClosed = true"
  />

  <CountryList />
</template>

<script setup>
import CountryList from "@/components/CountryList.vue";
</script>

<style lang="scss">
.v-input.expanding-search {
  transition: max-width 0.5s;
  max-width: 300px;
}
.v-input.closed {
  max-width: 70px;
}
</style>
