import localforage from 'localforage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHistoryStore = defineStore('history', () => {
    // 历史记录
    const history = ref([]);
    // 加载历史记录
    const loadHistory = async () => {
        try {
            const res = await localforage.getItem('history');
            if (res) {
                history.value = res;
            }
        } catch (error) {
            console.error('failed to load history', error);
        }
    };
    // 添加到历史记录
    const addToHistory = async (item) => {
        history.value.push(item);
        try {
            await localforage.setItem(
                'history',
                JSON.parse(JSON.stringify(history.value))
            );
        } catch (error) {
            console.error('failed to update history', error);
        }
    };
    return {
        history,
        loadHistory,
        addToHistory,
    };
});
