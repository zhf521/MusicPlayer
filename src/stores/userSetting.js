import localforage from 'localforage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserSettingStore = defineStore('userSetting', () => {
    const userSetting = ref({});
    const loadUserSetting = async () => {
        try {
            const res = await localforage.getItem('userSetting');
            if (res) {
                userSetting.value = res;
            }
        } catch (error) {
            console.error('failed to load user setting', error);
        }
    };
    const saveUserSetting = async (key, value) => {
        try {
            const setting = { ...userSetting.value, [key]: value };
            await localforage.setItem('userSetting', setting);
        } catch (error) {
            console.error('failed to save user setting', error);
        }
    };
    return {
        userSetting,
        loadUserSetting,
        saveUserSetting,
    };
});
