<template>
  <Loader v-if="nasaStore.loader" />
  <Search />
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import Loader from "./components/Loader.vue";
import Search from "./components/Search.vue";
import { useNasaStore } from "./stores/nasaStore";

const nasaStore = useNasaStore();

onMounted(async () => {
  await nasaStore.getStartResultsonPage();
});
</script>
