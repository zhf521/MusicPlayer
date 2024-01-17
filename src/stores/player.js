import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useGetFileURL } from '../hooks/useGetFileURL';
import { useHistoryStore } from './history';

export const usePlayerStore = defineStore('player', () => {
    const { fileURL, getFileURL } = useGetFileURL();
    const audio = new Audio(); // audio标签
    // 加载音乐
    const loadMusic = async (filename) => {
        // console.log('文件名:', filename);
        await getFileURL(filename);
        // console.log('文件URL:', fileURL.value);
        audio.src = fileURL.value;
    };
    // 播放音乐
    const play = () => {
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
    // 设置播放列表
    const setPlaylist = (list) => {
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
    const prev = async () => {
        if (playMode.value === 0) {
            let index = currentPlayIndex.value - 1;
            if (index < 0) {
                index = playlist.value.length - 1;
            }
            // console.log('点击上一曲获取到的索引：', index);
            setCurrentPlayIndex(index);
            await loadMusic(currentPlayMusic.value);
            play();
        } else {
            let index = Math.floor(Math.random() * playlist.value.length);
            setCurrentPlayIndex(index);
            await loadMusic(currentPlayMusic.value);
            play();
        }
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
    const next = async () => {
        if (playMode.value === 0) {
            let index = currentPlayIndex.value + 1;
            if (index > playlist.value.length - 1) {
                index = 0;
            }
            setCurrentPlayIndex(index);
            await loadMusic(currentPlayMusic.value);
            play();
        } else {
            let index = Math.floor(Math.random() * playlist.value.length);
            setCurrentPlayIndex(index);
            await loadMusic(currentPlayMusic.value);
            play();
        }
    };
    // 监听音频结束
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
    const musicDurationTime = ref(0); // 音频总时间
    const historyStore = useHistoryStore();
    const { addToHistory, saveHistoryToLocal } = historyStore;
    // 监听音频可以播放
    audio.oncanplay = async () => {
        // console.log('音频可以播放');
        musicDurationTime.value = audio.duration;
        // 添加到历史记录并保存到本地
        addToHistory(playlist.value, currentPlayIndex.value);
        await saveHistoryToLocal();
    };
    const musicCurrentTime = ref(0); // 音频当前时间
    // 监听音频时间变化
    audio.ontimeupdate = () => {
        // console.log('时间变化', audio.currentTime);
        musicCurrentTime.value = audio.currentTime;
    };
    // 设置当前播放时间
    const setCurrentTime = (time) => {
        audio.currentTime = time;
    };
    const musicCurrentVolume = ref(audio.volume); // 音频当前音量
    // 设置音量
    const setVolume = (volume) => {
        audio.volume = volume;
        musicCurrentVolume.value = volume;
    };
    return {
        audio,
        loadMusic,
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
        musicDurationTime,
        musicCurrentTime,
        setCurrentTime,
        musicCurrentVolume,
        setVolume,
    };
});
