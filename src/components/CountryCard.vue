<template lang="">
  <div
    class="country-card"
    @click="handleRegister"
  >
    <img
      :src="parentMsg.flag"
      class="flag-img"
    >
    <div class="px-6 py-2 text-left">
      <div class="pb-2 font-weight-bold">
        {{ parentMsg.name }}
      </div>
      <div>Population: {{ parentMsg.population }}</div>
      <div>Region: {{ parentMsg.region }}</div>
      <div>Capital: {{ parentMsg.capital }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router/index.js";

const props = defineProps({
  parentMsg: {
    type: Object,
    required: true,
  },
});

function handleRegister() {
  console.log("showCountry", props.parentMsg.alpha3Code);
  router.push({
    name: "CountryView",
    params: { code: props.parentMsg.alpha3Code },
  });
}
</script>

<style scoped>
.country-card {
  display: flex;
  flex-direction: column;
  box-shadow: 3px 6px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  /* border: 5px solid #ccc; */
  background-color: #ffffff;
  text-align: center;
  align-content: center;

  &:hover {
    cursor: pointer;
    box-shadow: 3px 6px 6px rgba(0, 0, 0, 0.2);
  }
}

.flag-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  box-shadow: 3.4px 6.7px 6.7px rgba(0, 0, 0, 0.05);
}

.details {
  color: black;
  text-align: left;
  margin: 0 0 0 30px;
}
</style>
