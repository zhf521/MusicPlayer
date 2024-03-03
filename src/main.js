import './assets/main.css'
import 'normalize.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/reset.css";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(Antd)
app.mount('#app')
