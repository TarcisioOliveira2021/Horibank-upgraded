import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {router} from './router'
import App from './App.vue'
import { MaskInput } from 'vue-3-mask'

const app = createApp(App)

app.component('MaskInput', MaskInput)
app.use(createPinia())
app.use(router)
app.mount('#app')
