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
	const page = ref(1)
	const totalPages = ref(0)
	const saveQueryParam = ref('')

	const changePage = async () => {
		loader.value = true
		try {
			await axios.get(`${URL}/search?q=${saveQueryParam.value}&media_type=image&page=${page.value}`).then(response => {
				results.value = response.data.collection.items;
				loader.value = false;
			})
		} catch (error) {
			console.warn('Error:', error)
			loader.value = false
		}
	}


	const getResult = async (queryParam) => {
		saveQueryParam.value = queryParam
		page.value = 1;
		loader.value = true
		try {
			await axios.get(`${URL}/search?q=${queryParam}&media_type=image`).then(response => {
				results.value = response.data.collection.items
				query.value = ''
				loader.value = false
				filteredArray(response.data.collection)
			})
		} catch (error) {
			console.warn('Error getResult:', error)
			loader.value = false
		}
	}

	const getIdItem = async (id) => {
		loader.value = true
		try {
			await axios.get(`${URL}/search?q=${id}`).then(response => {
				itemID.value = response.data.collection.items
				loader.value = false
			})
		} catch (error) {
			console.warn('Error, getIdItem:', error)
			loader.value = false
		}
	}

	const getStartResultsonPage = async () => {
		if (!results.value.length) {
			saveQueryParam.value = 'earth'
			loader.value = true
			try {
				await axios.get(`${URL}/search?q=earth&media_type=image`).then(response => {
					results.value = response.data.collection.items
					loader.value = false
					filteredArray(response.data.collection)
				})
			} catch (error) {
				console.warn('Error, getStartResultsonPage:', error)
			}
		}
	}

	const filteredArray = (arr) => {
		totalPages.value = Math.ceil(arr.metadata.total_hits / 100)
	}

	return {
		getResult,
		results,
		query,
		getIdItem,
		itemID,
		getStartResultsonPage,
		loader,
		totalPages,
		page,
		saveQueryParam,
		changePage
	}
})
