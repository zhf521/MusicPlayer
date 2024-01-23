import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAsideStore = defineStore('aside', () => {
    // 侧边栏是否显示
    const showAside = ref(true);
    // 设置侧边栏显示状态
    const setShowAside = (state) => {
        showAside.value = state;
    };
    return {
        showAside,
        setShowAside,
    };
});
