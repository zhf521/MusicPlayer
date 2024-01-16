<template>
  <div class="buttons">
    <Component :is="(loopMode === 0)?PlayCycle:PlayOnce" theme="filled" size="24" :strokeWidth="4" class="icon"
      :title="(loopMode === 0) ? '列表循环' : '单曲循环'" @click="toggleLoopMode" />
    <GoStart theme="filled" size="24" :strokeWidth="4" class="icon" title="上一曲" @click="prevMusic" />
    <Component :is="isPlaying?PauseOne:Play" theme="filled" size="28" fill="#333" :strokeWidth="4" class="icon"
      :title="isPlaying ? '暂停' : '播放'" @click="toggleMusicPlay" />
    <GoEnd theme="filled" size="24" :strokeWidth="4" class="icon" title="下一曲" @click="nextMusic" />
    <Component :is="(playMode === 0)?LoopOnce:ShuffleOne" theme="filled" size="24" :strokeWidth="4" class="icon"
      :title="(playMode === 0) ? '顺序播放' : '随机播放'" @click="togglePlayMode" />
  </div>
  <div class="progress">
    <div class="time">{{ musicCurrentTime }}</div>
    <div class="time">{{ musicDurationTime }}</div>
  </div>
</template>
<script setup>
import { usePlayerStore } from '../../stores/player';
import { storeToRefs } from 'pinia';
import { Play, PauseOne, GoStart, GoEnd, PlayOnce, PlayCycle, LoopOnce, ShuffleOne } from '@icon-park/vue-next';
const playerStore = usePlayerStore();
const { isPlaying, loopMode, playMode, musicDurationTime, musicCurrentTime } = storeToRefs(playerStore);
const { togglePlay, prev, setLoopMode, setPlayMode, next, } = playerStore;

// 切换音乐播放、暂停
const toggleMusicPlay = () => {
  // console.log('切换播放、暂停');
  togglePlay();
};
// 上一曲
const prevMusic = () => {
  prev();
};
// 切换循环模式
const toggleLoopMode = () => {
  setLoopMode((loopMode.value + 1) % 2);
};
// 切换播放模式
const togglePlayMode = () => {
  setPlayMode((playMode.value + 1) % 2);
};
// 下一曲
const nextMusic = () => {
  next();
};
</script>
<style scoped lang="less">
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 30px;

  .icon {
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      color: green;
    }
  }
}

.progress {
  display: flex;
  align-items: center;

  .time {
    margin: 0 10px;
  }
}
</style>