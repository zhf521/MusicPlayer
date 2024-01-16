import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useGetFileURL } from '../hooks/useGetFileURL';

export const usePlayerStore = defineStore('player', () => {
    const { fileURL, getFileURL } = useGetFileURL();
    const audio = new Audio(); // audio标签
    // 播放
    const play = async (filename) => {
        // console.log('文件名:', filename);
        await getFileURL(filename);
        // console.log('文件URL:',fileURL.value);
        audio.src = fileURL.value;
        audio.currentTime = 0;
        audio.play();
        isPlaying.value = true;
    };
    const isPlaying = ref(false); // 播放状态
    // 切换播放
    const togglePlay = () => {
        isPlaying.value = !isPlaying.value;
        if (isPlaying.value) {
            audio.play();
        } else {
            audio.pause();
        }
    };
    const playlist = ref([]); // 播放列表
    // 设置播放列表
    const setPlaylist = (list) => {
        // console.log('传入到设置播放列表的列表：', list);
        playlist.value = list;
        // console.log('设置完的播放列表：', playlist.value);
    };
    const currentPlayIndex = ref(-1); // 当前播放的索引
    // 设置当前播放的索引
    const setCurrentPlayIndex = (index) => {
        currentPlayIndex.value = index;
    };
    // 当前播放的音乐
    const currentPlayMusic = computed(() => {
        // console.log('当前播放的音乐：', playlist.value[currentPlayIndex.value]);
        return playlist.value[currentPlayIndex.value];
    });
    // 上一曲
    const prev = () => {
        let index = currentPlayIndex.value - 1;
        if (index < 0) {
            index = playlist.value.length - 1;
        }
        // console.log('点击上一曲获取到的索引：', index);
        setCurrentPlayIndex(index);
        play(currentPlayMusic.value);
    };

    // // 播放模式数组
    // const playModes = [
    //     {
    //         id: 0,
    //         iconTitle: '列表循环',
    //         iconName: 'list-loop',
    //     },
    //     {
    //         id: 1,
    //         iconTitle: '单曲循环',
    //         iconName: 'one-loop',
    //     },
    //     {
    //         id: 2,
    //         iconTitle: '随机播放',
    //         iconName: 'random',
    //     },
    // ];
    // // 设置播放状态
    // const isPlaying = ref(false);
    // const setPlaying = (state) => {
    //     isPlaying.value = state;
    // };
    // // 设置播放列表

    // const orderList = ref([]);
    // const setPlaylist = (list) => {
    //     playlist.value = list;
    //     orderList.value = list;
    // };
    // // 设置当前播放的索引
    // const currentPlayIndex = ref(-1);
    // const setCurrentPlayIndex = (index) => {
    //     currentPlayIndex.value = index;
    // };
    // // 当前音乐
    // const currentMusic = computed(() => {
    //     return playlist.value[currentPlayIndex.value] || {};
    // });
    // // 设置播放模式
    // const mode = ref(0);
    // const setPlayMode = (newMode) => {
    //     mode.value = newMode;
    // };
    return {
        audio,
        play,
        isPlaying,
        togglePlay,
        playlist,
        setPlaylist,
        currentPlayIndex,
        setCurrentPlayIndex,
        currentPlayMusic,
        prev,
    };
});
