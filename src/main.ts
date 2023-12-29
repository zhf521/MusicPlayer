import 'normalize.css';
import '@/assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import SvgIcon from './components/SvgIcon.vue';
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);
app.component('SvgIcon', SvgIcon);
app.use(router).use(pinia).mount('#app');
