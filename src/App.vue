<template>
  <v-app className="container">
    <v-app-bar className="container">
      <h1>Where in the world?</h1>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>

<style>
.container {
  margin: 0 6rem;
}
</style>
