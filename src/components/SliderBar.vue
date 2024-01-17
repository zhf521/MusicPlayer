<template>
  <div class="slider-bar" ref="sliderBarRef" @click="clickSlider">
    <div class="filled-bar" ref="filledBarRef">
    </div>
    <div class="dot" @mousedown="handleMouseDown"></div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const sliderBarRef = ref(null);// 滑块条对象
const filledBarRef = ref(null);// 已填充条对象
const props = defineProps(['filledPercent']);
const emit = defineEmits(['percent-change', 'percent-change-end']);
const isDragging = ref(false);// 是否正在拖动
// 移动进度条
const moveFilledBar = (width) => {
  filledBarRef.value.style.width = width;
};
// 监听填充宽度变化
watch(() => props.filledPercent, (newVal) => {
  if (!isDragging.value) {
    // console.log(newVal);
    moveFilledBar(newVal);
    // console.log(filledBarRef.value.style.width);
  }
});
// 点击滑动条
const clickSlider = (event) => {
  const sliderBar = sliderBarRef.value.getBoundingClientRect();// sliderBar的位置
  let clickPercent = `${((event.clientX - sliderBar.left) / sliderBar.width) * 100}%`;
  // console.log('点击对应的百分比：', clickPercent);
  moveFilledBar(clickPercent);
  let percent = (event.clientX - sliderBar.left) / sliderBar.width;
  emit('percent-change-end', percent);
};
// 鼠标按下小圆点
const handleMouseDown = (event) => {
  isDragging.value = true;  // 设置正在拖动的标志为true
  // 阻止默认行为，比如拖动时选中文字
  event.preventDefault();
  // 在文档上添加鼠标移动和松开事件监听
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};
// 鼠标移动
const handleMouseMove = (event) => {
  const sliderBar = sliderBarRef.value.getBoundingClientRect();// sliderBar的位置
  let newWidth = `${(event.clientX - sliderBar.left) / sliderBar.width * 100}%`;// 计算新宽度
  let percent = (event.clientX - sliderBar.left) / sliderBar.width;
  // 检查新的宽度是否超出边界
  if (event.clientX < sliderBar.left) { // 超出左边界
    newWidth = '0%'; // 将宽度设为0%
    percent = 0;
  } else if (event.clientX > sliderBar.left + sliderBar.width) { // 超出右边界
    newWidth = '100%'; // 将宽度设为100%
    percent = 100;
  }
  moveFilledBar(newWidth);
  emit('percent-change', percent);
};
// 鼠标松开事件处理函数
const handleMouseUp = (event) => {
  // 移除正在拖动的标志
  isDragging.value = false;
  const sliderBar = sliderBarRef.value.getBoundingClientRect();// sliderBar的位置
  let percent = (event.clientX - sliderBar.left) / sliderBar.width;
  emit('percent-change-end', percent);
  // 移除文档上的鼠标移动和松开事件监听
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
};
</script>
<style scoped lang="less">
.slider-bar {
  width: 100%;
  height: 5px;
  background-color: #cbcbcb;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;

  .filled-bar {
    height: 100%;
    background-color: #000;
    cursor: pointer;
    border-radius: 10px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: -5px;
    background-color: #000;
    opacity: 0;

    &:active {
      opacity: 1;
    }
  }

  &:hover .dot {
    opacity: 1;
  }
}
</style>