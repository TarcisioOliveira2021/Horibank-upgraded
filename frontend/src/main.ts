import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {router} from './router'
import { vMaska } from 'maska/vue'
import App from './App.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
    icons:{
        defaultSet: 'mdi'
    }
  })

app.component('VueDatePicker', VueDatePicker)
app.directive('maska', vMaska)

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.mount('#app')
