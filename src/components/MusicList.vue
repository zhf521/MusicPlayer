<template>
  <div class="music-list-container">
    <div class="header">
      <div class="total">共{{ musicList.length }}首</div>
      <!-- <div class="clear" @click="clearList">清空列表</div> -->
    </div>
    <div class="music-list-content">
      <div :class="{ 'music-list-item': true, 'active': props.isHighlight(musicItem, index) }"
        v-for="(musicItem, index) in musicList" :key="index" @dblclick="dblclickItem(index)">
        <div class="music-info">
          <img :src="musicItem.cover ? musicItem.cover : '/defaultCover.png'" alt="音乐封面" class="cover">
          <div class="details">
            <div class="title">{{ musicItem.title ? musicItem.title :
        musicItem.filename.split('/').pop().split('.').slice(0,
          -1).join('.') }}</div>
            <div class="artist-album">{{ musicItem.artist ? musicItem.artist : '未知艺术家' }} - {{ musicItem.album ?
        musicItem.album : '未知专辑'
              }}</div>
          </div>
        </div>
        <div class="more">
          <a-dropdown :trigger="['click']">
            <MoreIcon theme="outline" size="32" />
            <template #overlay>
              <a-menu>
                <a-menu-item v-for="(menuItem) in menu" @click="menuItem.handler(musicItem, index)">
                  <Component :is="menuItem.icon" theme="outline" size="" />{{ menuItem.label }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
  </div>
  <MyDialog ref="addDialogRef">

    <template #header>
      添加到歌单
    </template>

    <template #main>
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
        </div>
      </div>
    </template>

    <template #footer>
      <button @click="create">新建歌单</button>
    </template>
  </MyDialog>
  <MyDialog ref="createDialogRef">

    <template #header>
      新建歌单
    </template>

    <template #main>
      <div class="input-container">
        <input required type="text" class="input" v-model="inputValue">
        <label class="label">歌单名</label>
      </div>
    </template>

    <template #footer>
      <button @click="cancelCreate">取消</button>
      <button @click="confirmCreate">确认</button>
    </template>
  </MyDialog>
</template>

<script setup>
import { MoreOne as MoreIcon, PlayOne as PlayIcon, GoEnd as NextIcon, MusicMenu as SongListIcon } from '@icon-park/vue-next';
import { computed, ref } from 'vue';
import { useMusicLibraryStore } from '@/stores/musicLibrary';
import { usePlayerStore } from '@/stores/player';
import { storeToRefs } from 'pinia';
import MyDialog from '@/components/BaseUI/MyDialog.vue';
import { useSongListStore } from '@/stores/songList';

// 引入musicLibraryStore中的变量
const musicLibraryStore = useMusicLibraryStore();
const { getMusicTagsByFilename } = musicLibraryStore;
// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { addMusicToPlayList } = playerStore;

const songListStore = useSongListStore();
const { createSongList, saveSongListToLocal, addSongsToSongList } = songListStore;
const { songList } = storeToRefs(songListStore);

const props = defineProps({
  list: Array,
  isHighlight: {
    type: Function,
    default: () => false,
  }
});
const emits = defineEmits(['itemDblclick']);

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
// 当前所在的列表项
const currentMenuItem = ref(null);
// 菜单数组
const menu = [
  {
    label: '播放',
    icon: PlayIcon,
    handler: (item, index) => {
      // console.log('播放', item, index);
      dblclickItem(index)
    }
  },
  {
    label: '下一首播放',
    icon: NextIcon,
    handler: (item, index) => {
      console.log('下一首播放', item, index);
      addMusicToPlayList(item.filename);
    }
  },
  {
    label: '添加到歌单',
    icon: SongListIcon,
    handler: (item, index) => {
      // console.log('添加到歌单');
      addDialogRef.value.openDialog();
      currentMenuItem.value = item;
    }
  }
];
// addDialog实例
const addDialogRef = ref(null);
// createDialog实例
const createDialogRef = ref(null);
// 新建歌单
const create = () => {
  addDialogRef.value.closeDialog();
  createDialogRef.value.openDialog();
}
// 输入框的值
const inputValue = ref('');
// 取消创建
const cancelCreate = () => {
  inputValue.value = '';
  createDialogRef.value.closeDialog();
}
// 确认创建
const confirmCreate = async () => {
  try {
    createSongList(inputValue.value.trim());
    await saveSongListToLocal();
    inputValue.value = '';
    createDialogRef.value.closeDialog();
    addDialogRef.value.openDialog();
  } catch (error) {
    console.log('error', error);
  }
}
const handleClick = async (item) => {
  // console.log('添加到歌单:', item)
  // console.log('当前要添加的项目：', currentMenuItem.value)
  addSongsToSongList([currentMenuItem.value.filename], item.name);
  await saveSongListToLocal();
  addDialogRef.value.closeDialog();
}
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

    &:hover {
      background-color: #F2F3F4;
    }
  }
}

.input-container {
  position: relative;
  width: 100%;

  .input {
    width: 100%;
    border: 2px solid black;
    border-radius: 16px;
    background: none;
    padding: 16px;
    font-size: 16px;
    color: black;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:focus,
    &:valid {
      outline: none;
      border: 2px solid #1a73e8;

      ~.label {
        transform: translateY(-200%) scale(0.8);
        background-color: white;
        padding: 0 3px;
        color: #2196f3;
      }
    }
  }

  .label {
    display: block;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.6);
    pointer-events: none;
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>