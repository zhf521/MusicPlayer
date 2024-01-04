<template>
  <div class="immersion">
    <div class="space"></div>
    <div class="music">
      <img class="music-cover" src="" alt="音乐封面">
      <div class="music-info">
        <div class="music-title"><span>标题</span></div>
        <div class="music-artist"><span>艺术家</span></div>
      </div>
      <div class="music-controller">
      </div>
    </div>
    <div class="lyric"></div>
    <div class="buttons">
      <SvgIcon iconName="icon-close" className="button" @click="close" />
    </div>
  </div>
</template>
<script setup lang="ts">
// 声明自定义事件
const emits = defineEmits(['handleCloseImmersion']);

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
  background-color: red;
}

.music {
  width: 35vw;
  height: 100vh;
  background-color: pink;
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
  background-color: skyblue;
}

.music-title{
  font-size: 30px;
  font-weight: 600;
}

.music-artist{
  margin-top: 5px;
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
  background-color: pink;
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
