import { createRouter, createWebHashHistory } from 'vue-router';
import CardList from './components/CardList.vue';
import SavedCardList from './components/SavedCardList.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: CardList },
    { path: '/saved', component: SavedCardList },
  ],
});
