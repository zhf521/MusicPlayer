// import { useGetFileURL } from '@/hooks/useGetFileURL';
// import { compareArrays } from '@/utils/compareArrays';
// import { randomShuffle } from '@/utils/randomShuffle';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const usePlayerControllerStore = defineStore('playerController', () => {
    // // 引入useGetFileURL中的变量和函数
    // const { fileURL, getFileURL } = useGetFileURL();

    // 设置播放列表
    const playlist = ref([]);
    const orderList = ref([]);
    const setPlaylist = (list) => {
        playlist.value = list;
        orderList.value = list;
    };
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
    // 设置当前播放的索引
    const currentPlayIndex = ref(-1);
    const setCurrentPlayIndex = (index) => {
        currentPlayIndex.value = index;
    };
    // 设置播放模式
    const mode = ref(0);
    const setPlayMode = (newMode) => {
        mode.value = newMode;
    };
    // 当前音乐
    const currentMusic = computed(() => {
        return playlist.value[currentPlayIndex.value] || {};
    });
    // 当前音乐信息
    const currentMusicInfo = computed(() => {
        if (playlist.value[currentPlayIndex.value]) {
            return playlist.value[currentPlayIndex.value].tag.tags;
        } else {
            return {};
        }
    });
    return {
        playlist,
        orderList,
        setPlaylist,
        audioElement,
        setAudioElement,
        isPlaying,
        setPlaying,
        currentPlayIndex,
        setCurrentPlayIndex,
        mode,
        setPlayMode,
        currentMusic,
        currentMusicInfo,
    };
});
