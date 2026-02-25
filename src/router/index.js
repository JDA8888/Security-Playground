import { createRouter, createWebHistory } from 'vue-router'
import SecurityPlaygroundView from '../Views/SecurityPlaygroundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: SecurityPlaygroundView,
  },
  // Note: Future routes can be added here as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router