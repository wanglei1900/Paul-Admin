import { createApp } from 'vue'
import App from './App.vue'
// reset css
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss"
// custom element css
import "@/styles/element.scss";
// element plus
import ElementPlus from 'element-plus'
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import 'element-plus/dist/index.css'
// 引入已经创建好的pinia
import pinia from "@/store";
// 引入router
import router from "@/routers";

const app = createApp(App)

// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});



app.use(router).use(ElementPlus).use(pinia).mount('#app')