import { registerPlugin } from '@/plugins'
import { router } from '@/routers'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
registerPlugin(app, { router })

app.mount('#app')
