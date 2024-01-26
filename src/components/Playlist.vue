<template>
  <div class="playlist-container">
    <div class="header">
      <div class="total">共{{ list.length }}首</div>
      <div class="clear" @click="clearList">清空列表</div>
    </div>
    <div class="playlist-content">
      <div :class="{ 'list-item': true, 'active': index === currentPlayIndex }" v-for="(item, index) in list"
        :key="item.filename" @dblclick="selectPlay(index)">
        <img :src="item.cover ? item.cover : '/defaultCover.png'" alt="音乐封面" class="cover">
        <div class="details">
          <div class="title">{{ item.title ? item.title : item }}</div>
          <div class="artist-album">
            <span>{{ item.artist ? item.artist : '未知艺术家' }}</span> - <span>{{ item.album ?
              item.album : '未知专辑'
            }}</span>
          </div>
        </div>
        <div class="more">
          <MoreIcon theme="outline" size="32" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { MoreOne as MoreIcon } from '@icon-park/vue-next';
import { computed } from 'vue';
import { usePlayerStore } from '../stores/player';
import { storeToRefs } from 'pinia';
import { useMusicLibraryStore } from '../stores/musicLibrary';

// 引入playerStore中的变量和函数
const playerStore = usePlayerStore();
const { playlist, currentPlayMusic, currentPlayIndex } = storeToRefs(playerStore);
const { loadMusic, play, setPlaylist, setCurrentPlayIndex, } = playerStore;
// 引入musicLibraryStore中的函数
const musicLibraryStore = useMusicLibraryStore();
const { getMusicTagsByFilename } = musicLibraryStore;

// 清空列表
const clearList = () => {
  setPlaylist([]);
};
// 列表
const list = computed(() => {
  // console.log('playlist', playlist.value);
  // console.log('list', props.list.map(item => {
  //   if (JSON.stringify(getMusicTagsByFilename(item)) === '{}') {
  //     return item.split('/').pop().split('.').slice(0, -1).join('.');
  //   } else {
  //     return getMusicTagsByFilename(item);
  //   }
  // }));
  return playlist.value.map(item => {
    if (JSON.stringify(getMusicTagsByFilename(item)) === '{}') {
      return item.split('/').pop().split('.').slice(0, -1).join('.');
    } else {
      return getMusicTagsByFilename(item);
    }
  });
});
// 选择播放
const selectPlay = async (index) => {
  // console.log('当前播放的音乐', currentPlayMusic.value);
  if (playlist.value[index] !== currentPlayMusic.value) {
    // console.log('点击的不是当前播放的音乐');
    setCurrentPlayIndex(index);
    await loadMusic(currentPlayMusic.value);
    play();
  } else {
    // console.log('点击的是当前播放的音乐');
    return;
  }
};
</script>
<style scoped lang="less">
.playlist-container {
  width: 100%;
  height: 100%;
  padding-top: 5px;

  .header {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    .total {
      margin-left: 10px;
      line-height: 30px;
    }

    .clear {
      width: 80px;
      text-align: center;
      margin-right: 10px;
      line-height: 30px;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background-color: #F2F3F4;
      }
    }
  }

  .playlist-content {
    width: 100%;
    height: calc(100% - 35px);
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
}
</style>