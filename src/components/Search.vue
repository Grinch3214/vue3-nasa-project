<template>
	<header class="search" id="headerImage">
		<div class="container">
			<form class="search__form" @submit.prevent="$router.push('/'), nasaStore.getResult(nasaStore.query)">
				<input class="search__input" type="text" v-model="nasaStore.query" placeholder="Search for ... (e.g. 'Sun')">
			</form>
		</div>
	</header>

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
	@media screen and (max-width: 768px) {
		padding: 50px 0 30px;
	}
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
		@media screen and (max-width: 768px) {
		padding: 5px 10px;
		font-size: 20px;
	}

		&::placeholder {
			color: #fff;
			opacity: .7;
		}
	}
}
</style>