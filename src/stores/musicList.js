import localforage from 'localforage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMusicListStore = defineStore('musicList', () => {
    // 音乐列表
    const musicList = ref({});
    // 加载音乐列表
    const loadMusicList = async () => {
        try {
            const res = await localforage.getItem('musicList');
            if (res) {
                musicList.value = res;
            }
        } catch (error) {
            console.error('failed to load music List', error);
        }
    };
    // 添加到音乐列表
  const addToMusicList = (key, list) => {
      
    };
    // 保存音乐列表到本地
    const saveMusicListToLocal = async () => {
        try {
            await localforage.setItem(
                'musicList',
                JSON.parse(JSON.stringify(musicList.value))
            );
            // console.log('保存成功');
        } catch (error) {
            console.error('failed to update musicList', error);
        }
    };
    return {
        musicList,
        loadMusicList,
        addToMusicList,
        saveMusicListToLocal,
    };
});
