import { useGetFileURL } from '@/hooks/useGetFileURL';
import { compareArrays } from '@/utils/compareArrays';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const usePlayerControllerStore = defineStore('playerController', () => {
    // 引入useGetFileURL中的变量和函数
    const { fileURL, getFileURL } = useGetFileURL();
    // audio元素
    const audioElement = ref(null);
    // 播放状态，是否播放
    const isPlaying = ref(false);
    // 正在播放列表
    const playList = ref([]);
    // 顺序播放列表
    const orderList = ref([]);
    // 当前播放音乐的索引
    const currentIndex = ref(-1);
    // // 当前播放的音乐
    // const currentMusic = computed(() => {
    //     return playList.value[currentIndex.value] || {};
    // });
    // // 播放模式，默认模式为顺序播放
    // const mode = ref(1);

    // 设置audio元素
    const setAudioElement = (audio) => {
        audioElement.value = audio;
    };
    // 加载并播放音乐
    const loadAndPlayMusic = async (list, index) => {
        if (!compareArrays(list, playList.value)) {
            console.log('播放列表不相同');
            setPlayList(list);
        }
        try {
            await getFileURL(playList.value[index].filename);
            audioElement.value.src = fileURL.value;
            audioElement.value.play();
            currentIndex.value = index;
            isPlaying.value = true;
        } catch (error) {
            console.log(error);
        }
    };
    // 切换播放、暂停
    const togglePlay = () => {
        if (isPlaying.value) {
            audioElement.value.pause();
            isPlaying.value = false;
        } else {
            audioElement.value.play();
            isPlaying.value = true;
        }
    };
    // 设置正在播放列表
    const setPlayList = (list) => {
        playList.value = list;
        // 顺序播放列表同样是这个正在播放的列表
        orderList.value = list;
    };
    // // 设置播放状态
    // const setPlayState = (state) => {
    //     isPlaying.value = state;
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
        loadAndPlayMusic,
        togglePlay,
        setPlayList,
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
