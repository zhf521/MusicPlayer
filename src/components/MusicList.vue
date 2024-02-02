<template>
  <div class="music-list-container">
    <div class="header">
      <div class="total">共{{ musicList.length }}首</div>
      <!-- <div class="clear" @click="clearList">清空列表</div> -->
    </div>
    <div class="music-list-content">
      <div :class="{ 'music-list-item': true, 'active': props.isHighlight(item,index) }" v-for="(item, index) in musicList"
        :key="index" @dblclick="dblclickItem(index)">
        <div class="music-info">
          <img :src="item.cover ? item.cover : '/defaultCover.png'" alt="音乐封面" class="cover">
          <div class="details">
            <div class="title">{{ item.title ? item.title : item.filename.split('/').pop().split('.').slice(0,
              -1).join('.') }}</div>
            <div class="artist-album">{{ item.artist ? item.artist : '未知艺术家' }} - {{ item.album ?
              item.album : '未知专辑'
            }}</div>
          </div>
        </div>
        <div class="more">
          <MoreIcon theme="outline" size="32" @click="clickMore(index)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { MoreOne as MoreIcon } from '@icon-park/vue-next';
import { computed } from 'vue';
import { useMusicLibraryStore } from '@/stores/musicLibrary';
import { usePlayerStore } from '@/stores/player';
import { storeToRefs } from 'pinia';

// 引入musicLibraryStore中的变量
const musicLibraryStore = useMusicLibraryStore();
const { getMusicTagsByFilename } = musicLibraryStore;
// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { currentPlayMusic } = storeToRefs(playerStore);

const props = defineProps({
  list: Array,
  isHighlight: {
    type: Function,
    default: () => false,
  }
});
const emits = defineEmits(['itemDblclick', 'moreClick']);

// 列表
const musicList = computed(() => {
  // console.log('接收到的列表', props.list);
  return props.list.map(item => {
    if (JSON.stringify(getMusicTagsByFilename(item)) === '{}') {
      return { filename: item };
    } else {
      return { filename: item, ...getMusicTagsByFilename(item) };
    }
  });
});
// 双击列表项目
const dblclickItem = (index) => {
  // console.log('双击了', item);
  emits('itemDblclick', index);
};
// 点击更多
const clickMore = (index) => {
  emits('moreClick', index);
};
</script>
<style scoped lang="less">
.music-list-container {
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

  .music-list-content {
    width: 100%;
    height: calc(100% - 35px);
    overflow-y: auto;

    .music-list-item {
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

          .title {
            height: 40%;
            font-size: 16px;
            line-height: 20px;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .artist-album {
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

      &.active {
        background-color: #F2F3F4;

        .details {
          .title {
            font-weight: 550;
            color: blue;
          }

          .artist-album {
            color: blue;
          }
        }
      }
    }
  }
}
</style>