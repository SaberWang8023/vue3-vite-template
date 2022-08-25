import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/routers'
import { registerPlugin } from '@/plugins'

const app = createApp(App)
app.use(router)
registerPlugin(app, { router })

app.mount('#app')
