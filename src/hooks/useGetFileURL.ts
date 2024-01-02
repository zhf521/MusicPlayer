import { useMusicLibraryStore } from '@/stores/musicLibrary';
import { useUserSettingStore } from '@/stores/userSetting';
import { getTag } from '@/utils/getTag';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { createClient } from 'webdav';

export function useGetFileURL() {
    // 文件URL
    const fileURL = ref(null);
    // 引入userSettingStore中的变量
    const userSettingStore = useUserSettingStore();
    const { userSetting } = storeToRefs(userSettingStore);
    const { loadUserSetting } = userSettingStore;
    // 引入musicLibraryStore中的变量
    const musicLibraryStore = useMusicLibraryStore();
    const { addTagToMusic } = musicLibraryStore;
    // 组件加载完后执行
    onMounted(async () => {
        await loadUserSetting();
    });
    // 定义获取文件URL的函数
    const getFileURL = async (filename: string) => {
        // 获取webDav设置
        const webDavSetting = userSetting.value.webDavSetting;
        try {
            const res = await createClient(webDavSetting.url, {
                username: webDavSetting.username,
                password: webDavSetting.password,
            }).getFileContents(filename);
            const blob = new Blob([res]);
            const tag = await getTag(blob);
            addTagToMusic(filename, tag);
            fileURL.value = URL.createObjectURL(blob);
        } catch (error) {
            console.error('获取文件URL失败', error);
        }
    };
    return { fileURL, getFileURL };
}
