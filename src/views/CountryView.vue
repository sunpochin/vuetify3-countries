<template>
  <!-- https://book.vue.tw/CH4/4-2-route-settings.html
    <h1>Country View {{ $route.params.code }}</h1> -->
  <div class="detail-wrapper">
    <v-btn class="my-6">
      <v-icon>mdi-arrow-left</v-icon>
      <router-link to="/" class="text-decoration-none">Back</router-link>
    </v-btn>

    <div class="details">
      <div class="flag-wrapper">
        <img class="flag-image" :src="countryData.flag" />
      </div>
      <div class="flex-col">
        <h1 class="my-6">
          <strong>{{ countryData.name }}</strong>
        </h1>
        <div class="leftright">
          <div class="my-6 group">
            <div v-for="(field, key) in infoFieldsLeft" :key="key">
              <strong>{{ key }}: </strong>
              {{ field }}
            </div>
          </div>
          <div class="my-6 group">
            <div v-for="(field, key) in infoFieldsRight" :key="key">
              <strong>{{ key }}: </strong>
              {{ field }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, computed, ref, reactive, onBeforeMount } from "vue";

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

const infoFieldsLeft = computed(() => ({
  "Native Name": countryData.value.nativeName,
  Population: countryData.value.population,
  Region: countryData.value.region,
}));

const infoFieldsRight = computed(() => ({
  "Sub Region": countryData.value.subregion,
  Capital: countryData.value.capital,
}));
</script>

<style scoped>
.detail-wrapper {
  min-height: 100vh; /* 设置最小高度为视口高度 */
  max-width: 100%;

  background-color: #f0f0f0;
  padding: 0 3rem;

  @media (max-width: 600px) {
    padding: 0 1rem;
    justify-content: space-around;
    align-content: center;
  }
}

.details {
  max-width: 100%;
  display: flex;
  gap: 4rem;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.flag-wrapper {
  flex: 1;
}
.flag-image {
  max-height: 400px;
  max-width: 600px;
  width: 100%;
  object-fit: cover;

  @media (max-width: 600px) {
    max-width: 300px;
    max-height: 240px;
    align-content: center;
  }
}

.flex-col {
  flex: 1;
}

.group {
  flex: 1;
}
.leftright {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
}
</style>
