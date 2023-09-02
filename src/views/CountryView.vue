<template>
  <div>
    <!-- https://book.vue.tw/CH4/4-2-route-settings.html
    <h1>Country View {{ $route.params.code }}</h1> -->
    <div>
      <v-btn class="ma-6">
        <v-icon>mdi-arrow-left</v-icon>
        <router-link to="/" class="text-decoration-none">Back</router-link>
      </v-btn>

      <div class="d-flex flex-row">
        <div>
          <img className="flagImage" :src="countryData.flag" />
        </div>
        <div class="ma-6">
          <h1>
            <strong>{{ countryData.name }}</strong>
          </h1>
          <div>
            <strong>Native Name: </strong>
            {{ countryData.nativeName }}
          </div>
          <div>
            <strong>Population: </strong>
            {{ countryData.population }}
          </div>
          <div>
            <strong>Region: </strong>
            {{ countryData.region }}
          </div>
          <div>
            <strong>Sub Region: </strong>
            {{ countryData.subregion }}
          </div>
          <div>
            <strong>Capital: </strong>
            {{ countryData.capital }}
          </div>
        </div>
        <div>
          <div>
            <strong>Top Level Domain: </strong>
            {{ countryData.topLevelDomain }}
          </div>
          <div>
            <strong>Currencies: </strong>
            {{ countryData.currencies }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, onBeforeMount } from "vue";

let countryData = ref({});

onBeforeMount(() => {
  const route = useRoute();
  const code = route.params.code;
  console.log("code: ", code);

  fetch(`https://restcountries.com/v2/alpha/${code}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data: ", data);
      countryData.value = data;
    });
});
</script>

<style scoped>
.flagImage {
  margin: 20px;
  height: 200px;
  object-fit: cover;
  /* position: absolute; */
  width: 300px;
}
</style>
