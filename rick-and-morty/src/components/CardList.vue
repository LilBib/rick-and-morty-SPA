<template>
    <h1 class="text-5xl text-white text-center my-5">Список персонажей из Рика и Морти</h1>
    <div v-if="!isDataFetched" class="flex justify-center">
        <Preloader />
    </div>
    <div v-if="isDataFetched" class="grid grid-cols-4 gap-2 w-4/5 m-auto pb-5">
        <Card v-for="card in currentCards" :key="card.id"
        :currentCards="currentCards"
        :name="card.name"
        :gender="card.gender"
        :origin="card.origin.name"
        :img="card.image"
        :savedCards="savedCards"
        :id="card.id" />
    </div>
    <div v-if="isDataFetched" class="flex m-auto justify-center">
        <p v-if="currentPage>1" @click="onPrevPageClick"
            class="text-xl text-white cursor-pointer hover:opacity-70">
            Предыдущая страница
        </p>
        <div class="bg-slate-200 border-2 text-center border-green-500 h-8 w-6 rounded-sm mx-3">
            {{currentPage}}
        </div>
        <p v-if="currentPage<maxPages" @click="onNextPageClick" 
        class="text-xl text-white cursor-pointer hover:opacity-70">
            Следующая страница
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Card from './CardComponent.vue';
import Preloader from './PreloaderComponent.vue';

export default {
  props: {},
  setup() {
    const isDataFetched = ref(false);
    const maxPages = ref(0);
    const currentPage = ref(1);
    const nextPage = ref('');
    const prevPage = ref('');
    const currentCards = ref([]);
    onMounted(() => {
      axios.get('https://rickandmortyapi.com/api/character')
        .then((data) => { maxPages.value = data.data.info.pages; return data; })
        .then((data) => { nextPage.value = data.data.info.next; return data; })
        .then((data) => { currentCards.value = data.data.results; return data; })
        .then(isDataFetched.value = !isDataFetched.value)
        .catch((err) => console.log(err));
    });
    const onNextPageClick = () => {
      axios.get(`${nextPage.value}`)
        .then((data) => { isDataFetched.value = false; return data; })
        .then((data) => { maxPages.value = data.data.info.pages; return data; })
        .then((data) => { nextPage.value = data.data.info.next; return data; })
        .then((data) => { prevPage.value = data.data.info.prev; return data; })
        .then((data) => { currentCards.value = data.data.results; return data; })
        .then(currentPage.value += 1)
        .catch((err) => console.log(err))
        .finally((res) => { isDataFetched.value = true; return res; });
    };
    const onPrevPageClick = () => {
      axios.get(`${prevPage.value}`)
        .then((data) => { maxPages.value = data.data.info.pages; return data; })
        .then((data) => { nextPage.value = data.data.info.next; return data; })
        .then((data) => { prevPage.value = data.data.info.prev; return data; })
        .then((data) => { currentCards.value = data.data.results; return data; })
        .then(currentPage.value -= 1)
        .catch((err) => console.log(err));
    };
    return {
      maxPages, currentCards, currentPage, onNextPageClick, onPrevPageClick, isDataFetched,
    };
  },
  components: { Card, Preloader },
};
</script>
