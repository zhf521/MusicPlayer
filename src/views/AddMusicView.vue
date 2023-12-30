<template>
  <!-- WebDav未设置 -->
  <div v-if="false" class="not-set">
    <el-empty description="WebDav服务器未配置或配置有误">
      <el-button type="primary" @click="goToSet">点我去设置</el-button>
    </el-empty>
  </div>
  <!-- 文件管理 -->
  <div v-else class="file-manager">
    <div class="breadcrumb">
      面包屑
    </div>
    <div class="file-content">
      <el-table v-loading="loading" :data="contents" height="75vh" style="width: 100%" @row-click="handleRowClick">
        <el-table-column type="selection" />
        <el-table-column type="index" style="width: 10px;" />
        <el-table-column label="名称" show-overflow-tooltip>
          <template #default="scope">
            <div style="display:flex; align-items: center;">
              <SvgIcon style="width: 4vh;height: 4vh;"
                :iconName="scope.row.type === 'directory' ? 'icon-folder' : 'icon-music-file'" />
              <span style="flex:1;overflow:hidden;text-overflow: ellipsis;margin-left: 1vw;">{{ scope.row.basename
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lastmod" label="修改时间" />
        <el-table-column prop="size" label="大小" />
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGetDirectory } from '@/hooks/useGetDirectory';
import { onMounted, ref } from 'vue';

// 引入路由器
const router = useRouter();
// 引入UseGetDirectory中的变量和函数
const { contents, getDirectory } = useGetDirectory();
// 加载状态
const loading = ref(false);

// 组件挂载完成后执行
onMounted(async () => {
  loading.value = true;
  try {
    await getDirectory('/');
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
})

// 跳转到设置
const goToSet = () => {
  router.push('/setting')
}
// 某一行被单击触发
const handleRowClick = async (row) => {
  if (row.type === 'directory') {
    loading.value = true;
    try {
      await getDirectory(row.filename);
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  } else {
    ElMessage({
      message: '别点啦~没有下一级啦！',
      type: 'warning',
    })
  }
}
</script>
<style scoped>
:deep(.cell) {
  white-space: nowrap;
}
</style>