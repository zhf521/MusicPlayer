<template>
  <Teleport to="body">
    <div v-if="showDialog" class="dialog-container">
      <div class="dialog">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="main">
          <slot name="main"></slot>
        </div>
        <div class="footer">
          <button @click="cancel">取消</button>
          <button @click="confirm">确定</button>
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
const emit = defineEmits(['cancel', 'confirm']);
// 取消
const cancel = () => {
  closeDialog();
  emit('cancel');
};
// 确定
const confirm = () => {
  closeDialog();
  emit('confirm');
};
// 将方法暴露给父组件
defineExpose({ openDialog, closeDialog });

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
    border-radius: 10px;
    background-color: #fff;

    .header {
      font-size: 20px;
      font-weight: 900;
      padding: 10px;
    }

    .main {
      padding: 10px;
    }

    .footer {
      padding: 10px;
    }
  }
}
</style>