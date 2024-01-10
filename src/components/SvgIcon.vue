<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :title="title"></use>
    <title>{{ title }}</title>
  </svg>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#409eff',
  },
  title: {
    type: String,
    default: '',
  }
});
// 图标在iconfont中的名字
const iconName = computed(() => {
  return `#${props.iconName}`;
});
// 给图标添加类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
</script>
<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>