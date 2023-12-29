<template>
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
      <el-button type="primary" @click="saveSetting(webDavFormRef)">
        保存
      </el-button>
      <el-button @click="resetForm(webDavFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { type FormInstance } from 'element-plus';
import { createClient } from "webdav";
import { useUserSettingStore } from '@/stores/userSetting';
import { storeToRefs } from 'pinia';

// 定义WebDavForm接口
interface WebDavForm {
  url: string;
  username: string;
  password: string;
}

// 表单实例
const webDavFormRef = ref<FormInstance>();
// 表单对象
const webDavForm = reactive<WebDavForm>({
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
// 引入userSettingStore中的变量和函数
const userSettingStore = useUserSettingStore();
const { userSetting } = storeToRefs(userSettingStore);
// 组件挂载成功后执行
onMounted(async () => {
  const webDavSetting = userSetting.value.webDavSetting;
  if (webDavSetting) {
    webDavForm.url = webDavSetting.url;
    webDavForm.username = webDavSetting.username;
    webDavForm.password = webDavSetting.password;
  }
});

// 保存配置
const saveSetting = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const client = createClient(webDavForm.url, {
          username: webDavForm.username,
          password: webDavForm.password,
        });
        await client.getDirectoryContents('/');
        userSettingStore.saveUserSetting('webDavSetting', JSON.parse(JSON.stringify(webDavForm)));
        ElMessage({
          type: 'success',
          message: '保存成功',
        })
      } catch (error) {
        console.log(error);
        if (error.status === 401) {
          ElMessage({
            type: 'error',
            message: '用户名或密码错误',
          })
        } else {
          ElMessage({
            type: 'error',
            message: '地址错误',
          })
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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>