import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
export const usePlayerControllerStore = defineStore('playerController', () => {
    const audioElement = new Audio();
    // 设置播放状态
    const isPlaying = ref(false);
    const setPlaying = (state) => {
        isPlaying.value = state;
    };
    // 设置播放列表
    const playlist = ref([]);
    const orderList = ref([]);
    const setPlaylist = (list) => {
        playlist.value = list;
        orderList.value = list;
    };
    // 设置当前播放的索引
    const currentPlayIndex = ref(-1);
    const setCurrentPlayIndex = (index) => {
        currentPlayIndex.value = index;
    };
    // 当前音乐
    const currentMusic = computed(() => {
        return playlist.value[currentPlayIndex.value] || {};
    });
    // 设置播放模式
    const mode = ref(0);
    const setPlayMode = (newMode) => {
        mode.value = newMode;
    };
    return {
        audioElement,
        isPlaying,
        setPlaying,
        playlist,
        orderList,
        setPlaylist,
        currentPlayIndex,
        setCurrentPlayIndex,
        currentMusic,
        mode,
        setPlayMode,
    };
});
