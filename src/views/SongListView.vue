<template>
  <div class="song-list-container">
    <div class="song-list-item" v-for="i in 31">
      {{ i }}
    </div>
    <div class="create-song-list">
      <PlusIcon theme="outline" size="100" fill="#333" />
    </div>
  </div>
</template>
<script setup>
import { Plus as PlusIcon } from '@icon-park/vue-next';
</script>
<style scoped lang="less">
.song-list-container {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  overflow: auto;
  align-items: center;
  justify-content: space-evenly;

  .song-list-item {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    background-color: pink;
    cursor: pointer;
  }

  .create-song-list {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    background-color: #F2F3F4;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>