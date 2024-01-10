import { useGetFileURL } from '@/hooks/useGetFileURL';
import { compareArrays } from '@/utils/compareArrays';
import { randomShuffle } from '@/utils/randomShuffle';
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
    const playlist = ref([]);
    // 顺序的列表
    const orderList = ref([]);
    // 当前播放音乐的索引
    const currentPlayIndex = ref(-1);
    // 播放模式，默认模式为列表循环
    const mode = ref(0);
    // 当前播放的音乐
    const currentMusic = computed(() => {
        return playlist.value[currentPlayIndex.value] || {};
    });
    // 当前音乐的信息
    const currentMusicInfo = ref(null);

    // 设置audio元素
    const setAudioElement = (audio) => {
        audioElement.value = audio;
    };
    // 加载音乐
    const loadMusic = async (list, index, autoPlay) => {
        if (!compareArrays(list, playlist.value)) {
            console.log('播放列表不相同');
            playlist.value = list;
            orderList.value = list;
        }
        try {
            await getFileURL(playlist.value[index].filename);
            audioElement.value.src = fileURL.value;
            currentPlayIndex.value = index;
            currentMusicInfo.value = playlist.value[index].tag.tags;
            if (autoPlay) {
                audioElement.value.play();
                isPlaying.value = true;
            }
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
    // 上一曲
    const prev = () => {
        if (currentPlayIndex.value > 0) {
            const newIndex = currentPlayIndex.value - 1;
            loadMusic(playlist.value, newIndex, true);
        } else {
            const newIndex = playlist.value.length - 1;
            loadMusic(playlist.value, newIndex, true);
        }
    };
    // 下一曲
    const next = () => {
        if (currentPlayIndex.value === playlist.value.length - 1) {
            const newIndex = 0;
            loadMusic(playlist.value, newIndex, true);
        } else {
            const newIndex = currentPlayIndex.value + 1;
            loadMusic(playlist.value, newIndex, true);
        }
    };
    // 设置播放模式
    const setMode = (newMode) => {
        mode.value = newMode;
        if (mode.value === 1) {
            // 单曲循环
            return;
        } else {
            let list = [];
            switch (mode.value) {
                // 列表循环
                case 0:
                    list = orderList.value;
                    break;
                // 随机播放
                case 2:
                    list = randomShuffle(orderList.value);
                    break;
            }
            // 获取当前歌曲在顺序列表中的索引
            const index = playlist.value.findIndex(
                (item) => item.filename === currentMusic.value.filename
            );
            // 设置当前索引
            currentPlayIndex.value = index;
            playlist.value = list;
        }
    };
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
        audioElement,
        setAudioElement,
        isPlaying,
        loadMusic,
        loadMusic,
        togglePlay,
        prev,
        next,
        mode,
        setMode,
        currentPlayIndex,
        currentMusic,
        playlist,
        currentMusicInfo,
    };
});
