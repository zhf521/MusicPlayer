<template>
  <div class="buttons">
    <SvgIcon className="icon" :iconName="modeIconName" :title="modeIconTitle" @click="changePlayMode" />
    <SvgIcon className="icon" iconName="icon-prev" title="上一曲" @click="prevMusic" />
    <SvgIcon className="icon" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
      :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay" />
    <SvgIcon className="icon" iconName="icon-next" title="下一曲" @click="nextMusic" />
  </div>
</template>
<script setup>
import SvgIcon from '../SvgIcon.vue';
import { usePlayerStore } from '../../stores/player';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const playerStore = usePlayerStore();
const { isPlaying, playMode } = storeToRefs(playerStore);
const { togglePlay, prev, setPlayMode, next, } = playerStore;

// 切换音乐播放、暂停
const toggleMusicPlay = () => {
  // console.log('切换播放、暂停');
  togglePlay();
};
// 上一曲
const prevMusic = () => {
  prev();
};
// 获取播放模式iconName和iconTitle
const modeIconName = computed(() => {
  return `icon-${['list-loop', 'one-loop', 'random'][playMode.value]}`;
});
const modeIconTitle = computed(() => {
  return ['列表循环', '单曲循环', '随机播放'][playMode.value];
});
// 切换播放模式
const changePlayMode = () => {
  setPlayMode((playMode.value + 1) % 3);
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
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>