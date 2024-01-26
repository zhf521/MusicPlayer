<template>
  <div class="player-tool-container">
    <div class="other">
    </div>
    <ListIcon class="icon" theme="outline" size="32" :strokeWidth="3" @click="toggleShowList" />
  </div>
</template>
<script setup>
import { MusicList as ListIcon } from '@icon-park/vue-next';
import { usePlayerStore } from '../../stores/player';
import { storeToRefs } from 'pinia';

// 引入playerStore中的变量和函数
const playerStore = usePlayerStore();
const { showList } = storeToRefs(playerStore);
const { setShowList } = playerStore;
const toggleShowList = () => {
  setShowList(!showList.value);
};
</script>
<style scoped lang="less">
.player-tool-container {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    cursor: pointer;

    &:hover {
      color: green;
    }
  }
}
</style>