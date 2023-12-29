<template>
  <!-- WebDav未设置 -->
  <div v-if="false" class="not-set">
    <el-empty description="WebDav服务器未配置或配置有误">
      <el-button type="primary" @click="goToSet">点我去设置</el-button>
    </el-empty>
  </div>
  <!-- 文件管理 -->
  <div v-else class="file-manager">
    文件管理器
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

// 引入路由器
const router = useRouter();

// 跳转到设置
const goToSet = () => {
  router.push('/setting')
}
</script>
<style scoped></style>