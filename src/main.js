import './styles/global.scss'

import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'

import router from './router'

import {
  faHeart,
  faHand,
  faAddressBook,
  faCreditCard,
  faLemon,
  faHourglass
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'

library.add([faHeart, faHand, faAddressBook, faCreditCard, faLemon, faHourglass])

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
