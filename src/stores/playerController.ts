import { useGetFileURL } from '@/hooks/useGetFileURL';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerControllerStore = defineStore('playerController', () => {
    // 引入useGetFileURL中的变量和函数
    const { fileURL, getFileURL } = useGetFileURL();
    // audio元素
    const audioElement = ref(null);
    // 播放状态，是否播放
    const isPlaying = ref(false);
    // // 播放模式，默认模式为顺序播放
    // const mode = ref(1);
    // // 正在播放列表
    // const playList = ref([]);
    // // 顺序播放列表
    // const orderList = ref([]);
    // // 当前播放音乐的索引
    // const currentIndex = ref(-1);
    // // 当前播放的音乐
    // const currentMusic = computed(() => {
    //     return playList.value[currentIndex.value] || {};
    // });
    // 设置audio元素
    const setAudioElement = (audio) => {
        audioElement.value = audio;
    };
    // 加载并播放音乐
    const loadAndPlayMusic = async (list, index) => {
        try {
            await getFileURL(list[index].filename);
            audioElement.value.src = fileURL.value;
            audioElement.value.play();
            isPlaying.value = true;
        } catch (error) {
            console.log(error);
        }
    };
    // 设置播放状态
    const setPlayState = (state) => {
        isPlaying.value = state;
    };
    // // 设置正在播放列表
    // const setPlayList = (list) => {
    //     playList.value = list;
    //     // 顺序播放列表同样是这个正在播放的列表
    //     orderList.value = list;
    // };
    // // 选择播放（设置列表和当前音乐）
    // const selectPlay = (list, index) => {
    //     setPlayList(list);
    //     setCurrentIndex(index);
    //     setPlaying(true);
    // };
    // // 设置当前播放索引
    // const setCurrentIndex = (index) => {
    //     currentIndex.value = index;
    // };
    // // 设置播放模式
    // const setMode = (newMode) => {
    //     mode.value = newMode;
    // };
    return {
        audioElement,
        setAudioElement,
        isPlaying,
        setPlayState,
        loadAndPlayMusic,
        // mode,
        // playList,
        // orderList,

        // currentIndex,
        // currentMusic,
        // setPlayList,
        // selectPlay,

        // setCurrentIndex,
        // setMode,
    };
});
