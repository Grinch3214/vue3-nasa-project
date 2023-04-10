<script setup>
import Loader from './components/Loader.vue'
import Search from './components/Search.vue';
import { useNasaStore } from './stores/nasaStore'

const nasaStore = useNasaStore()
</script>

<template>
	<Loader v-if="nasaStore.loader" />
	<Search />
	<main>
		<RouterView />
	</main>
	
</template>
