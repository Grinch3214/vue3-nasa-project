<template>
	<div class="result container">
		<div v-for="(item, index) in nasaStore.results" :key="index">
			<img :src="item.links[0].href" alt="" width="400" height="400" @click="pushItem(item)">
		</div>
	</div>
</template>

<script setup>
	import { useNasaStore } from '../stores/nasaStore'
	import { useRouter, useRoute } from 'vue-router'

	// STORE
	const nasaStore = useNasaStore()

	// router
	const router = useRouter()
  const route = useRoute()

	const pushItem = (query) => {

		router.push({
			// path: `item/${query.data[0].nasa_id}`,
			name: 'item-page',
			params: {
				id: query.data[0].nasa_id
			},
			// query: {
			// 	...route.query
			// }
		})
	}

</script>

<style lang="scss" scoped>
.result {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
	gap: 5px;
	color: #fff;
	padding: 50px 0;

	div {
		max-height: 500px;
		border: 2px solid #505050;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>