import 'normalize.css';
import '@/assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import SvgIcon from './components/SvgIcon.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
const pinia = createPinia();
app.component('SvgIcon', SvgIcon);
app.use(router).use(pinia).use(ElementPlus).mount('#app');
