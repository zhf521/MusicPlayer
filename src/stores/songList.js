import { defineStore } from 'pinia';
import { ref } from 'vue';
import localforage from 'localforage';

export const useSongListStore = defineStore('songList', () => {
    // 歌单
    const songList = ref([]);
    // 加载歌单
    const loadSongList = async () => {
        try {
            const res = await localforage.getItem('songList');
            if (res) {
                songList.value = res;
            }
        } catch (error) {
            console.error('failed to load songList', error);
        }
    };
    // 创建歌单
    const createSongList = (newSongList) => {
        // console.log('创建歌单', newSongList);
        if (!newSongList) {
            throw new Error('歌单名称不能为空');
        } else if (songList.value.find((item) => item.name === newSongList)) {
            // console.log('歌单已存在');
            throw new Error('歌单已存在');
        } else {
            songList.value.push({ name: newSongList, songs: [] });
        }
    };
    // 添加歌曲到歌单
    const addSongsToSongList = (songs, songListName) => {
        console.log('songs', songs, 'songListName', songListName);
        const targetSongList = songList.value.find(
            (item) => item.name === songListName
        );
        songs.forEach((song) => {
            if (!targetSongList.songs.find((item) => item === song)) {
                targetSongList.songs.push(song);
            }
        });
    };
    // 保存歌单到本地
    const saveSongListToLocal = async () => {
        try {
            await localforage.setItem(
                'songList',
                JSON.parse(JSON.stringify(songList.value))
            );
        } catch (error) {
            console.error('failed to update songList', error);
        }
    };
    return {
        songList,
        loadSongList,
        createSongList,
        addSongsToSongList,
        saveSongListToLocal,
    };
});
