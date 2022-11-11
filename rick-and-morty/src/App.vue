<template>
  <div class="flex-col m-auto bg-slate-900 min-h-screen">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';

if (!localStorage.getItem('savedCards')) {
  localStorage.setItem('savedCards', JSON.stringify([]))
}
</script>


