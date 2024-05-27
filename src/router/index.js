import { createRouter, createWebHistory } from 'vue-router'
import homeComponent from '@/components/homeComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeComponent
    }
  ]
})

export default router
