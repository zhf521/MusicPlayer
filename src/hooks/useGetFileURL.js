// import { useMusicLibraryStore } from '@/stores/musicLibrary';
import { useUserSettingsStore } from '@/stores/userSettings';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { createClient } from 'webdav';

export function useGetFileURL() {
    // 文件URL
    const fileURL = ref(null);
    // 引入userSettingsStore中的变量
    const userSettingsStore = useUserSettingsStore();
    const { userSettings } = storeToRefs(userSettingsStore);
    // // 引入musicLibraryStore中的变量
    // const musicLibraryStore = useMusicLibraryStore();
    // const { addTagToMusic } = musicLibraryStore;
    // 定义获取文件URL的函数
    const getFileURL = async (filename) => {
        // 获取webDav设置
        const webDavSettings = userSettings.value.webDavSettings;
        try {
            const res = await createClient(webDavSettings.url, {
                username: webDavSettings.username,
                password: webDavSettings.password,
            }).getFileContents(filename);
            const blob = new Blob([res]);
            fileURL.value = URL.createObjectURL(blob);
            // const tag = await getTag(blob);
            // addTagToMusic(filename, tag);
        } catch (error) {
            console.error('获取文件URL失败', error);
        }
    };
    return { fileURL, getFileURL };
}