import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSongListStore = defineStore('songList', () => {
    // 歌单
  const songList = ref([]);
  
    return {
        songList,
    };
});
