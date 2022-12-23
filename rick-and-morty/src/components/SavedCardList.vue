<template>
    <h1 class="text-5xl text-white text-center my-5">Список избранных персонажей</h1>
    <div class="grid grid-cols-4 gap-2 w-4/5 m-auto pb-5">
        <Card v-for="card in currentCards" :key="card.id"
        :name="card.name"
        :gender="card.gender"
        :origin="card.origin"
        :img="card.img"
        :savedCards="savedCards" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Card from './CardComponent.vue';

export default {
  props: {},
  setup() {
    const currentCards = ref([]);
    onMounted(() => {
      currentCards.value = JSON.parse(localStorage.getItem('savedCards'));
    });
    return { currentCards };
  },
  components: { Card },
};
</script>
