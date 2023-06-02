<template>
	<div class="nasa">
		<div class="container">
			<router-link class="nasa__back" to="/" @click="bgRemoveOnClick()">
				<span></span>
				BACK
			</router-link>
			<div class="nasa__inner" v-if="isItemExist">
				<a class="nasa__image" :href="bigImg" target="_blank">
					<img :src="nasaStore.itemID[0].links[0].href" :alt="nasaStore.itemID[0].data[0].title">
				</a>
				<div class="nasa__box">
					<h1 class="nasa__box-title">{{ nasaStore.itemID[0].data[0].title }}</h1>
					<div class="nasa__id">
						Nasa id: <span>{{ nasaStore.itemID[0].data[0].nasa_id }}</span>
					</div>
					<p class="nasa__box-description link-nasa" v-html="nasaStore.itemID[0].data[0].description"></p>
					<p class="nasa__created">
						Date Created: <span>{{ fixDateString(nasaStore.itemID[0].data[0].date_created) }}</span>
					</p>
					<div class="nasa__keywords">
						Keywords: 
						<ul>
							<li v-for="(item, index) of nasaStore.itemID[0].data[0].keywords"
							:key="index"> {{ item }}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from 'axios'
  import { useNasaStore } from '../stores/nasaStore'
  import { onMounted, computed, ref } from 'vue'
  import { useRoute } from 'vue-router'

  const nasaStore = useNasaStore()
  const route = useRoute()

	const bigImg = ref('')

	const isItemExist = computed(() => {
		return nasaStore.itemID && nasaStore.itemID.length
	})

	const itemID = computed(() => {
		return nasaStore.itemID
	})


	const fixDateString = (date) => {
		let originalDate = date;
		let dateString = originalDate.substring(0, 10);
		let newDate = new Date(dateString);
		let newDateString = newDate.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" }).split('/').join('.');
		return newDateString;
	}

	const bgRemoveOnClick = () => {
		const header = document.querySelector('#headerImage')
		header.style = null
	}

	onMounted(async() => {
		await nasaStore.getIdItem(route.params.id)
		await axios.get(itemID.value[0].href).then(response => {
			bigImg.value = response.data[0]
		})
		const header = document.querySelector('#headerImage')
		header.style = `
			background: url(${nasaStore.itemID[0].links[0].href}) no-repeat 50%/cover
		`
	})
</script>


<style lang="scss" scoped>
.nasa {
	color: #fff;
	padding: 50px 0;

	&__back {
		display: inline-flex;
		font-weight: 900;
		align-items: center;
		gap: 10px;
		color: #fff;
		text-transform: uppercase;
		text-decoration: none;
		span {
			width: 30px;
			height: 30px;
			border: 2px solid #fff;
			border-radius: 50%;
			display: inline-block;
			position: relative;
			&::before {
				content: '';
				position: absolute;
				top: 8px;
				left: 9px;
				border-bottom: 2px solid #fff;
				border-left: 2px solid #fff;
				width: 10px;
				height: 10px;
				transform: rotate(45deg);
			}
		}
	}

	&__inner {
		padding: 50px 0 0;
		display: flex;
		gap: 40px;
		@media screen and (max-width: 992px) {
			display: block;
			max-width: 768px;
			margin: 0 auto;
		}
	}

	&__image {
		display: inline-block;
		height: 500px;
		flex: 1 1 600px;
		@media screen and (max-width: 992px) {
			height: 400px;
			margin-bottom: 30px;
		}
		@media screen and (max-width: 600px) {
			height: 300px;
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	&__box {
		flex: 1 1 50%;
	}

	&__box-title {
		font-size: 30px;
		line-height: 30px;
		text-transform: uppercase;
		margin-bottom: 10px;
		font-weight: 800;
	}

	&__box-description {
		font-size: 20px;
		margin-bottom: 20px;
		opacity: .8;
	}

	&__id,
	&__created,
	&__keywords {
		font-size: 15px;
		line-height: 15px;
		font-weight: 700;
		text-transform: uppercase;
		margin-bottom: 20px;
		span {
			opacity: .8;
		}
	}

	&__id {
		display: flex;
		gap: 6px;
		span {
			background: #505050;
			padding: 0 8px;
			border-radius: 5px;
			font-size: 12px;
		}
	}

	&__keywords {
		display: flex;
		gap: 20px;
		ul > li {
			margin-bottom: 5px;
			opacity: .8;
		}
	}
}
</style>

<style lang="scss">
.link-nasa {
	a {
		color: blueviolet;
		text-decoration: none;
	}
}
</style>
