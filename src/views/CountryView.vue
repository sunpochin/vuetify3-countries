<template>
  <div>
    <h1>Country View {{ $route.params.code }}</h1>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "CountryView",
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const code = route.params.code;
    console.log("code: ", code);
  },
};
</script>

<style lang="scss" scoped></style>
