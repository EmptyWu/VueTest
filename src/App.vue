<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { AppProvider } from './components/Application';
</script>

<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<style scoped>

</style>
