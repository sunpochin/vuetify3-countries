<template>
  <div>
    <!-- https://book.vue.tw/CH4/4-2-route-settings.html
    <h1>Country View {{ $route.params.code }}</h1> -->
    <div>
      <v-btn class="ma-6">
        <v-icon>mdi-arrow-left</v-icon>
        <router-link to="/" class="text-decoration-none">Back</router-link>
      </v-btn>

      <div className="details">
        <div>
          <img className="flagImage" :src="countryData.flag" />
        </div>

        <div class="flex-col">
          <h1 class="ma-6">
            <strong>{{ countryData.name }}</strong>
          </h1>
          <div className="leftright">
            <div class="ma-6">
              <div v-for="(field, key) in infoFieldsLeft" :key="key">
                <strong>{{ key }}: </strong>
                {{ field }}
              </div>
            </div>
            <div class="ma-6">
              <div v-for="(field, key) in infoFieldsRight" :key="key">
                <strong>{{ key }}: </strong>
                {{ field }}
              </div>
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
.flagImage {
  margin: 20px;
  height: 200px;
  object-fit: cover;
  /* position: absolute; */
  width: 300px;
}

.details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.leftright {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
}
</style>
