<template>
  <div>
    <!-- https://book.vue.tw/CH4/4-2-route-settings.html
    <h1>Country View {{ $route.params.code }}</h1> -->
    <div>
      <div>number: {{ number }} squaredNumber: {{ squaredNumber }}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    // 使用 ref 创建一个响应式变量
    const number = ref(111);

    // 使用 computed 创建一个计算属性
    const squaredNumber = computed(() => {
      return number.value ** 2;
    });

    // 定义一个方法来增加数字
    const incrementNumber = () => {
      number.value++;
    };

    return {
      number,
      squaredNumber,
      incrementNumber,
    };
  },
};
</script>

<script setup>
import { useRoute } from "vue-router";
import { computed, onMounted, ref, onBeforeMount } from "vue";

let num = 1;
let xxx = computed(() => {
  return num;
});

let countryData = ref({});

onBeforeMount(() => {
  num = 10;

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
