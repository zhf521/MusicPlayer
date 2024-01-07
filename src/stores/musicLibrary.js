import localforage from 'localforage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMusicLibraryStore = defineStore('musicLibrary', () => {
    // 音乐库
    const musicLibrary = ref([]);
    // 加载音乐库
    const loadMusicLibrary = async () => {
        try {
            const res = await localforage.getItem('musicLibrary');
            if (res) {
                musicLibrary.value = res;
            }
        } catch (error) {
            console.error('failed to load music library', error);
        }
    };
    // 添加到音乐库
    const addToMusicLibrary = async (item) => {
        musicLibrary.value.push(item);
        try {
            console.log(JSON.parse(JSON.stringify(musicLibrary.value)));
            await localforage.setItem(
                'musicLibrary',
                JSON.parse(JSON.stringify(musicLibrary.value))
            );
        } catch (error) {
            console.error('failed to update music library', error);
        }
    };
    // 添加标签到音乐
    const addTagToMusic = async (filename, tag) => {
        const music = musicLibrary.value.find(
            (item) => item.filename === filename
        );
        if (music) {
            music.tag = tag;
        }
        try {
            await localforage.setItem(
                'musicLibrary',
                JSON.parse(JSON.stringify(musicLibrary.value))
            );
        } catch (error) {
            console.error('failed to update music library', error);
        }
    };
    return {
        musicLibrary,
        addToMusicLibrary,
        loadMusicLibrary,
        addTagToMusic,
    };
});
