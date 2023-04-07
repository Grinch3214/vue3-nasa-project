import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

const URL = 'https://images-api.nasa.gov'

export const useNasaStore = defineStore('nasaStore', () => {
  // const KEY = 'JYCDJoL2uDndgQrfxn9AE9zLNmjodGUfnAVM7kxd'
	// const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${KEY}`

	const results = ref([])
	const query = ref('')

	const getResult = async(queryParam) => {
		await axios.get(`${URL}/search?q=${queryParam}&media_type=image`).then(response => {
			console.log(response.data.collection.items)
			results.value = response.data.collection.items;
			console.log(results.value)
			query.value = ''
		})
	}

	const getIdItem = async(id) => {
		await axios.get(`${URL}/search?q=${id}`).then(response => {
			console.log(response.data.collection.items)
		})
	}

	return {
		getResult,
		results,
		query,
		getIdItem
	}
})
