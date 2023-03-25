import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'


const app = createApp(App)
app.provide("api", "http://127.0.0.1:8000/")

app.use(router)
app.use(WaveUI, {theme: 'dark'})

app.mount('#app')
