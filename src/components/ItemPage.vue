<template>
	<div class="nasa">
		<div class="container">
			NASA 
			{{ item }}
		</div>
	</div>
</template>

<script setup>
  import { useNasaStore } from '../stores/nasaStore'
  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const nasaStore = useNasaStore()
  const route = useRoute()

  const item = computed(() => {
    return nasaStore.results.find(result => result.data[0].nasa_id === route.params.id)
  })
	console.log(item.value)

	onMounted(() => {
		nasaStore.getIdItem(route.params.id)
	})
</script>