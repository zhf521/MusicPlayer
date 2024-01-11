import localforage from 'localforage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserSettingsStore = defineStore('userSettings', () => {
    const userSettings = ref({});
    const loadUserSettings = async () => {
        try {
            const res = await localforage.getItem('userSettings');
            if (res) {
                userSettings.value = res;
            }
        } catch (error) {
            console.error('failed to load user settings', error);
        }
    };
    const setUserSettings = async (key, value) => {
        userSettings.value = { ...userSettings.value, [key]: value };
    };
    // 保存用户设置到本地
    const saveUserSettingsToLocal = async () => {
        try {
            await localforage.setItem(
                'userSettings',
                JSON.parse(JSON.stringify(userSettings.value))
            );
        } catch (error) {
            console.error('failed to update userSettings', error);
        }
    };
    return {
        userSettings,
        loadUserSettings,
        setUserSettings,
        saveUserSettingsToLocal,
    };
});
