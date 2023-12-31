import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const usePlayerControllerStore = defineStore('playerController', () => {
    // 引用audio元素
    const audioElement = ref(null);
    // 播放模式，默认模式为顺序播放
    const mode = ref(1);
    // 正在播放列表
    const playList = ref([]);
    // 顺序播放列表
    const orderList = ref([]);
    // 播放状态，是否播放
    const isPlaying = ref(false);
    // 当前播放音乐的索引
    const currentIndex = ref(-1);
    // 当前播放的音乐
    const currentMusic = computed(() => {
        return playList.value[currentIndex.value] || {};
    });
    // 设置正在播放列表
    const setPlayList = (list) => {
        playList.value = list;
        // 顺序播放列表同样是这个正在播放的列表
        orderList.value = list;
    };
    // 选择播放（设置列表和当前音乐）
    const selectPlay = (list, index) => {
        setPlayList(list);
        setCurrentIndex(index);
        setPlaying(true);
    };
    // 设置audio元素
    const setAudioElement = (audio) => {
        audioElement.value = audio;
    };
    // 设置播放状态
    const setPlaying = (state) => {
        isPlaying.value = state;
    };
    // 设置当前播放索引
    const setCurrentIndex = (index) => {
        currentIndex.value = index;
    };
    // 设置播放模式
    const setMode = (newMode) => {
        mode.value = newMode;
    };
    return {
        audioElement,
        mode,
        playList,
        orderList,
        isPlaying,
        currentIndex,
        currentMusic,
        setPlayList,
        selectPlay,
        setAudioElement,
        setPlaying,
        setCurrentIndex,
        setMode,
    };
});
