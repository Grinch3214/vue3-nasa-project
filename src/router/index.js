import { createRouter, createWebHistory } from 'vue-router'
import AllNasaImages from '@/components/AllNasaImages.vue'
import ItemPage from '@/components/ItemPage.vue'

const routes = [
	{
		path: '/',
		name: 'all-nasa-images',
		component: AllNasaImages
	},
	{
		path: '/item/:id',
		name: 'item-page',
		component: ItemPage
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router