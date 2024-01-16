import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useGetFileURL } from '../hooks/useGetFileURL';
import { randomShuffle } from '../utils/randomShuffle';

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
    // 切换播放、暂停
    const togglePlay = () => {
        isPlaying.value = !isPlaying.value;
        if (isPlaying.value) {
            audio.play();
        } else {
            audio.pause();
        }
    };
    const playlist = ref([]); // 播放列表
    const orderList = ref([]); // 顺序列表
    // 设置播放列表
    const setPlaylist = (list) => {
        // console.log('传入到设置播放列表的列表：', list);
        playlist.value = list;
        orderList.value = list;
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
    const loopMode = ref(0); // 循环模式
    // 设置循环模式
    const setLoopMode = (mode) => {
        loopMode.value = mode;
    };
    const playMode = ref(0); // 播放模式
    // 设置播放模式
    const setPlayMode = (mode) => {
        playMode.value = mode;
    };
    // 下一曲
    const next = () => {
        let list = [];
        // console.log('当前播放模式：', playMode.value);
        switch (playMode.value) {
            case 0:
                list = orderList.value;
                // console.log('顺序时的列表：', list);
                break;
            case 1:
                list = randomShuffle(orderList.value);
                // console.log('随机时的列表：', list);
                break;
        }
        let newIndex = list.findIndex(
            (item) => item === currentPlayMusic.value
        );
        // console.log('当前的索引：', newIndex);
        setCurrentPlayIndex(newIndex);
        setPlaylist(list);
        let index = currentPlayIndex.value + 1;
        if (index > playlist.value.length - 1) {
            index = 0;
        }
        // console.log('点击下一曲获取到的索引：', index);
        setCurrentPlayIndex(index);
        play(currentPlayMusic.value);
    };
    audio.onended = () => {
        // console.log('播放结束');
        if (loopMode.value === 0) {
            // 列表循环
            next();
        } else {
            // 单曲循环
            audio.currentTime = 0;
            audio.play();
        }
    };
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
        loopMode,
        setLoopMode,
        playMode,
        setPlayMode,
        next,
    };
});
