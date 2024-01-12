import { useUserSettingsStore } from '@/stores/userSettings';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { createClient } from 'webdav';

export function useGetDirectory() {
    // 文件夹内容
    const contents = ref(null);
    // 支持的文件扩展名
    const supportedExtensions = ['.mp3'];
    // 引入userSettingsStore中的变量和函数
    const userSettingsStore = useUserSettingsStore();
    const { userSettings } = storeToRefs(userSettingsStore);
    const { loadUserSettings } = userSettingsStore;
    onMounted(async () => {
        // 加载用户设置
        await loadUserSettings();
    });
    // 获取webDav设置
    const webDavSettings = userSettings.value.webDavSettings;
    // 定义获取文件夹内容的函数
    const getDirectory = async (path) => {
        try {
            const allContents = await createClient(webDavSettings.url, {
                username: webDavSettings.username,
                password: webDavSettings.password,
            }).getDirectoryContents(path);
            if (Array.isArray(allContents)) {
                contents.value = allContents.filter((item) => {
                    if (item.type === 'directory') {
                        return true;
                    }
                    const extension = item.filename.substring(
                        item.filename.lastIndexOf('.')
                    );
                    return supportedExtensions.includes(extension);
                });
            }
        } catch (error) {
            console.error();
        }
    };
    return { contents, getDirectory };
}
