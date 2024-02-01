import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useGetFileURL } from '../hooks/useGetFileURL';
import { useHistoryStore } from './history';
import Lyric from 'lrc-file-parser';
import { useMusicLibraryStore } from './musicLibrary';

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
    const playList = ref([]); // 播放列表
    // 设置播放列表
    const setPlayList = (list) => {
        playList.value = list;
        // console.log('设置完的播放列表：', playList.value);
    };
    const currentPlayIndex = ref(-1); // 当前播放的索引
    // 设置当前播放的索引
    const setCurrentPlayIndex = (index) => {
        currentPlayIndex.value = index;
    };
    // 当前播放的音乐
    const currentPlayMusic = computed(() => {
        // console.log('当前播放的音乐：', playlist.value[currentPlayIndex.value]);
        return playList.value[currentPlayIndex.value];
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
    // 引入historyStore中的方法
    const historyStore = useHistoryStore();
    const { addToHistory, saveHistoryToLocal } = historyStore;
    const currentMusicTags = ref({}); // 音乐标签
    // 引入musicLibraryStore中的方法
    const musicLibraryStore = useMusicLibraryStore();
    const { getMusicTagsByFilename } = musicLibraryStore;
    // 监听音频可以播放
    audio.oncanplay = async () => {
        // console.log('音频可以播放');
        musicDurationTime.value = audio.duration;
        // 获取音乐标签
        currentMusicTags.value = getMusicTagsByFilename(currentPlayMusic.value);
        // 设置歌词
        lrc.setLyric(currentMusicTags.value.lyrics.lyrics);
        // 添加到历史记录并保存到本地
        addToHistory(playlist.value, currentPlayIndex.value);
        await saveHistoryToLocal();
    };
    const musicCurrentTime = ref(0); // 音频当前时间
    // 监听音频时间变化
    audio.ontimeupdate = () => {
        // console.log('时间变化', audio.currentTime);
        musicCurrentTime.value = audio.currentTime;
        lrc.play(audio.currentTime * 1000);
    };
    // 监听音频暂停
    audio.onpause = () => {
        lrc.pause();
    };
    // 设置当前播放时间
    const setCurrentTime = (time) => {
        audio.currentTime = time;
    };
    const isPure = ref(false); // 是否开启纯净模式
    // 设置纯净模式
    const setPure = (state) => {
        isPure.value = state;
    };
    const currentLrcIndex = ref(0); // 当前歌词索引
    const lrcLines = ref([]); // 歌词
    // 歌词解析器
    let lrc = new Lyric({
        onPlay: function (line, text) {
            // line：当前播放行的索引，text：当前播放行的歌词
            currentLrcIndex.value = line;
        },
        onSetLyric: function (lines) {
            // lines：歌词
            lrcLines.value = lines;
        },
        // 偏移时间，默认为0ms
        offset: 150,
        // 播放速度，默认为1
        playbackRate: 1,
        // 是否去除空行：默认为true
        isRemoveBlankLine: true,
    });
    const showList = ref(false); // 是否显示播放列表
    // 设置显示播放列表
    const setShowList = (state) => {
        showList.value = state;
    };
    return {
        audio,
        loadMusic,
        play,
        isPlaying,
        togglePlay,
        playList,
        setPlayList,
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
        currentMusicTags,
        musicCurrentTime,
        setCurrentTime,
        isPure,
        setPure,
        currentLrcIndex,
        lrcLines,
        lrc,
        showList,
        setShowList,
    };
});
