<template>
  <div class="slider-bar" ref="sliderBarRef">
    <div class="filled-bar" ref="filledBarRef">
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';

const sliderBarRef = ref(null);// 滑块条对象
const filledBarRef = ref(null);// 已填充条对象
const props = defineProps(['filledPercentage']);
onMounted(() => {
  filledBarRef.value.style.width = '0%';// 设置已填充条对象的初始宽度
  // 监听填充宽度变化
  watch(() => props.filledPercentage, (newVal) => {
    // console.log(newVal);
    filledBarRef.value.style.width = newVal;
    // console.log(filledBarRef.value.style.width);
  });
});
</script>
<style scoped lang="less">
.slider-bar {
  width: 100%;
  height: 5px;
  background-color: orange;
  cursor: pointer;
  border-radius: 10px;

  .filled-bar {
    height: 100%;
    background-color: #000;
    cursor: pointer;
    border-radius: 10px;
  }
}
</style>