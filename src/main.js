import App from './App.vue'
import { createApp } from 'vue'
import './assets/main.css'
import { MotionPlugin } from '@vueuse/motion'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faCircleChevronDown, faCircleXmark, faPaperPlane, faThumbsUp, faThumbsDown  } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCircleChevronDown, faCircleXmark, faPaperPlane, faThumbsUp, faThumbsDown)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(MotionPlugin)
app.mount('#app')