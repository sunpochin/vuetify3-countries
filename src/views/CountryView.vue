<template>
  <!-- https://book.vue.tw/CH4/4-2-route-settings.html
    <h1>Country View {{ $route.params.code }}</h1> -->
  <div className="detail-wrapper">
    <v-btn class="my-6">
      <v-icon>mdi-arrow-left</v-icon>
      <router-link to="/" class="text-decoration-none">Back</router-link>
    </v-btn>

    <div className="details">
      <div>
        <img className="flagImage" :src="countryData.flag" />
      </div>

      <div class="flex-col">
        <h1 class="my-6">
          <strong>{{ countryData.name }}</strong>
        </h1>
        <div class="leftright">
          <div class="my-6">
            <div v-for="(field, key) in infoFieldsLeft" :key="key">
              <strong>{{ key }}: </strong>
              {{ field }}
            </div>
          </div>
          <div class="my-6">
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
  background-color: #f0f0f0;
  padding: 0 3rem;

  @media (max-width: 600px) {
    padding: 0 1rem;
    justify-content: space-around;
    align-content: center;
  }
}
.flagImage {
  max-height: 400px;
  max-width: 600px;
  object-fit: cover;

  @media (max-width: 600px) {
    max-width: 300px;
    max-height: 240px;
    align-content: center;
  }
}

.details {
  display: flex;
  /* align-items: left; */
  gap: 1rem;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.leftright {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
}
</style>
