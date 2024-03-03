<template>
  <Teleport to="body">
    <div v-if="showDialog" class="dialog-container" @click="handleClickOutside">
      <div class="dialog">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="main">
          <slot name="main"></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
// 是否展示对话框
const showDialog = ref(false);
// 打开对话框
const openDialog = () => {
  showDialog.value = true;
};
// 关闭对话框
const closeDialog = () => {
  showDialog.value = false;
};
// 将方法暴露给父组件
defineExpose({ openDialog, closeDialog });
// 处理点击外部的事件
const handleClickOutside = (event) => {
  const dialog = document.querySelector('.dialog');
  if (dialog && !dialog.contains(event.target)) {
    closeDialog();
  }
};
</script>

<style scoped lang="less">
.dialog-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);

  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .header {
      font-size: 20px;
      font-weight: 900;
      padding: 10px;
      height: 10%;
    }

    .main {
      padding: 10px;
      height: 80%;
    }

    .footer {
      height: 10%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>