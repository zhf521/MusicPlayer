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
        <SvgIcon className="icon" :iconName="modeIconName" :title="modeIconTitle" @click="changePlayMode" />
        <SvgIcon className="icon" iconName="icon-prev" title="上一曲" @click="prevMusic" />
        <SvgIcon className="icon" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
          :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay" />
        <SvgIcon className="icon" iconName="icon-next" title="下一曲" @click="nextMusic" />
        <SvgIcon className="icon" iconName="icon-volume" title="音量" />
      </div>
      <div class="progress">
        <div class="time">00:00</div>
        <ProgressBar :playedProgressWidth="playedProgressWidth" />
        <div class="time">00:00</div>
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
import SvgIcon from './SvgIcon.vue';
import { usePlayerControllerStore } from '../stores/playerController';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useUserSettingsStore } from '../stores/userSettings';
import { createClient } from 'webdav';
import { useHistoryStore } from '../stores/history';
import { getTags } from '../utils/getTags';
import { useMusicLibraryStore } from '../stores/musicLibrary';
import { getMusicCover } from '../utils/getMusicCover';
import { randomShuffle } from '../utils/randomShuffle';
import ProgressBar from './ProgressBar-1.vue';

// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { isPlaying, currentMusic, playlist, currentPlayIndex, mode, orderList, audioElement } = storeToRefs(playerControllerStore);
const { setPlaying, setCurrentPlayIndex, setPlayMode, } = playerControllerStore;
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

// 已播放进度条宽度
const playedProgressWidth = ref();
onMounted(() => {
  nextTick(() => {
    if (audioElement.value) {
      audioElement.value.onended = () => {
        // console.log('播放结束');
        if (mode.value === 1) {
          // 单曲循环
          audioElement.value.currentTime = 0; // 重新开始播放当前音频
          audioElement.value.play(); // 继续播放
        } else {
          // console.log('播放结束，下一曲');
          nextMusic();
        };
      };
      audioElement.value.oncanplay = async () => {
        addToHistory(playlist.value, currentPlayIndex.value);
        // console.log('保存到历史记录的播放列表：', playlist.value);
        await saveHistoryToLocal();
      };
      audioElement.value.ontimeupdate = () => {
        console.log('时间变化');
        console.log(playedProgressWidth.value);
        playedProgressWidth.value = `${(audioElement.value.currentTime / audioElement.value.duration) * 100}%`;
      };
    }
  });
});

const loading = ref(false);
watch(currentMusic, async (newMusic, oldMusic) => {
  // console.log('currentMusic改变了');
  let webDavSettings = userSettings.value.webDavSettings;
  try {
    loading.value = true;
    const res = await createClient(webDavSettings.url, {
      username: webDavSettings.username,
      password: webDavSettings.password,
    }).getFileContents(newMusic.filename);
    const blob = new Blob([res]);
    // console.log('新音乐：', newMusic);
    // console.log('新音乐的标签：', newMusic.tags);
    if (!newMusic.tags) {
      const tags = await getTags(blob);
      addTagsToMusic(newMusic.filename, tags);
      await saveMusicLibraryToLocal();
      // console.log(tags);
      // console.log('获取标签信息成功');
    }
    audioElement.value.src = URL.createObjectURL(blob);
    audioElement.value.currentTime = 0;
    if (JSON.stringify(oldMusic) !== '{}' || history.value.length === 0) {
      // 加载完历史记录时不播放（即页面启动时）
      // 没有历史记录，刚添加到音乐库，双击选择时播放
      audioElement.value.play();
      isPlaying.value = true;
    }
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
// 下一曲
const nextMusic = () => {
  // console.log('下一曲');
  let index = currentPlayIndex.value + 1;
  if (index > playlist.value.length - 1) {
    index = 0;
  }
  setCurrentPlayIndex(index);
};
// 获取播放模式iconName和iconTitle
const playMode = ['list-loop', 'one-loop', 'random'];
const modeIconName = computed(() => {
  return `icon-${playMode[mode.value]}`;
});
const modeIconTitle = computed(() => {
  const playModeTitle = ['列表循环', '单曲循环', '随机播放'];
  return playModeTitle[mode.value];
});
// 切换播放模式
const changePlayMode = () => {
  const newMode = (mode.value + 1) % 3;
  setPlayMode(newMode);
  if (newMode === 1) {
    // 单曲循环
    return;
  } else {
    let list = [];
    switch (newMode) {
      // 列表循环
      case 0:
        list = orderList.value;
        break;
      // 随机播放
      case 2:
        list = randomShuffle(orderList.value);
        break;
    }
    // 获取当前歌曲在顺序列表中的索引
    const index = list.findIndex(
      (item) => item.filename === currentMusic.value.filename
    );
    setCurrentPlayIndex(index);
    playlist.value = list;
  }
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
    justify-content: space-evenly;

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

    .progress {
      display: flex;
      align-items: center;
      background-color: orange;
      transition: transform 0.3s ease;

      .time {
        margin: 0 10px;
      }

      &:hover {
        transform: scale(1.2);
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