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
    const saveUserSettings = async (key, value) => {
        try {
            const settings = { ...userSettings.value, [key]: value };
            await localforage.setItem('userSettings', settings);
        } catch (error) {
            console.error('failed to save user settings', error);
        }
    };
    return {
        userSettings,
        loadUserSettings,
        saveUserSettings,
    };
});
