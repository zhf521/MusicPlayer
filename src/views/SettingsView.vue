<template>
  <div class="webDavSettings">
    <el-form ref="webDavFormRef" :model="webDavForm" :rules="rules" status-icon>
      <el-form-item label="地址" prop="url">
        <el-input v-model="webDavForm.url" placeholder="https://xxxxxxxx/dav" type="url" />
      </el-form-item>
      <el-form-item label="用户名(可选)" prop="username">
        <el-input v-model="webDavForm.username" />
      </el-form-item>
      <el-form-item label="密码(可选)" prop="password">
        <el-input v-model="webDavForm.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSettings(webDavFormRef)">
          保存
        </el-button>
        <el-button @click="resetForm(webDavFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { createClient } from "webdav";
import { useUserSettingsStore } from '../stores/userSettings';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';

// 表单实例
const webDavFormRef = ref(null);
// 表单对象
const webDavForm = reactive({
  url: '',
  username: '',
  password: '',
});
// 验证规则
const rules = reactive({
  url: [
    { required: true, message: '请输入地址', trigger: 'blur' },
    { type: 'url', message: '输入的地址不合法', trigger: 'blur' }
  ],
});
// 引入userSettingsStore中的变量和函数
const userSettingsStore = useUserSettingsStore();
const { userSettings } = storeToRefs(userSettingsStore);
const { setUserSettings, saveUserSettingsToLocal } = userSettingsStore;
// 组件挂载成功后执行
onMounted(() => {
  let webDavSettings = userSettings.value.webDavSettings;
  if (webDavSettings) {
    webDavForm.url = webDavSettings.url;
    webDavForm.username = webDavSettings.username;
    webDavForm.password = webDavSettings.password;
  }
});

// 保存配置
const saveSettings = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const client = createClient(webDavForm.url, {
          username: webDavForm.username,
          password: webDavForm.password,
        });
        await client.getDirectoryContents('/');
        setUserSettings('webDavSettings', webDavForm);
        await saveUserSettingsToLocal();
        ElMessage({
          type: 'success',
          message: '保存成功',
        });
      } catch (error) {
        console.log(error);
        if (error.status === 401) {
          ElMessage({
            type: 'error',
            message: '用户名或密码错误',
          });
        } else {
          ElMessage({
            type: 'error',
            message: '地址错误',
          });
        }
      }
    } else {
      ElMessage({
        type: 'error',
        message: '保存失败',
      });
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

</script>