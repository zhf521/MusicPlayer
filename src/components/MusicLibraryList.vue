<template>
  <div class="music-list-container">
    <div :class="{ 'list-item': true, 'active': currentPlayMusic === item.filename }" v-for="(item, index) in list"
      :key="item.filename" @dblclick="selectPlay(index)">
      <img :src="item.tags ? item.tags.cover : '/defaultCover.png'" alt="音乐封面" class="cover">
      <div class="details">
        <div class="title">{{ item.tags ? item.tags.title : item.basename }}</div>
        <div class="artist-album">
          <span>{{ item.tags ? item.tags.artist : '未知艺术家' }}</span> - <span>{{ item.tags ?
            item.tags.album : '未知专辑'
          }}</span>
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
import { computed } from 'vue';
import { compareArrays } from '../utils/compareArrays';
import { usePlayerStore } from '../stores/player';
import { storeToRefs } from 'pinia';

// 引入playerStore中的变量和函数
const playerStore = usePlayerStore();
const { playlist, currentPlayMusic } = storeToRefs(playerStore);
const { loadMusic, play, setPlaylist, setCurrentPlayIndex, } = playerStore;

const props = defineProps(['list']);

// 音乐列表
const musicList = computed(() => {
  // console.log('音乐列表：', props.list.map(item => item.filename));
  return props.list.map(item => item.filename);
});
// 选择播放
const selectPlay = async (index) => {
  if (compareArrays(musicList.value, playlist.value)) {
    // console.log('播放列表相同');
    if (musicList.value[index] !== currentPlayMusic.value) {
      // console.log('点击的不是当前播放的音乐');
      setCurrentPlayIndex(index);
      await loadMusic(currentPlayMusic.value);
      play();
    } else {
      // console.log('点击的是当前播放的音乐');
      return;
    }
  } else {
    // console.log('播放列表不同');
    setPlaylist(musicList.value);
    setCurrentPlayIndex(index);
    await loadMusic(currentPlayMusic.value);
    play();
  }
};
</script>
<style scoped lang="less">
.music-list-container {
  width: 100%;
  height: 100%;
  overflow: auto;

  .list-item {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 10px;

    &:hover {
      background-color: #F2F3F4;
    }

    .cover {
      width: 50px;
      height: 50px;
      border-radius: 10%;
      object-fit: cover;
    }

    .details {
      margin-left: 10px;

      .title {
        font-size: 16px;
        font-weight: 500;
      }

      .artist-album {
        font-size: 14px;
        color: #777777;
      }
    }

    .more {
      margin-left: auto;
    }

    &.active {
      background-color: #3780CE;

      .title {
        color: #FFFFFF;
      }

      .artist-album {
        color: #CFCFCF;
      }

      .more {
        color: #FFFFFF;
      }
    }
  }
}
</style>