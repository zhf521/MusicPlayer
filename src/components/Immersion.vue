<template>
  <div class="immersion">
    <div class="space"></div>
    <div class="music">
      <img class="music-cover" :src="currentMusicInfo ? getMusicCover(currentMusicInfo.picture) : ''" alt="音乐封面">
      <div class="music-info">
        <div class="music-title">{{ currentMusicInfo && currentMusicInfo.title || '标题' }}</div>
        <div class="music-artist">{{ currentMusicInfo && currentMusicInfo.artist || '艺术家' }}</div>
      </div>
      <div class="music-controller">
        <SvgIcon className="button" :iconName="modeIconName" :title="modeIconTitle" @click="changePlayMode" />
        <SvgIcon className="button" iconName="icon-prev" title="上一曲" @click="prevMusic"></SvgIcon>
        <SvgIcon className="button" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
          :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay"></SvgIcon>
        <SvgIcon className="button" iconName="icon-next" title="下一曲" @click="nextMusic"></SvgIcon>
        <SvgIcon className="button" iconName="icon-playlist"></SvgIcon>
      </div>
      <div class="progress">
        <input type="range">
      </div>
    </div>
    <div class="lyric">
      <Lyric :lrc="currentMusicInfo && currentMusicInfo.lyrics" />
    </div>
    <div class="buttons">
      <SvgIcon iconName="icon-close" className="button" @click="close" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePlayerControllerStore } from '@/stores/playerController';
import { getMusicCover } from '@/utils/getMusicCover';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

// 声明自定义事件
const emits = defineEmits(['handleCloseImmersion']);
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { currentMusicInfo, isPlaying, mode } = storeToRefs(playerControllerStore);
const { togglePlay, prev, next, setMode } = playerControllerStore;
// 播放模式
const playMode = ['list-loop', 'one-loop', 'random'];

// 切换播放、暂停
const toggleMusicPlay = () => {
  togglePlay();
}
// 上一曲
const prevMusic = () => {
  prev();
}
// 下一曲
const nextMusic = () => {
  next();
}
// 切换播放模式
const changePlayMode = () => {
  const newMode = (mode.value + 1) % 3;
  setMode(newMode);
}
// 播放模式iconName
const modeIconName = computed(() => {
  return `icon-${playMode[mode.value]}`;
})
// 播放模式title
const modeIconTitle = computed(() => {
  const playModeTitle = ['列表循环', '单曲循环', '随机播放'];
  return playModeTitle[mode.value];
})
// 关闭沉浸模式
const close = () => {
  emits('handleCloseImmersion', false);
}
</script>
<style scoped>
.immersion {
  display: flex;
  justify-content: space-between;
}

.space {
  width: 15vw;
  height: 100vh;
}

.music {
  width: 35vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.music-cover {
  width: 20vw;
  height: 20vw;
  margin-bottom: 5vw;
  border-radius: 10%;
  object-fit: cover;
  box-shadow: var(--el-box-shadow);
}

.music-info {
  height: 100px;
  width: 100%;
  padding: 10px 20px;
}

.music-title {
  font-size: 30px;
  font-weight: 600;
}

.music-artist {
  margin-top: 10px;
}

.music-controller {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 60px;
}

.progress {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.lyric {
  width: 40vw;
  height: 100vh;
  background-color: green;
}

.buttons {
  width: 10vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  height: 30px;
  width: 30px;
  margin: 20px 0;
  transition: transform 0.3s ease;
}

.button:hover {
  transform: scale(1.2);
}
</style>
