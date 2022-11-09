import { createApp } from 'vue'
import App from './App.vue'
// reset css
import "@/styles/reset.scss";
// element plus
import ElementPlus from 'element-plus'
// element css
import 'element-plus/dist/index.css'


const app = createApp(App)

app.use(ElementPlus).mount('#app')
