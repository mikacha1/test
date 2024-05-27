<template>
  <div class="pagination">
    <button @click="prevPage(), filter()">
      <h3>previous page</h3>
    </button>
    <h2>page {{ page }}</h2>
    <button @click="nextPage(), filter()">
      <h3>next page</h3>
    </button>
  </div>
  <div class="filtration">
    <div class="radio">
      <label for="name">name: </label>
      <input type="text" id="name" v-model="name" />
    </div>
    <div class="radio">
      <div>status:</div>
      <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option></option>
        <option>Dead</option>
        <option>Alive</option>
      </select>
    </div>

    <button @:click="filter">
      <h3>apply</h3>
    </button>
  </div>
  <div class="char_container">
    <div class="char_card" v-for="char in filtered" :key="char.id">
      <img :src="char.image" :alt="char.name" class="img" />
      <div class="char_card_container">
        <h2>{{ char.name }}</h2>
        <p>{{ char.status }} - {{ char.species }}</p>
      </div>

      <div class="char_card_container_wrap">
        <p class="back_text">Last known location:<br /></p>
        <h3>{{ char.location.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import getCharacters from '@/hooks/getCharacters'

export default {
  setup(props) {
    const name = ref('')
    const sortname = ref([])
    const { characters, page, nextPage, prevPage } = getCharacters()

    const filtered = ref([])
    const selected = ref('')
    async function filter() {
      filtered.value = []
      const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page.value}`)
      characters.value = await res.data
      characters.value.results.forEach((element) => {
        if (
          (element.status == selected.value || selected.value == 0) &&
          (element.name == name.value || name.value == '')
        ) {
          filtered.value.push(element)
        }
      })
    }

    onMounted(filter)

    return {
      characters,
      page,
      nextPage,
      prevPage,
      selected,
      filter,
      filtered,
      name
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'roboto', sans-serif;
}

.char_container {
  background-color: rgb(241, 241, 241);
  margin: 0% 20%;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
}
.char_card {
  margin: 3.5%;
  background-color: rgb(248, 248, 248);
  border-radius: 5px;
  height: max-content;
  width: 26%;
}
.char_card_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5%;
}
.back_text {
  color: rgb(87, 87, 87);
}
.char_card_container_wrap {
  margin: 5%;
}
.pagination {
  margin: 2% 30%;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  justify-content: space-between;
}
button {
  background: none;
  width: 30%;
}
.img {
  width: 100%;
  height: 100%;
}
.filtration {
  margin: 2% 30%;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  justify-content: space-between;
}
fieldset {
  padding: 20px;
}
.radio {
  width: 210px;
  display: flex;
  justify-content: space-between;
}
</style>
