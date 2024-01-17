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
    <SliderBar :filledPercent="playProgress" @percent-change-end="handlePercentChangeEnd"
      @percent-change="handlePercentChange" />
    <div class="time">
      <div class="cTime">
        <div>{{ formatTimeToString(musicCurrentTime) }}</div>
        <div class="onDrag" v-if="isDragging">{{ formatTimeToString(musicCurrentTimeOnDrag) }}</div>
      </div>
      <div class="dTime">{{ formatTimeToString(musicDurationTime) }}</div>
    </div>
  </div>
</template>
<script setup>
import { usePlayerStore } from '../../stores/player';
import { storeToRefs } from 'pinia';
import { Play, PauseOne, GoStart, GoEnd, PlayOnce, PlayCycle, LoopOnce, ShuffleOne } from '@icon-park/vue-next';
import SliderBar from '../SliderBar.vue';
import { computed, ref } from 'vue';
import { formatTimeToString } from '../../utils/formatTime';

// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { isPlaying, loopMode, playMode, musicDurationTime, musicCurrentTime, } = storeToRefs(playerStore);
const { togglePlay, prev, setLoopMode, setPlayMode, next, setCurrentTime } = playerStore;

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
// 播放进度百分比
const playProgress = computed(() => {
  return `${(musicCurrentTime.value / musicDurationTime.value) * 100}%`;
});
const musicCurrentTimeOnDrag = ref(0);//鼠标拖动时的当前播放时间
const isDragging = ref(false);//鼠标是否在拖动
// 进度条运动时触发
const handlePercentChange = (percent) => {
  isDragging.value = true;
  musicCurrentTimeOnDrag.value = musicDurationTime.value * percent;
};
// 小圆点松开时触发
const handlePercentChangeEnd = (percent) => {
  // console.log('滑动条传递过来的百分比：', percent);
  // 设置音乐当前播放时间
  setCurrentTime(musicDurationTime.value * percent);
  isDragging.value = false;
}

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
  margin-top: 5px;
  width: 100%;

  .time {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;

    .cTime {
      display: flex;

      .onDrag {
        margin-left: 5px;
        background-color: #d1d0d0;
        border-radius: 10%;
      }
    }
  }
}
</style>