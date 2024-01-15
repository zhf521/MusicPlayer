<template>
  <!-- 播放控制器 -->
  <div class="controller">
    <div class="details">
      <img class="cover" :src="getMusicCover(currentMusic.tags && currentMusic.tags.tags.picture || '')" alt="音乐封面">
      <div class="info">
        <div class="title">{{ loading ? '加载中...' : (currentMusic.tags && currentMusic.tags.tags.title || '标题') }}</div>
        <div class="artist">{{ loading ? '加载中...' : (currentMusic.tags && currentMusic.tags.tags.artist || '艺术家') }}</div>
      </div>
    </div>
    <div class="btns-and-progress">
      <div class="btns">
        <SvgIcon className="icon" iconName="icon-prev" title="上一曲" @click="prevMusic" />
        <SvgIcon className="icon" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
          :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay" />
      </div>
    </div>
    <div class="playlist">
      <SvgIcon class="icon" iconName="icon-playlist" />
    </div>
  </div>
  <div class="immersion" v-if="false">
    沉浸模式
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import SvgIcon from '../components/SvgIcon.vue';
import { usePlayerControllerStore } from '../stores/playerController';
import { nextTick, onMounted, ref, watch } from 'vue';
import { useUserSettingsStore } from '../stores/userSettings';
import { createClient } from 'webdav';
import { useHistoryStore } from '../stores/history';
import { getTags } from '../utils/getTags';
import { useMusicLibraryStore } from '../stores/musicLibrary';
import { getMusicCover } from '../utils/getMusicCover';
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { isPlaying, audioElement, currentMusic, playlist, currentPlayIndex } = storeToRefs(playerControllerStore);
const { setPlaying, setCurrentPlayIndex } = playerControllerStore;
// 引入userSettingsStore中的变量
const userSettingsStore = useUserSettingsStore();
const { userSettings } = storeToRefs(userSettingsStore);
// 引入historyStore中的变量和函数
const historyStore = useHistoryStore();
const { history } = storeToRefs(historyStore);
const { addToHistory, saveHistoryToLocal } = historyStore;
// 引入musicLibraryStore中的变量
const musicLibraryStore = useMusicLibraryStore();
const { addTagsToMusic, saveMusicLibraryToLocal } = musicLibraryStore;

const loading = ref(false);
watch(currentMusic, async (newMusic, oldMusic) => {
  console.log('currentMusic改变了');
  let webDavSettings = userSettings.value.webDavSettings;
  try {
    loading.value = true;
    const res = await createClient(webDavSettings.url, {
      username: webDavSettings.username,
      password: webDavSettings.password,
    }).getFileContents(newMusic.filename);
    const blob = new Blob([res]);
    console.log('新音乐：', newMusic);
    console.log('新音乐的标签：', newMusic.tags);
    if (!newMusic.tags) {
      const tags = await getTags(blob);
      addTagsToMusic(newMusic.filename, tags);
      await saveMusicLibraryToLocal();
      console.log(tags);
    }
    audioElement.value.src = URL.createObjectURL(blob);
    audioElement.value.currentTime = 0;
    if (JSON.stringify(oldMusic) !== '{}' || history.value.length === 0) {
      // 加载完历史记录时不播放（即页面启动时）
      // 没有历史记录，刚添加到音乐库，双击选择时播放
      audioElement.value.play();
      isPlaying.value = true;
    }
    // addToHistory(playlist.value, currentPlayIndex.value);
    // await saveHistoryToLocal();
  } catch (error) {
    console.log("获取文件内容失败", error);
  } finally {
    loading.value = false;
  }
});

// 切换播放暂停
const toggleMusicPlay = () => {
  setPlaying(!isPlaying.value);
};
watch(isPlaying, (newPlaying) => {
  nextTick(() => {
    newPlaying ? audioElement.value.play() : audioElement.value.pause();
  });
});
// 上一曲
const prevMusic = () => {
  let index = currentPlayIndex.value - 1;
  if (index < 0) {
    index = playlist.value.length - 1;
  }
  setCurrentPlayIndex(index);
};
</script>
<style scoped>
.controller {
  height: 100%;
  width: 100%;
  display: flex;

  .details {
    display: flex;
    align-items: center;
    width: 30%;
    padding: 0 10px;

    .cover {
      width: 64px;
      height: 64px;
      border-radius: 10%;
      object-fit: cover;
      box-shadow: var(--el-box-shadow);
    }

    .info {
      margin-left: 10px;

      .title {
        font-size: 18px;
        font-weight: 800;
      }

      .artist {
        font-size: 12px;
        margin: 4px 0 0;
      }
    }
  }

  .btns-and-progress {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .btns {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 5px 30px;

      .icon {
        width: 24px;
        height: 24px;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  .playlist {
    width: 30%;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}

.immersion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>