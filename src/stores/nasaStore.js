import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

const URL = 'https://images-api.nasa.gov'

export const useNasaStore = defineStore('nasaStore', () => {
  // const KEY = 'JYCDJoL2uDndgQrfxn9AE9zLNmjodGUfnAVM7kxd'
	// const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${KEY}`

	const results = ref([])
	const query = ref('')
	const itemID = ref([])

	const getResult = async(queryParam) => {
		await axios.get(`${URL}/search?q=${queryParam}&media_type=image`).then(response => {
			console.log(response.data.collection.items)
			results.value = response.data.collection.items
			query.value = ''
		})
	}

	const getIdItem = async(id) => {
		await axios.get(`${URL}/search?q=${id}`).then(response => {
			itemID.value = response.data.collection.items
			console.log('Store ID', itemID.value)
		})
	}

	const getStartResultsonPage = async() => {
		if(!results.value.length) {
			await axios.get(`${URL}/search?q=earth&media_type=image`).then(response => {
				results.value = response.data.collection.items
				console.log(results.value)
			})
		}
		
	}

	return {
		getResult,
		results,
		query,
		getIdItem,
		itemID,
		getStartResultsonPage
	}
})
