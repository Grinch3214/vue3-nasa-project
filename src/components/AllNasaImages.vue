<template>
  <div class="bad-result" v-if="!nasaStore.results.length">
    Based on your selections, no results were found.
  </div>
  <div ref="resultElem" class="result container" v-else>
    <div v-for="(item, index) in nasaStore.results" :key="index">
      <img
        :src="item.links[0].href"
        alt=""
        width="400"
        height="400"
        loading="lazy"
        @click="pushItem(item)"
      />
    </div>
  </div>
  <div class="pagination" v-if="nasaStore.results.length">
    <button
      :disabled="nasaStore.page === 1"
      class="pagination__prev"
      @click="(nasaStore.page -= 1), nasaStore.changePage()"
    >
      Prev
    </button>
    <button
      :disabled="nasaStore.page === nasaStore.totalPages"
      class="pagination__next"
      @click="(nasaStore.page += 1), nasaStore.changePage(), scrollToTop()"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { useNasaStore } from "../stores/nasaStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

// STORE
const nasaStore = useNasaStore();

// router
const router = useRouter();

// vars
const resultElem = ref(null);

function scrollToTop() {
  const element = resultElem.value;
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

function pushItem(query) {
  router.push({
    name: "item-page",
    params: {
      id: query.data[0].nasa_id,
    },
  });
}
</script>

<style lang="scss" scoped>
.bad-result {
  max-width: 400px;
  margin: 50px auto 0;
  color: #fff;
  font-size: 14px;
  text-align: center;
}
.result {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  gap: 10px;
  color: #fff;
  padding-top: 50px;
  padding-bottom: 50px;
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  // padding: 50px 0;

  div {
    max-height: 200px;
    border: 2px solid #505050;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.6);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.pagination {
  padding: 20px 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  button {
    padding: 6px 14px;
    background: #000;
    color: #fff;
    box-shadow: 0 0 0 1px #fff;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background: #505050;
      cursor: default;
      opacity: 0.5;
    }
  }
}
</style>
