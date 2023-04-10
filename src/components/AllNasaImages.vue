<template>
	<div class="bad-result" v-if="!nasaStore.results.length">
		Based on your selections, no results were found.
	</div>
	<div class="result container" v-else>
		<div v-for="(item, index) in nasaStore.results" :key="index">
			<img :src="item.links[0].href" alt="" width="400" height="400" @click="pushItem(item)">
		</div>
	</div>
</template>

<script setup>
	import { useNasaStore } from '../stores/nasaStore'
	import { useRouter, useRoute } from 'vue-router'
	import { onMounted } from 'vue'

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

	onMounted(async() => {
		await nasaStore.getStartResultsonPage()
	})

</script>

<style lang="scss" scoped>
.bad-result {
	max-width: 400px;
	margin: 50px auto 0;
	color: #fff;
	font-size: 14px;
	text-align: center;
}
.result {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
	gap: 10px;
	color: #fff;
	margin-top: 50px;
	@media screen and (max-width: 992px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (max-width: 600px) {
		grid-template-columns: repeat(1, 1fr);
	}
	// padding: 50px 0;

	div {
		max-height: 500px;
		border: 2px solid #505050;
		cursor: pointer;
		background: rgba(0, 0, 0, 0.6);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>