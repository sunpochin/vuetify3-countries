<template lang="">
  <div class="country-card" @click="showCountry">
    <v-img :src="parentMsg.flag" width="100%" height="180px" cover />
    <hr />
    <v-card-text class="px-6 py-2 text-left">
      <div class="font-weight-bold">
        {{ parentMsg.name }}
      </div>
      <div>Population: {{ parentMsg.population }}</div>
      <div>Region: {{ parentMsg.region }}</div>
      <div>Capital: {{ parentMsg.capital }}</div>
    </v-card-text>
  </div>
</template>

<script setup>
import router from "@/router/index.js";

const props = defineProps({
  parentMsg: {
    type: Object,
    required: true,
  },
});

function showCountry() {
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
  /* box-shadow: 3.4px 6.7px 6.7px rgba(0, 0, 0, 0.05); */
  width: 100%;
  height: 300px;
  border-radius: 10px;
  /* border: 5px solid #ccc; */
  background-color: #ffffff;
  padding: 10px;
  text-align: center;
  align-content: center;

  :hover {
    cursor: pointer;
    /* box-shadow: 3.4px 6.7px 6.7px rgba(0, 0, 0, 0.2); */
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
