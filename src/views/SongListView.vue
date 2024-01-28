<template>
  <div class="song-list-container">
    <div class="song-list-item" v-for="i in 31">
      <div style="background-color: green;">123</div>
    </div>
    <div class="create-song-list">
      <PlusIcon theme="outline" size="100" fill="#333" class="icon" />
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  overflow: auto;

  .song-list-item {
    position: relative;

    &::before {
      content: "";
      display: block;
      padding-bottom: 100%;
      background-color: pink;
    }

    &>div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .create-song-list {
    position: relative;

    &::before {
      content: "";
      display: block;
      padding-bottom: 100%;
      background-color: #F2F3F4;
    }

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>