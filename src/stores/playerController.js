import { defineStore } from 'pinia';
import { ref } from 'vue';
export const usePlayerControllerStore = defineStore('playerController', () => {
    // 设置audio元素
    const audioElement = ref(null);
    const setAudioElement = (audio) => {
        audioElement.value = audio;
    };
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
    return {
        audioElement,
        setAudioElement,
        isPlaying,
        setPlaying,
        playlist,
        orderList,
        setPlaylist,
        currentPlayIndex,
        setCurrentPlayIndex,
    };
});
