<template>
  <!-- https://book.vue.tw/CH4/4-2-route-settings.html
    <h1>Country View {{ $route.params.code }}</h1> -->
  <div class="detail-wrapper">
    <router-link to="/" class="text-decoration-none">
      <v-btn class="my-6">
        <v-icon>mdi-arrow-left</v-icon>
        Back
      </v-btn>
    </router-link>

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

        <div v-if="loading">Loading...</div>
        <div v-else>
          <div>Borders:</div>
          <div v-if="Borders.length === 0">None</div>
          <ul v-else>
            <li v-for="border in Borders" :key="border.alpha3Code">
              <router-link
                v-bind:to="`/country/${border.alpha3Code}`"
                class="text-decoration-none"
                >{{ border.name }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, ref, onBeforeMount, watch } from "vue";
let countryData = ref({});
let Borders = ref([]);
let loading = ref(false);
const route = useRoute();

async function fetchData(code) {
  const countryDetail = await fetch(
    `https://restcountries.com/v2/alpha/${code}`,
  )
    .then((res) => res.json())
    .then((data) => {
      countryData.value = data;
      console.log("borders: ", countryData.value.borders);
      return data;
    });
  console.log("countryDetail: ", countryDetail);

  const names = await fetchCountryNamesWithCode(countryDetail.borders).then(
    (res) => {
      // Borders.value = res;
      console.log("fetched borders: ", Borders.value);
      return res;
    },
  );
  console.log("names: ", names);
  Borders.value = names;
}

watch(
  () => route.params.code,
  (newCode, oldCode) => {
    if (newCode !== oldCode) {
      loading.value = true;
      fetchData(newCode).then(() => {
        loading.value = false;
      });
    }
  },
);

async function fetchWithCode({ code, params }) {
  loading.value = false;
  const baseUrl = "https://restcountries.com/v2";
  const queryString = new URLSearchParams(params).toString();
  console.log(
    "`${baseUrl}${code}?${queryString}`: ",
    `${baseUrl}${code}?${queryString}`,
  );
  const res = await fetch(`${baseUrl}${code}?${queryString}`);
  const name = await res.json();
  return name;
}

async function fetchCountryNamesWithCode(countryCodes) {
  const countryNames = await Promise.all(
    countryCodes.map(
      async (code) =>
        await fetchWithCode({
          code: `/alpha/${code}`,
          params: {
            fields: "name,alpha3Code",
          },
        }),
    ),
  );
  console.log("countryNames: ", countryNames);
  // Borders.value = countryNames;

  return countryNames;
}

onBeforeMount(() => {
  fetchData(route.params.code);
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
