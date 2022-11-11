<template>
    <div class="container w-auto bg-[#313131] flex flex-col relative rounded">
        <img v-if="isSaved" @click="onSave" src="../icons/save-active.svg"
        class="cursor-pointer hover:opacity-70 absolute  top-2 right-2" />
        <img v-else @click="onSave" src="../icons/save.svg"
        class="cursor-pointer hover:opacity-70 absolute  top-2 right-2" />
        <img :src="img" class="rounded"/>
        <div class="flex flex-col justify-center my-auto">
            <p class="text-base text-center text-white">name: {{name}}</p>
            <p class="text-base text-center text-white">gender: {{gender}}</p>
            <p class="text-base text-center text-white">origin: {{origin}}</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    name: String,
    gender: String,
    origin: String,
    img: String,
    id: Number,
  },
  setup(props) {
    const isSaved = ref(false);

    if (JSON.parse(localStorage.getItem('savedCards')).some((card) => card.img === props.img)) {
      isSaved.value = true;
    }
    const onSave = () => {
      const savedCards = JSON.parse(localStorage.getItem('savedCards'));
      if (!isSaved.value) {
        savedCards.push({
          name: props.name,
          gender: props.gender,
          origin: props.origin,
          id: props.id,
          img: props.img,
        });
        localStorage.setItem('savedCards', JSON.stringify(savedCards));
      } else {
        const indexOnDelete = savedCards.findIndex((card) => card.img === props.img);
        savedCards.splice(indexOnDelete, 1);
        localStorage.setItem('savedCards', JSON.stringify(savedCards));
      }
      isSaved.value = !isSaved.value;
    };
    return { isSaved, onSave };
  },
};

</script>
