import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import { install } from '../dist/chat-message.mjs'
// import '../dist/style.css'
import { install } from './view/index'

const app = createApp(App)

app.use(createPinia())
app.use(install)
app.mount('#app')
