import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

export default function getCharacters() {
  const characters = ref([])
  const page = ref(1)
  const maxPage = ref(0)

  function nextPage() {
    if (page.value < maxPage.value) {
      page.value++
    }
  }
  function prevPage() {
    if (page.value > 1) {
      page.value--
    }
  }

  watch(page, async () => {
    const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page.value}`)
    characters.value = res.data
  })
  onMounted(async () => {
    const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page.value}`)
    characters.value = res.data
    maxPage.value = res.data.info.pages
  })

  return {
    characters,
    page,
    nextPage,
    prevPage
  }
}
