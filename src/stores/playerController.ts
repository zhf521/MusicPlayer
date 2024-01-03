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
    const playList = ref([]);
    // 顺序的列表
    const orderList = ref([]);
    // 当前播放音乐的索引
    const currentIndex = ref(-1);
    // 播放模式，默认模式为列表循环
    const mode = ref(0);
    // 当前播放的音乐
    const currentMusic = computed(() => {
        return playList.value[currentIndex.value] || {};
    });
    // 当前音乐的信息
    const currentMusicInfo = ref(null);

    // 设置audio元素
    const setAudioElement = (audio) => {
        audioElement.value = audio;
    };
    // 加载并播放音乐
    const loadAndPlayMusic = async (list, index) => {
        if (!compareArrays(list, playList.value)) {
            console.log('播放列表不相同');
            playList.value = list;
            orderList.value = list;
        }
        try {
            await getFileURL(playList.value[index].filename);
            audioElement.value.src = fileURL.value;
            audioElement.value.play();
            currentIndex.value = index;
            currentMusicInfo.value = playList.value[index].tag.tags;
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
    // 上一曲
    const prev = () => {
        if (currentIndex.value > 0) {
            const newIndex = currentIndex.value - 1;
            loadAndPlayMusic(playList.value, newIndex);
        } else {
            const newIndex = playList.value.length - 1;
            loadAndPlayMusic(playList.value, newIndex);
        }
    };
    // 下一曲
    const next = () => {
        if (currentIndex.value === playList.value.length - 1) {
            const newIndex = 0;
            loadAndPlayMusic(playList.value, newIndex);
        } else {
            const newIndex = currentIndex.value + 1;
            loadAndPlayMusic(playList.value, newIndex);
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
            const index = playList.value.findIndex(
                (item) => item.filename === currentMusic.value.filename
            );
            // 设置当前索引
            currentIndex.value = index;
            playList.value = list;
        }
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
    return {
        audioElement,
        setAudioElement,
        isPlaying,
        loadAndPlayMusic,
        togglePlay,
        prev,
        next,
        mode,
        setMode,
        currentIndex,
        currentMusic,
        playList,
        currentMusicInfo,
    };
});
