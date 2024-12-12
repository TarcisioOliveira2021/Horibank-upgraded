import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {router} from './router'
import App from './App.vue'
import { MaskInput } from 'vue-3-mask'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  })

app.component('MaskInput', MaskInput)
app.component('VueDatePicker', VueDatePicker)
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.mount('#app')
