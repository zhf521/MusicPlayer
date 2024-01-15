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
    const addToHistory = (playlist, index) => {
        // console.log('添加到历史记录中的当前播放列表的:', playlist);
        if (history.value.length === 0) {
            history.value.push({ playlist: playlist, index: index });
        } else {
            const tailItem = history.value[history.value.length - 1];
            if (tailItem.playlist !== playlist || tailItem.index !== index) {
                history.value.push({ playlist: playlist, index: index });
            }
        }
        if (history.value.length > 20) {
            history.value.shift();
        }
        // console.log('添加完的历史记录:', history.value);
    };
    // 保存历史记录到本地
    const saveHistoryToLocal = async () => {
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
        saveHistoryToLocal,
    };
});
