import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/AppIndex.vue'
import AppTypography from '@/views/AppTypography.vue'
import AppButton from '@/views/AppButton.vue'
import AppCheckbox from '@/views/AppCheckbox.vue'
import AppRadio from '@/views/AppRadio.vue'
import AppProgress from '@/views/AppProgress.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/typography',
    name: 'Typography',
    component: AppTypography
  },
  {
    path: '/button',
    name: 'Button',
    component: AppButton
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: AppCheckbox
  },
  {
    path: '/radio',
    name: 'Radio',
    component: AppRadio
  },
  {
    path: '/progress',
    name: 'Progress',
    component: AppProgress
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
