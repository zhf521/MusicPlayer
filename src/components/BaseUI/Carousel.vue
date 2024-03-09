<template>
    <!-- 跑马灯容器 -->
    <div class="container" ref="containerRef">
        <!-- 跑马灯 -->
        <div :class="textOverflow && 'content'"
            :style="{ animationDuration: `${duration}s`, animationDelay: `${props.scrollDelay}s` }">
            <!-- 文本内容 -->
            <div :style="[{ paddingRight: `${props.textGap}px`, whiteSpace: 'nowrap' }, props.textStyle]"
                ref="textContentRef">{{
            props.textContent }}</div>
            <!-- 文本溢出时追加的文本内容 -->
            <div :style="[{ paddingRight: `${props.textGap}px`, whiteSpace: 'nowrap' }, props.textStyle]"
                v-show="textOverflow">{{
            props.textContent }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
// 获取跑马灯容器元素
const containerRef = ref(null);
// 获取文本内容元素
const textContentRef = ref(null);
// 判断文本内容是否溢出
const textOverflow = ref(true);
// 动画持续时间
const duration = ref(0);
// 接收参数
const props = defineProps({
    // 文本内容
    textContent: {
        type: String,
        default: '',
    },
    // 文本间隔
    textGap: {
        type: Number,
        default: 20,
    },
    // 文本滚动速度
    scrollSpeed: {
        type: Number,
        default: 20,
    },
    // 文本开始滚动的延迟时间
    scrollDelay: {
        type: Number,
        default: 0.5,
    },
    // 文本内容样式
    textStyle: {
        type: Object,
        default: null,
    }
});
// 监听文本内容变化
watch(() => props.textContent, () => {
    nextTick(() => {
        renderText();
    });
});
// 挂载时执行
onMounted(() => {
    nextTick(() => {
        renderText();
    });
});
// 渲染文本内容
const renderText = () => {
    // 获取容器宽度和文本内容宽度
    const containerWidth = containerRef.value.offsetWidth;
    const textWidth = textContentRef.value.offsetWidth;
    // 计算动画持续时间
    duration.value = textWidth / props.scrollSpeed;
    // 判断文本内容是否溢出
    if ((textWidth - props.textGap) > containerWidth) {
        textOverflow.value = true;
    } else {
        textOverflow.value = false;
    }
};
</script>

<style scoped lang="less">
.container {
    width: 100%;
    display: flex;
    flex-grow: 1;
    overflow: hidden;

    .content {
        flex: none;
        display: flex;
        align-items: center;
        animation: move linear infinite;
    }

    @keyframes move {
        0% {
            transform: translateX(0);
        }

        to {
            transform: translateX(-50%);
        }
    }
}
</style>