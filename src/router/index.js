import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/AppIndex.vue'
import AppTypography from '@/views/AppTypography.vue'
import AppButton from '@/views/AppButton.vue'
import AppCheckbox from '@/views/AppCheckbox.vue'
import AppRadio from '@/views/AppRadio.vue'
import AppProgress from '@/views/AppProgress.vue'
import AppInput from '@/views/AppInput.vue'
import AppTabs from '@/views/AppTabs.vue'
import AppTable from '@/views/AppTable.vue'

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
  },
  {
    path: '/input',
    name: 'Input',
    component: AppInput
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: AppTabs
  },
  {
    path: '/table',
    name: 'Table',
    component: AppTable
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
