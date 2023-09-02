<template>
  <div>
    <!-- https://book.vue.tw/CH4/4-2-route-settings.html -->
    <h1>Country View {{ $route.params.code }}</h1>
    <div>
      <div>
        <v-btn>
          <router-link to="/">Back</router-link>
        </v-btn>
      </div>
      <v-card>
        <div>
          <img :src="countryData.flag" />
        </div>
        <div>
          {{ countryData.name }}
        </div>
        <div>
          {{ countryData.capital }}
        </div>
      </v-card>
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

<style lang="scss" scoped></style>
