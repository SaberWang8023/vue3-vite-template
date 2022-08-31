import { registerPlugin } from '@/plugins'
import { router } from '@/routers'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
registerPlugin(app, { router })

app.mount('#app')
