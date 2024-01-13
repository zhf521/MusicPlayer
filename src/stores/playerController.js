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

    return {
        audioElement,
        setAudioElement,
        isPlaying,
        setPlaying,
    };
});
