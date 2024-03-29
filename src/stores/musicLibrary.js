import localforage from 'localforage';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getMusicCover } from '../utils/getMusicCover';

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
    const addToMusicLibrary = (item) => {
        // console.log(item);
        item.forEach((item) => {
            if (
                !musicLibrary.value.some(
                    (music) => music.filename === item.filename
                )
            ) {
                let musicItem = {
                    filename: item.filename,
                    basename: item.basename,
                };
                musicLibrary.value.push(musicItem);
            }
        });
    };
    // 添加标签到音乐
    const addTagsToMusic = (filename, tags) => {
        // console.log('标签信息：', tags);
        const music = musicLibrary.value.find(
            (item) => item.filename === filename
        );
        if (music && !music.tags) {
            // console.log('添加标签');
            music.tags = {
                title: tags.tags.title,
                artist: tags.tags.artist,
                album: tags.tags.album,
                cover: getMusicCover(tags.tags.picture),
                mainColor: tags.tags.mainColor,
                lyrics: tags.tags.lyrics,
            };
        }
    };
    // 获取音乐标签
    const getMusicTagsByFilename = (filename) => {
        const music = musicLibrary.value.find(
            (item) => item.filename === filename
        );
        if (music.tags) {
            return music.tags;
        } else {
            return {};
        }
    };
    // 从音乐库中删除音乐
    const removeMusicFromLibrary = (musicArray) => {
        musicLibrary.value = musicLibrary.value.filter((item) => {
            return !musicArray.includes(item.filename);
        })
    }
    // 保存音乐库到本地
    const saveMusicLibraryToLocal = async () => {
        try {
            await localforage.setItem(
                'musicLibrary',
                JSON.parse(JSON.stringify(musicLibrary.value))
            );
            // console.log('保存成功');
        } catch (error) {
            console.error('failed to update musicLibrary', error);
        }
    };
    return {
        musicLibrary,
        addToMusicLibrary,
        loadMusicLibrary,
        addTagsToMusic,
        getMusicTagsByFilename,
        removeMusicFromLibrary,
        saveMusicLibraryToLocal,
    };
});
