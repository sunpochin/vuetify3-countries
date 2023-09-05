<template>
  <v-app>
    <v-app-bar color="grey-lighten-4">
      <v-app-bar-title><h2>Where in the world?</h2></v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer app>
      source code:
      <a href="https://github.com/sunpochin/vuetify3-countries"
        >https://github.com/sunpochin/vuetify3-countries</a
      >
    </v-footer>
  </v-app>
</template>

<script setup>
//
</script>

<style scoped></style>
