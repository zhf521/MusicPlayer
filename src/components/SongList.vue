<template>
  <div class="song-list-container">
    <div class="song-list-item" v-for="(item, index) in songList" :key="index" @click="handleClick(item)">
      <div class="music-info">
        <img class="cover" :src="item.songs[0] ? getMusicTagsByFilename(item.songs[0]).cover : '/defaultCover.png'"
          alt="歌单封面">
        <div class="details">
          <div class="name">{{ item.name }}</div>
          <div class="number">共{{ item.songs.length }}首</div>
        </div>
      </div>
      <div class="more">
        <MoreIcon theme="outline" size="32" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { MoreOne as MoreIcon } from '@icon-park/vue-next';
import { useSongListStore } from '@/stores/songList';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useMusicLibraryStore } from '@/stores/musicLibrary';

// 引入songListStore中的变量
const songListStore = useSongListStore();
const { songList } = storeToRefs(songListStore);
// 引入musicLibraryStore中的方法
const musicLibraryStore = useMusicLibraryStore();
const { getMusicTagsByFilename } = musicLibraryStore;

const router = useRouter();
const handleClick = (item) => {
  // console.log(item);
  router.push({ name: 'song-list-details', params: { name: item.name } });
};
</script>
<style scoped lang="less">
.song-list-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .song-list-item {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 7px;
    padding: 10px;

    .music-info {
      height: 100%;
      display: flex;
      align-items: center;
      overflow: hidden;

      .cover {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        object-fit: cover;
      }

      .details {
        height: 100%;
        margin-left: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .name {
          height: 40%;
          font-size: 16px;
          line-height: 20px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .number {
          height: 40%;
          line-height: 20px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .more {}

    &:hover {
      background-color: #F2F3F4;
    }
  }
}
</style>