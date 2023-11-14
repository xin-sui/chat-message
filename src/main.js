import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import { install } from '../dist/chat-message.mjs'
// import '../dist/style.css'
import { install } from './view/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
const app = createApp(App)

app.use(createPinia())
app.use(install)
app.use(Antd)
app.mount('#app')
