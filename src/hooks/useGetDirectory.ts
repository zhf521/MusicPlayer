import { useUserSettingStore } from '@/stores/userSetting';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { createClient } from 'webdav';

export function useGetDirectory() {
    // 文件夹内容
    const contents = ref(null);
    // 支持的文件扩展名
    const supportedExtensions = ['.mp3'];
    // 引入userSettingStore中的变量和函数
    const userSettingStore = useUserSettingStore();
    const { userSetting } = storeToRefs(userSettingStore);
    const { loadUserSetting } = userSettingStore;
    onMounted(async () => {
        // 加载用户设置
        await loadUserSetting();
    });
    // 获取webDav设置
    const webDavSetting = userSetting.value.webDavSetting;
    // 定义获取文件夹内容的函数
    const getDirectory = async (path: string) => {
        try {
            const allContents = await createClient(webDavSetting.url, {
                username: webDavSetting.username,
                password: webDavSetting.password,
            }).getDirectoryContents(path);
            if (Array.isArray(allContents)) {
                contents.value = allContents.filter((item: any) => {
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
