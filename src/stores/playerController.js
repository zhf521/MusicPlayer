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
    // // 当前音乐的信息
    // const currentMusicInfo = ref(null);
    // const orderList = ref([]);
    // // 加载音乐
    // const loadMusic = async (list, index, autoPlay) => {
    //     if (!compareArrays(list, playlist.value)) {
    //         console.log('播放列表不相同');
    //         playlist.value = list;
    //         orderList.value = list;
    //     }
    //     try {
    //         await getFileURL(playlist.value[index].filename);
    //         audioElement.value.src = fileURL.value;
    //         currentPlayIndex.value = index;
    //         currentMusicInfo.value = playlist.value[index].tag.tags;
    //         if (autoPlay) {
    //             audioElement.value.play();
    //             isPlaying.value = true;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // // 切换播放、暂停
    // const togglePlay = () => {
    //     if (isPlaying.value) {
    //         audioElement.value.pause();
    //         isPlaying.value = false;
    //     } else {
    //         audioElement.value.play();
    //         isPlaying.value = true;
    //     }
    // };
    // // 上一曲
    // const prev = () => {
    //     if (currentPlayIndex.value > 0) {
    //         const newIndex = currentPlayIndex.value - 1;
    //         loadMusic(playlist.value, newIndex, true);
    //     } else {
    //         const newIndex = playlist.value.length - 1;
    //         loadMusic(playlist.value, newIndex, true);
    //     }
    // };
    // // 下一曲
    // const next = () => {
    //     if (currentPlayIndex.value === playlist.value.length - 1) {
    //         const newIndex = 0;
    //         loadMusic(playlist.value, newIndex, true);
    //     } else {
    //         const newIndex = currentPlayIndex.value + 1;
    //         loadMusic(playlist.value, newIndex, true);
    //     }
    // };

    // // 设置播放状态
    // const setPlayState = (state) => {
    //     isPlaying.value = state;
    // };
    // // 选择播放（设置列表和当前音乐）
    // const selectPlay = (list, index) => {
    //     setPlaylist(list);
    //     setCurrentPlayIndex(index);
    //     setPlaying(true);
    // };
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
        // loadMusic,
        // loadMusic,
        // togglePlay,
        // prev,
        // next,
        // currentMusicInfo,
    };
});
