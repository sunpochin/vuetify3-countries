<template lang="">
  <!-- <div class="country-card">
    <img class="cover-img" :src="parentMsg.flag" loading="lazy" />
    <div class="details">
      <div>
        {{ parentMsg.name }}
      </div>
      <div><strong>Population:</strong> {{ parentMsg.population }}</div>
      <div>
        {{ parentMsg.region }}
      </div>
      <div>
        {{ parentMsg.capital }}
      </div>
    </div>
  </div> -->

  <div class="country-card" @click="showCountry">
    <v-card width="300" height="300">
      <img class="flag-img country-card" :src="parentMsg.flag" />
      <v-card-text class="px-4 py-0 grey--text">
        <div class="font-weight-bold">
          {{ parentMsg.name }}
        </div>
        <div class="font-weight-bold">
          <strong>Population:</strong> {{ parentMsg.population }}
        </div>
      </v-card-text>
    </v-card>
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

<style>
.country-card {
  display: flex;
  flex-direction: column;
  /* box-shadow: 3.4px 6.7px 6.7px rgba(0, 0, 0, 0.05); */
  width: 300px;
  height: 300px;
  border-radius: 10px;
  /* border: 5px solid #ccc; */

  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
  :hover {
    cursor: pointer;
    /* box-shadow: 3.4px 6.7px 6.7px rgba(0, 0, 0, 0.2); */
  }
}

.flag-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.details {
  color: black;
  text-align: left;
  margin: 0 0 0 30px;
}
</style>
