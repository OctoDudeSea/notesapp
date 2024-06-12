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
import { faCircleChevronDown, faCircleXmark, faPaperPlane, faThumbsUp, faThumbsDown, faCircleUser  } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add( faCircleChevronDown, faCircleXmark, faPaperPlane, faThumbsUp, faThumbsDown, faCircleUser )

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMff-5FY5_29C5DqNwq4uLhVVe7CJCxLY",
  authDomain: "notesapp-auth-9c581.firebaseapp.com",
  projectId: "notesapp-auth-9c581",
  storageBucket: "notesapp-auth-9c581.appspot.com",
  messagingSenderId: "161137808132",
  appId: "1:161137808132:web:ca544c04265b66b3663651"
};
// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(MotionPlugin)
app.mount('#app')