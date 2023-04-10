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
	const loader = ref(false)


	const getResult = async(queryParam) => {
		loader.value = true
		await axios.get(`${URL}/search?q=${queryParam}&media_type=image`).then(response => {
			console.log(response.data.collection.items)
			results.value = response.data.collection.items
			query.value = ''
			loader.value = false
		})
	}

	const getIdItem = async(id) => {
		loader.value = true
		await axios.get(`${URL}/search?q=${id}`).then(response => {
			itemID.value = response.data.collection.items
			loader.value = false
		})
	}

	const getStartResultsonPage = async() => {
		if(!results.value.length) {
			loader.value = true
			await axios.get(`${URL}/search?q=earth&media_type=image`).then(response => {
				results.value = response.data.collection.items
				loader.value = false
			})
		}
		
	}

	return {
		getResult,
		results,
		query,
		getIdItem,
		itemID,
		getStartResultsonPage,
		loader
	}
})
