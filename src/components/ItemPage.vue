<template>
	<div class="nasa">
		<div class="container">
			<router-link class="nasa__back" to="/">
				<span></span>
				BACK
			</router-link>
			<div class="nasa__inner" v-if="isItemExist">
				<div class="nasa__image">
					<img :src="nasaStore.itemID[0].links[0].href" :alt="nasaStore.itemID[0].data[0].title">
				</div>
				<div class="nasa__box">
					<h1 class="nasa__box-title">{{ nasaStore.itemID[0].data[0].title }}</h1>
					<div class="nasa__id">
						Nasa id: <span>{{ nasaStore.itemID[0].data[0].nasa_id }}</span>
					</div>
					<p class="nasa__box-description link-nasa" v-html="nasaStore.itemID[0].data[0].description"></p>
					<p class="nasa__created">
						Date Created: <span>{{ fixDateString(nasaStore.itemID[0].data[0].date_created) }}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
  import { useNasaStore } from '../stores/nasaStore'
  import { onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'

  const nasaStore = useNasaStore()
  const route = useRoute()

  // const item = computed(() => {
  //   return nasaStore.results.find(result => result.data[0].nasa_id === route.params.id)
  // })
	// console.log(item.value)

	const isItemExist = computed(() => {
		return nasaStore.itemID && nasaStore.itemID.length
	})

	const fixDateString = (date) => {
		let originalDate = date;
		let dateString = originalDate.substring(0, 10);
		let newDate = new Date(dateString);
		let newDateString = newDate.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" }).split('/').join('.');
		return newDateString;
	}

	onMounted(async() => {
		await nasaStore.getIdItem(route.params.id)
		console.log('Component', nasaStore.itemID[0])
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
	}

	&__image {
		height: 500px;
		flex: 0 0 600px;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__box {
		flex: 1 1 auto;
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
	&__created {
		font-size: 15px;
		line-height: 15px;
		font-weight: 700;
		text-transform: uppercase;
		span {
			opacity: .8;
		}
	}

	&__id {
		display: flex;
		gap: 6px;
		margin-bottom: 20px;
		span {
			background: #505050;
			padding: 0 8px;
			border-radius: 5px;
			font-size: 12px;
		}
	}

	&__created {
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
