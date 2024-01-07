import 'normalize.css';
import '@/assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
const pinia = createPinia();
app.use(router).use(pinia).use(ElementPlus).mount('#app');
