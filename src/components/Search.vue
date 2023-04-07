<template>
	<header class="search">
		<div class="container">
			<form class="search__form" @submit.prevent="nasaStore.getResult(nasaStore.query)">
				<input class="search__input" type="text" v-model="nasaStore.query" placeholder="Search for ... (e.g. 'Sun')">
			</form>
		</div>
	</header>

	<div class="result container">
		<div v-for="(item, index) in nasaStore.results" :key="index">
			<img :src="item.links[0].href" alt="" width="400" height="400">
		</div>
	</div>

</template>

<script setup>
	import { useNasaStore } from '../stores/nasaStore'

	// STORE
	const nasaStore = useNasaStore()

</script>

<style lang="scss" scoped>
.search {
	padding: 150px 0 100px;
	background: url('../assets/images/star_planet.png') no-repeat 50%/cover;
	&__form {
		max-width: 900px;
		margin: 0 auto;
	}
	&__input {
		width: 100%;
		font-size: 30px;
		padding: 10px 20px;
		background: #000;
		color: #fff;
		box-shadow: 0 0 2px 0 #fff;

		&::placeholder {
			color: #fff;
			opacity: .7;
		}
	}
}

.result {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
	gap: 5px;
	color: #fff;

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