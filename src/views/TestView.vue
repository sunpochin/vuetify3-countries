<template>
  <div>
    <ul class="details">
      <li v-for="(entry, position) in entries" :key="position" class="group">
        <div v-for="(value, label) in entry" :key="label">
          <b>{{ label }}</b>
          {{ value }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, reactive, onBeforeMount, ref, computed } from "vue";

// const details = ref({
//   "Native Name": "NativeNameValue",
//   Population: "PopulationValue",
//   Region: "RegionValue",
// });

let details = ref({});

onBeforeMount(() => {
  fetch(`https://restcountries.com/v2/alpha/bel`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data: ", data);
      details.value = data;
    });
});

const entries = computed(() => {
  const sasa = Object.entries(details).map(([list]) =>
    list.map(({ label, value }) => (label, value)),
  );
  return sasa;

  // return Object.entries(details).map(([position, list]) =>
  //   list.map(({ label, value }) => (label, value)),
  // );
  // return Object.entries(details.value).map(([label, value]) => ({
  //   label,
  //   value,
  // }));
});
</script>

<style scoped>
.details {
  /* 样式类名 .details 的样式 */
}

.group {
  /* 样式类名 .group 的样式 */
}
</style>
